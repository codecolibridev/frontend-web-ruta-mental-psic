'use client';

import React, { ForwardedRef, forwardRef, InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
     id?: string;
     name?: string;
     label?: string;
     placeholder?: string;
     icon?: ReactNode; // icon rendered at the right side
     error?: string | false | null;
     containerClassName?: string;
     inputClassName?: string;
}

const Input = forwardRef(function Input(
     {
          id,
          name,
          label,
          placeholder,
          icon,
          type = 'text',
          value,
          defaultValue,
          onChange,
          required,
          className,
          containerClassName,
          inputClassName,
          disabled,
          ...rest
     }: InputProps,
     ref: ForwardedRef<HTMLInputElement>
) {
     return (
          <div className={containerClassName ?? 'flex w-full flex-col'}>
               {label ? (
                    <label htmlFor={id || name} className="pb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                         {label}
                    </label>
               ) : null}

               <div
                    className={`flex w-full items-stretch rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary ${
                         className ?? ''
                    }`}
               >
                    <input
                         id={id || name}
                         name={name}
                         ref={ref}
                         type={type}
                         placeholder={placeholder}
                         value={value}
                         defaultValue={defaultValue}
                         onChange={onChange}
                         required={required}
                         disabled={disabled}
                         className={`form-input flex min-w-0 flex-1 resize-none overflow-hidden bg-transparent text-slate-900 dark:text-white h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-3 pr-2 text-base font-normal leading-normal focus:outline-none ${
                              inputClassName ?? ''
                         }`}
                         {...rest}
                    />

                    {icon ? (
                         <div className="flex items-center justify-center px-3 text-slate-400 dark:text-slate-500">
                              {icon}
                         </div>
                    ) : null}
               </div>
          </div>
     );
});

export default Input;
