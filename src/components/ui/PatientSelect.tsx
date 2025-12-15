'use client';

import { SelectSearchable } from './SelectSearchable';
import usePatients from '@/hooks/patients/usePatients';
import { useState } from 'react';

type PatientSelectProps = {
     value: number | null | '' | undefined;
     onChange: (value: number | null) => void;
     placeholder?: string;
     className?: string;
     limit?: number;
};

export default function PatientSelect({
     value,
     onChange,
     placeholder = 'Buscar por Paciente',
     className,
     limit = 50,
}: PatientSelectProps) {
     const [search, setSearch] = useState('');

     const { data, isLoading } = usePatients({
          limit,
          page: 1,
          search,
     });

     const options = (data ?? []).map((p) => ({ value: p.id, label: `${p.first_name} ${p.last_name}` }));

     const handleChange = (val: string | number | string[] | number[]) => {
          if (val === '' || val === null) {
               onChange(null);
               return;
          }

          if (Array.isArray(val)) {
               // not supporting multi-selection for patients; take first
               const first = val[0];
               onChange(first === '' || first === null ? null : Number(first));
               return;
          }

          onChange(val === '' || val === null ? null : Number(val));
     };

     return (
          <SelectSearchable
               options={options}
               value={value ?? ''}
               onChange={handleChange}
               placeholder={isLoading ? 'Cargando...' : placeholder}
               onSearchChange={setSearch}
               className={className}
          />
     );
}
