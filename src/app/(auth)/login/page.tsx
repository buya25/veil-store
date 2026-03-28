'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useLogin } from '@/lib/hooks/useAuth';
import { loginSchema, type LoginForm } from '@/types/forms';
import { ROUTES } from '@/lib/constants/routes';

export default function LoginPage() {
  const login = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="w-full max-w-md">
      <h1 className="font-serif text-display-md font-light text-charcoal mb-2">Welcome back</h1>
      <p className="font-sans text-sm text-slate mb-8">Sign in to your VEIL account</p>

      <form onSubmit={handleSubmit((d) => login.mutate(d))} className="space-y-5">
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />

        {login.error && (
          <p className="font-sans text-xs text-red-500">
            {(login.error as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Invalid credentials'}
          </p>
        )}

        <Button type="submit" loading={login.isPending} className="w-full" size="lg">
          Sign In
        </Button>
      </form>

      <p className="mt-6 font-sans text-xs text-slate text-center">
        Don&apos;t have an account?{' '}
        <Link href={ROUTES.register} className="text-charcoal underline underline-offset-4 hover:text-rose transition-colors">
          Create one
        </Link>
      </p>
    </div>
  );
}
