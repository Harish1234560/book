import { Reveal } from '@/components/motion/Reveal';
import { Marquee } from '@/components/motion/Marquee';
import { Rating } from '@/components/ui/Rating';
import { useLanguage } from '@/lib/i18n';

const reviews = [
  { name: 'Ananya R.', image: '/images/reader-ananya.jpg', text: 'Beautifully packaged and delivered in three days. The book selection is unlike any other store.', rating: 5, book: 'The Silent Hours' },
  { name: 'Karthik S.', image: '/images/reader-karthik.jpg', text: 'The gold accent packaging made it feel like a gift. Will order again.', rating: 5, book: 'River of Stars' },
  { name: 'Deepa M.', image: '/images/reader-deepa.jpg', text: 'Found titles I could not locate anywhere else. The curation is thoughtful.', rating: 4.5, book: 'Winter Bloom' },
  { name: 'Rahul V.', image: '/images/reader-rahul.jpg', text: 'Smooth checkout, quick delivery, and genuine publisher copies. Highly recommend.', rating: 5, book: 'The Cartographer of Lost Places' },
  { name: 'Sneha P.', image: '/images/reader-sneha.jpg', text: 'The reading lists helped me discover three new authors I now love.', rating: 5, book: 'Found Objects' },
];

function ReviewCard({ review, onLabel }: { review: typeof reviews[0]; onLabel: string }) {
  return (
    <div className="w-[320px] shrink-0 rounded-20 border border-line bg-bg-1 p-6">
      <Rating value={review.rating} size="sm" showCount={false} />
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">"{review.text}"</p>
      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">{review.name}</p>
          <p className="text-xs text-ink-faint">{onLabel} {review.book}</p>
        </div>
        <img
          src={review.image}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

export function Reviews() {
  const { language, t } = useLanguage();
  const onLabel = t.page.on;

  return (
    <section className="py-128 overflow-hidden">
      <div className="container-shell">
        <Reveal>
          <div className="mb-12 flex flex-col items-center text-center">
            <p className="label-eyebrow mb-4 text-accent">{t.page.kindWords}</p>
            <h2 className="text-h2 font-serif text-ink">{t.page.fromOurReaders}</h2>
          </div>
        </Reveal>
      </div>
      <Marquee>
        {reviews.map((r) => (
          <ReviewCard key={r.name} review={r} onLabel={onLabel} />
        ))}
      </Marquee>
    </section>
  );
}
