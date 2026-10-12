import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/lib/i18n';

const englishCategories = [
  { name: 'Fiction', image: '/images/category-fiction.jpg', count: 124, description: 'Lose yourself in imagined worlds, unforgettable characters, and stories that stay with you.' },
  { name: 'Non-fiction', image: '/images/category-nonfiction.jpg', count: 86, description: 'Fresh perspectives, true stories, and ideas that make the world a little clearer.' },
  { name: 'Self-help', image: '/images/category-self-help.jpg', count: 42, description: 'Thoughtful guides for building better habits and making room for a little more growth.' },
  { name: 'Business', image: '/images/category-business.jpg', count: 38, description: 'Smart reads on leadership, creativity, and the people changing how business gets done.' },
  { name: 'Children', image: '/images/category-children.jpg', count: 57, description: 'Big adventures, bright imaginations, and the first stories children will always remember.' },
  { name: 'Comics', image: '/images/category-comics.jpg', count: 31, description: 'Graphic stories where striking art and inventive storytelling meet on every page.' },
  { name: 'Academic', image: '/images/category-academic.jpg', count: 95, description: 'Explore trusted texts and deeper reading across subjects, disciplines, and new ideas.' },
  { name: 'Regional', image: '/images/category-regional.jpg', count: 48, description: 'Discover local voices and distinctive stories rooted in the many languages of India.' },
];

const banglaCategories = [
  { name: 'ফিকশন', image: '/images/category-fiction.jpg', count: 124, description: 'কল্পনাপ্রবণ বিশ্ব, স্মরণীয় চরিত্র এবং আপনার মনে থেকে না যাওয়া গল্পের মধ্যে হারিয়ে যান।' },
  { name: 'নন-ফিকশন', image: '/images/category-nonfiction.jpg', count: 86, description: 'নতুন দৃষ্টিভঙ্গি, সত্যিকারের গল্প এবং এমন ধারণা যা পৃথিবীকে একটু পরিষ্কার করে তোলে।' },
  { name: 'সেল্ফ-হেল্প', image: '/images/category-self-help.jpg', count: 42, description: 'ভালো অভ্যাস গড়ে তুলতে চিন্তাশীল গাইড ও আরও বড় বৃদ্ধির পথ।' },
  { name: 'ব্যবসা', image: '/images/category-business.jpg', count: 38, description: 'নেতৃত্ব, সৃজনশীলতা ও ব্যবসাকে বদলে দেওয়া মানুষের স্মার্ট রিডিং।' },
  { name: 'শিশু', image: '/images/category-children.jpg', count: 57, description: 'বড় গল্প, উজ্জ্বল কল্পনা ও শিশুদের মনে থাকা প্রথম গল্প।' },
  { name: 'কমিক্স', image: '/images/category-comics.jpg', count: 31, description: 'গ্রাফিক গল্প যেখানে চোখ-catching আর্ট ও গল্পের সৃজনশীলতা প্রতিটি পৃষ্ঠায় মিলিত হয়।' },
  { name: 'একাডেমিক', image: '/images/category-academic.jpg', count: 95, description: 'বিশ্বাসযোগ্য পাঠ, বিষয়ভিত্তিক গভীর পড়া ও নতুন চিন্তার খোঁজে যান।' },
  { name: 'আঞ্চলিক', image: '/images/category-regional.jpg', count: 48, description: 'ভারতের নানা ভাষার স্থানীয় কণ্ঠস্বর ও স্বতন্ত্র গল্প আবিষ্কার করুন।' },
];

export function CategoryTiles() {
  const { language, t } = useLanguage();
  const categories = language === 'bn' ? banglaCategories : englishCategories;
  const categoryRows = Array.from({ length: Math.ceil(categories.length / 3) }, (_, row) => categories.slice(row * 3, row * 3 + 3));
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section className="category-section relative overflow-hidden py-128">
      <div className="container-shell">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="label-eyebrow mb-4 text-accent">{t.page.whatWeCurate}</p>
              <h2 className="max-w-xl font-serif text-h2 text-ink">
                {t.page.findNextStory}
              </h2>
            </div>
            <Link
              to="/categories"
              className="group mb-2 hidden shrink-0 items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-accent sm:inline-flex"
            >
              {t.page.viewAll}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="category-feature-list">
          {categoryRows.map((row, rowIndex) => (
            <div className="category-card-row" key={rowIndex}>
              {row.map((category, index) => {
                const categoryNumber = rowIndex * 3 + index + 1;
                const isExpanded = hoveredCategory === category.name;

                return (
                  <div
                    key={category.name}
                    className="category-feature-item"
                    style={{ flexGrow: isExpanded ? 2 : 1 }}
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    onFocus={() => setHoveredCategory(category.name)}
                    onBlur={() => setHoveredCategory(null)}
                  >
                    <Reveal delay={index * 0.06} className="h-full">
                      <Link
                        to={`/categories/${category.name.toLowerCase().replace(/[^a-z]/g, '-')}`}
                        className={`category-feature-card${isExpanded ? ' is-expanded' : ''}`}
                        aria-label={`${category.name}, ${category.count} books`}
                      >
                        <img
                          src={category.image}
                          alt=""
                          className="category-feature-image"
                          loading={categoryNumber <= 3 ? 'eager' : 'lazy'}
                          decoding="async"
                        />
                        <span className="category-feature-shade" />
                        <span className="category-feature-number" aria-hidden="true">
                          {String(categoryNumber).padStart(2, '0')}
                        </span>

                        <span className="category-feature-compact">
                          <span className="category-feature-edition">
                            {t.page.shelf} {String(categoryNumber).padStart(2, '0')}
                          </span>
                          <span className="category-feature-title">{category.name}</span>
                        </span>

                        <span className="category-feature-expanded">
                          <span className="category-feature-edition">
                            {t.page.selectedShelfShort}
                          </span>
                          <span className="category-feature-title">{category.name}</span>
                          <span className="category-feature-description">{category.description}</span>
                          <span className="category-feature-footer">
                            <span>
                              <span className="category-feature-footer-label">{t.page.onThisShelfShort}</span>
                              <span>{category.count} {t.page.booksDiscover}</span>
                            </span>
                            <span className="category-feature-shop">
                              {t.page.explore}
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                          </span>
                        </span>
                      </Link>
                    </Reveal>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
