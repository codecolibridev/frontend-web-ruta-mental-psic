'use client';

import { Appointment } from '@/types/appointmentTypes';
import { Calendar, Clock, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface AppointmentDetailsModalProps {
     isOpen: boolean;
     onClose: () => void;
     appointment?: Appointment | null;
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({ isOpen, onClose, appointment = null }) => {
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

     useEffect(() => {
          const handleKey = (e: KeyboardEvent) => {
               if (e.key === 'Escape') onClose();
          };
          window.addEventListener('keydown', handleKey);
          return () => window.removeEventListener('keydown', handleKey);
     }, [onClose]);

     if (!visible) return null;

     const formatDate = (dateStr: string) => {
          const date = new Date(dateStr);
          return date.toLocaleDateString('es-ES', {
               weekday: 'long',
               year: 'numeric',
               month: 'long',
               day: 'numeric',
          });
     };

     const formatTime = (dateStr: string) => {
          const date = new Date(dateStr);
          return date.toLocaleTimeString('es-ES', {
               hour: 'numeric',
               minute: '2-digit',
               hour12: true,
          });
     };

     const getStatusColor = (status: string) => {
          switch (status.toLowerCase()) {
               case 'confirmed':
               case 'confirmada':
                    return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
               case 'completed':
               case 'completada':
                    return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
               case 'canceled':
               case 'cancelada':
                    return 'bg-red-400/10 text-red-400 border-red-400/20';
               case 'pending':
               case 'pendiente':
                    return 'bg-amber-400/10 text-amber-400 border-amber-400/20';
               default:
                    return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
          }
     };

     return (
          <div
               onClick={onClose}
               className={` fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm ${
                    closing ? 'overlay-exit' : 'overlay-enter'
               }`}
          >
               <div
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full max-w-2xl rounded-xl bg-[#2D3748] border border-[#4A5568]/50 shadow-2xl m-4 max-h-[90dvh] overflow-auto hide-scrollbar ${
                         closing ? 'modal-exit' : 'modal-enter'
                    }`}
               >
                    <div className="flex items-center justify-between p-4 border-b border-[#4A5568]/50">
                         <h2 className="text-lg font-bold text-[#E2E8F0]">Detalles de la Cita</h2>
                         <button
                              onClick={onClose}
                              aria-label="Cerrar"
                              className="p-2 text-[#A0AEC0] hover:text-[#E2E8F0] rounded-full transition-colors"
                         >
                              <X className="w-5 h-5" />
                         </button>
                    </div>
                    <div className="p-6 space-y-6">
                         <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                   <div className="flex items-center justify-center bg-[#1A202C] rounded-full w-12 h-12">
                                        <Calendar className="text-[#E2E8F0] w-6 h-6" />
                                   </div>
                                   <div>
                                        <h3 className="text-xl font-bold text-[#E2E8F0]">
                                             Cita #{appointment?.id ?? '-'}
                                        </h3>
                                        <p className="text-sm text-[#A0AEC0]">
                                             {appointment ? formatDate(appointment.appointment_date) : '-'}
                                        </p>
                                   </div>
                              </div>
                              <span
                                   className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium border ${
                                        appointment
                                             ? getStatusColor(appointment.status.name)
                                             : 'bg-gray-400/10 text-gray-400'
                                   }`}
                              >
                                   {appointment?.status.name ?? 'Sin estado'}
                              </span>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#1A202C] rounded-lg border border-[#4A5568]/50">
                              <div className="flex items-center gap-3">
                                   <Calendar className="text-[#A0AEC0] w-5 h-5" />
                                   <div>
                                        <label className="text-xs font-medium text-[#A0AEC0]">Fecha</label>
                                        <p className="text-[#E2E8F0] font-medium">
                                             {appointment ? formatDate(appointment.appointment_date) : '-'}
                                        </p>
                                   </div>
                              </div>
                              <div className="flex items-center gap-3">
                                   <Clock className="text-[#A0AEC0] w-5 h-5" />
                                   <div>
                                        <label className="text-xs font-medium text-[#A0AEC0]">Hora</label>
                                        <p className="text-[#E2E8F0] font-medium">
                                             {appointment ? formatTime(appointment.appointment_date) : '-'}
                                        </p>
                                   </div>
                              </div>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                              <div>
                                   <label className="font-medium text-[#A0AEC0] flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Paciente
                                   </label>
                                   <p className="text-[#E2E8F0] mt-1 p-3 bg-[#1A202C] rounded-lg border border-[#4A5568]/50">
                                        {appointment?.patient
                                             ? `${appointment.patient.first_name} ${appointment.patient.last_name}`
                                             : 'Sin paciente asignado'}
                                   </p>
                              </div>
                              <div>
                                   <label className="font-medium text-[#A0AEC0] flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Psicólogo
                                   </label>
                                   <p className="text-[#E2E8F0] mt-1 p-3 bg-[#1A202C] rounded-lg border border-[#4A5568]/50">
                                        {appointment?.psychologist
                                             ? `${appointment.psychologist.first_name} ${appointment.psychologist.last_name}`
                                             : 'Sin psicólogo asignado'}
                                   </p>
                              </div>
                         </div>

                         <div>
                              <label className="font-medium text-[#A0AEC0]">Notas</label>
                              <p className="text-[#E2E8F0] text-sm mt-1 p-3 bg-[#1A202C] rounded-lg border border-[#4A5568]/50 min-h-20">
                                   {appointment?.notes ? appointment.notes : 'Sin notas adicionales.'}
                              </p>
                         </div>

                         <div className="flex items-center gap-3">
                              <button
                                   onClick={onClose}
                                   className="px-4 py-2 text-sm font-semibold text-[#E2E8F0] bg-[#2D3748] border border-[#4A5568] rounded-lg hover:bg-[#4A5568]/50 transition-colors"
                              >
                                   Cerrar
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default AppointmentDetailsModal;
