import { Link } from 'react-router-dom';
import { Reveal } from '@/components/motion/Reveal';
import { Marquee } from '@/components/motion/Marquee';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/lib/i18n';

export function OffersBanner() {
  const { language, t } = useLanguage();
  const genreWords = language === 'bn' ? t.page.genres : t.page.genres;

  return (
    <section className="relative overflow-hidden bg-ink py-20">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgb(184 137 59 / 0.5) 0%, transparent 60%)',
        }}
      />
      <div className="container-shell relative z-10 text-center">
        <Reveal>
          <p className="label-eyebrow mb-4 text-accent">{t.page.limitedTime}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-h2 font-serif text-bg-0">
            {t.page.offThisWeek} <span className="italic text-accent">40% {t.page.offThisWeek2}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-4 max-w-md text-sm text-bg-0/60">
            {t.page.useCode} <span className="font-mono font-semibold text-accent">READ40</span> {t.page.checkoutNote}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8">
            <Link to="/offers">
              <Button size="md" variant="primary">{t.page.browseOffers}</Button>
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Marquee */}
      <div className="mt-16 border-y border-bg-0/10 py-4">
        <Marquee>
          {genreWords.map((word) => (
            <span
              key={word}
              className="font-serif text-2xl italic text-bg-0/30"
            >
              {word}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
