import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import { MapPin, Phone, MessageSquare, Mail, Clock, Instagram, Youtube, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useShop();

  return (
    <footer id="footer" className="bg-[#121714] text-[#D8C8B6] pt-16 pb-12 border-t border-[#252C27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Brand Statement & 5 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-14 border-b border-[#28302A]">
          
          {/* Brand Info (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-white font-serif-luxury">
                {language === 'ar' ? 'سوفالورا' : 'SOFALORA'}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B85C3A] font-medium -mt-0.5">
                {language === 'ar' ? 'الرياض • المملكة العربية السعودية' : 'RIYADH • KINGDOM OF SAUDI ARABIA'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A0968A] leading-relaxed max-w-sm">
              {t('footerAbout')}
            </p>

            <div className="pt-2 text-xs text-[#857B6F] space-y-1">
              <div>{t('crNumber')}</div>
              <div>{t('vatNumber')}</div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#202722] hover:bg-[#B85C3A] hover:text-white flex items-center justify-center text-[#B2A79A] transition-colors border border-[#2F3731]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#202722] hover:bg-[#B85C3A] hover:text-white flex items-center justify-center text-[#B2A79A] transition-colors border border-[#2F3731]"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#202722] hover:bg-[#B85C3A] hover:text-white flex items-center justify-center text-[#B2A79A] transition-colors border border-[#2F3731]"
                aria-label="X"
              >
                <span className="font-bold text-xs">𝕏</span>
              </a>
            </div>
          </div>

          {/* Col 1: SHOP */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#2B332D] pb-2">
              {t('colShop')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B2A79A]">
              <li><Link href="/category/sofas" className="hover:text-[#B85C3A] transition-colors">{t('catSofas')}</Link></li>
              <li><Link href="/category/sectional-sofas" className="hover:text-[#B85C3A] transition-colors">{t('catSectionals')}</Link></li>
              <li><Link href="/category/majlis-sofas" className="hover:text-[#B85C3A] transition-colors">{t('catMajlis')}</Link></li>
              <li><Link href="/category/accent-chairs" className="hover:text-[#B85C3A] transition-colors">{t('catArmchairs')}</Link></li>
              <li><Link href="/category/curtains" className="hover:text-[#B85C3A] transition-colors">{t('catCurtains')}</Link></li>
              <li><Link href="/category/blackout-curtains" className="hover:text-[#B85C3A] transition-colors">{t('catBlackout')}</Link></li>
              <li><Link href="/offers" className="text-[#B85C3A] font-bold hover:underline">{t('navOffers')}</Link></li>
            </ul>
          </div>

          {/* Col 2: SERVICES */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#2B332D] pb-2">
              {t('colServices')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B2A79A]">
              <li><a href="#custom-service" className="hover:text-[#B85C3A] transition-colors">{t('catCustom')}</a></li>
              <li><a href="#consultation" className="hover:text-[#B85C3A] transition-colors">{language === 'ar' ? 'استشارة وتنسيق مجاني' : 'Free Design Consultation'}</a></li>
              <li><a href="#why-us" className="hover:text-[#B85C3A] transition-colors">{language === 'ar' ? 'توصيل وتركيب في الرياض' : 'Riyadh Delivery & Installation'}</a></li>
              <li><a href="#why-us" className="hover:text-[#B85C3A] transition-colors">{language === 'ar' ? 'أقمشة الكنب والستائر' : 'Sofa & Curtain Fabrics'}</a></li>
              <li><a href="#consultation" className="hover:text-[#B85C3A] transition-colors">{language === 'ar' ? 'مشاريع الفلل والقصور' : 'Villa Projects'}</a></li>
              <li><a href="#why-us" className="hover:text-[#B85C3A] transition-colors">{language === 'ar' ? 'خدمة الفنادق والمكاتب' : 'Hospitality & Commercial'}</a></li>
            </ul>
          </div>

          {/* Col 3: CUSTOMER CARE */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#2B332D] pb-2">
              {t('colCustomerCare')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B2A79A]">
              <li><Link href="/orders" className="hover:text-[#B85C3A] transition-colors font-semibold text-white">{t('trackOrder')}</Link></li>
              <li><Link href="/cart" className="hover:text-[#B85C3A] transition-colors">{language === 'ar' ? 'سلة التسوق' : 'Shopping Bag'}</Link></li>
              <li><Link href="/wishlist" className="hover:text-[#B85C3A] transition-colors">{language === 'ar' ? 'المفضلة وقائمة الأمنيات' : 'Wishlist'}</Link></li>
              <li><a href="#why-us" className="hover:text-[#B85C3A] transition-colors">{language === 'ar' ? 'سياسة الشحن والتوصيل' : 'Delivery & Shipping'}</a></li>
              <li><a href="#why-us" className="hover:text-[#B85C3A] transition-colors">{language === 'ar' ? 'الضمان والاستبدال' : 'Warranty & Returns'}</a></li>
              <li><a href="#why-us" className="hover:text-[#B85C3A] transition-colors">{language === 'ar' ? 'دليل القياس والتنسيق' : 'Sofa & Curtain Measuring Guide'}</a></li>
              <li><a href="#why-us" className="hover:text-[#B85C3A] transition-colors">{language === 'ar' ? 'العناية بالأقمشة والتنجيد' : 'Fabric & Upholstery Care'}</a></li>
              <li><a href="#consultation" className="hover:text-[#B85C3A] transition-colors">{language === 'ar' ? 'الأسئلة الشائعة' : 'FAQs'}</a></li>
            </ul>
          </div>

          {/* Col 4: CONTACT & RIYADH LOCATION */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#2B332D] pb-2">
              {t('colContact')}
            </h4>
            <ul className="space-y-3 text-xs text-[#B2A79A]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B85C3A] shrink-0 mt-0.5" />
                <span>{t('locationRiyadh')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B85C3A] shrink-0" />
                <a href="tel:+966114829900" dir="ltr" className="hover:text-white transition-colors">{t('phoneDisplay')}</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href="https://wa.me/966559821100" target="_blank" rel="noreferrer" dir="ltr" className="hover:text-white transition-colors">
                  {t('whatsappDisplay')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B85C3A] shrink-0" />
                <a href="mailto:concierge@sofalora.com" className="hover:text-white transition-colors truncate">
                  {t('emailDisplay')}
                </a>
              </li>
              <li className="flex items-start gap-2 text-[11px] text-[#857B6F] pt-1">
                <Clock className="w-4 h-4 text-[#B85C3A] shrink-0 mt-0.5" />
                <span>{t('workingHours')}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Saudi Payment Methods & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-xs text-[#857B6F] text-center md:text-start">
            © {new Date().getFullYear()} {language === 'ar' ? 'سوفالورا' : 'Sofalora'}. {t('allRightsReserved')}
          </div>

          {/* Saudi Payment Placeholders */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            
            {/* mada */}
            <div className="h-7 px-2.5 bg-[#202722] border border-[#313A33] rounded-md flex items-center justify-center text-[10px] font-black tracking-wider text-[#4BB543]">
              mada مدى
            </div>

            {/* Visa */}
            <div className="h-7 px-2.5 bg-[#202722] border border-[#313A33] rounded-md flex items-center justify-center text-[11px] font-black text-white italic">
              VISA
            </div>

            {/* Mastercard */}
            <div className="h-7 px-2.5 bg-[#202722] border border-[#313A33] rounded-md flex items-center justify-center text-[10px] font-bold text-[#EB001B]">
              Mastercard
            </div>

            {/* Apple Pay */}
            <div className="h-7 px-2.5 bg-[#202722] border border-[#313A33] rounded-md flex items-center justify-center text-[11px] font-bold text-white">
               Pay
            </div>

            {/* STC Pay */}
            <div className="h-7 px-2.5 bg-[#202722] border border-[#313A33] rounded-md flex items-center justify-center text-[10px] font-black text-[#5C2D91]">
              stc pay
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};
