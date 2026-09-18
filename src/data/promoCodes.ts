import { PromoCode, DeliveryMethodOption } from '../types';

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'WELCOME10',
    discountPercent: 10,
    description: {
      en: '10% Welcome Discount on your first luxury curtain order',
      ar: 'خصم ترحيبي ١٠٪ على أول طلب ستائر فاخرة'
    }
  },
  {
    code: 'CURTAIN15',
    discountPercent: 15,
    description: {
      en: '15% Seasonal Curtains Promotion for Riyadh residences',
      ar: 'خصم موسمي ١٥٪ لستائر المنازل والفلل بالرياض'
    }
  },
  {
    code: 'HOME20',
    discountPercent: 20,
    description: {
      en: '20% Home Luxury Makeover discount for orders over SAR 1,000',
      ar: 'خصم ٢٠٪ لتجديد ستائر المنزل الفاخر للطلبات فوق ١٠٠٠ ر.س'
    },
    minOrder: 1000
  },
  {
    code: 'SUMMER50',
    discountPercent: 50,
    description: {
      en: 'Expired Summer Clearance Code',
      ar: 'كوبون التخفيضات الصيفية المنتهي'
    },
    isExpired: true
  }
];

export const VALID_DELIVERY_METHODS: DeliveryMethodOption[] = [
  {
    id: 'standard',
    name: { en: 'Standard Delivery & Installation', ar: 'توصيل وتركيب قياسي' },
    description: { en: 'Within 2-4 business days across all Riyadh districts', ar: 'خلال ٢-٤ أيام عمل لجميع أحياء الرياض' },
    price: 25,
    freeThreshold: 500,
    estimatedTime: { en: '2-4 Days', ar: '٢-٤ أيام' }
  },
  {
    id: 'express',
    name: { en: 'Express Next-Day Delivery', ar: 'توصيل سريع خلال ٢٤ ساعة' },
    description: { en: 'Priority dispatch and installation within Riyadh', ar: 'أولوية شحن وتركيب عاجل داخل مدينة الرياض' },
    price: 45,
    freeThreshold: null,
    estimatedTime: { en: '24-48 Hours', ar: '٢٤-٤٨ ساعة' }
  },
  {
    id: 'pickup',
    name: { en: 'Showroom Pickup (King Fahd Rd)', ar: 'استلام من المعرض الرئيسي (طريق الملك فهد)' },
    description: { en: 'Ready in 24 hours at Mohammad Curtains Flagship', ar: 'جاهز للاستلام خلال ٢٤ ساعة من معرضنا بالرياض' },
    price: 0,
    freeThreshold: 0,
    estimatedTime: { en: 'Same Day', ar: 'نفس اليوم' }
  }
];
