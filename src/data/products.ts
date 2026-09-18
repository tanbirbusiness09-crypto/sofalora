import { Product, Category, RoomCategory, Testimonial, InspirationItem } from '../types';
import { CURTAIN_PRODUCTS } from './catalogCurtains';
import { BLINDS_PRODUCTS } from './catalogBlinds';
import { ACCESSORIES_PRODUCTS } from './catalogAccessories';
import { MORE_PRODUCTS } from './catalogMoreProducts';

export const CATEGORIES: Category[] = [
  {
    id: 'curtains',
    slug: 'curtains',
    title: { en: 'Curtains', ar: 'الستائر الفاخرة' },
    subtitle: { en: 'Flowing drapes & tailor-made panels', ar: 'ستائر متهدلة بتفصيل ملكي أنيق' },
    itemCount: 42,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'blackout',
    slug: 'blackout-curtains',
    title: { en: 'Blackout Curtains', ar: 'الستائر المعتمة' },
    subtitle: { en: '100% Light blocking & thermal isolation', ar: 'عزل تام للضوء والحرارة والوهج' },
    itemCount: 28,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sheer',
    slug: 'sheer-curtains',
    title: { en: 'Sheer Curtains', ar: 'الستائر الشفافة' },
    subtitle: { en: 'Filtered natural daylight & gentle privacy', ar: 'ترشيح لطيف لضوء النهار الطبيعي' },
    itemCount: 35,
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'ready-made',
    slug: 'ready-made-curtains',
    title: { en: 'Ready Made Curtains', ar: 'ستائر جاهزة للتركيب' },
    subtitle: { en: 'Pre-stitched elegant panels ready to hang', ar: 'ستائر مجهزة مسبقاً وسهلة التعليق فوراً' },
    itemCount: 26,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'custom',
    slug: 'custom-curtains',
    title: { en: 'Custom Curtains', ar: 'ستائر حسب الطلب' },
    subtitle: { en: 'Bespoke designs cut to your exact windows', ar: 'تفصيل خاص لأدق مقاسات النوافذ' },
    itemCount: 50,
    image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'roller',
    slug: 'roller-blinds',
    title: { en: 'Roller Blinds', ar: 'الستائر الرول' },
    subtitle: { en: 'Sleek minimalist window shading', ar: 'حلول عصرية بلمسة انسيابية نظيفة' },
    itemCount: 24,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'roman',
    slug: 'roman-blinds',
    title: { en: 'Roman Blinds', ar: 'الستائر الرومانية' },
    subtitle: { en: 'Tailored architectural fabric folds', ar: 'طيات قماشية متدرجة بفخامة هندسية' },
    itemCount: 19,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'zebra',
    slug: 'zebra-blinds',
    title: { en: 'Zebra Blinds', ar: 'ستائر الزيبرا' },
    subtitle: { en: 'Dual-layer daytime & nighttime control', ar: 'طبقات مزدوجة للتحكم في الإضاءة' },
    itemCount: 16,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'accessories',
    slug: 'accessories',
    title: { en: 'Curtain Accessories', ar: 'إكسسوارات الستائر' },
    subtitle: { en: 'Tracks, motors, tiebacks & rods', ar: 'مجاري، محركات، أربطة وقضبان نحاسية' },
    itemCount: 30,
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'office',
    slug: 'office-blinds',
    title: { en: 'Office Blinds', ar: 'ستائر المكاتب' },
    subtitle: { en: 'Smart anti-glare shading for workspaces', ar: 'مقاومة التوهج لبيئات العمل الاحترافية' },
    itemCount: 22,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'
  }
];

