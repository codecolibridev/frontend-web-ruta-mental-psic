'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type ChartPoint = { day: number; count: number };

export default function AreaActivityChart({ data }: { data: ChartPoint[] }) {
     return (
          <ResponsiveContainer width="100%" height={320}>
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
                         dataKey="count"
                         stroke="#63B3ED"
                         strokeWidth={2}
                         fill="#63B3ED"
                         fillOpacity={0.2}
                         dot={{ fill: '#63B3ED', r: 4 }}
                         activeDot={{ r: 6 }}
                    />
               </AreaChart>
          </ResponsiveContainer>
     );
}
