import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from '@/components/motion/Preloader';
import { PageTransition } from '@/components/motion/PageTransition';
import { AnnouncementBar } from '@/components/store/AnnouncementBar';
import { Navbar } from '@/components/store/Navbar';
import { Footer } from '@/components/store/Footer';
import { HomePage } from '@/pages/HomePage';
import { PagePlaceholder } from '@/pages/PagePlaceholder';

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
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/books"
            element={
              <PagePlaceholder
                title="Book Catalog"
                description="Browse our full collection with filters, sort, and search."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Books' }]}
              />
            }
          />
          <Route
            path="/books/:slug"
            element={
              <PagePlaceholder
                title="Book Details"
                description="Individual book page with 3D viewer, tabs, and reviews."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Books', href: '/books' }, { label: 'Book' }]}
              />
            }
          />
          <Route
            path="/categories"
            element={
              <PagePlaceholder
                title="Categories"
                description="Browse books by category."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Categories' }]}
              />
            }
          />
          <Route
            path="/categories/:slug"
            element={
              <PagePlaceholder
                title="Category"
                description="Books in this category."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Categories', href: '/categories' }, { label: 'Category' }]}
              />
            }
          />
          <Route
            path="/authors"
            element={
              <PagePlaceholder
                title="Authors"
                description="Discover authors A to Z."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Authors' }]}
              />
            }
          />
          <Route
            path="/authors/:slug"
            element={
              <PagePlaceholder
                title="Author"
                description="Author biography and their books."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Authors', href: '/authors' }, { label: 'Author' }]}
              />
            }
          />
          <Route
            path="/new-releases"
            element={
              <PagePlaceholder
                title="New Releases"
                description="The latest additions to our shelves."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'New Releases' }]}
              />
            }
          />
          <Route
            path="/bestsellers"
            element={
              <PagePlaceholder
                title="Bestsellers"
                description="What our readers are buying most."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Bestsellers' }]}
              />
            }
          />
          <Route
            path="/offers"
            element={
              <PagePlaceholder
                title="Offers"
                description="Current deals and coupon codes."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Offers' }]}
              />
            }
          />
          <Route
            path="/collections/:slug"
            element={
              <PagePlaceholder
                title="Collection"
                description="A curated reading list."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Collections' }, { label: 'Collection' }]}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <PagePlaceholder
                title="Cart"
                description="Your shopping cart."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cart' }]}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <PagePlaceholder
                title="Checkout"
                description="Complete your order."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cart', href: '/cart' }, { label: 'Checkout' }]}
              />
            }
          />
          <Route
            path="/account/*"
            element={
              <PagePlaceholder
                title="My Account"
                description="Orders, wishlist, addresses, and more."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Account' }]}
              />
            }
          />
          <Route
            path="/login"
            element={
              <PagePlaceholder
                title="Sign In"
                description="Welcome back."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Sign In' }]}
              />
            }
          />
          <Route
            path="/register"
            element={
              <PagePlaceholder
                title="Create Account"
                description="Join our bookshop."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Register' }]}
              />
            }
          />
          <Route
            path="*"
            element={
              <PagePlaceholder
                title="Page Not Found"
                description="The page you are looking for does not exist."
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
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