export const PRODUCTS: Product[] = [
  ...CURTAIN_PRODUCTS,
  ...BLINDS_PRODUCTS,
  ...ACCESSORIES_PRODUCTS,
  ...MORE_PRODUCTS
];

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: 'living',
    title: { en: 'Living Room & Majlis', ar: 'غرفة المعيشة والمجلس' },
    subtitle: { en: 'Grand drapes creating welcoming Saudi hospitality', ar: 'ستائر فخمة تعكس كرم الضيافة السعودية' },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    recommendedType: { en: 'Velvet Drapes + Organza Sheer', ar: 'مخمل ملكي + شيفون إيطالي' }
  },
  {
    id: 'bedroom',
    title: { en: 'Master Bedroom', ar: 'غرفة النوم الرئيسية' },
    subtitle: { en: 'Absolute darkness & peaceful desert tranquility', ar: 'عتمة تامة ونوم هانئ بعيداً عن حرارة النهار' },
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    recommendedType: { en: '100% Thermal Blackout Wave', ar: 'ستائر ويف عازلة للضوء ١٠٠٪' }
  },
  {
    id: 'dining',
    title: { en: 'Dining Salon', ar: 'صالون الطعام' },
    subtitle: { en: 'Luminous daylight filtration with timeless poise', ar: 'ترشيح ناعم لضوء النهار بلمسة فنية أنيقة' },
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    recommendedType: { en: 'Textured Linen Pinch Pleat', ar: 'كتان طبيعي بطيات فرنسية' }
  },
  {
    id: 'office',
    title: { en: 'Executive Office', ar: 'المكتب التنفيذي' },
    subtitle: { en: 'Glare-free daylight control for productive spaces', ar: 'حجب وهج الشاشات والتركيز في بيئة عمل راقية' },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    recommendedType: { en: 'Motorized Solar Roller Blinds', ar: 'مظلات رول شمسية بمحرك ذكي' }
  },
  {
    id: 'villa',
    title: { en: 'Villa Double-Height', ar: 'بهو الفيلا والأسقف العالية' },
    subtitle: { en: 'Spectacular floor-to-ceiling panoramic drapery', ar: 'ستائر بانورامية عملاقة من السقف للأرض' },
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    recommendedType: { en: 'Custom S-Wave with Somfy Track', ar: 'ستائر S-Wave بسكك كهربائية ذكية' }
  },
  {
    id: 'kids',
    title: { en: 'Children & Nursery', ar: 'غرف الأطفال واليافعين' },
    subtitle: { en: 'Safe cordless blackout for daytime sleep routines', ar: 'عزل تام بدون حبال لحماية نوم أطفالك بأمان' },
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop',
    recommendedType: { en: 'Soft Blackout Roman Blinds', ar: 'ستائر رومانية معتمة بدون حبال' }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: { en: 'Eng. Ahmed Alharbi', ar: 'م. أحمد الحربي' },
    location: { en: 'Al Malqa, Riyadh', ar: 'حي الملقا، الرياض' },
    role: { en: 'Villa Owner', ar: 'مالك فيلا سكنية' },
    rating: 5,
    comment: {
      en: 'The custom wave curtains for our 6-meter double-height living hall are breathtaking. The laser measurement was exact, and the motorized tracks glide completely silently. Truly a premier Saudi standard.',
      ar: 'ستائر الويف بارتفاع ٦ أمتار في بهو الفيلا مذهلة للغاية. القياس الليزري كان دقيقاً بالمليمتر والسكك الذكية تنزلق بصمت تام. فخر حقيقي لمستوى الصناعة والخدمة بالرياض.'
    },
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    curtainInstalled: { en: 'Signature Wave + Motorized Rail', ar: 'ستارة ويف مع سكة سومفي ذكية' }
  },
  {
    id: 't-2',
    name: { en: 'Sarah Alqahtani', ar: 'سارة القحطاني' },
    location: { en: 'Al Nakheel, Riyadh', ar: 'حي النخيل، الرياض' },
    role: { en: 'Interior Designer', ar: 'مصممة ديكور داخلي' },
    rating: 5,
    comment: {
      en: 'I specify Mohammad Curtains for all my luxury residential clients in Riyadh. Their fabric collection, particularly the thermal velvets and sheer linens, handles our desert sunlight better than any imported brand.',
      ar: 'أعتمد ستائر محمد في كافة مشاريعي السكنية الراقية بالرياض. تشكيلة الأقمشة ولا سيما المخمل الحراري والكتان الشفاف مصممة بعناية فائقة لتلائم حرارة وإضاءة أجواء المملكة.'
    },
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    curtainInstalled: { en: 'Royal Blackout & Milano Sheer', ar: 'رويال عازلة للضوء مع ميلانو شيفون' }
  },
  {
    id: 't-3',
    name: { en: 'Dr. Omar Alotaibi', ar: 'د. عمر العتيبي' },
    location: { en: 'Hittin, Riyadh', ar: 'حي حطين، الرياض' },
    role: { en: 'Homeowner', ar: 'مالك منزل' },
    rating: 5,
    comment: {
      en: 'From the in-home fabric consultation to final steam-ironing after installation, the service was flawless. The blackout in our master suite is absolute 100% darkness even at noon.',
      ar: 'من موعد زيارة المستشار للمنزل بالعينات وحتى الكي بالبخار بعد التركيب، التجربة كانت غاية في الإتقان. العزل في جناح النوم يعطي عتمة كاملة ١٠٠٪ حتى في وضح شمس الظهيرة.'
    },
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    curtainInstalled: { en: 'Triple Thermal Blackout Package', ar: 'باقة العزل الحراري الثلاثي الشاملة' }
  }
];

