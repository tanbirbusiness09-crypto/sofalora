import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 start-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#1C1A17] text-[#FAF8F5] p-3.5 rounded-2xl shadow-2xl border border-[#3E3830] flex items-center justify-between gap-3 animate-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-[#4ADE80] shrink-0" />
            )}
            {toast.type === 'warning' && (
              <AlertCircle className="w-5 h-5 text-[#FBBF24] shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-[#60A5FA] shrink-0" />
            )}
            <span className="text-xs font-semibold leading-snug truncate">
              {toast.message}
            </span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#9A8F83] hover:text-white p-1 rounded-full transition-colors shrink-0"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
