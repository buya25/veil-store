'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToastStore } from '@/lib/store/toastStore';

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

export function Toaster() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = ICONS[t.type];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex items-center gap-3 bg-charcoal text-ivory px-4 py-3 shadow-xl min-w-[220px] max-w-xs"
            >
              <Icon size={14} className={t.type === 'error' ? 'text-rose' : 'text-rose-light'} />
              <p className="font-sans text-xs flex-1">{t.message}</p>
              <button
                onClick={() => removeToast(t.id)}
                className="text-ivory/40 hover:text-ivory transition-colors"
              >
                <X size={12} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
