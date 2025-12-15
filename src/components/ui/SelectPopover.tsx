'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';
type Option = { value: string; label: string };

interface SelectPopoverProps {
     label?: string;
     options: Option[];
     value: string;
     onChange: (value: string) => void;
     placeholder?: string;
}

export function SelectPopover({ label, options, value, onChange, placeholder = 'Seleccionar...' }: SelectPopoverProps) {
     const [isOpen, setIsOpen] = useState(false);
     const selectedLabel = options.find((o) => o.value === value)?.label || placeholder;

     return (
          <div className="relative w-full max-w-xs">
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
                    <span className={value ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}>
                         {selectedLabel}
                    </span>
                    <ChevronDown
                         className="h-4 w-4 text-slate-400 transition-transform duration-200"
                         style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
               </button>

               {isOpen && (
                    <div className="absolute z-50 mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 shadow-lg">
                         <ul
                              role="listbox"
                              aria-multiselectable={false}
                              className="max-h-60 overflow-auto py-1 text-sm"
                         >
                              {options.map((option) => {
                                   const isSelected = option.value === value;
                                   return (
                                        <li
                                             key={option.value}
                                             role="option"
                                             aria-selected={isSelected}
                                             tabIndex={0}
                                             onClick={() => {
                                                  onChange(option.value);
                                                  setIsOpen(false);
                                             }}
                                             onKeyDown={(e: KeyboardEvent<HTMLLIElement>) => {
                                                  if (e.key === 'Enter' || e.key === ' ') {
                                                       e.preventDefault();
                                                       onChange(option.value);
                                                       setIsOpen(false);
                                                  }
                                             }}
                                             className={`flex cursor-pointer select-none items-center justify-between px-3 py-2 transition-colors hover:bg-slate-700/50 ${
                                                  isSelected
                                                       ? 'bg-primary/20 font-medium text-primary'
                                                       : 'text-slate-200'
                                             }`}
                                        >
                                             <span>{option.label}</span>
                                             {isSelected && (
                                                  <span className="material-symbols-outlined text-sm">
                                                       <Check className="h-4 w-4 text-primary" />
                                                  </span>
                                             )}
                                        </li>
                                   );
                              })}
                         </ul>
                    </div>
               )}
          </div>
     );
}
