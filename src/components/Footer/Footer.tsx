import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import { MapPin, Phone, MessageSquare, Mail, Clock, Instagram, Youtube, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useShop();

  return (
    <footer id="footer" className="bg-[#141210] text-[#D8CEBF] pt-16 pb-12 border-t border-[#26221E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Brand Statement & 5 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-14 border-b border-[#282420]">
          
          {/* Brand Info (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-white font-serif-luxury">
                {language === 'ar' ? 'ستائر محمد' : 'MOHAMMAD CURTAINS'}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C49E5D] font-medium -mt-0.5">
                {language === 'ar' ? 'الرياض • المملكة العربية السعودية' : 'RIYADH • KINGDOM OF SAUDI ARABIA'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A39688] leading-relaxed max-w-sm">
              {t('footerAbout')}
            </p>

            <div className="pt-2 text-xs text-[#8C7D6E] space-y-1">
              <div>{t('crNumber')}</div>
              <div>{t('vatNumber')}</div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#201C18] hover:bg-[#C49E5D] hover:text-[#141210] flex items-center justify-center text-[#B5A99B] transition-colors border border-[#302B25]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#201C18] hover:bg-[#C49E5D] hover:text-[#141210] flex items-center justify-center text-[#B5A99B] transition-colors border border-[#302B25]"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#201C18] hover:bg-[#C49E5D] hover:text-[#141210] flex items-center justify-center text-[#B5A99B] transition-colors border border-[#302B25]"
                aria-label="X"
              >
                <span className="font-bold text-xs">𝕏</span>
              </a>
            </div>
          </div>

          {/* Col 1: SHOP */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#2C2721] pb-2">
              {t('colShop')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5A99B]">
              <li><Link href="/category/curtains" className="hover:text-[#C49E5D] transition-colors">{t('catCurtains')}</Link></li>
              <li><Link href="/category/blackout-curtains" className="hover:text-[#C49E5D] transition-colors">{t('catBlackout')}</Link></li>
              <li><Link href="/category/sheer-curtains" className="hover:text-[#C49E5D] transition-colors">{t('catSheer')}</Link></li>
              <li><Link href="/category/roller-blinds" className="hover:text-[#C49E5D] transition-colors">{t('catRoller')}</Link></li>
              <li><Link href="/category/roman-blinds" className="hover:text-[#C49E5D] transition-colors">{t('catRoman')}</Link></li>
              <li><Link href="/category/zebra-blinds" className="hover:text-[#C49E5D] transition-colors">{t('catZebra')}</Link></li>
              <li><Link href="/offers" className="text-[#C49E5D] font-bold hover:underline">{t('navOffers')}</Link></li>
            </ul>
          </div>

          {/* Col 2: SERVICES */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#2C2721] pb-2">
              {t('colServices')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5A99B]">
              <li><a href="#custom-service" className="hover:text-[#C49E5D] transition-colors">{t('catCustom')}</a></li>
              <li><a href="#consultation" className="hover:text-[#C49E5D] transition-colors">{language === 'ar' ? 'القياس المنزلي المجاني' : 'Free In-Home Measurement'}</a></li>
              <li><a href="#why-us" className="hover:text-[#C49E5D] transition-colors">{language === 'ar' ? 'التركيب المعتمد بالرياض' : 'Riyadh Rail Installation'}</a></li>
              <li><a href="#why-us" className="hover:text-[#C49E5D] transition-colors">{language === 'ar' ? 'محركات الستائر الذكية' : 'Smart Somfy Motorization'}</a></li>
              <li><a href="#consultation" className="hover:text-[#C49E5D] transition-colors">{language === 'ar' ? 'عقود الفلل والقصور' : 'Villa Contracts'}</a></li>
              <li><a href="#why-us" className="hover:text-[#C49E5D] transition-colors">{language === 'ar' ? 'خدمة الفنادق والمكاتب' : 'Hospitality & Commercial'}</a></li>
            </ul>
          </div>

          {/* Col 3: CUSTOMER CARE */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#2C2721] pb-2">
              {t('colCustomerCare')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5A99B]">
              <li><Link href="/orders" className="hover:text-[#C49E5D] transition-colors font-semibold text-white">{t('trackOrder')}</Link></li>
              <li><Link href="/cart" className="hover:text-[#C49E5D] transition-colors">{language === 'ar' ? 'سلة التسوق' : 'Shopping Bag'}</Link></li>
              <li><Link href="/wishlist" className="hover:text-[#C49E5D] transition-colors">{language === 'ar' ? 'المفضلة وقائمة الأمنيات' : 'Wishlist'}</Link></li>
              <li><a href="#why-us" className="hover:text-[#C49E5D] transition-colors">{language === 'ar' ? 'سياسة الشحن والتوصيل' : 'Delivery & Shipping'}</a></li>
              <li><a href="#why-us" className="hover:text-[#C49E5D] transition-colors">{language === 'ar' ? 'الضمان والاستبدال' : 'Warranty & Returns'}</a></li>
              <li><a href="#why-us" className="hover:text-[#C49E5D] transition-colors">{language === 'ar' ? 'دليل قياس النوافذ' : 'Window Measuring Guide'}</a></li>
              <li><a href="#why-us" className="hover:text-[#C49E5D] transition-colors">{language === 'ar' ? 'العناية بالأقمشة والغسيل' : 'Fabric Care Instructions'}</a></li>
              <li><a href="#consultation" className="hover:text-[#C49E5D] transition-colors">{language === 'ar' ? 'الأسئلة الشائعة' : 'FAQs'}</a></li>
            </ul>
          </div>

          {/* Col 4: CONTACT & RIYADH LOCATION */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#2C2721] pb-2">
              {t('colContact')}
            </h4>
            <ul className="space-y-3 text-xs text-[#B5A99B]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C49E5D] shrink-0 mt-0.5" />
                <span>{t('locationRiyadh')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C49E5D] shrink-0" />
                <a href="tel:+966114829900" dir="ltr" className="hover:text-white transition-colors">{t('phoneDisplay')}</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href="https://wa.me/966559821100" target="_blank" rel="noreferrer" dir="ltr" className="hover:text-white transition-colors">
                  {t('whatsappDisplay')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C49E5D] shrink-0" />
                <a href="mailto:concierge@mohammadcurtains.sa" className="hover:text-white transition-colors truncate">
                  {t('emailDisplay')}
                </a>
              </li>
              <li className="flex items-start gap-2 text-[11px] text-[#8C7D6E] pt-1">
                <Clock className="w-4 h-4 text-[#C49E5D] shrink-0 mt-0.5" />
                <span>{t('workingHours')}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Saudi Payment Methods & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-xs text-[#8C7D6E] text-center md:text-start">
            © {new Date().getFullYear()} {language === 'ar' ? 'ستائر محمد' : 'Mohammad Curtains'}. {t('allRightsReserved')}
          </div>

          {/* Saudi Payment Placeholders */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            
            {/* mada */}
            <div className="h-7 px-2.5 bg-[#201C18] border border-[#322C25] rounded-md flex items-center justify-center text-[10px] font-black tracking-wider text-[#4BB543]">
              mada مدى
            </div>

            {/* Visa */}
            <div className="h-7 px-2.5 bg-[#201C18] border border-[#322C25] rounded-md flex items-center justify-center text-[11px] font-black text-white italic">
              VISA
            </div>

            {/* Mastercard */}
            <div className="h-7 px-2.5 bg-[#201C18] border border-[#322C25] rounded-md flex items-center justify-center text-[10px] font-bold text-[#EB001B]">
              Mastercard
            </div>

            {/* Apple Pay */}
            <div className="h-7 px-2.5 bg-[#201C18] border border-[#322C25] rounded-md flex items-center justify-center text-[11px] font-bold text-white">
               Pay
            </div>

            {/* STC Pay */}
            <div className="h-7 px-2.5 bg-[#201C18] border border-[#322C25] rounded-md flex items-center justify-center text-[10px] font-black text-[#5C2D91]">
              stc pay
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};
