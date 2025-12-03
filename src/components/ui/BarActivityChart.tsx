'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type ChartPoint = { label: string; count: number };

export default function BarActivityChart({ data }: { data: ChartPoint[] }) {
     return (
          <ResponsiveContainer width="100%" height={320}>
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
                         dataKey="label"
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
                         dataKey="count"
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
          </ResponsiveContainer>
     );
}
