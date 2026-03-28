'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCart } from '@/lib/hooks/useCart';
import { useAddresses, useCreateAddress } from '@/lib/hooks/useUser';
import { useCreateOrder } from '@/lib/hooks/useOrders';
import { formatPrice } from '@/lib/utils/formatPrice';
import { addressSchema, type AddressForm } from '@/types/forms';
import { ROUTES } from '@/lib/constants/routes';
import type { Order } from '@/types/api';

export default function CheckoutPage() {
  const [step, setStep] = useState<'address' | 'review' | 'done'>('address');
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [showNewAddress, setShowNewAddress] = useState(false);

  const { data: cart } = useCart();
  const { data: addresses } = useAddresses();
  const createAddress = useCreateAddress();
  const createOrder = useCreateOrder();

  const addressForm = useForm<AddressForm>({ resolver: zodResolver(addressSchema) });
  const items = cart?.items ?? [];
  const subtotal = items.reduce((s, i) => s + parseFloat(i.variant.salePrice ?? i.variant.price) * i.quantity, 0);

  async function handleAddressSubmit(data: AddressForm) {
    const newAddr = await createAddress.mutateAsync({ ...data, isDefault: false });
    setSelectedAddressId(newAddr.id);
    setStep('review');
  }

  async function handlePlaceOrder() {
    if (!selectedAddressId) return;
    const order = await createOrder.mutateAsync({ addressId: selectedAddressId });
    setCompletedOrder(order);
    setStep('done');
  }

  if (step === 'done' && completedOrder) {
    return (
      <Container className="py-24 text-center max-w-lg">
        <div className="space-y-4">
          <span className="font-sans text-xs uppercase tracking-widest text-slate">Order Placed</span>
          <h1 className="font-serif text-4xl font-light text-charcoal">Thank you.</h1>
          <p className="font-sans text-sm text-slate">
            Order <strong>#{completedOrder.orderNumber}</strong> is confirmed.
            We&apos;ll email you when it ships.
          </p>
          <div className="pt-8 flex gap-3 justify-center">
            <Link href={ROUTES.orders}><Button variant="outline">View Orders</Button></Link>
            <Link href={ROUTES.shop}><Button>Continue Shopping</Button></Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 max-w-5xl">
      <div className="flex items-center gap-4 mb-10">
        <Link href="/" className="font-serif text-2xl font-light tracking-[0.15em]">VEIL</Link>
        <span className="text-linen">·</span>
        <span className="font-sans text-xs uppercase tracking-widest text-slate">Checkout</span>
      </div>

      <div className="grid md:grid-cols-[1fr_360px] gap-12">
        {/* Left */}
        <div>
          {/* Step 1 — Address */}
          <div className="mb-8">
            <h2 className="font-serif text-xl font-light mb-4">Delivery Address</h2>

            {addresses && addresses.length > 0 && (
              <div className="space-y-2 mb-4">
                {addresses.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => { setSelectedAddressId(addr.id); setShowNewAddress(false); }}
                    className={`w-full text-left p-4 border transition-all ${selectedAddressId === addr.id ? 'border-charcoal bg-ivory-dark' : 'border-linen hover:border-charcoal'}`}
                  >
                    <p className="font-sans text-sm text-charcoal">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                    <p className="font-sans text-xs text-slate">{addr.city}, {addr.state} {addr.postalCode}, {addr.country}</p>
                  </button>
                ))}
                <button onClick={() => setShowNewAddress(!showNewAddress)} className="font-sans text-xs uppercase tracking-widest text-slate hover:text-charcoal transition-colors underline underline-offset-4">
                  + Add New Address
                </button>
              </div>
            )}

            {(!addresses?.length || showNewAddress) && (
              <form onSubmit={addressForm.handleSubmit(handleAddressSubmit)} className="space-y-4">
                <Input label="Address Line 1" {...addressForm.register('line1')} error={addressForm.formState.errors.line1?.message} />
                <Input label="Address Line 2 (optional)" {...addressForm.register('line2')} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="City" {...addressForm.register('city')} error={addressForm.formState.errors.city?.message} />
                  <Input label="State" {...addressForm.register('state')} error={addressForm.formState.errors.state?.message} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Postal Code" {...addressForm.register('postalCode')} error={addressForm.formState.errors.postalCode?.message} />
                  <Input label="Country" {...addressForm.register('country')} error={addressForm.formState.errors.country?.message} />
                </div>
                <Button type="submit" loading={createAddress.isPending} variant="outline">
                  Save & Continue
                </Button>
              </form>
            )}

            {selectedAddressId && !showNewAddress && (
              <Button onClick={() => setStep('review')} className="mt-4">Continue to Review</Button>
            )}
          </div>

          {/* Step 2 — Review */}
          {step === 'review' && (
            <div>
              <h2 className="font-serif text-xl font-light mb-4">Review Your Order</h2>
              <ul className="space-y-3 mb-6">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between items-center py-3 border-b border-linen">
                    <div>
                      <p className="font-sans text-sm text-charcoal">{item.product.name}</p>
                      <p className="font-sans text-xs text-slate">{item.variant.name} × {item.quantity}</p>
                    </div>
                    <p className="font-serif text-sm">{formatPrice(parseFloat(item.variant.salePrice ?? item.variant.price) * item.quantity)}</p>
                  </li>
                ))}
              </ul>
              <Button onClick={handlePlaceOrder} loading={createOrder.isPending} size="lg">
                Place Order — {formatPrice(subtotal)}
              </Button>
              {createOrder.error && (
                <p className="mt-2 font-sans text-xs text-red-500">Failed to place order. Please try again.</p>
              )}
            </div>
          )}
        </div>

        {/* Right — Order Summary */}
        <aside className="bg-ivory-dark p-6 h-fit space-y-4">
          <h3 className="font-sans text-xs uppercase tracking-widest text-slate">Order Summary</h3>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span className="font-sans text-xs text-charcoal">{item.product.name} ×{item.quantity}</span>
              <span className="font-sans text-xs">{formatPrice(parseFloat(item.variant.salePrice ?? item.variant.price) * item.quantity)}</span>
            </div>
          ))}
          <div className="pt-3 border-t border-linen flex justify-between">
            <span className="font-sans text-xs uppercase tracking-widest text-slate">Total</span>
            <span className="font-serif text-lg font-light">{formatPrice(subtotal)}</span>
          </div>
        </aside>
      </div>
    </Container>
  );
}
