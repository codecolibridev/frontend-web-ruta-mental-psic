'use client';

import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: 'primary' | 'secondary' | 'ghost';
     className?: string;
     loading?: boolean;
}

export default function Button({
     children,
     type = 'button',
     disabled,
     className = '',
     variant = 'primary',
     loading = false,
     ...rest
}: ButtonProps) {
     const isDisabled = !!disabled || loading;
     const base =
          'flex h-12 w-full items-center justify-center rounded-lg px-6 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2';

     const variants: Record<string, string> = {
          primary: `bg-primary text-white hover:bg-primary/90 disabled:opacity-60`,
          secondary: `bg-slate-100 text-slate-900 hover:bg-slate-200 disabled:opacity-60`,
          ghost: `bg-transparent text-primary hover:underline disabled:opacity-60`,
     };

     // spinner color depends on variant to keep contrast in light/dark
     const spinnerColor =
          variant === 'primary'
               ? 'text-white'
               : variant === 'secondary'
               ? 'text-slate-900 dark:text-white'
               : 'text-primary';

     return (
          <button
               type={type}
               disabled={isDisabled}
               aria-busy={loading || undefined}
               className={`${base} ${variants[variant]} ${className} ${isDisabled ? 'cursor-not-allowed' : ''}`}
               {...rest}
          >
               {loading ? (
                    <svg
                         className={`animate-spin h-4 w-4 mr-2 ${spinnerColor}`}
                         viewBox="0 0 24 24"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                         aria-hidden="true"
                    >
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
               ) : null}
               {children}
          </button>
     );
}
