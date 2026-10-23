import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { Tag, Scissors, ShieldCheck } from 'lucide-react';
import { Link } from '../../context/RouterContext';

export const Navigation: React.FC = () => {
  const { t, openConsultation } = useShop();

  return (
    <nav className="hidden lg:block bg-[#FAFAF8] border-b border-[#E5E1D8] relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-between gap-1 xl:gap-2 text-[13px] font-medium text-[#1F2937] py-0">

          {/* Home */}
          <li>
            <Link
              href="/"
              className="inline-flex items-center py-3.5 px-2.5 text-[#0A2A5E] font-semibold border-b-2 border-[#C8102E] transition-colors"
            >
              {t('navHome')}
            </Link>
          </li>

          {/* Sofas */}
          <li>
            <Link
              href="/category/sofas"
              className="inline-flex items-center py-3.5 px-2.5 hover:text-[#0A2A5E] transition-colors"
            >
              {t('navSofas')}
            </Link>
          </li>

          {/* Majlis */}
          <li>
            <Link
              href="/category/majlis-sofas"
              className="py-3.5 px-2 hover:text-[#0A2A5E] transition-colors"
            >
              {t('navMajlis')}
            </Link>
          </li>

          {/* Curtains */}
          <li>
            <Link
              href="/category/curtains"
              className="py-3.5 px-2.5 hover:text-[#0A2A5E] transition-colors"
            >
              {t('navCurtains')}
            </Link>
          </li>

          {/* Pairings */}
          <li>
            <Link
              href="/shop"
              className="py-3.5 px-2 hover:text-[#0A2A5E] transition-colors"
            >
              {t('navPairings')}
            </Link>
          </li>

          {/* Atelier */}
          <li>
            <Link
              href="/category/custom-curtains"
              className="inline-flex items-center gap-1.5 py-3.5 px-2.5 font-semibold text-[#101828] hover:text-[#0A2A5E] transition-colors"
            >
              <Scissors className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>{t('navCustom')}</span>
            </Link>
          </li>

          {/* New Arrivals */}
          <li>
            <Link
              href="/new-arrivals"
              className="py-3.5 px-2 hover:text-[#0A2A5E] transition-colors"
            >
              {t('navNewArrivals')}
            </Link>
          </li>

          {/* Offers */}
          <li>
            <Link
              href="/offers"
              className="inline-flex items-center gap-1 py-3.5 px-2 text-[#0A2A5E] font-semibold hover:text-[#C8102E] transition-colors"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>{t('navOffers')}</span>
            </Link>
          </li>

          {/* Free Design Consultation */}
          <li>
            <button
              onClick={openConsultation}
              className="brand-gradient inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-semibold text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('navServices')}</span>
            </button>
          </li>

        </ul>
      </div>
    </nav>
  );
};
