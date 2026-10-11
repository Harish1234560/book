import { Link } from 'react-router-dom';
import { Reveal } from '@/components/motion/Reveal';

const authors = [
  { name: 'Aravind Mehta', slug: 'aravind-mehta', image: '/images/author-aravind.jpg', books: 12, quote: 'Every map is a story someone chose to tell.' },
  { name: 'Priya Nair', slug: 'priya-nair', image: '/images/author-priya.jpg', books: 8, quote: 'I write to find the quiet between the lines.' },
  { name: 'Rohan Kapoor', slug: 'rohan-kapoor', image: '/images/author-rohan.jpg', books: 15, quote: 'Fiction is the kindest lie we tell.' },
  { name: 'Meera Iyer', slug: 'meera-iyer', image: '/images/author-meera.jpg', books: 6, quote: 'Words are windows; sometimes they are doors.' },
];

export function AuthorsSpotlight() {
  return (
    <section className="py-128">
      <div className="container-shell">
        <Reveal>
          <div className="mb-12 flex flex-col items-center text-center">
            <p className="label-eyebrow mb-4 text-accent">The Voices</p>
            <h2 className="text-h2 font-serif text-ink">Authors Spotlight</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {authors.map((author, i) => (
            <Reveal key={author.slug} delay={i * 0.1}>
              <Link
                to={`/authors/${author.slug}`}
                className="group flex flex-col items-center gap-4"
              >
                <div className="relative h-32 w-32 overflow-hidden rounded-full md:h-40 md:w-40">
                  <img
                    src={author.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 rounded-full ring-2 ring-transparent transition-all duration-400 group-hover:ring-accent" />
                </div>
                <div className="text-center">
                  <p className="font-serif text-lg font-medium text-ink transition-colors group-hover:text-accent">
                    {author.name}
                  </p>
                  <p className="text-xs text-ink-faint">{author.books} books</p>
                </div>
                <div className="max-w-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-w-xs group-hover:opacity-100">
                  <p className="text-sm italic text-ink-soft text-center">
                    "{author.quote}"
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
