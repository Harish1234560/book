import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from '@/components/motion/Preloader';
import { PageTransition } from '@/components/motion/PageTransition';
import { AnnouncementBar } from '@/components/store/AnnouncementBar';
import { Navbar } from '@/components/store/Navbar';
import { Footer } from '@/components/store/Footer';
import { HomePage } from '@/pages/HomePage';
import { PagePlaceholder } from '@/pages/PagePlaceholder';
import { LanguageProvider, useLanguage } from '@/lib/i18n';

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  return (
    <>
      <div className="grain-overlay" />
      <Preloader />
      {pathname !== '/' && <AnnouncementBar />}
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/books"
            element={
              <PagePlaceholder
                title={t.routes.books}
                description={t.routeDescriptions.books}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: t.nav.books }]}
              />
            }
          />
          <Route
            path="/books/:slug"
            element={
              <PagePlaceholder
                title={t.routes.bookDetails}
                description={t.routeDescriptions.bookDetails}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: t.nav.books, href: '/books' }, { label: 'Book' }]}
              />
            }
          />
          <Route
            path="/categories"
            element={
              <PagePlaceholder
                title={t.routes.categories}
                description={t.routeDescriptions.categories}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: t.nav.categories }]}
              />
            }
          />
          <Route
            path="/categories/:slug"
            element={
              <PagePlaceholder
                title={t.routes.category}
                description={t.routeDescriptions.category}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: t.nav.categories, href: '/categories' }, { label: t.routes.category }]}
              />
            }
          />
          <Route
            path="/authors"
            element={
              <PagePlaceholder
                title={t.routes.authors}
                description={t.routeDescriptions.authors}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: t.nav.authors }]}
              />
            }
          />
          <Route
            path="/authors/:slug"
            element={
              <PagePlaceholder
                title={t.routes.author}
                description={t.routeDescriptions.author}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: t.nav.authors, href: '/authors' }, { label: t.routes.author }]}
              />
            }
          />
          <Route
            path="/new-releases"
            element={
              <PagePlaceholder
                title={t.routes.newReleases}
                description={t.routeDescriptions.newReleases}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: t.nav.newReleases }]}
              />
            }
          />
          <Route
            path="/bestsellers"
            element={
              <PagePlaceholder
                title={t.routes.bestsellers}
                description={t.routeDescriptions.bestsellers}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: t.nav.bestsellers }]}
              />
            }
          />
          <Route
            path="/offers"
            element={
              <PagePlaceholder
                title={t.routes.offers}
                description={t.routeDescriptions.offers}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: t.nav.offers }]}
              />
            }
          />
          <Route
            path="/collections/:slug"
            element={
              <PagePlaceholder
                title={t.routes.collection}
                description={t.routeDescriptions.collection}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Collections' }, { label: t.routes.collection }]}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <PagePlaceholder
                title={t.routes.cart}
                description={t.routeDescriptions.cart}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: t.routes.cart }]}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <PagePlaceholder
                title={t.routes.checkout}
                description={t.routeDescriptions.checkout}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: t.routes.cart, href: '/cart' }, { label: t.routes.checkout }]}
              />
            }
          />
          <Route
            path="/account/*"
            element={
              <PagePlaceholder
                title={t.routes.account}
                description={t.routeDescriptions.account}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: t.routes.account }]}
              />
            }
          />
          <Route
            path="/login"
            element={
              <PagePlaceholder
                title={t.routes.login}
                description={t.routeDescriptions.login}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: t.routes.login }]}
              />
            }
          />
          <Route
            path="/register"
            element={
              <PagePlaceholder
                title={t.routes.register}
                description={t.routeDescriptions.register}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: t.routes.register }]}
              />
            }
          />
          <Route
            path="*"
            element={
              <PagePlaceholder
                title={t.routes.notFound}
                description={t.routeDescriptions.notFound}
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: '404' }]}
              />
            }
          />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
