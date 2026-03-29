'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Menu, X, User, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store/cartStore';
import { useAuthStore } from '@/lib/store/authStore';
import { useCart } from '@/lib/hooks/useCart';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/cn';

const NAV_LINKS = [
  { label: 'Shop', href: ROUTES.shop },
  { label: 'Moods', href: ROUTES.moods },
  { label: 'On Sale', href: ROUTES.sale },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toggleCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { data: cart } = useCart();

  const cartCount = cart?.items?.reduce((s, i) => s + i.quantity, 0) ?? 0;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100);
  }, [searchOpen]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`${ROUTES.shop}?search=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setQuery('');
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'bg-ivory/95 backdrop-blur-sm border-b border-linen' : 'bg-transparent',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl md:text-3xl font-light tracking-[0.15em] text-charcoal">
            VEIL
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs uppercase tracking-widest text-charcoal hover:text-rose transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="text-charcoal hover:text-rose transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={17} strokeWidth={1.5} />
            </button>

            <Link
              href={isAuthenticated ? ROUTES.account : ROUTES.login}
              className="hidden md:flex text-charcoal hover:text-rose transition-colors duration-300"
              aria-label="Account"
            >
              <User size={18} strokeWidth={1.5} />
            </Link>

            <button
              onClick={toggleCart}
              className="relative text-charcoal hover:text-rose transition-colors duration-300"
              aria-label={`Cart (${cartCount})`}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 1.4 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-rose text-ivory font-sans text-[9px] flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            <button
              className="md:hidden text-charcoal hover:text-rose transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Search bar dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden bg-ivory border-t border-linen"
            >
              <form onSubmit={handleSearch} className="mx-auto max-w-7xl px-4 md:px-8 py-4 flex items-center gap-4">
                <Search size={15} strokeWidth={1.5} className="text-slate flex-shrink-0" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search curtains, fabrics, moods…"
                  className="flex-1 bg-transparent font-sans text-sm text-charcoal placeholder:text-slate focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-slate hover:text-charcoal transition-colors"
                >
                  <X size={15} strokeWidth={1.5} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-ivory flex flex-col"
          >
            <div className="flex items-center justify-between px-4 h-16 border-b border-linen">
              <span className="font-serif text-2xl font-light tracking-[0.15em]">VEIL</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 font-serif text-3xl font-light text-charcoal border-b border-linen hover:text-rose transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-4"
              >
                <Link
                  href={isAuthenticated ? ROUTES.account : ROUTES.login}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans text-xs uppercase tracking-widest text-slate hover:text-rose transition-colors"
                >
                  {isAuthenticated ? 'My Account' : 'Sign In'}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