export const INSPIRATION_ITEMS: InspirationItem[] = [
  {
    id: 'insp-1',
    title: { en: 'Contemporary Minimalist Villa', ar: 'فيلا معاصرة بنمط مينيماليزم' },
    room: { en: 'Living Salon', ar: 'صالون المعيشة' },
    style: { en: 'Ceiling S-Wave Flow', ar: 'انسياب ويف من السقف' },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    curtainModel: { en: 'Sandstone Linen + Recessed Track', ar: 'كتان سندستون مع سكة مخفية بالجبس' }
  },
  {
    id: 'insp-2',
    title: { en: 'Luxury Master Penthouse Suite', ar: 'جناح بنتهاوس رئيسي فاخر' },
    room: { en: 'Master Suite', ar: 'الجناح الرئيسي' },
    style: { en: 'Double Layered Blackout', ar: 'طبقة مزدوجة عازلة للضوء' },
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    curtainModel: { en: 'Royal Velvet & Milano Voile', ar: 'مخمل رويال وفوال ميلانو الإيطالي' }
  },
  {
    id: 'insp-3',
    title: { en: 'Traditional Riyadh Majlis Modernized', ar: 'مجلس سعودي بتصميم حديث' },
    room: { en: 'Formal Majlis', ar: 'المجلس الرسمي' },
    style: { en: 'Rich Emerald Velvet Drapes', ar: 'ستائر مخملية بدرجة زمردية ملكية' },
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    curtainModel: { en: 'Velvet Luxe Pinch Pleat', ar: 'فيلفيت لوكس بطيات ثلاثية' }
  },
  {
    id: 'insp-4',
    title: { en: 'Executive Diplomatic Quarter Office', ar: 'مكتب تنفيذي بحي السفارات' },
    room: { en: 'Private Study', ar: 'المكتب الخاص' },
    style: { en: 'Solar Glare Shield', ar: 'حماية شمسية عاكسة للوهج' },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    curtainModel: { en: 'Smart Motorized Charcoal Roller', ar: 'رول ذكي فحمي بمحرك كهربائي' }
  },
  {
    id: 'insp-5',
    title: { en: 'Double-Height Al Malqa Villa', ar: 'بهو فيلا مفتوح بحي الملقا' },
    room: { en: 'Grand Entrance', ar: 'المدخل والبهو الرئيسي' },
    style: { en: '7-Meter Continuous Wave', ar: 'ستارة ويف مستمرة بارتفاع ٧ أمتار' },
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    curtainModel: { en: 'Signature Wave & Smart Track', ar: 'ستائر ويف وسكك ذكية مخفية' }
  },
  {
    id: 'insp-6',
    title: { en: 'Airy Dining Courtyard View', ar: 'إطلالة صالة الطعام على الفناء الداخلي' },
    room: { en: 'Dining Room', ar: 'صالة الطعام' },
    style: { en: 'Filtered Diffused Daylight', ar: 'إضاءة طبيعية مفلترة ناعمة' },
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop',
    curtainModel: { en: 'Milano Pure Voile Sheer', ar: 'شيفون فوال ميلانو النقي' }
  }
];
