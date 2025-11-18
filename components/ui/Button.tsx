'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'destructive-outline';
     size?: 'sm' | 'md' | 'lg';
     leftIcon?: ReactNode;
     rightIcon?: ReactNode;
     loading?: boolean;
     children: ReactNode;
     className?: string;
}

export default function Button({
     children,
     variant = 'primary',
     size = 'md',
     leftIcon,
     rightIcon,
     loading = false,
     disabled = false,
     className = '',
     ...rest
}: ButtonProps) {
     const base = `
    hover:cursor-pointer flex items-center justify-center gap-2 rounded-lg font-bold tracking-[0.015em]
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50
    disabled:cursor-not-allowed disabled:opacity-50
    min-w-[84px] max-w-[480px] overflow-hidden
  `;

     const sizes = {
          sm: 'h-9 px-3 text-sm',
          md: 'h-10 px-4 text-sm',
          lg: 'h-12 px-6 text-base',
     };

     const variants = {
          primary: 'bg-primary hover:bg-primary/90 text-white',
          secondary: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm',
          outline: 'bg-transparent border border-white/20 text-white hover:bg-white/10',
          ghost: 'bg-transparent text-white hover:bg-white/10',
          destructive: 'bg-[var(--color-destructive)] hover:bg-[var(--color-destructive-hover)] text-white',
          'destructive-outline':
               'bg-transparent border border-[var(--color-destructive-outline)] text-[var(--color-destructive-outline)] hover:bg-[var(--color-destructive)]/10',
     };

     return (
          <button
               className={`
        ${base}
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
               disabled={disabled || loading}
               {...rest}
          >
               {loading && (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
               )}

               {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
               <span className="truncate">{children}</span>
               {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </button>
     );
}
