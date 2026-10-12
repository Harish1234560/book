import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/lib/i18n';

export function Newsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail('');
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <section className="py-128 bg-bg-1">
      <div className="container-shell">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="label-eyebrow mb-4 text-accent">{t.page.stayInTouch}</p>
            <h2 className="text-h2 font-serif text-ink">
              {t.page.lettersFrom} <span className="italic font-light">{t.page.bookshop}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-body text-ink-soft">
              {t.page.newsletterLead}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md items-center gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="flex-1 rounded-full border border-line bg-bg-1 px-5 py-3.5 text-body text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            <button
              type="submit"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-accent-ink shadow-gold transition-all hover:scale-105 active:scale-95"
              aria-label="Subscribe"
            >
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <Check className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="arrow"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>
        </Reveal>
        {done && (
          <motion.p
            className="mt-4 text-center text-sm text-success"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t.page.thankYou}
          </motion.p>
        )}
      </div>
    </section>
  );
}
