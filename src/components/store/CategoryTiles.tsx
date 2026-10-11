import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

const categories = [
  {
    name: 'Fiction',
    image: '/images/category-fiction.jpg',
    count: 124,
    description: 'Lose yourself in imagined worlds, unforgettable characters, and stories that stay with you.',
  },
  {
    name: 'Non-fiction',
    image: '/images/category-nonfiction.jpg',
    count: 86,
    description: 'Fresh perspectives, true stories, and ideas that make the world a little clearer.',
  },
  {
    name: 'Self-help',
    image: '/images/category-self-help.jpg',
    count: 42,
    description: 'Thoughtful guides for building better habits and making room for a little more growth.',
  },
  {
    name: 'Business',
    image: '/images/category-business.jpg',
    count: 38,
    description: 'Smart reads on leadership, creativity, and the people changing how business gets done.',
  },
  {
    name: 'Children',
    image: '/images/category-children.jpg',
    count: 57,
    description: 'Big adventures, bright imaginations, and the first stories children will always remember.',
  },
  {
    name: 'Comics',
    image: '/images/category-comics.jpg',
    count: 31,
    description: 'Graphic stories where striking art and inventive storytelling meet on every page.',
  },
  {
    name: 'Academic',
    image: '/images/category-academic.jpg',
    count: 95,
    description: 'Explore trusted texts and deeper reading across subjects, disciplines, and new ideas.',
  },
  {
    name: 'Regional',
    image: '/images/category-regional.jpg',
    count: 48,
    description: 'Discover local voices and distinctive stories rooted in the many languages of India.',
  },
];

const categoryRows = Array.from(
  { length: Math.ceil(categories.length / 3) },
  (_, row) => categories.slice(row * 3, row * 3 + 3)
);

export function CategoryTiles() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section className="category-section relative overflow-hidden py-128">
      <div className="container-shell">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="label-eyebrow mb-4 text-accent">What we curate</p>
              <h2 className="max-w-xl font-serif text-h2 text-ink">
                Find your next story.
              </h2>
            </div>
            <Link
              to="/categories"
              className="group mb-2 hidden shrink-0 items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-accent sm:inline-flex"
            >
              View all
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
                            Shelf {String(categoryNumber).padStart(2, '0')}
                          </span>
                          <span className="category-feature-title">{category.name}</span>
                        </span>

                        <span className="category-feature-expanded">
                          <span className="category-feature-edition">
                            Selected shelf
                          </span>
                          <span className="category-feature-title">{category.name}</span>
                          <span className="category-feature-description">{category.description}</span>
                          <span className="category-feature-footer">
                            <span>
                              <span className="category-feature-footer-label">On this shelf</span>
                              <span>{category.count} books to discover</span>
                            </span>
                            <span className="category-feature-shop">
                              Explore
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
