import { useQuery } from '@tanstack/react-query';
import { getProducts, type ProductQuery } from '@/lib/api/products';

export function useProducts(params: ProductQuery = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
    staleTime: 60_000,
  });
}
