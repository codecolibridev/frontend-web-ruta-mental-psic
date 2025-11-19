import { MoreHorizontal } from 'lucide-react';
import Pagination from './Pagination';
import PatientsFilters from './PatientsFilters';
import patientsJson from '@/data/patients.json';
import { RawPatient, UiPatient } from '@/types/patients';

const patients: UiPatient[] = (patientsJson as { data: RawPatient[] }).data.map((p) => ({
     id: p.id,
     name: `${p.first_name} ${p.last_name}`,
     id_number: p.id_number,
     therapist: 'Dr. Anya Sharma',
     email: p.email ?? '',
     diagnosis: p.diagnosis ?? '',
}));

export default function PatientsTable() {
     return (
          <div className="py-3 flex flex-col gap-5">
               <PatientsFilters />

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
                                        {/* Nombre del paciente - siempre visible */}
                                        <td className="h-12 px-4 py-2 text-white font-medium">{patient.name}</td>

                                        {/* ID - oculto en pantallas muy pequeñas, aparece en sm+ */}
                                        <td className="h-12 px-4 py-2 text-[#92adc9] text-sm hidden sm:table-cell">
                                             {patient.id_number}
                                        </td>

                                        {/* Therapist - solo en lg+ (estático por ahora) */}
                                        <td className="h-12 px-4 py-2 text-[#92adc9] text-sm hidden lg:table-cell">
                                             {patient.therapist}
                                        </td>

                                        {/* Email - visible en md+ */}
                                        <td className="h-12 px-4 py-2 text-[#92adc9] text-sm hidden md:table-cell">
                                             <div className="truncate" title={patient.email ?? ''}>
                                                  {patient.email}
                                             </div>
                                        </td>

                                        {/* Diagnosis - visible en xl+ y oculta antes (primero en desaparecer) */}
                                        <td className="h-12 px-4 py-2 text-[#92adc9] text-sm hidden xl:table-cell">
                                             <div className="truncate" title={patient.diagnosis ?? ''}>
                                                  {patient.diagnosis}
                                             </div>
                                        </td>

                                        {/* Acciones - siempre visible */}
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

               {/* Paginación (componente separado) */}
               <Pagination />
          </div>
     );
}
