'use client';

import useUpcomingAppointments from '@/hooks/appointment/useUpcomingAppointments';
import { MoreVertical } from 'lucide-react';
import { useEffect } from 'react';

export default function UpcomingAppointments() {
     const { data, loading, error, fetchUpcomingAppointments } = useUpcomingAppointments();

     useEffect(() => {
          fetchUpcomingAppointments();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     if (loading) {
          return <div>Cargando próximas citas...</div>;
     }
     if (error) {
          return <div className="text-red-400">{error}</div>;
     }

     return (
          <section className="bg-[#192633] p-6 rounded-xl border border-[#4A5568]/50">
               <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[#E2E8F0] text-lg font-bold">Citas proximas</h2>
                    {/* <a className="text-sm font-medium text-[#63B3ED] hover:underline" href="#">
                         View Calendar
                    </a> */}
               </div>

               <div className="flex flex-col gap-4 max-h-96 overflow-auto">
                    {data.map((appt) => (
                         <div
                              key={appt.id}
                              className="mr-2 flex items-center gap-4 p-3 rounded-lg hover:bg-[#1A202C] transition-colors duration-200 cursor-pointer"
                         >
                              <div className="text-[#E2E8F0] font-semibold text-sm w-16">{appt.time}</div>
                              <div className="w-px h-10 bg-[#4A5568]"></div>
                              <div className="flex-1">
                                   <p className="text-[#E2E8F0] font-medium text-sm">{appt.name}</p>
                                   <p className="text-[#A0AEC0] text-xs">{appt.type}</p>
                              </div>
                              <MoreVertical className="text-[#A0AEC0] w-4 h-4" aria-hidden />
                         </div>
                    ))}
               </div>
          </section>
     );
}
