import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductReviews, submitReview } from '@/lib/api/reviews';

export function useReviews(productId: string) {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });
}

export function useSubmitReview(productId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: submitReview,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reviews', productId] }),
  });
}
