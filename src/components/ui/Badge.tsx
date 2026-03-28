import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sale' | 'new' | 'low' | 'default';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    sale: 'bg-rose text-ivory',
    new: 'bg-charcoal text-ivory',
    low: 'bg-amber-100 text-amber-800',
    default: 'bg-linen text-charcoal',
  };

  return (
    <span
      className={cn(
        'inline-block px-2 py-0.5 font-sans text-[10px] uppercase tracking-widest',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
