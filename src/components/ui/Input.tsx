import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-sans text-xs uppercase tracking-widest text-slate">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full border-b border-linen bg-transparent py-2.5 font-sans text-sm text-charcoal placeholder:text-slate-light focus:border-charcoal focus:outline-none transition-colors duration-200',
          error && 'border-red-400',
          className,
        )}
        {...props}
      />
      {error && <span className="font-sans text-xs text-red-500">{error}</span>}
    </div>
  ),
);
Input.displayName = 'Input';

export { Input };
