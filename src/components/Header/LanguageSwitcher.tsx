import React, { useEffect, useRef, useState } from 'react';
import { useShop } from '../../context/LanguageContext';

/** UK flag (English). */
export const FlagUK: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
    <clipPath id="sf-uk-c"><rect width="60" height="40" rx="4" /></clipPath>
    <g clipPath="url(#sf-uk-c)">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="3" />
      <path d="M30 0V40M0 20H60" stroke="#fff" strokeWidth="12" />
      <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="7" />
    </g>
  </svg>
);

/** Saudi flag (Arabic), stylised: green field, white script band and sword. */
export const FlagSA: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
    <rect width="60" height="40" rx="4" fill="#006C35" />
    <g fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 17c2-3 3 2 5-1s2 2 4 0 2-3 4 0 3 1 4-1 2 2 4 0 2-2 4 1 2-1 3-2" />
      <path d="M17 12v4M23 11v5M31 11v6M38 12v4M44 11v5" />
    </g>
    <path d="M15 26h28l4-1.6v3.2L43 26" stroke="#fff" strokeWidth="1.8" fill="#fff" strokeLinejoin="round" />
    <path d="M17 24.5v3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const OPTIONS = [
  { code: 'en' as const, label: 'English', Flag: FlagUK },
  { code: 'ar' as const, label: 'العربية', Flag: FlagSA },
];

/** Icon-only language switcher: current flag button, flag dropdown on hover or click. */
export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useShop();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const t = useRef<number | undefined>(undefined);
  const Current = language === 'ar' ? FlagSA : FlagUK;
  const label = language === 'ar' ? 'اللغة: العربية' : 'Language: English';

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', away);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', away); document.removeEventListener('keydown', esc); };
  }, [open]);

  const enter = () => { window.clearTimeout(t.current); setOpen(true); };
  const leave = () => { window.clearTimeout(t.current); t.current = window.setTimeout(() => setOpen(false), 160); };

  return (
    <div ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        title={label}
        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B25E] ${open ? 'border-[#D8B25E] bg-white/15' : 'border-white/25 bg-white/5 hover:border-[#D8B25E] hover:bg-white/10'}`}
      >
        <Current className="h-[15px] w-[22px] rounded-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.35)]" />
      </button>
      <div
        role="menu"
        aria-label={language === 'ar' ? 'اختيار اللغة' : 'Select language'}
        className={`absolute end-0 top-full z-50 pt-2 transition-all duration-150 ease-out ${open ? 'visible translate-y-0 opacity-100' : 'invisible pointer-events-none -translate-y-1 opacity-0'}`}
      >
        <div className="flex gap-1 rounded-[14px] border border-[#E9E4DA] bg-white p-1.5 shadow-[0_16px_34px_-14px_rgba(7,26,53,0.5)]">
          {OPTIONS.map(({ code, label: l, Flag }) => (
            <button
              key={code}
              type="button"
              role="menuitemradio"
              aria-checked={language === code}
              aria-label={l}
              title={l}
              tabIndex={open ? 0 : -1}
              onClick={() => { setLanguage(code); setOpen(false); }}
              className={`flex h-10 w-12 items-center justify-center rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D4F] ${language === code ? 'bg-[#0B2345]/[0.07] ring-1 ring-[#0B2345]/30' : 'hover:bg-[#F3EEE5]'}`}
            >
              <Flag className="h-[18px] w-[27px] rounded-[2px] shadow-[0_0_0_1px_rgba(11,35,69,0.12)]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
