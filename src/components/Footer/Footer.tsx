import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import { MapPin, Phone, MessageSquare, Mail, Clock, Instagram, Youtube, Globe, Heart } from 'lucide-react';
import { BrandLogo } from '../UI/BrandLogo';
import { useWebsite, pickText } from '../../context/WebsiteContext';

const PAYMENT_NAMES: Record<string, { en: string; ar: string }> = {
  cod: { en: 'Cash on Delivery', ar: 'الدفع عند الاستلام' },
  bank_transfer: { en: 'Bank Transfer', ar: 'تحويل بنكي' },
  stripe: { en: 'Card', ar: 'بطاقة' },
  paypal: { en: 'PayPal', ar: 'باي بال' },
};

export const Footer: React.FC = () => {
  const { language, t, paymentMethods } = useShop();
  // Contact details from admin brandConfig (Website Builder > Logo & Brand), else defaults.
  const { brand } = useWebsite();
  const phone = (brand.phone ?? '').trim();
  const whatsapp = (brand.whatsapp ?? '').trim();
  const email = (brand.email ?? '').trim();
  const digits = (v: string) => v.replace(/[^\d+]/g, '');
  const address = pickText(language, brand.addressEn, brand.addressAr, t('locationRiyadh'));
  const hours = pickText(language, brand.hoursEn, brand.hoursAr, t('workingHours'));

  return (
    <footer id="footer" className="hidden md:block bg-[#071A35] text-[#D5CEC0] pt-16 pb-12 border-t border-[#0A2344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Brand Statement & 5 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-14 border-b border-[#10294A]">
          
          {/* Brand Info (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="group w-fit">
              <BrandLogo size="lg" variant="light" />
            </Link>

            <p className="text-xs sm:text-sm text-[#B8B2A8] leading-relaxed max-w-sm">
              {t('footerAbout')}
            </p>

            <div className="pt-2 text-xs text-[#A8A29A] space-y-1">
              <div>{t('crNumber')}</div>
              <div>{t('vatNumber')}</div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#0B1F3A] hover:bg-[#B59460] hover:text-white flex items-center justify-center text-[#A8A29A] transition-colors border border-[#163257]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#0B1F3A] hover:bg-[#B59460] hover:text-white flex items-center justify-center text-[#A8A29A] transition-colors border border-[#163257]"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#0B1F3A] hover:bg-[#B59460] hover:text-white flex items-center justify-center text-[#A8A29A] transition-colors border border-[#163257]"
                aria-label="X"
              >
                <span className="font-bold text-xs">𝕏</span>
              </a>
            </div>
          </div>

          {/* Col 1: SHOP */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#14284A] pb-2">
              {t('colShop')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29A]">
              <li><Link href="/category/sofas" className="hover:text-[#B59460] transition-colors">{t('catSofas')}</Link></li>
              <li><Link href="/category/sectional-sofas" className="hover:text-[#B59460] transition-colors">{t('catSectionals')}</Link></li>
              <li><Link href="/category/majlis-sofas" className="hover:text-[#B59460] transition-colors">{t('catMajlis')}</Link></li>
              <li><Link href="/category/accent-chairs" className="hover:text-[#B59460] transition-colors">{t('catArmchairs')}</Link></li>
              <li><Link href="/category/curtains" className="hover:text-[#B59460] transition-colors">{t('catCurtains')}</Link></li>
              <li><Link href="/category/blackout-curtains" className="hover:text-[#B59460] transition-colors">{t('catBlackout')}</Link></li>
              <li><Link href="/offers" className="text-[#B59460] font-bold hover:underline">{t('navOffers')}</Link></li>
            </ul>
          </div>

          {/* Col 2: SERVICES */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#14284A] pb-2">
              {t('colServices')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29A]">
              <li><a href="#custom-service" className="hover:text-[#B59460] transition-colors">{t('catCustom')}</a></li>
              <li><a href="#consultation" className="hover:text-[#B59460] transition-colors">{language === 'ar' ? 'استشارة وتنسيق مجاني' : 'Free Design Consultation'}</a></li>
              <li><a href="#why-us" className="hover:text-[#B59460] transition-colors">{language === 'ar' ? 'توصيل وتركيب في الرياض' : 'Riyadh Delivery & Installation'}</a></li>
              <li><a href="#why-us" className="hover:text-[#B59460] transition-colors">{language === 'ar' ? 'أقمشة الكنب والستائر' : 'Sofa & Curtain Fabrics'}</a></li>
              <li><a href="#consultation" className="hover:text-[#B59460] transition-colors">{language === 'ar' ? 'مشاريع الفلل والقصور' : 'Villa Projects'}</a></li>
              <li><a href="#why-us" className="hover:text-[#B59460] transition-colors">{language === 'ar' ? 'خدمة الفنادق والمكاتب' : 'Hospitality & Commercial'}</a></li>
            </ul>
          </div>

          {/* Col 3: CUSTOMER CARE */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#14284A] pb-2">
              {t('colCustomerCare')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29A]">
              <li><Link href="/orders" className="hover:text-[#B59460] transition-colors font-semibold text-white">{t('trackOrder')}</Link></li>
              <li><Link href="/cart" className="hover:text-[#B59460] transition-colors">{language === 'ar' ? 'سلة التسوق' : 'Shopping Bag'}</Link></li>
              <li><Link href="/wishlist" className="hover:text-[#B59460] transition-colors">{language === 'ar' ? 'المفضلة وقائمة الأمنيات' : 'Wishlist'}</Link></li>
              <li><a href="#why-us" className="hover:text-[#B59460] transition-colors">{language === 'ar' ? 'سياسة الشحن والتوصيل' : 'Delivery & Shipping'}</a></li>
              <li><a href="#why-us" className="hover:text-[#B59460] transition-colors">{language === 'ar' ? 'الضمان والاستبدال' : 'Warranty & Returns'}</a></li>
              <li><a href="#why-us" className="hover:text-[#B59460] transition-colors">{language === 'ar' ? 'دليل القياس والتنسيق' : 'Sofa & Curtain Measuring Guide'}</a></li>
              <li><a href="#why-us" className="hover:text-[#B59460] transition-colors">{language === 'ar' ? 'العناية بالأقمشة والتنجيد' : 'Fabric & Upholstery Care'}</a></li>
              <li><a href="#consultation" className="hover:text-[#B59460] transition-colors">{language === 'ar' ? 'الأسئلة الشائعة' : 'FAQs'}</a></li>
            </ul>
          </div>

          {/* Col 4: CONTACT & RIYADH LOCATION */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#14284A] pb-2">
              {t('colContact')}
            </h4>
            <ul className="space-y-3 text-xs text-[#A8A29A]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B59460] shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B59460] shrink-0" />
                <a href={`tel:${phone ? digits(phone) : '+966114829900'}`} dir="ltr" className="hover:text-white transition-colors">{phone || t('phoneDisplay')}</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href={`https://wa.me/${whatsapp ? digits(whatsapp).replace(/^\+/, '') : '966559821100'}`} target="_blank" rel="noreferrer" dir="ltr" className="hover:text-white transition-colors">
                  {whatsapp || t('whatsappDisplay')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B59460] shrink-0" />
                <a href={`mailto:${email || 'concierge@sofalora.com'}`} className="hover:text-white transition-colors truncate">
                  {email || t('emailDisplay')}
                </a>
              </li>
              <li className="flex items-start gap-2 text-[11px] text-[#A8A29A] pt-1">
                <Clock className="w-4 h-4 text-[#B59460] shrink-0 mt-0.5" />
                <span>{hours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Saudi Payment Methods & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-xs text-[#A8A29A] text-center md:text-start">
            © {new Date().getFullYear()} {language === 'ar' ? 'سوفالورا' : 'Sofalora'}. {t('allRightsReserved')}
          </div>

          {/* Payment methods the store actually accepts (GET /storefront/checkout-settings) */}
          <div id="footer-payment-methods" className="flex flex-wrap items-center justify-center gap-2">
            {paymentMethods.map((m) => (
              <div key={m} className="h-7 px-2.5 bg-[#0B1F3A] border border-[#1D3557] rounded-md flex items-center justify-center text-[10px] font-bold tracking-wide text-[#D9C29A]">
                {PAYMENT_NAMES[m]?.[language] ?? m.replace(/_/g, ' ')}
              </div>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
};
