'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useUser, useUpdateUser } from '@/lib/hooks/useUser';
import { useLogout } from '@/lib/hooks/useAuth';
import { profileSchema, type ProfileForm } from '@/types/forms';

export default function AccountPage() {
  const { data: user, isLoading } = useUser();
  const updateUser = useUpdateUser();
  const logout = useLogout();

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    values: { firstName: user?.firstName ?? '', lastName: user?.lastName ?? '' },
  });

  if (isLoading) return <div className="animate-pulse h-40 bg-linen rounded" />;
  if (!user) return <p className="font-sans text-sm text-slate">Please sign in to view your account.</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-charcoal mb-8">
        Hello, {user.firstName}
      </h1>

      <form onSubmit={handleSubmit((d) => updateUser.mutate(d))} className="space-y-5 max-w-sm">
        <Input label="First Name" {...register('firstName')} error={errors.firstName?.message} />
        <Input label="Last Name" {...register('lastName')} error={errors.lastName?.message} />
        <Input label="Email" value={user.email} disabled className="opacity-50" />

        <Button type="submit" loading={updateUser.isPending} variant="outline">
          Save Changes
        </Button>

        {updateUser.isSuccess && (
          <p className="font-sans text-xs text-green-600">Profile updated.</p>
        )}
      </form>

      <div className="mt-12 pt-8 border-t border-linen">
        <Button
          variant="ghost"
          onClick={() => logout.mutate()}
          loading={logout.isPending}
          className="text-slate hover:text-rose"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
