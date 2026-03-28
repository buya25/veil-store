import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyOrders, createOrder, type CreateOrderDto } from '@/lib/api/orders';

export function useMyOrders() {
  return useQuery({
    queryKey: ['orders', 'my'],
    queryFn: getMyOrders,
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateOrderDto) => createOrder(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] });
      qc.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
