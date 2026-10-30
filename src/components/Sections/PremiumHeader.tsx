import React from 'react';
import { Link } from '../../context/RouterContext';

/** Shared premium section header: gold eyebrow, bold Figtree title, grey subline, "View all" pill. */
export const PremiumHeader: React.FC<{ eyebrow?: string; title: string; subtitle?: string; href?: string; viewAll?: string; right?: React.ReactNode }> = ({ eyebrow, title, subtitle, href, viewAll, right }) => (
  <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
    <div className="min-w-0 max-w-[720px]">
      {eyebrow && <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#B08D4F] rtl:tracking-normal">{eyebrow}</span>}
      <h2 className="text-[24px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#0B2345] sm:text-[28px] rtl:tracking-normal">{title}</h2>
      {subtitle && <p className="mt-1.5 text-[14px] leading-relaxed text-[#6B7280] sm:text-[15px]">{subtitle}</p>}
    </div>
    <div className="flex items-center gap-2">
      {right}
      {href && viewAll && (
        <Link href={href} className="inline-flex h-9 items-center gap-1 rounded-full border-[1.5px] border-[#0B2345] px-4 text-[12.5px] font-semibold text-[#0B2345] transition-colors hover:bg-[#0B2345] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D4F] focus-visible:ring-offset-2">
          {viewAll} <span aria-hidden className="inline-block rtl:rotate-180">→</span>
        </Link>
      )}
    </div>
  </div>
);
