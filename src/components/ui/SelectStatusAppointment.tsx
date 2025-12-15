'use client';

import useStatusHook from '@/hooks/status/useStatusHook';
import { SelectPopover } from './SelectPopover';

interface SelectStatusAppointmentProps {
     label?: string;
     value: string;
     onChange: (value: string) => void;
     placeholder?: string;
}

export function SelectStatusAppointment({
     label,
     value,
     onChange,
     placeholder = 'Seleccionar estado...',
}: SelectStatusAppointmentProps) {
     const { data: statusOptions, loading, error } = useStatusHook();

     const options =
          statusOptions?.map((status) => ({
               value: status.id.toString(),
               label: status.name,
          })) || [];

     if (loading) {
          return (
               <div className="relative w-full max-w-xs">
                    {label && <label className="mb-2 block text-sm font-medium text-slate-300">{label}</label>}
                    <div className="flex h-10 w-full items-center justify-between rounded-lg border border-(--select-border) bg-(--select-bg) px-3 py-2 text-(--select-placeholder) transition-all">
                         Cargando estados...
                    </div>
               </div>
          );
     }

     if (error) {
          return (
               <div className="relative w-full max-w-xs">
                    {label && <label className="mb-2 block text-sm font-medium text-slate-300">{label}</label>}
                    <div className="flex h-10 w-full items-center justify-between rounded-lg border border-red-500 bg-red-100 px-3 py-2 text-red-700 transition-all">
                         Error al cargar estados
                    </div>
               </div>
          );
     }

     return (
          <SelectPopover label={label} options={options} value={value} onChange={onChange} placeholder={placeholder} />
     );
}
