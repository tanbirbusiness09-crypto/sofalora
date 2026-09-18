import { Order } from '../types';
import { PRODUCTS } from './products';

export const DEMO_ORDERS: Order[] = [
  {
    id: 'MC-20260910-1045',
    createdAt: '2026-09-10T11:20:00Z',
    estimatedDeliveryDate: '2026-09-14T18:00:00Z',
    status: 'delivered',
    customer: {
      firstName: 'Turki',
      lastName: 'Al-Sudairy',
      email: 't.alsudairy@example.sa',
      phone: '+966551234567'
    },
    deliveryAddress: {
      building: 'Villa 14',
      street: 'Prince Turki Ibn Abdulaziz Al Awwal Rd',
      district: 'Al-Nakheel',
      city: 'Riyadh',
      postalCode: '12384',
      additionalInstructions: 'Ground floor main majlis hall windows'
    },
    deliveryMethod: {
      id: 'standard',
      name: { en: 'Standard White-Glove Delivery & Installation', ar: 'توصيل وتركيب شامل بمعايير الفخامة' },
      description: { en: 'Installed by certified Mohammad Curtains technicians', ar: 'تركيب دقيق بواسطة فنيي ستائر محمد المعتمدين' },
      price: 0,
      estimatedTime: { en: '3-4 Business Days', ar: '٣-٤ أيام عمل' }
    },
    paymentMethod: 'card',
    items: [
      {
        id: 'item-1',
        productId: PRODUCTS[0]?.id || 'curtain-1',
        product: PRODUCTS[0],
        selectedColor: PRODUCTS[0]?.colors[0],
        selectedSize: PRODUCTS[0]?.sizes[1] || PRODUCTS[0]?.sizes[0],
        quantity: 2,
        unitPrice: PRODUCTS[0]?.price + (PRODUCTS[0]?.sizes[1]?.priceModifier || 0)
      }
    ],
    subtotal: (PRODUCTS[0]?.price + (PRODUCTS[0]?.sizes[1]?.priceModifier || 0)) * 2,
    discount: 100,
    promoCode: 'WELCOME10',
    shippingFee: 0,
    vatAmount: Math.round(((PRODUCTS[0]?.price + (PRODUCTS[0]?.sizes[1]?.priceModifier || 0)) * 2 - 100) * 0.15),
    total: Math.round(((PRODUCTS[0]?.price + (PRODUCTS[0]?.sizes[1]?.priceModifier || 0)) * 2 - 100) * 1.15),
    notes: 'Laser measurement completed in Riyadh atelier.'
  },
  {
    id: 'MC-20260914-1088',
    createdAt: '2026-09-14T14:35:00Z',
    estimatedDeliveryDate: '2026-09-18T16:00:00Z',
    status: 'out_for_delivery',
    customer: {
      firstName: 'Noura',
      lastName: 'Al-Ghamdi',
      email: 'noura.ghamdi@example.com',
      phone: '+966509876543'
    },
    deliveryAddress: {
      building: 'Palace 8',
      street: 'Wadi Hanifah Street',
      district: 'Hittin',
      city: 'Riyadh',
      postalCode: '13512',
      additionalInstructions: 'Call 30 minutes before arrival for security gate access'
    },
    deliveryMethod: {
      id: 'express',
      name: { en: 'Express Riyadh Delivery & Setup', ar: 'توصيل وتركيب سريع بالرياض' },
      description: { en: 'Priority atelier tailoring and dispatch', ar: 'أولوية في التفصيل بالمشغل والجدولة السريعة' },
      price: 45,
      estimatedTime: { en: '1-2 Business Days', ar: '١-٢ يوم عمل' }
    },
    paymentMethod: 'apple_pay',
    items: [
      {
        id: 'item-2',
        productId: PRODUCTS[1]?.id || 'curtain-2',
        product: PRODUCTS[1] || PRODUCTS[0],
        selectedColor: (PRODUCTS[1] || PRODUCTS[0])?.colors[0],
        selectedSize: (PRODUCTS[1] || PRODUCTS[0])?.sizes[0],
        quantity: 3,
        unitPrice: (PRODUCTS[1] || PRODUCTS[0])?.price
      }
    ],
    subtotal: (PRODUCTS[1] || PRODUCTS[0])?.price * 3,
    discount: 0,
    shippingFee: 45,
    vatAmount: Math.round(((PRODUCTS[1] || PRODUCTS[0])?.price * 3 + 45) * 0.15),
    total: Math.round(((PRODUCTS[1] || PRODUCTS[0])?.price * 3 + 45) * 1.15),
    notes: 'Out for delivery with technician Fahad.'
  },
  {
    id: 'MC-20260916-1121',
    createdAt: '2026-09-16T09:15:00Z',
    estimatedDeliveryDate: '2026-09-21T12:00:00Z',
    status: 'preparing',
    customer: {
      firstName: 'Sultan',
      lastName: 'Al-Otaibi',
      email: 'sultan.otaibi@example.com',
      phone: '+966567890123'
    },
    deliveryAddress: {
      building: 'Villa 22B',
      street: 'King Fahd Road District',
      district: 'Al-Malqa',
      city: 'Riyadh',
      postalCode: '13524',
      additionalInstructions: 'Double-height ceiling living room'
    },
    deliveryMethod: {
      id: 'standard',
      name: { en: 'Standard White-Glove Delivery & Installation', ar: 'توصيل وتركيب شامل بمعايير الفخامة' },
      description: { en: 'Installed by certified Mohammad Curtains technicians', ar: 'تركيب دقيق بواسطة فنيي ستائر محمد المعتمدين' },
      price: 0,
      estimatedTime: { en: '3-4 Business Days', ar: '٣-٤ أيام عمل' }
    },
    paymentMethod: 'cod',
    items: [
      {
        id: 'item-3',
        productId: PRODUCTS[2]?.id || 'curtain-3',
        product: PRODUCTS[2] || PRODUCTS[0],
        selectedColor: (PRODUCTS[2] || PRODUCTS[0])?.colors[0],
        selectedSize: (PRODUCTS[2] || PRODUCTS[0])?.sizes[0],
        quantity: 1,
        unitPrice: (PRODUCTS[2] || PRODUCTS[0])?.price
      },
      {
        id: 'item-4',
        productId: PRODUCTS[4]?.id || 'curtain-5',
        product: PRODUCTS[4] || PRODUCTS[0],
        selectedColor: (PRODUCTS[4] || PRODUCTS[0])?.colors[0],
        selectedSize: (PRODUCTS[4] || PRODUCTS[0])?.sizes[0],
        quantity: 1,
        unitPrice: (PRODUCTS[4] || PRODUCTS[0])?.price
      }
    ],
    subtotal: (PRODUCTS[2] || PRODUCTS[0])?.price + (PRODUCTS[4] || PRODUCTS[0])?.price,
    discount: 50,
    promoCode: 'CURTAIN15',
    shippingFee: 0,
    vatAmount: Math.round(((PRODUCTS[2] || PRODUCTS[0])?.price + (PRODUCTS[4] || PRODUCTS[0])?.price - 50) * 0.15),
    total: Math.round(((PRODUCTS[2] || PRODUCTS[0])?.price + (PRODUCTS[4] || PRODUCTS[0])?.price - 50) * 1.15),
    notes: 'Currently undergoing precision laser cutting & steam pleating in Riyadh workshop.'
  }
];
