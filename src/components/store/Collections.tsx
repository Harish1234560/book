import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/lib/i18n';

const englishCollections = [
  { numeral: 'I', title: 'Books to Read This Winter', desc: 'Twelve slow, immersive reads for long evenings.', slug: 'winter-reads', image: '/images/collection-winter.jpg' },
  { numeral: 'II', title: 'Voices from the Margins', desc: 'Eight debut authors reshaping Indian fiction.', slug: 'voices-from-the-margins', image: '/images/collection-voices.jpg' },
  { numeral: 'III', title: 'The Quiet Shelf', desc: 'Five meditative non-fiction picks for thoughtful readers.', slug: 'quiet-shelf', image: '/images/collection-quiet.jpg' },
];

const banglaCollections = [
  { numeral: 'I', title: 'শীতের জন্য পড়ার বই', desc: 'দীর্ঘ সন্ধ্যার জন্য বারোটি ধীর, নিমগ্ন পাঠ।', slug: 'winter-reads', image: '/images/collection-winter.jpg' },
  { numeral: 'II', title: 'প্রান্তের কণ্ঠস্বর', desc: 'ভারতীয় কথাসাহিত্যকে নতুন রূপ দিচ্ছে এমন আটজন অভিষেক লেখক।', slug: 'voices-from-the-margins', image: '/images/collection-voices.jpg' },
  { numeral: 'III', title: 'শান্ত তাক', desc: 'চিন্তাশীল পাঠকদের জন্য পাঁচটি মননশীল নন-ফিকশন।', slug: 'quiet-shelf', image: '/images/collection-quiet.jpg' },
];

export function Collections() {
  const { language, t } = useLanguage();
  const collections = language === 'bn' ? banglaCollections : englishCollections;

  return (
    <section className="py-128 bg-bg-2">
      <div className="container-shell">
        <Reveal>
          <div className="mb-12 flex flex-col items-center text-center">
            <p className="label-eyebrow mb-4 text-accent">{t.page.curatedWord}</p>
            <h2 className="text-h2 font-serif text-ink">{t.page.readingLists}</h2>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {collections.map((col, i) => (
            <Reveal key={col.slug} delay={i * 0.12}>
              <Link
                to={`/collections/${col.slug}`}
                className="group relative block overflow-hidden rounded-28 border border-line bg-bg-1 transition-all duration-450 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={col.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <span className="absolute bottom-4 left-6 text-xs font-medium uppercase tracking-[0.22em] text-white/90">
                    {t.page.collection} {col.numeral}
                  </span>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-h3 font-serif text-ink">{col.title}</h3>
                  <p className="mt-3 text-sm text-ink-soft">{col.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors group-hover:text-accent">
                    {t.page.explore}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
