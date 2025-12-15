'use client';

import useDeleteAppointment from '@/hooks/appointment/useDeleteAppointment';
import { Appointment } from '@/types/appointmentTypes';
import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Button from '../ui/Button';
import Modal from './Modal';

export default function DeleteAppointmentComponent({
     isOpen,
     onClose,
     appointment,
     onSuccess,
}: {
     isOpen: boolean;
     onClose: () => void;
     appointment: Appointment | null;
     onSuccess?: () => void;
}) {
     const { mutate, isLoading } = useDeleteAppointment();
     const [countdown, setCountdown] = useState(7);
     const canDelete = isOpen && countdown <= 0;

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
          if (!appointment || !canDelete) return;

          toast.promise(mutate(appointment.id), {
               loading: 'Eliminando cita...',
               success: () => {
                    onClose();
                    onSuccess?.();
                    return `La cita fue eliminada exitosamente`;
               },
               error: (error) => error.message,
          });
     };

     if (!appointment) return null;

     return (
          <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="md" showCloseButton={false}>
               <div className="space-y-4">
                    {/* Header personalizado con icono */}
                    <div className="flex items-center gap-3 pb-4 border-b border-[#233648]">
                         <div className="p-2 bg-red-500/10 rounded-lg">
                              <AlertTriangle className="w-6 h-6 text-destructive" />
                         </div>
                         <h3 className="text-text-primary-dark text-xl font-bold">Eliminar Cita</h3>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                         <p className="text-text-primary-dark text-center">
                              ¿Estás seguro de que deseas eliminar la cita?
                         </p>
                         <div className="mt-4 space-y-2">
                              <p className="text-text-primary-dark font-semibold text-center text-lg">
                                   Paciente: {appointment.patient.first_name} {appointment.patient.last_name}
                              </p>
                              <p className="text-text-secondary-dark text-center text-sm">
                                   Fecha: {new Date(appointment.appointment_date).toLocaleString()}
                              </p>
                         </div>
                    </div>

                    <p className="text-text-secondary-dark text-sm text-center">Esta acción no se puede deshacer.</p>

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
                              {!canDelete ? `Esperar (${countdown}s)` : 'Eliminar Cita'}
                         </Button>
                    </div>
               </div>
          </Modal>
     );
}
