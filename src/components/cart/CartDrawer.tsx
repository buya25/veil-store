'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { useCart } from '@/lib/hooks/useCart';
import { useAuthStore } from '@/lib/store/authStore';
import { CartItem } from './CartItem';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/formatPrice';
import { ROUTES } from '@/lib/constants/routes';

export function CartDrawer() {
  const { isCartOpen, closeCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { data: cart } = useCart();

  const items = cart?.items ?? [];
  const subtotal = items.reduce(
    (s, item) => s + parseFloat(item.variant.salePrice ?? item.variant.price) * item.quantity,
    0,
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-charcoal/30 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-ivory flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-linen">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} strokeWidth={1.5} />
                <span className="font-serif text-xl font-light">
                  Your Bag {items.length > 0 && `(${items.length})`}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="text-charcoal hover:text-rose transition-colors"
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {!isAuthenticated ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <p className="font-sans text-sm text-slate">Sign in to view your bag</p>
                  <Button onClick={closeCart} variant="outline" size="sm">
                    <Link href={ROUTES.login}>Sign In</Link>
                  </Button>
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={40} strokeWidth={1} className="text-linen" />
                  <p className="font-serif text-xl font-light text-charcoal">Your bag is empty</p>
                  <p className="font-sans text-sm text-slate">
                    Discover curtains that transform your light
                  </p>
                  <Button onClick={closeCart} variant="outline" size="sm">
                    <Link href={ROUTES.shop}>Explore</Link>
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col divide-y divide-linen">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-linen space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-xs uppercase tracking-widest text-slate">Subtotal</span>
                  <span className="font-serif text-xl font-light">{formatPrice(subtotal)}</span>
                </div>
                <p className="font-sans text-xs text-slate-light">Shipping & tax calculated at checkout</p>
                <Link href={ROUTES.checkout} onClick={closeCart}>
                  <Button className="w-full" size="lg">Proceed to Checkout</Button>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
