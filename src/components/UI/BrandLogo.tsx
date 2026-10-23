import React, { useId } from 'react';
import { useShop } from '../../context/LanguageContext';

type BrandLogoSize = 'sm' | 'md' | 'lg';

interface BrandLogoProps {
  size?: BrandLogoSize;
  variant?: 'dark' | 'light';
  showTagline?: boolean;
  hideTaglineOnMobile?: boolean;
  className?: string;
}

const markClasses: Record<BrandLogoSize, string> = {
  sm: 'w-8 h-8',
  md: 'w-9 h-9 sm:w-10 sm:h-10',
  lg: 'w-11 h-11 sm:w-12 sm:h-12',
};

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
  const uid = useId().replace(/:/g, '');
  const bgId = `sofalora-bg-${uid}`;
  const goldId = `sofalora-gold-${uid}`;

  return (
    <span className={`brand-logo ${className}`}>
      <svg
        className={`${markClasses[size]} shrink-0 drop-shadow-[0_6px_14px_rgba(10,42,94,0.22)]`}
        viewBox="0 0 48 48"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={bgId} x1="7" y1="3" x2="42" y2="46" gradientUnits="userSpaceOnUse">
            <stop stopColor="#17498F" />
            <stop offset="0.55" stopColor="#0A2A5E" />
            <stop offset="1" stopColor="#061C3F" />
          </linearGradient>
          <linearGradient id={goldId} x1="8" y1="6" x2="41" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0D8A4" />
            <stop offset="0.5" stopColor="#C6A15B" />
            <stop offset="1" stopColor="#8A6A2F" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="46" height="46" rx="14" fill={`url(#${bgId})`} />
        <rect x="1" y="1" width="46" height="46" rx="14" stroke={`url(#${goldId})`} strokeOpacity="0.55" />
        <path
          d="M9 38.5V22.6C9 13.53 15.72 6.25 24 6.25S39 13.53 39 22.6v15.9"
          stroke={`url(#${goldId})`}
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <text
          x="23.5"
          y="33.8"
          textAnchor="middle"
          fontFamily="Fraunces, Georgia, serif"
          fontSize="27"
          fontStyle="italic"
          fontWeight="600"
          fill={`url(#${goldId})`}
        >
          S
        </text>
        <path d="M12.5 38.5h23" stroke={`url(#${goldId})`} strokeWidth="2.1" strokeLinecap="round" />
        <circle cx="36.4" cy="13.6" r="1.8" fill="#EC1E27" />
      </svg>

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
