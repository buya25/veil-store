'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { Badge } from '@/components/ui/Badge';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useAddToCart } from '@/lib/hooks/useCart';
import { useToastStore } from '@/lib/store/toastStore';
import { useAuthStore } from '@/lib/store/authStore';
import type { Product } from '@/types/api';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images?.find((i) => i.isPrimary) ?? product.images?.[0];
  const defaultVariant = product.variants?.[0];
  const isOnSale = defaultVariant?.salePrice && parseFloat(defaultVariant.salePrice) > 0;
  const inStock = (defaultVariant?.inventory?.quantity ?? 1) > 0;

  const { toggle, has } = useWishlistStore();
  const isWishlisted = has(product.id);
  const addToCart = useAddToCart();
  const { addToast } = useToastStore();
  const { isAuthenticated } = useAuthStore();

  // Extract up to 3 unique colors from all variants
  const colors: string[] = [];
  for (const v of product.variants ?? []) {
    const c = (v.attributes as any)?.colors?.[0] ?? (v.attributes as any)?.color;
    if (c && !colors.includes(c) && colors.length < 3) colors.push(c);
  }

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!isAuthenticated) {
      addToast('Sign in to add items to your cart', 'info');
      return;
    }
    if (!defaultVariant) return;
    addToCart.mutate(
      { variantId: defaultVariant.id, productId: product.id, quantity: 1 },
      {
        onSuccess: () => addToast(`${product.name} added to cart`),
        onError: () => addToast('Could not add to cart', 'error'),
      },
    );
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggle({
      id: product.id,
      slug: product.slug,
      name: product.name,
      basePrice: product.basePrice,
      imageUrl: primaryImage?.url,
      categoryName: product.category?.name,
    });
    addToast(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist', 'info');
  }

  return (
    <Link href={ROUTES.product(product.slug)} className="group block">
      {/* Image */}
      <div className="relative overflow-hidden bg-linen" style={{ aspectRatio: '3/4' }}>
        {primaryImage ? (
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={primaryImage.url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            />
          </motion.div>
        ) : (
          <div className="h-full w-full bg-linen flex items-center justify-center">
            <span className="font-serif text-slate-light text-sm">VEIL</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {isOnSale && <Badge variant="sale">Sale</Badge>}
          {!inStock && <Badge variant="low">Sold Out</Badge>}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-1.5 bg-ivory/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-ivory"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            size={13}
            strokeWidth={1.5}
            className={isWishlisted ? 'fill-rose text-rose' : 'text-charcoal'}
          />
        </button>

        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <button
            onClick={handleQuickAdd}
            disabled={!inStock || addToCart.isPending}
            className="w-full bg-charcoal text-ivory py-3 flex items-center justify-center gap-2 font-sans text-[10px] uppercase tracking-widest hover:bg-charcoal-soft transition-colors disabled:opacity-50"
          >
            <ShoppingBag size={12} strokeWidth={1.5} />
            {inStock ? 'Quick Add' : 'Sold Out'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <h3 className="font-serif text-sm md:text-base font-light text-charcoal group-hover:text-rose transition-colors duration-300 leading-snug">
          {product.name}
        </h3>
        {product.category && (
          <p className="font-sans text-[10px] uppercase tracking-widest text-slate mt-0.5">
            {product.category.name}
          </p>
        )}
        <div className="mt-1.5 flex items-center justify-between">
          <PriceDisplay
            price={defaultVariant?.price ?? product.basePrice}
            salePrice={defaultVariant?.salePrice}
            size="sm"
          />
          {/* Color swatches */}
          {colors.length > 0 && (
            <div className="flex items-center gap-1">
              {colors.map((c) => (
                <span
                  key={c}
                  title={c}
                  className="w-2.5 h-2.5 rounded-full border border-linen bg-linen"
                  style={{ backgroundColor: colorToHex(c) }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// Map fabric color names to rough hex values for the swatches
function colorToHex(name: string): string {
  const map: Record<string, string> = {
    ivory: '#F5F0E8', 'chalk white': '#F8F5F0', 'off-white': '#F4EFE6', ecru: '#EDE0C4',
    'pale grey': '#D1D5DB', storm: '#6B7280', fog: '#9CA3AF', 'dove grey': '#D1D5DB', slate: '#64748B',
    natural: '#C8B89A', raw: '#D4C5A9', sandstone: '#C2A882', camel: '#C19A6B',
    dune: '#C4A882', wheat: '#D4B896', chalk: '#F0EBE3',
    charcoal: '#1A1A1A', graphite: '#374151', 'jet black': '#111111', onyx: '#0F0F0F',
    'storm grey': '#4B5563', 'midnight blue': '#1E3A5F', navy: '#1B2A4A',
    cream: '#FFF8E7', white: '#FFFFFF', blush: '#E8C4B8', petal: '#F0D4CC', rose: '#C4957A',
    sage: '#9CAF88', mint: '#B5D5C5',
    'midnight blue2': '#0F2044', ink: '#1A1F3C', emerald: '#065F46', forest: '#14532D',
    bordeaux: '#722F37', wine: '#7B2D3E', 'dusty rose': '#C4937A', 'blush pink': '#D4A8A0',
  };
  return map[name.toLowerCase()] ?? '#E8DFD0';
}
