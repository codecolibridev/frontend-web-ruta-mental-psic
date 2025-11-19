'use client';

import { MoreHorizontal } from 'lucide-react';
import Pagination from './Pagination';
import PatientsFilters from './PatientsFilters';
import usePatients from '@/hooks/usePatients';
import { useState } from 'react';

export default function PatientsTable() {
     const [page, setPage] = useState(1);
     const { data: patients, meta, isLoading, error, refetch } = usePatients({ limit: 10, page });

     if (isLoading) {
          return <div className="text-white">Loading patients...</div>;
     }
     if (error) {
          return <div className="text-red-800 p-4 bg-red-400">Error loading patients: {error}</div>;
     }

     return (
          <div className="py-3 flex flex-col gap-5">
               <PatientsFilters onReload={refetch} />

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
                                   <th className="w-20 px-4 py-3 text-center text-sm font-medium text-white">
                                        Actions
                                   </th>
                              </tr>
                         </thead>
                         <tbody>
                              {patients.map((patient) => (
                                   <tr
                                        key={patient.id}
                                        className="border-t border-[#324d67] hover:bg-[#192633] transition-colors"
                                   >
                                        <td className="h-12 px-4 py-2 text-white font-medium">
                                             {patient.first_name + ' ' + patient.last_name}
                                        </td>

                                        <td className="h-12 px-4 py-2 text-[#92adc9] text-sm hidden sm:table-cell">
                                             {patient.id_number}
                                        </td>

                                        <td className="h-12 px-4 py-2 text-[#92adc9] text-sm hidden lg:table-cell">
                                             {patient.psychologist_id}
                                        </td>

                                        <td className="h-12 px-4 py-2 text-[#92adc9] text-sm hidden md:table-cell">
                                             <div className="truncate" title={patient.email ?? ''}>
                                                  {patient.email}
                                             </div>
                                        </td>

                                        <td className="h-12 px-4 py-2 text-[#92adc9] text-sm hidden xl:table-cell">
                                             <div className="truncate" title={patient.diagnosis ?? ''}>
                                                  {patient.diagnosis}
                                             </div>
                                        </td>

                                        <td className="h-12 px-4 py-2 text-center">
                                             <button className="text-white hover:text-cyan-400 transition-colors">
                                                  <MoreHorizontal className="w-5 h-5 text-white" />
                                             </button>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>

               <Pagination meta={meta} page={page} setPage={setPage} limit={10} />
          </div>
     );
}
