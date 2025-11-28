'use client';

import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { SelectSearchable } from './SelectSearchable';

type Option = { value: string | number; label: string };

interface SelectSearchableFieldProps<TFieldValues extends FieldValues> {
     name: FieldPath<TFieldValues>;
     control: Control<TFieldValues>;
     label?: string;
     options: Option[];
     placeholder?: string;
     multi?: boolean;
     onSearchChange?: (search: string) => void;
     error?: string | false | null;
     isLoading?: boolean;
     className?: string;
}

export function SelectSearchableField<TFieldValues extends FieldValues>({
     name,
     control,
     label,
     options,
     placeholder,
     multi = false,
     onSearchChange,
     error,
     isLoading = false,
     className,
}: SelectSearchableFieldProps<TFieldValues>) {
     return (
          <div className="flex w-full flex-col text-md">
               <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                         <SelectSearchable
                              label={label}
                              options={options}
                              value={field.value || (multi ? [] : '')}
                              onChange={(val) => {
                                   // if is multiple options, array
                                   // if is single, string or number

                                   if (multi) {
                                        field.onChange(val);
                                   } else {
                                        field.onChange(
                                             typeof val === 'number' || typeof val === 'string' ? val : undefined
                                        );
                                   }
                              }}
                              placeholder={isLoading ? 'Cargando...' : placeholder}
                              multi={multi}
                              onSearchChange={onSearchChange}
                              className={className}
                         />
                    )}
               />
               {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
     );
}
