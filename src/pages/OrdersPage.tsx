import React, { useState, useMemo } from 'react';
import { useShop } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Calendar,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  ShoppingBag
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

export const OrdersPage: React.FC = () => {
  const { orders, language, direction, formatPrice } = useShop();
  const { navigate } = useRouter();

  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'delivered'>('all');

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const ChevronIcon = direction === 'rtl' ? ChevronLeft : ChevronRight;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return {
          label: language === 'ar' ? 'تم التوصيل والتركيب' : 'Delivered & Installed',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: CheckCircle2
        };
      case 'out_for_delivery':
        return {
          label: language === 'ar' ? 'في الطريق للتركيب' : 'Out for Fitting',
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          icon: Truck
        };
      case 'preparing':
      case 'ready_for_delivery':
        return {
          label: language === 'ar' ? 'جارٍ التفصيل والمعالجة' : 'Tailoring in Atelier',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: Clock
        };
      default:
        return {
          label: language === 'ar' ? 'مؤكد' : 'Confirmed',
          bg: 'bg-[#FAF6F0] text-[#8F3E24] border-[#DFCDBB]',
          icon: Package
        };
    }
  };

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return orders;
    if (statusFilter === 'delivered') return orders.filter((o) => o.status === 'delivered');
    return orders.filter((o) => o.status !== 'delivered');
  }, [orders, statusFilter]);

  return (
    <div className="bg-[#FCF9F4] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8F3E24] font-semibold">
              {language === 'ar' ? 'سجل المشتريات' : 'Purchase History'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B211D] mt-1">
              {language === 'ar' ? 'طلباتي واستشارات التركيب' : 'My Orders & Installation History'}
            </h1>
            <p className="text-xs sm:text-sm text-[#747D74] mt-1">
              {language === 'ar'
                ? 'تابع حالة طلبات الكنب والستائر ومواعيد التركيب في الرياض'
                : 'Track your sofa and curtain orders and scheduled Riyadh delivery visits'}
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#1B211D] hover:bg-[#8F3E24] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs self-start sm:self-auto"
          >
            <span>{language === 'ar' ? 'طلب تفصيل جديد' : 'New Order'}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-[#E8DEC\-D] pb-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === 'all'
                ? 'bg-[#1B211D] text-white shadow-xs'
                : 'bg-white text-[#5D665F] hover:bg-[#EFE7DC] border border-[#E8DEC\-D]'
            }`}
          >
            {language === 'ar' ? 'كافة الطلبات' : 'All Orders'} ({orders.length})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('active')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === 'active'
                ? 'bg-[#1B211D] text-white shadow-xs'
                : 'bg-white text-[#5D665F] hover:bg-[#EFE7DC] border border-[#E8DEC\-D]'
            }`}
          >
            {language === 'ar' ? 'طلبات قيد التفصيل والتركيب' : 'Active / In Atelier'} (
            {orders.filter((o) => o.status !== 'delivered').length})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('delivered')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === 'delivered'
                ? 'bg-[#1B211D] text-white shadow-xs'
                : 'bg-white text-[#5D665F] hover:bg-[#EFE7DC] border border-[#E8DEC\-D]'
            }`}
          >
            {language === 'ar' ? 'تم تسليمها وتركيبها' : 'Delivered & Installed'} (
            {orders.filter((o) => o.status === 'delivered').length})
          </button>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DEC\-D] max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FCF9F4] text-[#8F3E24] flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#1B211D] mb-2">
              {language === 'ar' ? 'لا توجد طلبات في هذا القسم' : 'No Orders Found'}
            </h3>
            <p className="text-xs text-[#747D74] mb-6">
              {language === 'ar'
                ? 'لم يتم تسجيل أي طلبات تطابق هذا التصفية حالياً.'
                : 'There are currently no orders in this category.'}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#1B211D] text-white px-6 py-2.5 rounded-full text-xs font-bold"
            >
              <span>{language === 'ar' ? 'تصفح المتجر' : 'Browse Catalog'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusInfo = getStatusBadge(order.status);
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-[#E8DEC\-D] p-5 sm:p-6 shadow-xs hover:border-[#D3C3B1] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1E9DF]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-bold text-[#1B211D] font-mono">
                          #{order.id}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusInfo.bg}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span>{statusInfo.label}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#85796D]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#8F3E24]" />
                          {new Date(order.createdAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                        </span>
                        <span>•</span>
                        <span>{order.deliveryMethod.name[language]}</span>
                      </div>
                    </div>

                    <div className="text-start sm:text-end">
                      <div className="text-xs text-[#85796D]">
                        {language === 'ar' ? 'المجموع النهائي:' : 'Order Total:'}
                      </div>
                      <div className="text-base sm:text-lg font-bold font-serif text-[#1B211D]">
                        {formatPrice(order.grandTotal ?? order.total)}
                      </div>
                    </div>
                  </div>

                  {/* Order Items Previews */}
                  <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 overflow-x-auto max-w-full pb-1">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="relative w-14 h-16 rounded-xl overflow-hidden bg-[#FCF9F4] border border-[#E8DEC\-D] shrink-0 group"
                          title={item.product.name[language]}
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name[language]}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] text-center font-bold py-0.5">
                            ×{item.quantity}
                          </span>
                        </div>
                      ))}
                      <div className="text-xs text-[#5D665F] ps-2">
                        <strong>{order.items.length}</strong> {language === 'ar' ? 'قطع' : 'pieces'}
                      </div>
                    </div>

                    {/* View Details Action */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => navigate(`/orders/${order.id}`)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#FCF9F4] hover:bg-[#1B211D] hover:text-white text-[#1B211D] px-4 py-2.5 rounded-xl text-xs font-bold border border-[#D3C3B1] transition-all"
                      >
                        <span>{language === 'ar' ? 'تفاصيل الطلب والتركيب' : 'View Order Details'}</span>
                        <ChevronIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
