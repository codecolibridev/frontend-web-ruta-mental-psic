'use client';

import { Check, ChevronDown, Search } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

type Option = { value: string | number; label: string };

interface SelectSearchableProps {
     label?: string;
     options: Option[];
     value: string | number | string[] | number[]; // supports single or multi
     onChange: (value: string | number | string[] | number[]) => void;
     placeholder?: string;
     multi?: boolean;
     onSearchChange?: (search: string) => void; // callback for dynamic search in backend
     className?: string;
}

export function SelectSearchable({
     label,
     options: allOptions,
     value,
     onChange,
     placeholder = 'Seleccionar...',
     multi = false,
     onSearchChange,
     className,
}: SelectSearchableProps) {
     const [isOpen, setIsOpen] = useState(false);
     const [search, setSearch] = useState('');
     const containerRef = useRef<HTMLDivElement>(null);

     // Cerrar dropdown al hacer clic fuera
     useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
               if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
               }
          };

          if (isOpen) {
               document.addEventListener('mousedown', handleClickOutside);
          }

          return () => {
               document.removeEventListener('mousedown', handleClickOutside);
          };
     }, [isOpen]);

     const selectedValues: (string | number)[] = multi
          ? Array.isArray(value)
               ? value
               : []
          : typeof value === 'string' || typeof value === 'number'
          ? [value]
          : [];

     const selectedLabels =
          selectedValues
               .map((v) => allOptions.find((o) => o.value === v)?.label)
               .filter((l): l is string => !!l)
               .join(', ') || placeholder;

     const filteredOptions = onSearchChange
          ? allOptions
          : allOptions.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()));

     const toggleOption = (val: string | number) => {
          if (multi) {
               const newValues = selectedValues.includes(val)
                    ? selectedValues.filter((v) => v !== val)
                    : [...selectedValues, val];
               onChange(newValues as string[] | number[]);
          } else {
               onChange(val);
               setIsOpen(false);
               setSearch('');
          }
     };

     return (
          <div ref={containerRef} className={className ?? 'relative w-full max-w-xs'}>
               {label && (
                    <label className="pb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
               )}

               <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex h-12 w-full items-center justify-between rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
               >
                    <span
                         className={
                              selectedValues.length
                                   ? 'text-slate-900 dark:text-white'
                                   : 'text-slate-400 dark:text-slate-500'
                         }
                    >
                         {selectedLabels}
                    </span>
                    <ChevronDown
                         className="h-4 w-4 text-slate-400 transition-transform duration-200"
                         style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
               </button>

               {isOpen && (
                    <div className="absolute z-50 mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 shadow-lg">
                         {/* Buscador */}
                         <div className="p-2 border-b border-slate-700">
                              <div className="relative">
                                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                   <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => {
                                             const newSearch = e.target.value;
                                             setSearch(newSearch);
                                             onSearchChange?.(newSearch); // notify parent for backend search
                                        }}
                                        placeholder="Buscar..."
                                        aria-label="Buscar opciones"
                                        className="h-9 w-full rounded-md border border-slate-700 bg-slate-900 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        autoFocus
                                   />
                              </div>
                         </div>

                         <ul
                              role="listbox"
                              aria-multiselectable={multi}
                              className="max-h-60 overflow-auto py-1 text-sm"
                         >
                              {filteredOptions.length === 0 ? (
                                   <li className="px-3 py-2 text-slate-500">No se encontraron resultados</li>
                              ) : (
                                   filteredOptions.map((option) => {
                                        const isSelected = selectedValues.includes(option.value);
                                        return (
                                             <li
                                                  key={option.value}
                                                  role="option"
                                                  aria-selected={isSelected}
                                                  tabIndex={0}
                                                  onClick={() => toggleOption(option.value)}
                                                  onKeyDown={(e: KeyboardEvent<HTMLLIElement>) => {
                                                       if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            toggleOption(option.value);
                                                       }
                                                  }}
                                                  className={`flex cursor-pointer select-none items-center justify-between px-3 py-2 transition-colors hover:bg-slate-700/50 ${
                                                       isSelected
                                                            ? 'bg-primary/20 font-medium text-primary'
                                                            : 'text-slate-200'
                                                  }`}
                                             >
                                                  <span>{option.label}</span>
                                                  {isSelected && <Check className="h-4 w-4" />}
                                             </li>
                                        );
                                   })
                              )}
                         </ul>
                    </div>
               )}
          </div>
     );
}
