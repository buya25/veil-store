'use client';
import Link from 'next/link';
import { useMyOrders } from '@/lib/hooks/useOrders';
import { formatPrice } from '@/lib/utils/formatPrice';
import { formatDate } from '@/lib/utils/formatDate';
import { ROUTES } from '@/lib/constants/routes';

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Pending', color: 'text-amber-600' },
  CONFIRMED: { label: 'Confirmed', color: 'text-blue-600' },
  PROCESSING: { label: 'Processing', color: 'text-blue-600' },
  SHIPPED: { label: 'Shipped', color: 'text-green-600' },
  DELIVERED: { label: 'Delivered', color: 'text-green-700' },
  CANCELLED: { label: 'Cancelled', color: 'text-red-500' },
  REFUNDED: { label: 'Refunded', color: 'text-slate' },
};

export default function OrdersPage() {
  const { data: orders, isLoading } = useMyOrders();

  if (isLoading) return <div className="animate-pulse space-y-4">{Array.from({length:3}).map((_,i)=><div key={i} className="h-16 bg-linen" />)}</div>;

  if (!orders?.length) return (
    <div>
      <h1 className="font-serif text-3xl font-light text-charcoal mb-6">Orders</h1>
      <p className="font-sans text-sm text-slate">You haven&apos;t placed any orders yet.</p>
    </div>
  );

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-charcoal mb-8">Orders</h1>
      <div className="space-y-3">
        {orders.map((order) => {
          const statusInfo = STATUS_LABELS[order.status] ?? { label: order.status, color: 'text-slate' };
          return (
            <Link
              key={order.id}
              href={ROUTES.order(order.id)}
              className="flex items-center justify-between p-5 border border-linen hover:border-charcoal transition-colors group"
            >
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-slate">#{order.orderNumber}</p>
                <p className="font-serif text-base font-light text-charcoal mt-0.5">
                  {formatPrice(order.total)}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-sans text-xs uppercase tracking-wider ${statusInfo.color}`}>{statusInfo.label}</p>
                <p className="font-sans text-xs text-slate mt-0.5">{formatDate(order.createdAt)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
