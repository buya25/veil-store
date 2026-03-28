import { cn } from '@/lib/utils/cn';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}

export function Container({ children, className, wide }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-4 md:px-8 lg:px-12',
        wide ? 'max-w-screen-2xl' : 'max-w-7xl',
        className,
      )}
    >
      {children}
    </div>
  );
}
