import { Product, Category, RoomCategory, Testimonial, InspirationItem } from '../types';
import { SOFA_PRODUCTS } from './catalogSofas';
import { CURTAIN_PRODUCTS } from './catalogCurtains';
import { MORE_PRODUCTS } from './catalogMoreProducts';

const CURTAIN_CATEGORY_SLUGS = [
  'curtains',
  'blackout-curtains',
  'sheer-curtains',
  'custom-curtains',
  'ready-made-curtains'
];

export const CATEGORIES: Category[] = [
  {
    id: 'sofas',
    slug: 'sofas',
    title: { en: 'Sofas', ar: 'الكنب' },
    subtitle: { en: 'Sculpted seating for modern Saudi living', ar: 'كنب بتصاميم نحتية للمنازل السعودية العصرية' },
    itemCount: 12,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'sectional-sofas',
    slug: 'sectional-sofas',
    title: { en: 'Sectional Sofas', ar: 'الكنب المقسم' },
    subtitle: { en: 'L-shape, U-shape & modular configurations', ar: 'تصاميم L و U ووحدات مرنة' },
    itemCount: 4,
    image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'majlis-sofas',
    slug: 'majlis-sofas',
    title: { en: 'Majlis Sofas', ar: 'كنب المجالس' },
    subtitle: { en: 'Formal seating crafted for Saudi hospitality', ar: 'جلسات رسمية مصممة لكرم الضيافة السعودية' },
    itemCount: 2,
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'accent-chairs',
    slug: 'accent-chairs',
    title: { en: 'Armchairs & Accent Chairs', ar: 'الكراسي الفاخرة' },
    subtitle: { en: 'Sculptural pieces that complete the room', ar: 'قطع نحتية تكمل أناقة المساحة' },
    itemCount: 3,
    image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'sofa-beds',
    slug: 'sofa-beds',
    title: { en: 'Sofa Beds & Storage', ar: 'كنب السرير والتخزين' },
    subtitle: { en: 'Smart comfort for guests and compact homes', ar: 'راحة ذكية للضيوف والمساحات العملية' },
    itemCount: 2,
    image: 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'curtains',
    slug: 'curtains',
    title: { en: 'Curtains', ar: 'الستائر' },
    subtitle: { en: 'Flowing drapes & tailor-made panels', ar: 'ستائر متهدلة بتفصيل ملكي أنيق' },
    itemCount: 42,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'blackout',
    slug: 'blackout-curtains',
    title: { en: 'Blackout Curtains', ar: 'الستائر المعتمة' },
    subtitle: { en: '100% light blocking & thermal isolation', ar: 'عزل تام للضوء والحرارة' },
    itemCount: 28,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'sheer',
    slug: 'sheer-curtains',
    title: { en: 'Sheer Curtains', ar: 'الستائر الشفافة' },
    subtitle: { en: 'Filtered daylight & gentle privacy', ar: 'ترشيح لطيف لضوء النهار وخصوصية ناعمة' },
    itemCount: 35,
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'custom',
    slug: 'custom-curtains',
    title: { en: 'Custom Curtains', ar: 'ستائر حسب الطلب' },
    subtitle: { en: 'Bespoke designs cut to your exact windows', ar: 'تفصيل خاص لأدق مقاسات النوافذ' },
    itemCount: 50,
    image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'ready-made',
    slug: 'ready-made-curtains',
    title: { en: 'Ready-Made Curtains', ar: 'ستائر جاهزة للتركيب' },
    subtitle: { en: 'Pre-stitched panels ready to hang', ar: 'ستائر مجهزة مسبقاً وجاهزة للتعليق' },
    itemCount: 26,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=900&auto=format&fit=crop'
  }
];

