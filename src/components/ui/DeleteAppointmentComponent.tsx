'use client';

import useDeleteAppointment from '@/hooks/appointment/useDeleteAppointment';
import { Appointment } from '@/types/appointmentTypes';
import { X, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Button from './Button';

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

     const [visible, setVisible] = useState<boolean>(isOpen);
     const [closing, setClosing] = useState<boolean>(false);

     useEffect(() => {
          let openerTimer: ReturnType<typeof setTimeout> | undefined;
          let closerTimer: ReturnType<typeof setTimeout> | undefined;
          let rafId: number | undefined;

          if (isOpen && !visible) {
               openerTimer = setTimeout(() => {
                    setVisible(true);
                    setClosing(false);
               }, 0);
          } else if (!isOpen && visible) {
               rafId = requestAnimationFrame(() => {
                    setClosing(true);
                    closerTimer = setTimeout(() => {
                         setClosing(false);
                         setVisible(false);
                    }, 220);
               });
          }

          return () => {
               if (openerTimer) clearTimeout(openerTimer);
               if (closerTimer) clearTimeout(closerTimer);
               if (rafId) cancelAnimationFrame(rafId);
          };
     }, [isOpen, visible]);

     if (!visible || !appointment) return null;

     return (
          <div
               onClick={onClose}
               className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm ${
                    closing ? 'overlay-exit' : 'overlay-enter'
               }`}
          >
               <div
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full max-w-md rounded-xl border border-[#233648] bg-background-dark m-4 ${
                         closing ? 'modal-exit' : 'modal-enter'
                    }`}
               >
                    <div className="flex items-center justify-between p-6 border-b border-[#233648]">
                         <div className="flex items-center gap-3">
                              <div className="p-2 bg-red-500/10 rounded-lg">
                                   <AlertTriangle className="w-6 h-6 text-destructive" />
                              </div>
                              <h3 className="text-text-primary-dark text-xl font-bold">Eliminar Cita</h3>
                         </div>
                         <button
                              type="button"
                              onClick={onClose}
                              className="text-text-secondary-dark hover:text-text-primary-dark transition"
                         >
                              <X className="w-6 h-6" />
                         </button>
                    </div>

                    <div className="p-6 space-y-4">
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

                         <p className="text-text-secondary-dark text-sm text-center">
                              Esta acción no se puede deshacer.
                         </p>

                         {!canDelete && (
                              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                                   <p className="text-yellow-500 text-sm text-center font-medium">
                                        Podrás eliminar en {countdown} segundo{countdown !== 1 ? 's' : ''}
                                   </p>
                              </div>
                         )}
                    </div>

                    <div className="flex justify-end gap-4 p-6 border-t border-[#233648]">
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
          </div>
     );
}
