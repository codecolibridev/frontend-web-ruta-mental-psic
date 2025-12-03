import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatCardProps {
     title: string;
     value: number;
     diff: number;
     diffLabel: string;
}

export default function StatCard({ title, value, diff, diffLabel }: StatCardProps) {
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
          <div className="flex flex-col gap-1 rounded-xl p-4 bg-[#2D3748] border border-[#4A5568]/50 hover:border-[#4A5568] transition-all duration-200">
               <p className="text-[#A0AEC0] text-xs font-medium">{title}</p>
               <p className="text-[#E2E8F0] tracking-tight text-3xl font-bold">{value}</p>
               {renderDiff(diff, diffLabel)}
          </div>
     );
}
