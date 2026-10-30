import { Product, Category } from '../types';
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

export { ROOM_CATEGORIES, TESTIMONIALS, INSPIRATION_ITEMS } from './homeContent';
