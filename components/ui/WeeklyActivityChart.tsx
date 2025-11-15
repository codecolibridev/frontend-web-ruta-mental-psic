'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
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
                    <ResponsiveContainer width="100%" height="100%">
                         {isWeek ? (
                              // Bar chart (this Week)
                              <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 10 }}>
                                   <CartesianGrid stroke="#4A5568" strokeOpacity={0.5} vertical={false} />
                                   <YAxis
                                        width={20}
                                        tick={{ fill: '#A0AEC0', fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                        ticks={[0, 2, 4, 6, 8, 10]}
                                   />
                                   <XAxis
                                        dataKey="day"
                                        dy={6}
                                        tick={{ fill: '#A0AEC0', fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                   />
                                   <Tooltip
                                        cursor={{ opacity: 0.1 }}
                                        contentStyle={{
                                             background: '#1A202C',
                                             border: '1px solid rgba(74,85,104,0.5)',
                                             borderRadius: '6px',
                                             color: '#E2E8F0',
                                        }}
                                   />
                                   <Bar
                                        dataKey="value"
                                        radius={7}
                                        fill="#63B3ED"
                                        fillOpacity={0.2}
                                        stroke="none"
                                        activeBar={{
                                             fill: '#63B3ED',
                                             radius: 4,
                                             stroke: 'none',
                                        }}
                                   />
                              </BarChart>
                         ) : (
                              // Area chart (last 30 days)
                              <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 10 }}>
                                   <CartesianGrid stroke="#4A5568" strokeOpacity={0.5} vertical={false} />
                                   <YAxis
                                        width={20}
                                        tick={{ fill: '#A0AEC0', fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                        ticks={[0, 2, 4, 6, 8, 10]}
                                   />
                                   <XAxis
                                        dataKey="day"
                                        dy={6}
                                        tick={{ fill: '#A0AEC0', fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                   />
                                   <Tooltip
                                        cursor={{ fill: '#63B3ED', opacity: 0.1 }}
                                        contentStyle={{
                                             background: '#1A202C',
                                             border: '1px solid rgba(74,85,104,0.5)',
                                             borderRadius: '6px',
                                             color: '#E2E8F0',
                                        }}
                                   />
                                   <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#63B3ED"
                                        strokeWidth={2}
                                        fill="#63B3ED"
                                        fillOpacity={0.2}
                                        dot={{ fill: '#63B3ED', r: 4 }}
                                        activeDot={{ r: 6 }}
                                   />
                              </AreaChart>
                         )}
                    </ResponsiveContainer>
               </div>
          </section>
     );
}
