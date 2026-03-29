import { Truck, RotateCcw, Shield, Scissors } from 'lucide-react';

const BADGES = [
  { icon: Truck,      label: 'Free Shipping',   sub: 'Orders over $200' },
  { icon: RotateCcw,  label: 'Free Returns',     sub: '30-day window'     },
  { icon: Scissors,   label: 'Made to Order',    sub: 'Cut for your windows' },
  { icon: Shield,     label: 'Secure Checkout',  sub: 'SSL encrypted'     },
];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-linen">
      {BADGES.map(({ icon: Icon, label, sub }) => (
        <div key={label} className="flex items-start gap-2.5">
          <div className="mt-0.5 text-slate">
            <Icon size={14} strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-sans text-xs text-charcoal">{label}</p>
            <p className="font-sans text-[10px] text-slate">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
