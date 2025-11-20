'use client';

import { ForwardedRef, forwardRef, InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'name'> {
     label?: string;
     icon?: ReactNode;
     error?: string | false | null;
     containerClassName?: string;
     inputClassName?: string;
}

const Input = forwardRef(function Input(
     {
          id,
          label,
          placeholder,
          icon,
          type = 'text',
          className,
          containerClassName,
          inputClassName,
          error,
          ...rest // omit 'size' and 'name' from InputHTMLAttributes
     }: InputProps,
     ref: ForwardedRef<HTMLInputElement>
) {
     return (
          <div className={containerClassName ?? 'flex w-full flex-col'}>
               {label && (
                    <label htmlFor={id} className="pb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                         {label}
                    </label>
               )}

               <div
                    className={`flex w-full items-stretch rounded-lg overflow-hidden border 
          ${error ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} 
          bg-white dark:bg-slate-800 focus-within:ring-2 
          focus-within:ring-primary/50 focus-within:border-primary ${className ?? ''}`}
               >
                    <input
                         id={id}
                         ref={ref}
                         type={type}
                         placeholder={placeholder}
                         className={`form-input flex min-w-0 flex-1 resize-none overflow-hidden bg-transparent 
            text-slate-900 dark:text-white h-12 placeholder:text-slate-400 
            dark:placeholder:text-slate-500 p-3 pr-2 text-xsmd font-normal 
            leading-normal focus:outline-none ${inputClassName ?? ''}`}
                         {...rest}
                    />

                    {icon && (
                         <div className="flex items-center justify-center px-3 text-slate-400 dark:text-slate-500">
                              {icon}
                         </div>
                    )}
               </div>

               {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
          </div>
     );
});

Input.displayName = 'Input';

export default Input;
