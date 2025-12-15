'use client';

import StatusTag from '../ui/StatusTag';
import { Appointment } from '@/types/appointmentTypes';
import { Calendar, Clock, User } from 'lucide-react';
import React from 'react';
import Modal from './Modal';

interface AppointmentDetailsModalProps {
     isOpen: boolean;
     onClose: () => void;
     appointment?: Appointment | null;
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({ isOpen, onClose, appointment = null }) => {
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

     return (
          <Modal isOpen={isOpen} onClose={onClose} title="Detalles de la Cita" maxWidth="2xl">
               <div className="space-y-6">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center bg-[#1A202C] rounded-full w-12 h-12">
                                   <Calendar className="text-[#E2E8F0] w-6 h-6" />
                              </div>
                              <div>
                                   <h3 className="text-xl font-bold text-[#E2E8F0]">Cita #{appointment?.id ?? '-'}</h3>
                                   <p className="text-sm text-[#A0AEC0]">
                                        {appointment ? formatDate(appointment.appointment_date) : '-'}
                                   </p>
                              </div>
                         </div>
                         <StatusTag status={appointment?.status.name ?? 'Sin estado'} />
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
          </Modal>
     );
};

export default AppointmentDetailsModal;
