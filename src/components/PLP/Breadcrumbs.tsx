import React from 'react';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';

export interface BreadcrumbItem {
  label: { en: string; ar: string };
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const { language, direction } = useShop();
  const Chevron = direction === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs text-[#827568] flex-wrap gap-1.5 py-3 ${className}`}
    >
      <Link
        href="/"
        className="flex items-center gap-1 text-[#665D53] hover:text-[#8F3E24] transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <Chevron className="w-3.5 h-3.5 text-[#B8ADA0] shrink-0" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-[#665D53] hover:text-[#8F3E24] transition-colors truncate max-w-[160px] sm:max-w-none"
              >
                {item.label[language]}
              </Link>
            ) : (
              <span
                className="font-semibold text-[#1B211D] truncate max-w-[200px] sm:max-w-none"
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label[language]}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
