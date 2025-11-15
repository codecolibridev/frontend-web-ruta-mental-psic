import { ArrowUp, ArrowDown } from 'lucide-react';
import stats from '../../data/dashboard-stats.json';

export default function CardsGroup() {
     const { today, week, month, patientsThisMonth, comparison } = stats as unknown as {
          today: number;
          week: number;
          month: number;
          patientsThisMonth: number;
          comparison: { dayDiff: number; weekDiff: number; monthDiff: number; patientsMonthDiff: number };
     };

     const renderDiff = (diff: number, label: string) => {
          const positive = diff > 0;
          const Icon = positive ? ArrowUp : ArrowDown;
          const colorClass = positive ? 'text-[#4FD1C5]' : 'text-[#F56565]';
          return (
               <p className={`${colorClass} text-xs font-medium flex items-center gap-1`}>
                    <Icon className="w-3 h-3" aria-hidden />
                    <span>{`${positive ? '+' : ''}${diff} ${label}`}</span>
               </p>
          );
     };

     return (
          <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
               <div className="flex flex-col gap-1 rounded-xl p-4 bg-[#2D3748] border border-[#4A5568]/50 hover:border-[#4A5568] transition-all duration-200">
                    <p className="text-[#A0AEC0] text-xs font-medium">Citas de hoy</p>
                    <p className="text-[#E2E8F0] tracking-tight text-3xl font-bold">{today}</p>
                    {renderDiff(comparison.dayDiff, 'respecto a ayer')}
               </div>

               <div className="flex flex-col gap-1 rounded-xl p-4 bg-[#2D3748] border border-[#4A5568]/50 hover:border-[#4A5568] transition-all duration-200">
                    <p className="text-[#A0AEC0] text-xs font-medium">Citas de esta semana</p>
                    <p className="text-[#E2E8F0] tracking-tight text-3xl font-bold">{week}</p>
                    {renderDiff(comparison.weekDiff, 'respecto a la semana pasada')}
               </div>

               <div className="flex flex-col gap-1 rounded-xl p-4 bg-[#2D3748] border border-[#4A5568]/50 hover:border-[#4A5568] transition-all duration-200">
                    <p className="text-[#A0AEC0] text-xs font-medium">Citas de este mes</p>
                    <p className="text-[#E2E8F0] tracking-tight text-3xl font-bold">{month}</p>
                    {renderDiff(comparison.monthDiff, 'respecto al mes pasado')}
               </div>

               <div className="flex flex-col gap-1 rounded-xl p-4 bg-[#2D3748] border border-[#4A5568]/50 hover:border-[#4A5568] transition-all duration-200">
                    <p className="text-[#A0AEC0] text-xs font-medium">Pacientes atendidos este mes</p>
                    <p className="text-[#E2E8F0] tracking-tight text-3xl font-bold">{patientsThisMonth}</p>
                    {renderDiff(comparison.patientsMonthDiff, 'respecto al mes pasado')}
               </div>
          </section>
     );
}
