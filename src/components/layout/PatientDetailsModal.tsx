'use client';

import { Patient } from '@/types/patients';
import { formatDateAndAge } from '@/utils/date-utils';
import { User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface PatientDetailsModalProps {
     isOpen: boolean;
     onClose: () => void;
     patient?: Patient | null;
}

const PatientDetailsModal: React.FC<PatientDetailsModalProps> = ({ isOpen, onClose, patient = null }) => {
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
                         <h2 className="text-lg font-bold text-[#E2E8F0]">Ver Detalles del Paciente</h2>
                         <button
                              onClick={onClose}
                              aria-label="Cerrar"
                              className="p-2 text-[#A0AEC0] hover:text-[#E2E8F0] rounded-full transition-colors"
                         >
                              <X className="w-5 h-5" />
                         </button>
                    </div>
                    <div className="p-6 space-y-6">
                         <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center bg-[#1A202C] rounded-full w-16 h-16">
                                   <User className="text-[#E2E8F0] w-8 h-8" />
                              </div>
                              <div>
                                   <h3 className="text-xl font-bold text-[#E2E8F0]">
                                        {patient ? `${patient.last_name} ${patient.first_name}` : 'Nombre del Paciente'}
                                   </h3>
                                   <p className="text-sm text-[#A0AEC0]">ID Paciente: {patient?.id_number ?? '-'}</p>
                              </div>
                         </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                              <div>
                                   <label className="font-medium text-[#A0AEC0]">Email</label>
                                   <p className="text-[#E2E8F0]">{patient?.email ?? '-'}</p>
                              </div>
                              <div>
                                   <label className="font-medium text-[#A0AEC0]">Psicólogo asignado</label>
                                   <p className="text-[#E2E8F0]">
                                        {patient?.psychologist
                                             ? patient.psychologist.first_name + ' ' + patient.psychologist.last_name
                                             : 'Sin psicólogo asignado'}
                                   </p>
                              </div>
                              <div>
                                   <label className="font-medium text-[#A0AEC0]">Fecha de Nacimiento</label>
                                   <p className="text-[#E2E8F0]">{formatDateAndAge(patient?.birth_date ?? null)}</p>
                              </div>
                              <div>
                                   <label className="font-medium text-[#A0AEC0]">Diagnóstico</label>
                                   <p className="text-[#E2E8F0]">{patient?.diagnosis ?? 'Sin diagnóstico'}</p>
                              </div>
                         </div>
                         <div>
                              <label className="font-medium text-[#A0AEC0]">Notas</label>
                              <p className="text-[#E2E8F0] text-sm mt-1 p-3 bg-[#1A202C] rounded-lg border border-[#4A5568]/50">
                                   {patient?.notes ? patient.notes : 'Sin notas.'}
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

export default PatientDetailsModal;
