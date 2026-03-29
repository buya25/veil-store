'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ShoppingBag } from 'lucide-react';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useAddToCart } from '@/lib/hooks/useCart';
import { useAuthStore } from '@/lib/store/authStore';
import { useToastStore } from '@/lib/store/toastStore';
import { Container } from '@/components/ui/Container';
import { ROUTES } from '@/lib/constants/routes';
import { formatPrice } from '@/lib/utils/formatPrice';
import type { Metadata } from 'next';

export default function WishlistPage() {
  const { items, remove } = useWishlistStore();
  const addToCart = useAddToCart();
  const { isAuthenticated } = useAuthStore();
  const { addToast } = useToastStore();

  function handleRemove(id: string, name: string) {
    remove(id);
    addToast(`${name} removed from wishlist`, 'info');
  }

  return (
    <div className="py-12 md:py-20">
      <Container>
        {/* Header */}
        <div className="flex items-end justify-between mb-10 pb-6 border-b border-linen">
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-slate mb-2">Your</p>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal">Wishlist</h1>
          </div>
          {items.length > 0 && (
            <p className="font-sans text-sm text-slate">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
          )}
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
            <Heart size={48} strokeWidth={1} className="text-linen" />
            <div>
              <p className="font-serif text-2xl font-light text-charcoal mb-2">Nothing saved yet</p>
              <p className="font-sans text-sm text-slate max-w-xs">
                Tap the heart on any product to save it here for later.
              </p>
            </div>
            <Link
              href={ROUTES.shop}
              className="inline-flex items-center gap-2 border border-charcoal text-charcoal font-sans text-xs uppercase tracking-widest px-8 py-4 hover:bg-charcoal hover:text-ivory transition-all duration-300"
            >
              Browse The Collection
            </Link>
          </div>
        )}

        {/* Items grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative"
                >
                  {/* Image */}
                  <Link href={ROUTES.product(item.slug)} className="block">
                    <div className="relative overflow-hidden bg-linen" style={{ aspectRatio: '3/4' }}>
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="h-full w-full bg-linen flex items-center justify-center">
                          <span className="font-serif text-slate-light text-sm">VEIL</span>
                        </div>
                      )}

                      {/* Remove button */}
                      <button
                        onClick={(e) => { e.preventDefault(); handleRemove(item.id, item.name); }}
                        className="absolute top-3 right-3 p-1.5 bg-ivory/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-ivory"
                        aria-label="Remove from wishlist"
                      >
                        <X size={13} strokeWidth={1.5} className="text-charcoal" />
                      </button>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="mt-3 px-0.5">
                    <Link href={ROUTES.product(item.slug)}>
                      <h3 className="font-serif text-sm md:text-base font-light text-charcoal hover:text-rose transition-colors duration-300 leading-snug">
                        {item.name}
                      </h3>
                    </Link>
                    {item.categoryName && (
                      <p className="font-sans text-[10px] uppercase tracking-widest text-slate mt-0.5">
                        {item.categoryName}
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="font-serif text-sm text-charcoal">
                        {formatPrice(parseFloat(item.basePrice))}
                      </span>
                      <Link
                        href={ROUTES.product(item.slug)}
                        className="font-sans text-[10px] uppercase tracking-widest text-slate hover:text-rose transition-colors"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Bottom CTA */}
        {items.length > 0 && (
          <div className="mt-16 pt-10 border-t border-linen flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-sans text-sm text-slate">
              Items are saved to this device. Sign in to sync across devices.
            </p>
            <Link
              href={ROUTES.shop}
              className="font-sans text-xs uppercase tracking-widest text-charcoal border border-charcoal px-8 py-4 hover:bg-charcoal hover:text-ivory transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
