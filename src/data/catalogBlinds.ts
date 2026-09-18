import { Product } from '../types';

export const BLINDS_PRODUCTS: Product[] = [
  {
    id: 'prod-5',
    slug: 'premium-roller-blind',
    name: {
      en: 'Premium Solar Roller Blind',
      ar: 'مظلة رول فاخرة عازلة للشمس'
    },
    category: {
      en: 'Roller Blinds',
      ar: 'الستائر الرول'
    },
    categorySlug: 'roller-blinds',
    subcategory: { en: 'Solar Glare Block', ar: 'عازل وهج شمس' },
    subcategorySlug: 'solar-roller',
    collection: 'minimal-living',
    description: {
      en: 'Commercial-grade motorized roller blind with fiberglass backing, engineered to reject 99% of UV rays. Perfectly compatible with Tuya & Apple HomeKit.',
      ar: 'ستارة رول ذكية بمحرك كهربائي هادئ وطبقة فايبر جلاس عازلة تعكس ٩٩٪ من الأشعة فوق البنفسجية، متوافقة مع الأنظمة المنزلية الذكية.'
    },
    price: 320,
    oldPrice: 399,
    comparePrice: 399,
    discount: 20,
    rating: 4.85,
    reviews: 110,
    reviewCount: 110,
    badge: { en: 'Smart Compatible', ar: 'تدعم التحكم الذكي' },
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Fiberglass UV Reflective Weave', ar: 'نسيج ألياف زجاجية عاكس للحرارة' },
    pattern: { en: 'Micro Screen Mesh', ar: 'شبك ميكرو دقيق' },
    lightControl: 'room-darkening',
    colors: [
      { id: 'pure-stone', name: { en: 'Desert Stone', ar: 'حجر صحراوي' }, hex: '#D2CCC2' },
      { id: 'matte-black', name: { en: 'Matte Obsidian', ar: 'أسود مطفي' }, hex: '#1E1E1E' },
      { id: 'chalk', name: { en: 'Clean Chalk', ar: 'أبيض طباشيري' }, hex: '#F3F2EE' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Compact (120cm)', ar: 'مدمج (١٢٠ سم)' }, dimensions: '120cm × 180cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Medium (180cm)', ar: 'متوسط (١٨٠ سم)' }, dimensions: '180cm × 220cm', priceModifier: 75 },
      { id: 's3', label: { en: 'Large (240cm)', ar: 'كبير (٢٤٠ سم)' }, dimensions: '240cm × 260cm', priceModifier: 130 }
    ],
    room: { en: 'Home Office & Kitchen', ar: 'المكتب المنزلي والمطبخ' },
    features: [
      { en: 'Whisper-Quiet Motorization Option', ar: 'خيار محرك هادئ فائق النعومة' },
      { en: '99% UV & Glare Block', ar: 'حماية ٩٩٪ من وهج الشاشات' },
      { en: 'Wipe-Clean Soil Shield', ar: 'سهولة المسح والتنظيف بقطعة قماش' }
    ],
    inStock: true,
    stock: 50,
    isBestSeller: true
  },
  {
    id: 'prod-6',
    slug: 'modern-zebra-blind',
    name: {
      en: 'Modern Zebra Day & Night Blind',
      ar: 'ستارة زيبرا الحديثة نهارية/ليلية'
    },
    category: {
      en: 'Zebra Blinds',
      ar: 'ستائر الزيبرا'
    },
    categorySlug: 'zebra-blinds',
    subcategory: { en: 'Dual Layer Day-Night', ar: 'مزدوجة نهارية وليلية' },
    subcategorySlug: 'dual-layer',
    collection: 'minimal-living',
    description: {
      en: 'Dual-phase alternating sheer and opaque fabric bands allow effortless precision control over daylight and private concealment with a gentle pull.',
      ar: 'شرائح قماشية مزدوجة متبادلة بين الشفاف والمعتم تتيح التحكم الدقيق والسهل في نسبة الإضاءة الطبيعية والخصوصية التامة بحركة واحدة.'
    },
    price: 295,
    oldPrice: 360,
    comparePrice: 360,
    discount: 18,
    rating: 4.8,
    reviews: 79,
    reviewCount: 79,
    badge: { en: 'Versatile', ar: 'متعددة الاستخدام' },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Laser-Cut Polyester Dual Sheer', ar: 'بوليستر ليزري مزدوج عالي المتانة' },
    pattern: { en: 'Horizontal Alternating Bands', ar: 'خطوط أفقية متبادلة' },
    lightControl: 'light-filtering',
    colors: [
      { id: 'pearl-cream', name: { en: 'Pearl Cream', ar: 'كريمي لؤلؤي' }, hex: '#EEE7DC' },
      { id: 'mocha', name: { en: 'Saudi Qahwa Brown', ar: 'بني قهوة سعودية' }, hex: '#5A4638' },
      { id: 'graphite', name: { en: 'Graphite Gray', ar: 'رمادي جرافيت' }, hex: '#393838' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Standard Window', ar: 'نافذة قياسية' }, dimensions: '140cm × 190cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Wide Window', ar: 'نافذة عريضة' }, dimensions: '200cm × 220cm', priceModifier: 70 },
      { id: 's3', label: { en: 'Full Balcony Door', ar: 'باب شرفة كامل' }, dimensions: '240cm × 260cm', priceModifier: 120 }
    ],
    room: { en: 'Dining Room & Guest Bedroom', ar: 'غرفة الطعام وغرفة الضيوف' },
    features: [
      { en: 'Instant Day/Night Toggle', ar: 'تبديل فوري بين الوضع النهاري والليلي' },
      { en: 'Anti-Fray Sonic Welded Edges', ar: 'حواف ملحومة بالسونيك لمنع التنسيل' },
      { en: 'Aluminum Headrail Cassette', ar: 'صندوق ألمنيوم علوي أنيق ومتين' }
    ],
    inStock: true,
    stock: 45,
    isBestSeller: true
  },
  {
    id: 'prod-7',
    slug: 'classic-roman-blind',
    name: {
      en: 'Classic Architectural Roman Blind',
      ar: 'ستارة رومانية كلاسيكية مطوية'
    },
    category: {
      en: 'Roman Blinds',
      ar: 'الستائر الرومانية'
    },
    categorySlug: 'roman-blinds',
    subcategory: { en: 'Tailored Fold Roman', ar: 'طيات كلاسيكية محاكة' },
    subcategorySlug: 'tailored-roman',
    collection: 'natural-linen',
    description: {
      en: 'Architectural horizontal fold drape crafted with premium cotton-linen face and thermal inner lining for structured elegance in refined residential spaces.',
      ar: 'ستارة قماشية ذات طيات أفقية منسقة بدقة هندسية عالية من مزيج القطن والكتان الفاخر مع بطانة عازلة تمنح النوافذ رونقاً كلاسيكياً متفرداً.'
    },
    price: 375,
    oldPrice: 450,
    comparePrice: 450,
    discount: 17,
    rating: 4.88,
    reviews: 64,
    reviewCount: 64,
    badge: { en: 'Artisan Crafted', ar: 'صناعة يدوية' },
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Linen-Cotton with Thermal Interlining', ar: 'كتان وقطن مع بطانة حرارية' },
    pattern: { en: 'Structured Stacked Folds', ar: 'طيات متتالية هندسية' },
    lightControl: 'room-darkening',
    colors: [
      { id: 'sandstone', name: { en: 'Tuwaiq Beige', ar: 'بيج طويق' }, hex: '#D5C4A8' },
      { id: 'cloud-white', name: { en: 'Cloud White', ar: 'أبيض سحابي' }, hex: '#F9F8F5' },
      { id: 'sage', name: { en: 'Desert Sage', ar: 'رمادي ميرمية' }, hex: '#9E9F90' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Window (120cm)', ar: 'نافذة (١٢٠ سم)' }, dimensions: '120cm × 160cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Window (160cm)', ar: 'نافذة (١٦٠ سم)' }, dimensions: '160cm × 200cm', priceModifier: 65 },
      { id: 's3', label: { en: 'Window (210cm)', ar: 'نافذة (٢١٠ سم)' }, dimensions: '210cm × 220cm', priceModifier: 115 }
    ],
    room: { en: 'Breakfast Nook & Study', ar: 'ركن الإفطار وغرفة الدراسة' },
    features: [
      { en: 'Crisp Architectural Folds', ar: 'طيات أفقية متقنة ومستقيمة' },
      { en: 'Child-Safe Concealed Cords', ar: 'سلاسل وحبال مخفية آمنة للأطفال' },
      { en: 'Full Blackout Thermal Liner', ar: 'بطانة داخلية عازلة للضوء والحرارة' }
    ],
    inStock: true,
    stock: 32
  },
  {
    id: 'prod-16',
    slug: 'motorized-blackout-roller-blind',
    name: {
      en: 'Motorized Blackout Roller Blind',
      ar: 'ستارة رول معتمة بمحرك كهربائي ذكي'
    },
    category: {
      en: 'Roller Blinds',
      ar: 'الستائر الرول'
    },
    categorySlug: 'roller-blinds',
    subcategory: { en: 'Smart Motorized', ar: 'محرك كهربائي ذكي' },
    subcategorySlug: 'motorized-blinds',
    collection: 'luxury-blackout',
    description: {
      en: 'Rechargeable lithium battery motor with silent gearbox. Control via remote, smartphone app, or voice command with Alexa and Google Assistant.',
      ar: 'محرك ببطارية ليثيوم قابلة للشحن وصوت فائق الهدوء، مع تحكم بريموت كنوتول وتطبيق الجوال والأوامر الصوتية عبر أليكسا ومساعد جوجل.'
    },
    price: 490,
    oldPrice: 620,
    comparePrice: 620,
    discount: 21,
    rating: 4.95,
    reviews: 130,
    reviewCount: 130,
    badge: { en: 'Smart Living', ar: 'منزل ذكي' },
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    fabric: { en: '100% Light-Lock Polyester', ar: 'بوليستر عازل تام للضوء' },
    pattern: { en: 'Smooth Solid Coated', ar: 'أملس عازل' },
    lightControl: 'blackout',
    colors: [
      { id: 'matte-white', name: { en: 'Pure Arctic White', ar: 'أبيض قطبي' }, hex: '#FFFFFF' },
      { id: 'slate', name: { en: 'Deep Slate', ar: 'رمادي حجري' }, hex: '#414449' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Width 150cm', ar: 'عرض ١٥٠ سم' }, dimensions: '150cm × 200cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Width 220cm', ar: 'عرض ٢٢٠ سم' }, dimensions: '220cm × 240cm', priceModifier: 110 }
    ],
    room: { en: 'Master Bedroom & Office', ar: 'غرفة النوم والمكتب' },
    features: [
      { en: 'Rechargeable 6-Month Battery', ar: 'بطارية تدوم ٦ أشهر لكل شحنة' },
      { en: 'Set Automated Timers', ar: 'جدولة توقيت الفتح والإغلاق تلقائياً' }
    ],
    inStock: true,
    stock: 38,
    isBestSeller: true,
    isSale: true
  },
  {
    id: 'prod-17',
    slug: 'executive-perforated-office-blind',
    name: {
      en: 'Executive Perforated Screen Blind',
      ar: 'ستارة مكتب تنفيذية شبكية عازلة للوهج'
    },
    category: {
      en: 'Roller Blinds',
      ar: 'الستائر الرول'
    },
    categorySlug: 'roller-blinds',
    subcategory: { en: 'Solar Glare Block', ar: 'عازل وهج شمس' },
    subcategorySlug: 'solar-roller',
    collection: 'minimal-living',
    description: {
      en: '3% openness screen fabric specifically formulated for executive headquarters and home workspaces to prevent computer monitor reflection while keeping Riyadh skyline views.',
      ar: 'قماش شبكي بمسامية ٣٪ مخصص لمكاتب الشركات والمقرات الإدارية يمنع انعكاس الضوء على الشاشات مع الحفاظ على الإطلالة الخارجية لمدينة الرياض.'
    },
    price: 340,
    oldPrice: 410,
    comparePrice: 410,
    discount: 17,
    rating: 4.78,
    reviews: 52,
    reviewCount: 52,
    badge: { en: 'Executive Pick', ar: 'خيار المكاتب' },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Flame Retardant Screen Yarn', ar: 'ألياف مقاومة للاشتعال والحرارة' },
    pattern: { en: 'Micro Perforated 3%', ar: 'تثقيب دقيق ٣٪' },
    lightControl: 'light-filtering',
    colors: [
      { id: 'dark-bronze', name: { en: 'Bronze Charcoal', ar: 'برونزي فحمي' }, hex: '#3B3835' },
      { id: 'silver-grey', name: { en: 'Metallic Silver', ar: 'فضي ميتاليك' }, hex: '#A8A9A9' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Width 160cm', ar: 'عرض ١٦٠ سم' }, dimensions: '160cm × 220cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Width 240cm', ar: 'عرض ٢٤٠ سم' }, dimensions: '240cm × 260cm', priceModifier: 90 }
    ],
    room: { en: 'Executive Office & Boardroom', ar: 'المكتب التنفيذي وغرفة الاجتماعات' },
    features: [
      { en: 'Anti-Glare for Monitors', ar: 'حماية كاملة من وهج الشاشات' },
      { en: 'Commercial Fire Safe Rated', ar: 'مطابقة لمعايير السلامة ومقاومة الحريق' }
    ],
    inStock: true,
    stock: 44,
    isNew: true
  },
  {
    id: 'prod-18',
    slug: 'cascade-textured-roman-blind',
    name: {
      en: 'Cascade Linen-Blend Roman Blind',
      ar: 'ستارة كاسكيد الرومانية بنسيج الكتان'
    },
    category: {
      en: 'Roman Blinds',
      ar: 'الستائر الرومانية'
    },
    categorySlug: 'roman-blinds',
    subcategory: { en: 'Tailored Fold Roman', ar: 'طيات كلاسيكية محاكة' },
    subcategorySlug: 'tailored-roman',
    collection: 'natural-linen',
    description: {
      en: 'Relaxed waterfall cascade folds that stack with effortless charm when raised and display clean modern horizontal panels when lowered.',
      ar: 'طيات شلالية ناعمة تتراكم بانسيابية ساحرة عند الرفع وتعطي مظهراً هندسياً مرتباً عند الإنزال، مصممة من مزيج الكتان والقطن الطبيعي.'
    },
    price: 360,
    oldPrice: 430,
    comparePrice: 430,
    discount: 16,
    rating: 4.84,
    reviews: 48,
    reviewCount: 48,
    badge: { en: 'Artisan Finish', ar: 'لمسة حرفية' },
    image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Stonewashed Linen Blend', ar: 'مزيج كتان مغسول بالحجر' },
    pattern: { en: 'Waterfall Cascade', ar: 'طيات شلالية' },
    lightControl: 'light-filtering',
    colors: [
      { id: 'almond', name: { en: 'Toasted Almond', ar: 'لوزي دافئ' }, hex: '#E2D3BE' },
      { id: 'washed-white', name: { en: 'Washed Chalk', ar: 'طباشيري مغسول' }, hex: '#F7F6F2' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Window 140cm', ar: 'نافذة ١٤٠ سم' }, dimensions: '140cm × 180cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Window 180cm', ar: 'نافذة ١٨٠ سم' }, dimensions: '180cm × 220cm', priceModifier: 70 }
    ],
    room: { en: 'Kitchen & Breakfast Nook', ar: 'المطبخ وركن الإفطار' },
    features: [
      { en: 'Cordless Spring Safety Mechanism', ar: 'نظام سحب زنبركي آمن بدون حبال' },
      { en: 'Detachable Fabric for Washing', ar: 'قماش سهل الفك لغسيل مريح' }
    ],
    inStock: true,
    stock: 29
  },
  {
    id: 'prod-19',
    slug: 'dimout-textured-zebra-blind',
    name: {
      en: 'Dim-Out Textured Zebra Blind',
      ar: 'ستارة زيبرا نسيجية معتمة بنمط حديث'
    },
    category: {
      en: 'Zebra Blinds',
      ar: 'ستائر الزيبرا'
    },
    categorySlug: 'zebra-blinds',
    subcategory: { en: 'Dual Layer Day-Night', ar: 'مزدوجة نهارية وليلية' },
    subcategorySlug: 'dual-layer',
    collection: 'minimal-living',
    description: {
      en: 'Extra-wide blackout fabric stripes paired with crystal sheer mesh for heightened bedroom privacy and contemporary aesthetic contrast.',
      ar: 'شرائط عازلة عريضة مع شبك كريستالي شفاف تمنح خصوصية مضاعفة لغرف النوم وتصميماً هندسياً معاصراً للنوافذ الكبيرة.'
    },
    price: 335,
    oldPrice: 410,
    comparePrice: 410,
    discount: 18,
    rating: 4.81,
    reviews: 62,
    reviewCount: 62,
    badge: { en: 'Enhanced Privacy', ar: 'خصوصية مضاعفة' },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Jacquard Textured Dual Weave', ar: 'نسيج جاكار مزدوج مقوى' },
    pattern: { en: 'Thick Striped Banding', ar: 'خطوط عريضة متبادلة' },
    lightControl: 'room-darkening',
    colors: [
      { id: 'taupe-zebra', name: { en: 'Desert Taupe', ar: 'توب صحراوي' }, hex: '#9E9283' },
      { id: 'charcoal-zebra', name: { en: 'Smoky Charcoal', ar: 'فحمي مدخن' }, hex: '#313233' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Standard 150cm', ar: 'قياسي ١٥٠ سم' }, dimensions: '150cm × 200cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Wide 210cm', ar: 'عريض ٢١٠ سم' }, dimensions: '210cm × 230cm', priceModifier: 80 }
    ],
    room: { en: 'Bedroom & Living Room', ar: 'غرفة النوم والمعيشة' },
    features: [
      { en: 'Enclosed Aluminum Pelmet Box', ar: 'صندوق علوي مغلق من الألمنيوم' },
      { en: 'Dust & Static Treated', ar: 'معالجة مضادة للكهرباء الساكنة والغبار' }
    ],
    inStock: true,
    stock: 35,
    isNew: true
  }
];
