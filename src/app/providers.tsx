'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Toaster } from '@/components/ui/Toaster';
import { PageProgress } from '@/components/ui/PageProgress';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, retry: 1, refetchOnWindowFocus: false },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PageProgress />
      <CustomCursor />
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
