'use client';
import { useState } from 'react';
import Image from 'next/image';
import { use } from 'react';
import { Container } from '@/components/ui/Container';
import { LightSimulator } from '@/components/product/LightSimulator';
import { VariantPicker } from '@/components/product/VariantPicker';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { useProduct } from '@/lib/hooks/useProduct';
import { useReviews } from '@/lib/hooks/useReviews';
import { TrustBadges } from '@/components/product/TrustBadges';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import type { ProductVariant } from '@/types/api';
import { formatDate } from '@/lib/utils/formatDate';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: product, isLoading } = useProduct(slug);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'care'>('details');

  const { data: reviews } = useReviews(product?.id ?? '');
  const primaryImage = product?.images?.find((i) => i.isPrimary) ?? product?.images?.[0];

  if (isLoading) {
    return (
      <Container className="py-16">
        <div className="grid md:grid-cols-2 gap-12 animate-pulse">
          <div className="bg-linen" style={{ aspectRatio: '3/4' }} />
          <div className="space-y-4">
            <div className="h-8 bg-linen w-2/3" />
            <div className="h-4 bg-linen w-1/3" />
            <div className="h-24 bg-linen" />
          </div>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-32 text-center">
        <p className="font-serif text-2xl font-light">Product not found</p>
      </Container>
    );
  }

  return (
    <div className="py-8 md:py-16">
      <Container>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Left — Gallery + Light Simulator */}
          <div className="space-y-6">
            {/* Main image */}
            <div className="relative overflow-hidden bg-linen" style={{ aspectRatio: '3/4' }}>
              {primaryImage ? (
                <Image
                  src={primaryImage.url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <span className="font-serif text-slate-light text-4xl font-light">VEIL</span>
                </div>
              )}
            </div>

            {/* Light Simulator */}
            {primaryImage && (
              <LightSimulator imageUrl={primaryImage.url} productName={product.name} />
            )}

            {/* Thumbnail strip */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img) => (
                  <div key={img.id} className="relative w-16 h-20 flex-shrink-0 bg-linen overflow-hidden">
                    <Image src={img.url} alt={product.name} fill className="object-cover" sizes="64px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — Product Info */}
          <div className="space-y-6">
            {/* Category */}
            {product.category && (
              <span className="font-sans text-xs uppercase tracking-widest text-slate">
                {product.category.name}
              </span>
            )}

            {/* Name */}
            <h1 className="font-serif font-light text-charcoal leading-tight" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              {product.name}
            </h1>

            {/* Rating */}
            {parseFloat(product.avgRating) > 0 && (
              <div className="flex items-center gap-2">
                <StarRating value={Math.round(parseFloat(product.avgRating))} size="sm" />
                <span className="font-sans text-xs text-slate">
                  {parseFloat(product.avgRating).toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Variant Picker + Price */}
            <VariantPicker
              variants={product.variants ?? []}
              selected={selectedVariant}
              onSelect={setSelectedVariant}
            />

            {/* Add to Cart */}
            <AddToCartButton productId={product.id} variant={selectedVariant} />

            {/* Waitlist if all out of stock */}
            {product.variants?.every((v) => (v.inventory?.quantity ?? 0) - (v.inventory?.reservedQuantity ?? 0) <= 0) && (
              <p className="font-sans text-xs text-slate text-center">
                All sizes are currently sold out. Join the waitlist to be notified when we restock.
              </p>
            )}

            {/* Trust badges */}
            <TrustBadges />

            {/* Tabs */}
            <div className="pt-4 border-t border-linen">
              <div className="flex gap-6 border-b border-linen">
                {(['details', 'reviews', 'care'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 font-sans text-xs uppercase tracking-widest transition-colors ${
                      activeTab === tab
                        ? 'text-charcoal border-b-2 border-charcoal -mb-px'
                        : 'text-slate hover:text-charcoal'
                    }`}
                  >
                    {tab === 'reviews' ? `Reviews (${reviews?.length ?? 0})` : tab}
                  </button>
                ))}
              </div>

              <div className="pt-4">
                {activeTab === 'details' && (
                  <p className="font-sans text-sm text-charcoal leading-relaxed">{product.description}</p>
                )}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {!reviews?.length ? (
                      <p className="font-sans text-sm text-slate">No reviews yet — be the first.</p>
                    ) : (
                      reviews.map((r) => (
                        <div key={r.id} className="py-4 border-b border-linen last:border-0">
                          <div className="flex items-center justify-between mb-1">
                            <StarRating value={r.rating} size="sm" />
                            <span className="font-sans text-xs text-slate">{formatDate(r.createdAt)}</span>
                          </div>
                          <p className="font-sans text-xs uppercase tracking-wider text-charcoal mt-1">{r.title}</p>
                          <p className="font-sans text-sm text-slate mt-1">{r.body}</p>
                          <p className="font-sans text-xs text-slate-light mt-1">
                            {r.user.firstName} {r.user.lastName[0]}.
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}
                {activeTab === 'care' && (
                  <div className="space-y-3 font-sans text-sm text-charcoal">
                    <p>· Dry clean or hand wash in cold water</p>
                    <p>· Hang immediately after washing to prevent creasing</p>
                    <p>· Iron on low heat with a pressing cloth</p>
                    <p>· Avoid prolonged direct sunlight to preserve colour</p>
                    <p>· Steam lightly to refresh between cleans</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Related products */}
      <RelatedProducts productId={product.id} currentSlug={slug} />
    </div>
  );
}