export const PRODUCTS: Product[] = [
  ...SOFA_PRODUCTS,
  ...CURTAIN_PRODUCTS,
  ...MORE_PRODUCTS.filter((p) => CURTAIN_CATEGORY_SLUGS.includes(p.categorySlug))
];

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: 'living',
    title: { en: 'Living Room & Majlis', ar: 'غرفة المعيشة والمجلس' },
    subtitle: { en: 'Sculpted sofas paired with flowing drapes', ar: 'كنب منحوت مع ستائر منسدلة بفخامة' },
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=900&auto=format&fit=crop',
    recommendedType: { en: 'Curved Sectional + S-Wave Curtains', ar: 'كنبة منحنية + ستائر ويف' }
  },
  {
    id: 'majlis',
    title: { en: 'Formal Majlis', ar: 'المجلس الرسمي' },
    subtitle: { en: 'U-shape seating framed by jacquard drapes', ar: 'جلسات U بإطار من الستائر الدمشقية' },
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=900&auto=format&fit=crop',
    recommendedType: { en: 'U-Shape Majlis + Heritage Jacquard', ar: 'مجلس U + جاكار تراثي' }
  },
  {
    id: 'bedroom',
    title: { en: 'Master Bedroom', ar: 'غرفة النوم الرئيسية' },
    subtitle: { en: 'Quiet loveseats and absolute blackout', ar: 'كنب هادئ وستائر معتمة تماماً' },
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=900&auto=format&fit=crop',
    recommendedType: { en: 'Hala Loveseat + Thermal Blackout', ar: 'كنبة هالة + ستائر حرارية معتمة' }
  },
  {
    id: 'dining',
    title: { en: 'Dining Salon', ar: 'صالون الطعام' },
    subtitle: { en: 'Light linen seating with soft sheers', ar: 'جلسات كتان فاتحة مع ستائر شفافة' },
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=900&auto=format&fit=crop',
    recommendedType: { en: 'Layla Sofa + Belgian Linen Sheers', ar: 'كنبة ليلى + شيفون كتان بلجيكي' }
  },
  {
    id: 'villa',
    title: { en: 'Villa Living Hall', ar: 'صالة الفيلا الرئيسية' },
    subtitle: { en: 'Modular scale with double-height drapery', ar: 'كنب مودولار مع ستائر بارتفاع مضاعف' },
    image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=900&auto=format&fit=crop',
    recommendedType: { en: 'Yara Modular + Ceiling Wave Track', ar: 'يارا مودولار + سكة ويف سقفية' }
  },
  {
    id: 'office',
    title: { en: 'Home Office & Study', ar: 'المكتب المنزلي' },
    subtitle: { en: 'Ergonomic loungers with glare-control sheers', ar: 'كراسي مريحة مع ستائر تحجب التوهج' },
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=900&auto=format&fit=crop',
    recommendedType: { en: 'Dana Lounge Chair + Linen Sheer', ar: 'كرسي دانا + شيفون كتاني' }
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
      en: 'The Lina sectional and the custom wave curtains transformed our double-height hall. The fabrics feel exceptional, and the team measured, delivered and installed everything with real precision.',
      ar: 'كنبة لينا والستائر الويف المخصصة غيّرت بهو الفيلا بالكامل. الأقمشة استثنائية، والفريق قام بالقياس والتوصيل والتركيب بدقة عالية.'
    },
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    curtainInstalled: { en: 'Lina Sectional + Signature Wave', ar: 'كنبة لينا + ستائر ويف' }
  },
  {
    id: 't-2',
    name: { en: 'Sarah Alqahtani', ar: 'سارة القحطاني' },
    location: { en: 'Al Nakheel, Riyadh', ar: 'حي النخيل، الرياض' },
    role: { en: 'Interior Designer', ar: 'مصممة ديكور داخلي' },
    rating: 5,
    comment: {
      en: 'Sofalora is now my first call for Riyadh residential projects. Their sofa silhouettes are refined, and the curtain fabrics handle our desert light beautifully.',
      ar: 'سوفالورا أصبحت خياري الأول لمشاريع الرياض السكنية. تصاميم الكنب راقية، وأقمشة الستائر تتعامل مع إضاءة الصحراء بجمال.'
    },
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    curtainInstalled: { en: 'Rania Velvet Sofa + Milano Sheer', ar: 'كنبة رانيا المخملية + شيفون ميلانو' }
  },
  {
    id: 't-3',
    name: { en: 'Dr. Omar Alotaibi', ar: 'د. عمر العتيبي' },
    location: { en: 'Hittin, Riyadh', ar: 'حي حطين، الرياض' },
    role: { en: 'Homeowner', ar: 'مالك منزل' },
    rating: 5,
    comment: {
      en: 'From the in-home fabric consultation to the final steam-press, the service was flawless. The majlis set is now the centrepiece of our home.',
      ar: 'من استشارة الأقمشة في المنزل حتى الكي بالبخار النهائي، الخدمة كانت متقنة. طقم المجلس أصبح قطعة مميزة في منزلنا.'
    },
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    curtainInstalled: { en: 'Faisal Leather Majlis + Blackout Drapes', ar: 'مجلس فيصل الجلدي + ستائر معتمة' }
  }
];

