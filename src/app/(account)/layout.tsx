import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ROUTES } from '@/lib/constants/routes';

const ACCOUNT_LINKS = [
  { label: 'Profile', href: ROUTES.account },
  { label: 'Orders', href: ROUTES.orders },
  { label: 'Addresses', href: ROUTES.addresses },
  { label: 'Window DNA', href: ROUTES.windowDna },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <CartDrawer />
      <div className="pt-16 md:pt-20 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
            {/* Sidebar */}
            <aside>
              <p className="font-sans text-xs uppercase tracking-widest text-slate mb-4">My Account</p>
              <nav className="flex flex-col gap-1">
                {ACCOUNT_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="font-serif text-lg font-light text-charcoal hover:text-rose transition-colors py-1"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </aside>
            {/* Content */}
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
