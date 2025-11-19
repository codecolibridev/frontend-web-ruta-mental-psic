'use client';

import { useState } from 'react';
import { BarActivityChart, AreaActivityChart } from '@/components/index';
import activityData from '@/data/activity-data.json';
import type { ActivityData } from '../../types/activity';

const activity = activityData as unknown as ActivityData;
const weeklyData = activity.last7days.map((d) => ({ day: d.label, value: d.count }));
const monthlyData = activity.last30days.map((d) => ({ day: d.label, value: d.count }));

export default function ActivityChart() {
     const [view, setView] = useState<'week' | 'month'>('week');

     const isWeek = view === 'week';
     const data = isWeek ? weeklyData : monthlyData;

     return (
          <section className="min-h-[400px] md:min-h-auto bg-[#2D3748] flex flex-col flex-1 justify-between p-6 rounded-xl border border-[#4A5568]/50 gap-4">
               <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[#E2E8F0] text-lg font-bold">
                         {isWeek ? 'Actividad Semanal' : 'Actividad Mensual'}
                    </h2>

                    <div className="relative inline-flex items-center gap-2 rounded-lg bg-[#1A202C] p-1 border border-[#4A5568]/50">
                         <div
                              aria-hidden
                              className="absolute rounded-lg bg-primary/70 transition-all duration-200 z-0 pointer-events-none"
                              style={{
                                   left: '4px',
                                   top: '4px',
                                   bottom: '4px',
                                   width: 'calc(50% - 5px)',
                                   transform: isWeek ? 'translateX(0%)' : 'translateX(100%)',
                              }}
                         />

                         <button
                              onClick={() => setView('week')}
                              className={`hover:cursor-pointer relative z-10 px-3 py-1.5 text-xs font-semibold rounded transition duration-200 focus:outline-none ${
                                   isWeek ? 'text-white' : 'text-[#A0AEC0] hover:text-white'
                              }`}
                              aria-pressed={isWeek}
                              aria-label="This Week"
                         >
                              Esta Semana
                         </button>
                         <button
                              onClick={() => setView('month')}
                              className={`hover:cursor-pointer text-center relative z-10 px-3 py-1 text-xs font-semibold rounded transition duration-200 focus:outline-none ${
                                   !isWeek ? 'text-white' : 'text-[#A0AEC0] hover:text-white'
                              }`}
                              aria-pressed={!isWeek}
                              aria-label="Last 30 Days"
                         >
                              Últimos 30 días
                         </button>
                    </div>
               </div>

               {/* CHART */}
               <div className="h-80 flex-1 **:outline-none **:focus:outline-none">
                    {isWeek ? <BarActivityChart data={data} /> : <AreaActivityChart data={data} />}
               </div>
          </section>
     );
}
