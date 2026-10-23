import React from 'react';
import { useShop } from '../../context/LanguageContext';

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
  lg: 'text-[1.8rem] sm:text-[2.1rem]',
};

const taglineClasses: Record<BrandLogoSize, string> = {
  sm: 'text-[8px]',
  md: 'text-[8.5px] sm:text-[9.5px]',
  lg: 'text-[9.5px] sm:text-[10.5px]',
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showTagline = true,
  hideTaglineOnMobile = false,
  className = '',
}) => {
  const { language } = useShop();
  const isAr = language === 'ar';

  return (
    <span className={`brand-logo ${className}`}>
      <span className="hidden min-[360px]:flex flex-col items-start">
        <span
          className={`brand-wordmark ${
            variant === 'light' ? 'brand-wordmark--light text-white' : 'text-[#0A2A5E]'
          } ${wordmarkClasses[size]} transition-colors duration-300`}
        >
          {isAr ? (
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
              variant === 'light' ? 'text-[#C9C3B8]' : 'text-[#6B7280]'
            } transition-colors`}
          >
            {isAr ? 'الرياض • أتيليه الكنب والستائر' : 'RIYADH • SOFA & CURTAIN ATELIER'}
          </span>
        )}
      </span>
    </span>
  );
};
