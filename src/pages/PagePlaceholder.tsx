import { type ReactNode } from 'react';
import { ArrowRight, BookOpen, Library, Sparkles, TrendingUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { useLanguage } from '@/lib/i18n';

interface PagePlaceholderProps {
  title: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
  children?: ReactNode;
}

export function PagePlaceholder({ title, description, breadcrumbs, children }: PagePlaceholderProps) {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const discoveryLinks = [
    {
      label: 'Browse the shelves',
      description: 'Find your next read in the catalog.',
      href: '/books',
      image: '/images/book-river.jpg',
      icon: Library,
    },
    {
      label: 'Reader favorites',
      description: 'See what readers are loving.',
      href: '/bestsellers',
      image: '/images/book-silent-hours.jpg',
      icon: TrendingUp,
    },
    {
      label: 'Freshly published',
      description: 'Take a look at the latest arrivals.',
      href: '/new-releases',
      image: '/images/book-glassmaker.jpg',
      icon: Sparkles,
    },
  ];
  const primaryLink = pathname === '/books'
    ? { href: '/bestsellers', label: t.page.primaryBooks }
    : { href: '/books', label: t.page.primaryCatalog };
  const visibleDiscoveryLinks = discoveryLinks.filter(({ href }) => href !== pathname);

  return (
    <div className="container-shell pb-24 pt-10 sm:pb-32 sm:pt-14">
      <Breadcrumbs items={breadcrumbs} className="mb-10 sm:mb-14" />

      {children ? (
        <div>{children}</div>
      ) : (
        <>
          <section className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-2xl">
              <p className="label-eyebrow mb-5 text-accent">{t.page.world}</p>
              <h1 className="font-serif text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.035em] text-ink">
                {title}
              </h1>
              {description && (
                <p className="mt-6 max-w-xl text-base leading-8 text-ink-soft sm:text-lg">
                  {description}
                </p>
              )}
              <p className="mt-5 text-sm text-ink-faint">
                {t.page.finishing}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link
                  to={primaryLink.href}
                  className="btn-sweep inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold tracking-wide text-accent-ink shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover"
                >
                  {primaryLink.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-accent"
                >
                  {t.page.backToStore}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="relative mx-auto flex min-h-[320px] w-full max-w-[560px] items-center justify-center overflow-hidden rounded-[28px] bg-[#1f3a32] px-8 py-12 sm:min-h-[390px] sm:px-12"
            >
              <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
              <div className="absolute -right-6 -top-10 h-44 w-44 rounded-full border border-white/10" />
              <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#b8893b]/15 blur-2xl" />

              <div className="relative flex items-center gap-3 sm:gap-6">
                <div className="relative isolate h-36 w-[4.5rem] -rotate-[12deg] overflow-hidden rounded-l-md rounded-r-sm p-2.5 shadow-[0_22px_48px_-18px_rgba(0,0,0,0.75)] sm:h-52 sm:w-32 sm:p-4">
                  <img src="/images/book-after-rain.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/15 to-black/20" />
                  <div className="relative flex h-full flex-col justify-between border border-white/25 p-2 sm:p-3">
                    <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-white/75 sm:text-[9px]">The art of</span>
                    <span className="font-serif text-lg leading-none text-white sm:text-2xl">wonder</span>
                  </div>
                </div>
                <div className="relative z-10 isolate h-48 w-[6.5rem] overflow-hidden rounded-l-md rounded-r-sm p-2.5 shadow-[0_24px_52px_-18px_rgba(0,0,0,0.7)] sm:h-64 sm:w-40 sm:p-4">
                  <img src="/images/book-river.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/20 to-black/25" />
                  <div className="relative flex h-full flex-col items-center justify-between border border-white/30 px-2 py-4 text-center sm:px-3 sm:py-5">
                    <span className="text-[8px] font-medium uppercase tracking-[0.22em] text-white/80 sm:text-[9px]">A good bookshop</span>
                    <BookOpen className="h-12 w-12 text-white/90 sm:h-16 sm:w-16" strokeWidth={1} />
                    <span className="font-serif text-lg italic text-white sm:text-2xl">begins here</span>
                  </div>
                </div>
                <div className="relative isolate h-40 w-[4.5rem] rotate-[10deg] overflow-hidden rounded-l-md rounded-r-sm p-2.5 shadow-[0_22px_48px_-18px_rgba(0,0,0,0.75)] sm:h-56 sm:w-32 sm:p-4">
                  <img src="/images/book-pale-fire.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/15 to-black/20" />
                  <div className="relative flex h-full flex-col justify-between border border-white/25 p-2 sm:p-3">
                    <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-white/75 sm:text-[9px]">Stories for</span>
                    <span className="font-serif text-lg leading-none text-white sm:text-2xl">everywhere</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-5 left-6 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white/55 sm:bottom-7 sm:left-8">
                <span className="h-px w-8 bg-accent" />
                Made for readers
              </div>
              <span className="absolute right-6 top-6 font-serif text-5xl italic text-white/15 sm:right-8 sm:top-8 sm:text-6xl">01</span>
            </div>
          </section>

          <section className="mt-20 border-t border-line pt-8 sm:mt-28 sm:pt-10">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="label-eyebrow mb-2 text-accent">{t.page.keepExploring}</p>
                <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">{t.page.goodPlace}</h2>
              </div>
              <span className="hidden text-sm text-ink-faint sm:block">{t.page.alwaysAnother}</span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {visibleDiscoveryLinks.map(({ label, description: linkDescription, href, image, icon: Icon }) => (
                <Link
                  key={href}
                  to={href}
                  className="group flex min-h-28 items-center gap-4 rounded-20 border border-line bg-bg-1 px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-card sm:px-6"
                >
                  <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-md shadow-book">
                    <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                    <Icon className="absolute bottom-1.5 right-1.5 h-3.5 w-3.5 text-white" strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-xl font-medium text-ink">{label}</span>
                    <span className="mt-0.5 block text-sm text-ink-faint">{linkDescription}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
