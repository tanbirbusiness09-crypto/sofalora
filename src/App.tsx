import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { LanguageProvider } from './context/LanguageContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CatalogProvider, useCatalog } from './context/CatalogContext';
import { WebsiteProvider, useWebsite } from './context/WebsiteContext';
import { AuthProvider } from './context/AuthContext';
import { MainHeader } from './components/Header/MainHeader';
import { SidebarNav, SidebarDrawer } from './components/Layout/SidebarNav';
import { HeaderMenuDrawer, useNavStyle } from './components/Header/HeaderCategoryNav';
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
import { AccountPage } from './pages/AccountPage';
import { AuthPage } from './pages/AuthPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Modals & Overlays
import { CartDrawer } from './components/UI/CartDrawer';
import { WishlistDrawer } from './components/UI/WishlistDrawer';
import { ConsultationModal } from './components/UI/ConsultationModal';
import { ToastContainer } from './components/UI/ToastContainer';
import { BackToTop } from './components/UI/BackToTop';
import { WhatsAppButton } from './components/UI/WhatsAppButton';
import { BottomTabBar } from './components/UI/BottomTabBar';

const MainLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { route } = useRouter();
  const navStyle = useNavStyle();
  const { status: siteStatus } = useWebsite();
  const { isLoading: catalogLoading } = useCatalog();
  // Fade out the inline index.html preloader once the CMS (and the catalogue) are ready.
  useEffect(() => {
    if (siteStatus === 'loading' || catalogLoading) return;
    const w = window as unknown as { __sfPreloaderDone?: () => void };
    const r = requestAnimationFrame(() => w.__sfPreloaderDone?.());
    return () => cancelAnimationFrame(r);
  }, [siteStatus, catalogLoading]);

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

    if (path === '/' || path === '' || path === '/builder-preview') {
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
    if (path === '/account') {
      return <AccountPage />;
    }

    // 404 Fallback for unmatched routes
    return <NotFoundPage />;
  };

  // Sign-in, register and forgot-password use their own focused layout (no site header/footer).
  const authPath = route.path.toLowerCase().replace(/\/+$/, '');
  if (authPath === '/login' || authPath === '/register' || authPath === '/forgot-password') {
    return (
      <div className="selection:bg-[#B59460]/25 selection:text-[#101828]">
        {authPath === '/forgot-password' ? (
          <ForgotPasswordPage />
        ) : (
          <AuthPage mode={authPath === '/register' ? 'register' : 'login'} />
        )}
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#0B2345] selection:bg-[#B59460]/25 selection:text-[#101828] antialiased">
      {/* 1. Header Area (Main Header, Mega Menu, Mobile Drawer) */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#0B2345] via-[#0C264B] to-[#0E2A52] border-b border-[#B59460]/55">
        <MainHeader navMode={navStyle} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      </header>

      {navStyle === 'sidebar' ? (
        <>
          {/* Mobile/tablet: the sidebar becomes a slide-out drawer */}
          <SidebarDrawer
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />

          {/* Desktop: dark-navy sidebar + routed page */}
          <div className="flex flex-1 items-start">
            <SidebarNav />
            <main className="flex-1 min-w-0 overflow-x-clip lg:ps-4">
              <div key={route.path} className="sf-fade">
                {renderCurrentPage()}
              </div>
            </main>
          </div>
        </>
      ) : (
        <>
          <HeaderMenuDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
          {/* Header navigation mode: full-width page, no sidebar */}
          <main className="w-full flex-1 min-w-0 overflow-x-clip lg:px-2 xl:px-3">
            <div key={route.path} className="sf-fade">
              {renderCurrentPage()}
            </div>
          </main>
        </>
      )}

      {/* Footer */}
      <Footer />

      {/* App-style mobile bottom navigation */}
      <BottomTabBar />

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
        <AuthProvider>
          <CatalogProvider>
            <WebsiteProvider>
              <MainLayout />
            </WebsiteProvider>
          </CatalogProvider>
        </AuthProvider>
      </LanguageProvider>
    </RouterProvider>
  );
}
