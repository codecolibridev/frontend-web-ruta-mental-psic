'use client';

import { ChevronDown } from 'lucide-react';
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
               {label && <label className="mb-2 block text-sm font-medium text-slate-300">{label}</label>}

               <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex h-10 w-full items-center justify-between rounded-lg border border-(--select-border) bg-(--select-bg) px-3 py-2 text-(--select-text) transition-all hover:bg-(--select-hover) focus:outline-none focus:ring-2 focus:ring-(--select-focus-ring) focus:ring-offset-2 focus:ring-offset-background-dark"
               >
                    <span className={value ? '' : 'text-(--select-placeholder)'}>{selectedLabel}</span>
                    <ChevronDown
                         className="h-4 w-4 text-slate-400 transition-transform duration-200"
                         style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
               </button>

               {isOpen && (
                    <div
                         className="absolute z-50 mt-2 w-full rounded-lg border border-(--select-dropdown-border) bg-(--select-dropdown-bg) shadow-lg"
                         style={{ boxShadow: 'var(--select-dropdown-shadow)' }}
                    >
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
                                             className={`flex cursor-pointer select-none items-center justify-between px-3 py-2 transition-colors hover:bg-(--select-hover) ${
                                                  isSelected
                                                       ? 'bg-(--select-item-selected-bg) font-medium text-(--select-item-selected-text)'
                                                       : 'text-(--select-text)'
                                             }`}
                                        >
                                             <span>{option.label}</span>
                                             {isSelected && (
                                                  <span className="material-symbols-outlined text-sm">check</span>
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
