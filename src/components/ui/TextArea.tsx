'use client';

import { ForwardedRef, forwardRef, TextareaHTMLAttributes } from 'react';

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
     label?: string;
     error?: string | false | null;
     containerClassName?: string;
     textareaClassName?: string;
}

const TextArea = forwardRef(function TextArea(
     {
          id,
          label,
          placeholder,
          className,
          containerClassName,
          textareaClassName,
          error,
          rows = 4,
          ...rest
     }: TextAreaProps,
     ref: ForwardedRef<HTMLTextAreaElement>
) {
     return (
          <div className={containerClassName ?? 'flex w-full flex-col'}>
               {label && (
                    <label htmlFor={id} className="pb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                         {label}
                    </label>
               )}

               <textarea
                    id={id}
                    ref={ref}
                    placeholder={placeholder}
                    rows={rows}
                    className={`w-full rounded-lg border hide-scrollbar ${
                         error ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } bg-white dark:bg-slate-800 p-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none ${
                         textareaClassName ?? ''
                    } ${className ?? ''}`}
                    {...rest}
               />

               {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
          </div>
     );
});

TextArea.displayName = 'TextArea';

export default TextArea;
