import { createRouter, RouterProvider, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Layout component that wraps all pages
function Layout() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onCartOpen={() => setCartOpen(true)} />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

// Routes
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const collectionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/collections',
  component: CollectionsPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$id',
  component: ProductDetailPage,
});

const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wishlist',
  component: WishlistPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: () => (
    <main className="min-h-screen pt-20 lg:pt-24 max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-serif text-3xl text-noir mb-6">Privacy Policy</h1>
      <p className="font-sans text-sm text-noir/60 leading-relaxed">
        Maison Élite is committed to protecting your privacy. We collect only the information necessary to process your orders and improve your experience. Your data is never sold to third parties.
      </p>
    </main>
  ),
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: () => (
    <main className="min-h-screen pt-20 lg:pt-24 max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-serif text-3xl text-noir mb-6">Terms of Service</h1>
      <p className="font-sans text-sm text-noir/60 leading-relaxed">
        By using the Maison Élite website, you agree to our terms of service. All purchases are subject to our return policy. Prices are subject to change without notice.
      </p>
    </main>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  collectionsRoute,
  productRoute,
  wishlistRoute,
  aboutRoute,
  contactRoute,
  privacyRoute,
  termsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
