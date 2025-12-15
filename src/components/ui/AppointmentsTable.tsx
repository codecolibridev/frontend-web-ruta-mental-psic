'use client';

import { getAppointments } from '@/services/appointmentService';
import { Appointment } from '@/types/appointmentTypes';
import { PaginatedResponse } from '@/types/responseTypes';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import AppointmentDetailsModal from '../layout/AppointmentDetailsModal';
import DeleteAppointmentComponent from './DeleteAppointmentComponent';
import Pagination from './Pagination';
import StatusTag from './StatusTag';
import UpdateAppointmentModal from './UpdateAppointmentModal';

type UIAppointment = {
     id: number;
     name: string;
     avatar?: string;
     date: string;
     time: string;
     status: string;
     notes: string;
};

const mapAppointmentToUI = (appointment: Appointment): UIAppointment => {
     const appointmentDate = new Date(appointment.appointment_date);
     const dateStr = appointmentDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' });
     const timeStr = appointmentDate.toLocaleTimeString('es-ES', { hour: 'numeric', minute: '2-digit', hour12: true });

     return {
          id: appointment.id,
          name: `${appointment.patient.first_name} ${appointment.patient.last_name}`,
          date: dateStr,
          time: timeStr,
          status: appointment.status.name,
          notes: appointment.notes ?? '',
     };
};

export default function AppointmentsTable() {
     const [page, setPage] = useState(1);
     const [appointments, setAppointments] = useState<UIAppointment[]>([]);
     const [fullAppointments, setFullAppointments] = useState<Appointment[]>([]);
     const [meta, setMeta] = useState<PaginatedResponse<Appointment>['meta'] | null>(null);
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);
     const [showModal, setShowModal] = useState(false);
     const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
     const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
     const [deletingAppointment, setDeletingAppointment] = useState<Appointment | null>(null);

     const limit = 10;

     const fetchAppointments = useCallback(
          async (p: number) => {
               try {
                    setIsLoading(true);
                    setError(null);
                    const data = await getAppointments({ page: p, limit });
                    setFullAppointments(data.data);
                    const mappedAppointments = data.data.map(mapAppointmentToUI);
                    setAppointments(mappedAppointments);
                    setMeta(data.meta);
               } catch (err: unknown) {
                    setError(err instanceof Error ? err.message : 'Error fetching appointments');
               } finally {
                    setIsLoading(false);
               }
          },
          [limit]
     );

     useEffect(() => {
          fetchAppointments(page);
     }, [page, fetchAppointments]);

     // if (isLoading) {
     //      return <div className="text-white p-4">Loading appointments...</div>;
     // }

     if (error) {
          return <div className="text-red-800 p-4 bg-red-400">Error loading appointments: {error}</div>;
     }

     return (
          <div className="mt-8 flex flex-col gap-5">
               <div className="overflow-x-auto rounded-lg border border-[#324d67] bg-[#111a22]">
                    <table className="w-full text-left text-sm text-gray-300">
                         <thead className="bg-[#192633] text-xs uppercase text-white">
                              <tr>
                                   <th className="px-6 py-4 font-medium">Paciente</th>
                                   <th className="px-6 py-4 font-medium">Fecha</th>
                                   <th className="px-6 py-4 font-medium">Hora</th>
                                   <th className="px-6 py-4 font-medium">Notas</th>
                                   <th className="px-6 py-4 font-medium">Estado</th>
                                   <th className="px-6 py-4 font-medium text-center">Acciones</th>
                              </tr>
                         </thead>
                         <tbody>
                              {appointments.map((appointment, index) => (
                                   <tr
                                        key={appointment.id}
                                        className="border-t border-[#324d67] hover:bg-[#192633] transition-colors cursor-pointer"
                                        onClick={() => {
                                             setSelectedAppointment(fullAppointments[index]);
                                             setShowModal(true);
                                        }}
                                   >
                                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                             <div className="flex items-center gap-3">
                                                  {/* {appointment.avatar ? (
                                                       <Image
                                                            src={appointment.avatar}
                                                            alt={appointment.name}
                                                            width={32}
                                                            height={32}
                                                            className="size-8 object-cover rounded-full"
                                                            unoptimized
                                                       />
                                                  ) : (
                                                       <div className="flex size-8 items-center justify-center rounded-full bg-gray-600">
                                                            <User className="w-5 h-5 text-gray-300" />
                                                       </div>
                                                  )} */}
                                                  {appointment.name}
                                             </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">{appointment.date}</td>

                                        <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                                        <td className="px-6 py-4">
                                             <p className="line-clamp-1">{appointment.notes}</p>
                                        </td>

                                        <td className="px-6 py-4">
                                             <StatusTag
                                                  status={appointment.status}
                                                  className="px-2.5! py-1! text-xs!"
                                             />
                                        </td>

                                        <td className="h-12 px-2 py-2">
                                             <div className="flex items-center justify-center gap-1">
                                                  <button
                                                       className="text-[#92adc9] hover:text-blue-300 transition-all duration-200 p-1.5 rounded hover:bg-primary/20 hover:scale-110 cursor-pointer"
                                                       title="Ver detalles"
                                                       onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedAppointment(fullAppointments[index]);
                                                            setShowModal(true);
                                                       }}
                                                  >
                                                       <Eye className="w-4 h-4" />
                                                  </button>

                                                  <button
                                                       className="text-[#92adc9] hover:text-blue-300 transition-all duration-200 p-1.5 rounded hover:bg-primary/20 hover:scale-110 cursor-pointer"
                                                       title="Editar cita"
                                                       onClick={(e) => {
                                                            e.stopPropagation();
                                                            setEditingAppointment(fullAppointments[index]);
                                                       }}
                                                  >
                                                       <Pencil className="w-4 h-4" />
                                                  </button>

                                                  <button
                                                       className="text-[#92adc9] hover:text-red-400 transition-all duration-200 p-1.5 rounded hover:bg-red-200/20 hover:scale-110 cursor-pointer"
                                                       title="Eliminar cita"
                                                       onClick={(e) => {
                                                            e.stopPropagation();
                                                            setDeletingAppointment(fullAppointments[index]);
                                                       }}
                                                  >
                                                       <Trash2 className="w-4 h-4" />
                                                  </button>
                                             </div>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>

               <AppointmentDetailsModal
                    isOpen={showModal}
                    appointment={selectedAppointment}
                    onClose={() => setShowModal(false)}
               />

               <UpdateAppointmentModal
                    appointment={editingAppointment}
                    isOpen={editingAppointment !== null}
                    onClose={() => setEditingAppointment(null)}
                    onSuccess={() => fetchAppointments(page)}
               />

               <DeleteAppointmentComponent
                    isOpen={deletingAppointment !== null}
                    appointment={deletingAppointment}
                    onClose={() => setDeletingAppointment(null)}
                    onSuccess={() => fetchAppointments(page)}
               />

               <Pagination meta={meta} page={page} setPage={setPage} limit={limit} />
          </div>
     );
}