export const INSPIRATION_ITEMS: InspirationItem[] = [
  {
    id: 'insp-1',
    title: { en: 'Contemporary Minimalist Villa', ar: 'فيلا معاصرة بنمط مينيماليزم' },
    room: { en: 'Living Salon', ar: 'صالون المعيشة' },
    style: { en: 'Curved Seating + Ceiling Wave', ar: 'كنب منحنٍ + ستائر ويف سقفية' },
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=900&auto=format&fit=crop',
    curtainModel: { en: 'Lina Sectional + Sandstone Sheer', ar: 'كنبة لينا + شيفون سندستون' }
  },
  {
    id: 'insp-2',
    title: { en: 'Luxury Master Penthouse Suite', ar: 'جناح بنتهاوس رئيسي فاخر' },
    room: { en: 'Master Suite', ar: 'الجناح الرئيسي' },
    style: { en: 'Loveseat + Double Blackout', ar: 'كنبة صغيرة + عزل مزدوج' },
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=900&auto=format&fit=crop',
    curtainModel: { en: 'Hala Loveseat + Royal Velvet Blackout', ar: 'كنبة هالة + مخمل رويال معتم' }
  },
  {
    id: 'insp-3',
    title: { en: 'Traditional Riyadh Majlis Modernized', ar: 'مجلس سعودي بتصميم حديث' },
    room: { en: 'Formal Majlis', ar: 'المجلس الرسمي' },
    style: { en: 'U-Shape Majlis + Emerald Drapes', ar: 'مجلس U + ستائر زمردية' },
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=900&auto=format&fit=crop',
    curtainModel: { en: 'Nada Majlis + Velvet Luxe Pinch Pleat', ar: 'مجلس ندى + فيلفيت لوكس بطيات' }
  },
  {
    id: 'insp-4',
    title: { en: 'Executive Home Office', ar: 'مكتب منزلي تنفيذي' },
    room: { en: 'Private Study', ar: 'المكتب الخاص' },
    style: { en: 'Lounge Chair + Glare-Control Sheer', ar: 'كرسي استرخاء + شيفون مضاد للتوهج' },
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=900&auto=format&fit=crop',
    curtainModel: { en: 'Dana Lounge + Milano Voile', ar: 'كرسي دانا + فوال ميلانو' }
  },
  {
    id: 'insp-5',
    title: { en: 'Double-Height Al Malqa Villa', ar: 'بهو فيلا مفتوح بحي الملقا' },
    room: { en: 'Grand Entrance', ar: 'المدخل والبهو الرئيسي' },
    style: { en: 'Modular Sofa + 7-Meter Wave', ar: 'كنب مودولار + ستائر ويف ٧ أمتار' },
    image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=900&auto=format&fit=crop',
    curtainModel: { en: 'Yara Modular + Signature Wave Track', ar: 'يارا مودولار + سكة ويف مخفية' }
  },
  {
    id: 'insp-6',
    title: { en: 'Airy Dining Courtyard View', ar: 'إطلالة صالة الطعام على الفناء الداخلي' },
    room: { en: 'Dining Room', ar: 'صالة الطعام' },
    style: { en: 'Linen Seating + Filtered Daylight', ar: 'جلسات كتان + ضوء طبيعي مفلتر' },
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=900&auto=format&fit=crop',
    curtainModel: { en: 'Layla Sofa + Belgian Linen Sheer', ar: 'كنبة ليلى + شيفون كتان بلجيكي' }
  }
];
