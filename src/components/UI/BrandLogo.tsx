import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { useWebsite, pickText, cmsImage } from '../../context/WebsiteContext';

const DEFAULT_NAMES = new Set(['sofalora', 'سوفالورا']);

type BrandLogoSize = 'sm' | 'md' | 'lg';

interface BrandLogoProps {
  size?: BrandLogoSize;
  variant?: 'dark' | 'light';
  showTagline?: boolean;
  hideTaglineOnMobile?: boolean;
  className?: string;
}

const wordmarkClasses: Record<BrandLogoSize, string> = {
  sm: 'text-[1.05rem]',
  md: 'text-[1.3rem] sm:text-[1.55rem]',
  lg: 'text-[1.6rem] sm:text-[1.95rem]',
};

const taglineClasses: Record<BrandLogoSize, string> = {
  sm: 'text-[8px]',
  md: 'text-[8.5px] sm:text-[9.5px]',
  lg: 'text-[8.5px] sm:text-[9.5px] mt-0.5',
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showTagline = false,
  hideTaglineOnMobile = false,
  className = '',
}) => {
  const { language } = useShop();
  const isAr = language === 'ar';
  // Admin brandConfig (Website Builder > Logo & Brand): logo image, name, tagline.
  const { brand } = useWebsite();
  const logoUrl = cmsImage(brand.logoUrl);
  const customName = pickText(language, brand.nameEn, brand.nameAr);
  const useCustomName = customName !== '' && !DEFAULT_NAMES.has(customName.toLowerCase());
  const tagline = pickText(
    language,
    brand.taglineEn,
    brand.taglineAr,
    isAr ? 'الرياض • أتيليه الكنب والستائر' : 'RIYADH • SOFA & CURTAIN ATELIER'
  );

  if (logoUrl) {
    const width = Math.min(280, Math.max(50, Number(brand.logoWidth) || 120));
    return (
      <span className={`brand-logo ${className}`}>
        <img
          src={logoUrl}
          alt={customName || (isAr ? 'سوفالورا' : 'Sofalora')}
          style={{ width: size === 'sm' ? Math.round(width * 0.8) : width, height: 'auto' }}
          className="block max-h-14 object-contain"
        />
      </span>
    );
  }

  return (
    <span className={`brand-logo ${className}`}>
      <span className="hidden min-[360px]:flex flex-col items-start">
        <span
          className={`brand-wordmark ${
            variant === 'light' ? 'brand-wordmark--light text-white' : 'text-[#0B2345]'
          } ${wordmarkClasses[size]} transition-colors duration-300`}
        >
          {useCustomName ? (
            <span>{customName}</span>
          ) : isAr ? (
            <>
              <span>سوفا</span>
              <span className="brand-wordmark-accent">لورا</span>
            </>
          ) : (
            <>
              <span>SOFA</span>
              <span className="brand-wordmark-accent">LORA</span>
            </>
          )}
        </span>

        {showTagline && (
          <span
            className={`${taglineClasses[size]} ${
              hideTaglineOnMobile ? 'hidden sm:block' : 'block'
            } brand-tagline ${
              variant === 'light' ? 'text-[#C9A96E]/85' : 'text-[#6B7280]'
            } transition-colors`}
          >
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
};
