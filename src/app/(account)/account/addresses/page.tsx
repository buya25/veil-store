'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2, Plus } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAddresses, useCreateAddress, useDeleteAddress } from '@/lib/hooks/useUser';
import { addressSchema, type AddressForm } from '@/types/forms';

export default function AddressesPage() {
  const [showForm, setShowForm] = useState(false);
  const { data: addresses, isLoading } = useAddresses();
  const createAddress = useCreateAddress();
  const deleteAddress = useDeleteAddress();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
  });

  async function onSubmit(data: AddressForm) {
    await createAddress.mutateAsync({ ...data, isDefault: false });
    reset();
    setShowForm(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-light text-charcoal">Addresses</h1>
        <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus size={14} /> Add Address
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8 p-6 border border-linen">
          <Input label="Address Line 1" {...register('line1')} error={errors.line1?.message} />
          <Input label="Address Line 2 (optional)" {...register('line2')} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="City" {...register('city')} error={errors.city?.message} />
            <Input label="State" {...register('state')} error={errors.state?.message} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Postal Code" {...register('postalCode')} error={errors.postalCode?.message} />
            <Input label="Country" {...register('country')} error={errors.country?.message} />
          </div>
          <div className="flex gap-3">
            <Button type="submit" loading={createAddress.isPending} size="sm">Save</Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => { setShowForm(false); reset(); }}>Cancel</Button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="space-y-3">{Array.from({length:2}).map((_,i)=><div key={i} className="h-16 bg-linen animate-pulse" />)}</div>
      ) : !addresses?.length ? (
        <p className="font-sans text-sm text-slate">No addresses saved yet.</p>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <div key={addr.id} className="flex items-start justify-between p-5 border border-linen">
              <div>
                <p className="font-sans text-sm text-charcoal">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                <p className="font-sans text-xs text-slate mt-0.5">{addr.city}, {addr.state} {addr.postalCode}, {addr.country}</p>
              </div>
              <button onClick={() => deleteAddress.mutate(addr.id)} className="text-slate hover:text-rose transition-colors mt-0.5">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
