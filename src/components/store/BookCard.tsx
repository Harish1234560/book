import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Check } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { Price } from '@/components/ui/Price';
import { classNames } from '@/lib/format';

interface BookCardProps {
  id: string;
  slug: string;
  title: string;
  author: string;
  coverColor: string;
  coverImage: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  ratingCount?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  stock?: number;
  onAddToCart?: (id: string) => void;
  onWishlist?: (id: string) => void;
  inWishlist?: boolean;
  className?: string;
}

export function BookCard({
  id,
  slug,
  title,
  author,
  coverColor,
  coverImage,
  price,
  originalPrice,
  rating,
  ratingCount,
  isNew,
  isBestseller,
  stock = 10,
  onAddToCart,
  onWishlist,
  inWishlist,
  className,
}: BookCardProps) {
  const [added, setAdded] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);
  const [particles, setParticles] = useState<{ tx: number; ty: number }[]>([]);
  const outOfStock = stock <= 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    onAddToCart?.(id);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHeartBurst(true);
    setParticles(
      Array.from({ length: 6 }, () => ({
        tx: (Math.random() - 0.5) * 40,
        ty: -(Math.random() * 30 + 10),
      }))
    );
    onWishlist?.(id);
    setTimeout(() => { setHeartBurst(false); setParticles([]); }, 600);
  };

  return (
    <Link to={`/books/${slug}`} className="block group">
      <div
        className={classNames(
          'relative flex flex-col gap-3 rounded-20 p-3',
          'transition-all duration-450 ease-premium',
          'group-hover:-translate-y-2 group-hover:shadow-float',
          className
        )}
      >
        {/* Cover */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-12 book-spine-shadow bg-bg-2">
          <div className="absolute inset-0 transition-transform duration-400 ease-premium group-hover:scale-[1.04]">
            <img
              src={coverImage}
              alt={`${title} cover artwork`}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(180deg, ${coverColor}22 0%, transparent 32%, ${coverColor}cc 100%)` }}
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.55)' }}>
                {author}
              </div>
              <div
                className="text-lg font-serif font-medium leading-tight text-white"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.65)' }}
              >
                {title}
              </div>
            </div>
            {/* Glossy highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
          </div>

          {/* Gold wedge */}
          {!outOfStock && <div className="gold-wedge" />}

          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1.5 z-10">
            {isNew && <Badge variant="new">New</Badge>}
            {isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
            {originalPrice && originalPrice > price && (
              <Badge variant="sale">
                -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
              </Badge>
            )}
          </div>

          {/* Wishlist */}
          {onWishlist && (
            <div className="absolute right-2 top-2 z-10">
              <button
                onClick={handleWishlist}
                className="relative grid h-8 w-8 place-items-center rounded-full bg-bg-1/80 backdrop-blur-sm text-ink-soft transition-all hover:text-error"
                aria-label="Add to wishlist"
              >
                <Heart className={classNames(
                  'w-4 h-4 transition-all',
                  heartBurst && 'heart-burst',
                  inWishlist ? 'fill-error text-error' : ''
                )} />
                {/* Heart burst particles */}
                {particles.map((p, i) => (
                  <span
                    key={i}
                    className="heart-particle fly"
                    style={{ '--tx': `${p.tx}px`, '--ty': `${p.ty}px` } as React.CSSProperties}
                  />
                ))}
              </button>
            </div>
          )}

          {/* Quick add */}
          {!outOfStock && onAddToCart && (
            <div className="absolute bottom-2 right-2 z-10 opacity-0 translate-y-2 transition-all duration-300 ease-premium group-hover:opacity-100 group-hover:translate-y-0">
              <button
                onClick={handleAdd}
                className={classNames(
                  'grid h-10 w-10 place-items-center rounded-full shadow-float transition-all duration-300',
                  added ? 'bg-success text-white' : 'bg-accent text-accent-ink hover:scale-110'
                )}
                aria-label="Add to cart"
              >
                {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
            </div>
          )}

          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-bg-0/50 backdrop-blur-[2px] z-10">
              <span className="rounded-full bg-bg-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1 px-1 pb-1">
          <h3 className="text-sm font-medium leading-snug text-ink line-clamp-2">
            {title}
          </h3>
          <p className="text-xs text-ink-faint line-clamp-1">{author}</p>
          {rating !== undefined && (
            <Rating value={rating} count={ratingCount} size="sm" />
          )}
          <Price amount={price} originalAmount={originalPrice} size="sm" className="mt-1" />
        </div>
      </div>
    </Link>
  );
}
