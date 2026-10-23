import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { LanguageProvider } from './context/LanguageContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { UtilityBar } from './components/Header/UtilityBar';
import { MainHeader } from './components/Header/MainHeader';
import { Navigation } from './components/Header/Navigation';
import { MobileDrawer } from './components/Header/MobileDrawer';
import { Footer } from './components/Footer/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { SpecialListingPage } from './pages/SpecialListingPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailsPage } from './pages/OrderDetailsPage';
import { WishlistPage } from './pages/WishlistPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Modals & Overlays
import { CartDrawer } from './components/UI/CartDrawer';
import { WishlistDrawer } from './components/UI/WishlistDrawer';
import { ConsultationModal } from './components/UI/ConsultationModal';
import { ToastContainer } from './components/UI/ToastContainer';
import { BackToTop } from './components/UI/BackToTop';
import { WhatsAppButton } from './components/UI/WhatsAppButton';

const MainLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { route } = useRouter();

  // Scroll to top smoothly whenever route path changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [route.path, route.params]);

  // Initialize Lenis smooth scroll for luxury feel
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Determine which page view to render
  const renderCurrentPage = () => {
    const path = route.path.toLowerCase();

    if (path === '/' || path === '') {
      return <HomePage />;
    }
    if (path === '/shop' || path === '/products') {
      return <ShopPage />;
    }
    if (path.startsWith('/category/')) {
      return <CategoryPage slug={route.params.slug} />;
    }
    if (path === '/new-arrivals') {
      return <SpecialListingPage type="new-arrivals" />;
    }
    if (path === '/best-sellers') {
      return <SpecialListingPage type="best-sellers" />;
    }
    if (path === '/offers' || path === '/sale') {
      return <SpecialListingPage type="offers" />;
    }
    if (path.startsWith('/collection/')) {
      return <SpecialListingPage type="collection" collectionSlug={route.params.slug} />;
    }
    if (path === '/search') {
      return <SearchResultsPage />;
    }
    if (path.startsWith('/product/')) {
      return <ProductDetailPage productId={route.params.id} />;
    }
    if (path === '/cart') {
      return <CartPage />;
    }
    if (path === '/checkout') {
      return <CheckoutPage />;
    }
    if (path === '/order-confirmation') {
      return <OrderConfirmationPage />;
    }
    if (path.startsWith('/orders/')) {
      return <OrderDetailsPage />;
    }
    if (path === '/orders') {
      return <OrdersPage />;
    }
    if (path === '/wishlist') {
      return <WishlistPage />;
    }

    // 404 Fallback for unmatched routes
    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#101828] selection:bg-[#C8102E]/25 selection:text-[#101828] antialiased">
      {/* 1. Header Area (Utility Bar, Main Header, Mega Menu, Mobile Drawer) */}
      <UtilityBar />
      <header className="sticky top-0 z-40 bg-[#FAFAF8]/95 backdrop-blur-md shadow-xs transition-shadow">
        <MainHeader onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
        <Navigation />
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area: Routed Page with transition */}
      <main className="flex-1">
        <div key={route.path} className="animate-in fade-in duration-200">
          {renderCurrentPage()}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Overlays & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <ConsultationModal />
      <ToastContainer />
      <BackToTop />
      <WhatsAppButton />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <LanguageProvider>
        <MainLayout />
      </LanguageProvider>
    </RouterProvider>
  );
}
