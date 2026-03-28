import { cn } from '@/lib/utils/cn';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionTitle({ title, subtitle, align = 'left', className }: SectionTitleProps) {
  return (
    <div className={cn('flex flex-col gap-2', align === 'center' && 'items-center text-center', className)}>
      {subtitle && (
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-slate">{subtitle}</span>
      )}
      <h2 className="font-serif text-display-md font-light text-charcoal">{title}</h2>
    </div>
  );
}
