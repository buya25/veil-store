'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useRegister } from '@/lib/hooks/useAuth';
import { registerSchema, type RegisterForm } from '@/types/forms';
import { ROUTES } from '@/lib/constants/routes';

export default function RegisterPage() {
  const register_ = useRegister();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <div className="w-full max-w-md">
      <h1 className="font-serif text-display-md font-light text-charcoal mb-2">Create your account</h1>
      <p className="font-sans text-sm text-slate mb-8">Join VEIL and discover your light</p>

      <form onSubmit={handleSubmit((d) => register_.mutate(d))} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" {...register('firstName')} error={errors.firstName?.message} />
          <Input label="Last Name" {...register('lastName')} error={errors.lastName?.message} />
        </div>
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />

        {register_.error && (
          <p className="font-sans text-xs text-red-500">
            {(register_.error as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Registration failed'}
          </p>
        )}

        <Button type="submit" loading={register_.isPending} className="w-full" size="lg">
          Create Account
        </Button>
      </form>

      <p className="mt-6 font-sans text-xs text-slate text-center">
        Already have an account?{' '}
        <Link href={ROUTES.login} className="text-charcoal underline underline-offset-4 hover:text-rose transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
