import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { Container } from '@/components/ui/Container';

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory mt-28">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-serif text-4xl font-light tracking-[0.15em]">VEIL</span>
            <p className="mt-4 font-sans text-sm text-slate-light leading-relaxed max-w-xs">
              Your light, your language. Handcrafted curtains that transform how light lives in your home.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-slate-light mb-4">Shop</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'All Products', href: ROUTES.shop },
                { label: 'Mood Collections', href: ROUTES.moods },
                { label: 'On Sale', href: ROUTES.sale },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-sans text-sm text-ivory/70 hover:text-ivory transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-slate-light mb-4">Account</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Sign In', href: ROUTES.login },
                { label: 'My Orders', href: ROUTES.orders },
                { label: 'Window DNA', href: ROUTES.windowDna },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-sans text-sm text-ivory/70 hover:text-ivory transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-slate-light">
            © {new Date().getFullYear()} VEIL. All rights reserved.
          </p>
          <p className="font-sans text-xs text-slate-light italic font-serif">
            Your light, your language.
          </p>
        </div>
      </Container>
    </footer>
  );
}
