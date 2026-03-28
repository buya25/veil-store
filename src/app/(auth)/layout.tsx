import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <div className="p-6">
        <Link href="/" className="font-serif text-2xl font-light tracking-[0.15em] text-charcoal">
          VEIL
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-12">{children}</div>
    </div>
  );
}
