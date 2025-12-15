'use client';

import { Pencil, Eye, Trash2 } from 'lucide-react';
import Pagination from '../ui/Pagination';
import PatientsFilters from '../ui/PatientsFilters';
import usePatients from '@/hooks/patients/usePatients';
import { useState } from 'react';
import PatientDetailsModal from '../modals/PatientDetailsModal';
import { Patient } from '@/types/patients';
import { UpdatePatientComponent, DeletePatientComponent } from '@/components/index';

export default function PatientsTable() {
     const [page, setPage] = useState(1);
     const [showModal, setShowModal] = useState(false);
     const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
     const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
     const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null);

     const [searchInput, setSearchInput] = useState('');
     const [search, setSearch] = useState('');
     const [psychologistId, setPsychologistId] = useState<number | null>(null);

     const {
          data: patients,
          meta,
          isLoading,
          error,
          refetch,
     } = usePatients({
          limit: 10,
          page,
          search,
          psychologist_id: psychologistId ?? undefined,
     });

     // if (isLoading) {
     //      return <div className="text-white">Loading patients...</div>;
     // }
     if (error) {
          return <div className="text-red-800 p-4 bg-red-400">Error loading patients: {error}</div>;
     }

     // Psychologist selection is handled inside `PatientsFilters` via `PsychologistSelect`

     return (
          <div className="py-3 flex flex-col gap-5">
               <PatientsFilters
                    onSearch={() => {
                         setPage(1);
                         setSearch(searchInput);
                    }}
                    onReload={() => {
                         setSearchInput('');
                         setSearch('');
                         setPsychologistId(null);
                         setPage(1);
                         refetch();
                    }}
                    search={searchInput}
                    setSearch={setSearchInput}
                    psychologist_id={psychologistId}
                    setPsychologistId={(id) => {
                         setPsychologistId(id);
                         setPage(1);
                    }}
                    loading={isLoading}
               />

               <div className="overflow-x-auto rounded-lg border border-[#324d67] bg-[#111a22]">
                    <table className="w-full min-w-[800px] table-fixed">
                         <thead>
                              <tr className="bg-[#192633]">
                                   <th className="w-1/4 px-4 py-3 text-left text-sm font-medium text-white">
                                        Patient Name
                                   </th>
                                   <th className="w-28 px-4 py-3 text-left text-sm font-medium text-white hidden sm:table-cell">
                                        Cedula
                                   </th>
                                   <th className="px-4 py-3 text-left text-sm font-medium text-white hidden lg:table-cell">
                                        Therapist
                                   </th>
                                   <th className="px-4 py-3 text-left text-sm font-medium text-white hidden md:table-cell">
                                        Email
                                   </th>
                                   <th className="px-4 py-3 text-left text-sm font-medium text-white hidden xl:table-cell">
                                        Diagnosis
                                   </th>
                                   <th className="w-32 px-4 py-3 text-center text-sm font-medium text-white">
                                        Actions
                                   </th>
                              </tr>
                         </thead>
                         <tbody>
                              {patients.map((patient) => (
                                   <tr
                                        key={patient.id}
                                        className="border-t border-[#324d67] hover:bg-[#192633] transition-colors cursor-pointer"
                                        onClick={() => {
                                             setSelectedPatient(patient);
                                             setShowModal(true);
                                        }}
                                   >
                                        <td className="h-12 2xl:h-14 px-4 py-2 text-white font-medium">
                                             {patient.first_name + ' ' + patient.last_name}
                                        </td>

                                        <td className="h-12 2xl:h-14 px-4 py-2 text-[#92adc9] text-sm hidden sm:table-cell">
                                             {patient.id_number}
                                        </td>

                                        <td className="h-12 2xl:h-14 px-4 py-2 text-[#92adc9] text-sm hidden lg:table-cell">
                                             {patient.psychologist
                                                  ? patient.psychologist.first_name +
                                                    ' ' +
                                                    patient.psychologist.last_name
                                                  : ''}
                                        </td>

                                        <td className="h-12 2xl:h-14 px-4 py-2 text-[#92adc9] text-sm hidden md:table-cell">
                                             <div className="truncate" title={patient.email ?? ''}>
                                                  {patient.email}
                                             </div>
                                        </td>

                                        <td className="h-12 2xl:h-14 px-4 py-2 text-[#92adc9] text-sm hidden xl:table-cell">
                                             <div className="truncate" title={patient.diagnosis ?? ''}>
                                                  {patient.diagnosis}
                                             </div>
                                        </td>

                                        <td className="h-12 2xl:h-14 px-2 py-2">
                                             <div className="flex items-center justify-center gap-1">
                                                  <button
                                                       className="text-[#92adc9] hover:text-blue-300 transition-all duration-200 p-1.5 rounded hover:bg-primary/20 hover:scale-110 cursor-pointer"
                                                       onClick={(e) => {
                                                            setShowModal(true);
                                                            e.stopPropagation();
                                                       }}
                                                       title="Ver detalles"
                                                  >
                                                       <Eye className="w-4 h-4" />
                                                  </button>

                                                  <button
                                                       className="text-[#92adc9] hover:text-blue-300 transition-all duration-200 p-1.5 rounded hover:bg-primary/20 hover:scale-110 cursor-pointer"
                                                       onClick={(e) => {
                                                            e.stopPropagation();
                                                            setEditingPatient(patient);
                                                       }}
                                                       title="Editar paciente"
                                                  >
                                                       <Pencil className="w-4 h-4" />
                                                  </button>

                                                  <button
                                                       className="text-[#92adc9] hover:text-red-400 transition-all duration-200 p-1.5 rounded hover:bg-red-200/20 hover:scale-110 cursor-pointer"
                                                       onClick={(e) => {
                                                            setDeletingPatient(patient);
                                                            e.stopPropagation();
                                                            // Acción de eliminar
                                                       }}
                                                       title="Eliminar paciente"
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

               <UpdatePatientComponent
                    isOpen={editingPatient !== null}
                    onClose={() => setEditingPatient(null)}
                    patient={editingPatient}
                    onSuccess={() => refetch()}
               />

               <PatientDetailsModal isOpen={showModal} patient={selectedPatient} onClose={() => setShowModal(false)} />

               <DeletePatientComponent
                    isOpen={deletingPatient !== null}
                    onClose={() => setDeletingPatient(null)}
                    patient={deletingPatient}
                    onSuccess={() => refetch()}
               />

               <Pagination meta={meta} page={page} setPage={setPage} limit={10} />
          </div>
     );
}
