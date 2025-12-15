'use client';

import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { toast } from 'sonner';
import useDeletePatient from '@/hooks/patients/useDeletePatient';
import { Patient } from '@/types/patients';
import Modal from './Modal';

export default function DeletePatientComponent({
     isOpen,
     onClose,
     patient,
     onSuccess,
}: {
     isOpen: boolean;
     onClose: () => void;
     patient: Patient | null;
     onSuccess?: () => void;
}) {
     const { mutate, isLoading } = useDeletePatient();
     const [countdown, setCountdown] = useState(7);
     const canDelete = isOpen && countdown <= 0;

     // Reset countdown when modal opens (defer state updates to avoid synchronous setState inside effect)
     useEffect(() => {
          let timer: ReturnType<typeof setTimeout> | undefined;
          if (isOpen) {
               timer = setTimeout(() => {
                    setCountdown(7);
               }, 0);
          }

          return () => {
               if (timer) clearTimeout(timer);
          };
     }, [isOpen]);

     // Countdown timer
     useEffect(() => {
          if (!isOpen || countdown <= 0) {
               return;
          }

          const timer = setTimeout(() => {
               setCountdown((prev) => prev - 1);
          }, 1000);

          return () => clearTimeout(timer);
     }, [countdown, isOpen]);
     const handleDelete = async () => {
          if (!patient || !canDelete) return;

          const patientFullName = `${patient.first_name} ${patient.last_name}`;

          toast.promise(mutate(patient.id), {
               loading: 'Eliminando paciente...',
               success: () => {
                    onClose();
                    onSuccess?.();
                    return `El paciente ${patientFullName} fue eliminado exitosamente`;
               },
               error: (error) => error.message,
          });
     };

     if (!patient) return null;

     return (
          <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="md" showCloseButton={false}>
               <div className="space-y-4">
                    {/* Header personalizado con icono */}
                    <div className="flex items-center gap-3 pb-4 border-b border-[#233648]">
                         <div className="p-2 bg-red-500/10 rounded-lg">
                              <AlertTriangle className="w-6 h-6 text-destructive" />
                         </div>
                         <h3 className="text-text-primary-dark text-xl font-bold">Eliminar Paciente</h3>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                         <p className="text-text-primary-dark text-center">
                              ¿Estás seguro de que deseas eliminar al paciente?
                         </p>
                         <div className="mt-4 space-y-2">
                              <p className="text-text-primary-dark font-semibold text-center text-lg">
                                   {patient.first_name} {patient.last_name}
                              </p>
                              <p className="text-text-secondary-dark text-center text-sm">
                                   Cédula: {patient.id_number}
                              </p>
                         </div>
                    </div>

                    <p className="text-text-secondary-dark text-sm text-center">
                         Esta acción no se puede deshacer. Se eliminarán todos los datos asociados a este paciente.
                    </p>

                    {!canDelete && (
                         <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                              <p className="text-yellow-500 text-sm text-center font-medium">
                                   Podrás eliminar en {countdown} segundo{countdown !== 1 ? 's' : ''}
                              </p>
                         </div>
                    )}

                    {/* Footer */}
                    <div className="flex justify-end gap-4 pt-4 border-t border-[#233648] mt-4">
                         <Button variant="ghost" type="button" onClick={onClose} disabled={isLoading}>
                              Cancelar
                         </Button>

                         <Button
                              type="button"
                              onClick={handleDelete}
                              disabled={!canDelete || isLoading}
                              loading={isLoading}
                              className="bg-red-500 hover:bg-red-600 disabled:bg-red-500/50"
                         >
                              {!canDelete ? `Esperar (${countdown}s)` : 'Eliminar Paciente'}
                         </Button>
                    </div>
               </div>
          </Modal>
     );
}
