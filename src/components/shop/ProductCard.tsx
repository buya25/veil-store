'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ROUTES } from '@/lib/constants/routes';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { Badge } from '@/components/ui/Badge';
import type { Product } from '@/types/api';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images?.find((i) => i.isPrimary) ?? product.images?.[0];
  const defaultVariant = product.variants?.[0];
  const isOnSale = defaultVariant?.salePrice && parseFloat(defaultVariant.salePrice) > 0;
  const inStock = (defaultVariant?.inventory?.quantity ?? 1) > 0;

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
        <div className="mt-1.5">
          <PriceDisplay
            price={defaultVariant?.price ?? product.basePrice}
            salePrice={defaultVariant?.salePrice}
            size="sm"
          />
        </div>
      </div>
    </Link>
  );
}
