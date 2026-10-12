import { useEffect, useRef, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { SplitLines } from '@/components/motion/SplitLines';
import { Reveal } from '@/components/motion/Reveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useLanguage } from '@/lib/i18n';
import '@/styles/hero.css';

/* ---------------------------------------------------------------------
   EDITABLE SETTINGS
   --------------------------------------------------------------------- */
// Leave '' to use the drawn SVG scene. For the closest match to the
// reference, put a clean photo (no text) at public/images/hero-bookshop.jpg
// and set: const HERO_IMAGE = '/images/hero-bookshop.jpg';
const HERO_IMAGE = '';

const TRUST = [
  { icon: BookOpen, titleKey: 'curated', textKey: 'curatedText' },
  { icon: ShieldCheck, titleKey: 'secure', textKey: 'secureText' },
  { icon: Truck, titleKey: 'delivery', textKey: 'deliveryText' },
  { icon: RotateCcw, titleKey: 'returns', textKey: 'returnsText' },
];

// Book stack, listed from the BOTTOM book to the TOP book.
// Change titles/colors freely (these are decorative spines).
const STACK = [
  { title: 'DUNE', bg: '#2b2724', ink: '#d9b36a', x: 60, w: 480, h: 74, rot: 0.4, size: 34, track: 4 },
  { title: 'Sapiens', bg: '#f0e7d4', ink: '#7a4f24', x: 74, w: 450, h: 62, rot: -0.5, size: 30, track: 0 },
  { title: 'THE MIDNIGHT LIBRARY', bg: '#1f4a3d', ink: '#e3c47e', x: 58, w: 470, h: 52, rot: 0.6, size: 21, track: 1.5 },
  { title: 'Atomic Habits', bg: '#f3ebda', ink: '#7a4f24', x: 84, w: 440, h: 58, rot: -0.3, size: 28, track: 0 },
];

let _top = 500; // table level inside the SVG
const BOOKS = STACK.map((b) => {
  _top -= b.h;
  return { ...b, y: _top };
});

// Plant: stem angle (deg, -90 = up), stem length, leaf rotation, leaf scale
const LEAVES = [
  { a: -90, l: 110, ra: -90, s: 1.3 },
  { a: -72, l: 95, ra: -60, s: 1.2 },
  { a: -108, l: 95, ra: -125, s: 1.2 },
  { a: -55, l: 72, ra: -30, s: 1.1 },
  { a: -125, l: 78, ra: -150, s: 1.1 },
  { a: -35, l: 50, ra: -5, s: 1 },
  { a: -145, l: 55, ra: -175, s: 1 },
  { a: -82, l: 56, ra: -95, s: 0.95 },
  { a: -100, l: 50, ra: -110, s: 0.9 },
];
const LEAF = 'M0 0 C 20 -26 70 -30 100 0 C 70 30 20 26 0 0 Z';
const rad = (d: number) => (d * Math.PI) / 180;

const cv = (o: Record<string, string | number>) => o as CSSProperties;

// Floating pages: kind "book" is the flying open book
const FLOATERS = [
  { kind: 'book', pos: { left: '53%', top: '15%' }, k: 26, v: { '--w': '150px', '--r0': '-14deg', '--r1': '-5deg', '--dx': '18px', '--dy': '-18px', '--dur': '10s', '--delay': '-2s' } },
  { kind: 'sheet', pos: { left: '1.5%', top: '36%' }, k: 34, v: { '--w': '120px', '--r0': '-24deg', '--r1': '-8deg', '--dx': '22px', '--dy': '-26px', '--dur': '11s', '--delay': '-3s' } },
  { kind: 'sheet', pos: { left: '70%', top: '9%' }, k: 40, v: { '--w': '90px', '--r0': '28deg', '--r1': '12deg', '--dx': '-16px', '--dy': '20px', '--dur': '9s', '--delay': '-5s' } },
  { kind: 'sheet', pos: { right: '-1.5%', top: '33%' }, k: 30, v: { '--w': '110px', '--r0': '-58deg', '--r1': '-40deg', '--dx': '-14px', '--dy': '16px', '--dur': '12s', '--delay': '-1s' }, hideSm: true },
] as const;

/* ---------------------------------------------------------------------
   SMALL PIECES
   --------------------------------------------------------------------- */
function OpenBook() {
  return (
    <svg viewBox="0 0 160 110" aria-hidden="true">
      <defs>
        <linearGradient id="ax-bk" x1="0" x2="1">
          <stop offset="0" stopColor="#fbf3e2" />
          <stop offset="1" stopColor="#e9dcc3" />
        </linearGradient>
      </defs>
      <path d="M80 22 C58 8 28 8 6 20 L16 92 C36 82 62 84 80 98 Z" fill="url(#ax-bk)" stroke="rgba(150,115,60,.35)" />
      <path d="M80 22 C102 8 132 8 154 20 L144 92 C124 82 98 84 80 98 Z" fill="#f4ead6" stroke="rgba(150,115,60,.35)" />
      <path d="M80 22 V98" stroke="rgba(150,115,60,.45)" />
      {[34, 46, 58, 70].map((y) => (
        <g key={y} stroke="rgba(120,90,50,.22)">
          <path d={`M20 ${y} C38 ${y - 6} 58 ${y - 4} 74 ${y + 6}`} fill="none" />
          <path d={`M86 ${y + 6} C102 ${y - 4} 122 ${y - 6} 140 ${y}`} fill="none" />
        </g>
      ))}
    </svg>
  );
}

function Foliage({ className, leaves, books = false }: { className: string; leaves: Array<{ x: number; y: number; r: number; s: number }>; books?: boolean }) {
  return (
    <svg className={`ax-foliage ${className}`} viewBox="0 0 400 320" aria-hidden="true">
      <defs>
        <linearGradient id="ax-fg" x1="0" x2="1">
          <stop offset="0" stopColor="#86b05c" />
          <stop offset="1" stopColor="#4a7a38" />
        </linearGradient>
      </defs>
      {books && (
        <g>
          <rect x="10" y="200" width="190" height="46" rx="5" fill="#8a6a46" />
          <rect x="30" y="156" width="170" height="44" rx="5" fill="#b69b78" />
        </g>
      )}
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`}>
          <path d={LEAF} fill="url(#ax-fg)" />
        </g>
      ))}
    </svg>
  );
}

function HeroScene() {
  return (
    <svg viewBox="-180 0 980 560" role="img" aria-label="A stack of books beside a plant and a mug">
      <defs>
        <linearGradient id="ax-pages" x1="0" x2="1">
          <stop offset="0" stopColor="#f7f0e2" />
          <stop offset="1" stopColor="#e2d4b9" />
        </linearGradient>
        <linearGradient id="ax-gloss" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".22" />
        </linearGradient>
        <linearGradient id="ax-leaf" x1="0" x2="1">
          <stop offset="0" stopColor="#7aa856" />
          <stop offset="1" stopColor="#3d6e33" />
        </linearGradient>
        <linearGradient id="ax-pot" x1="0" x2="1">
          <stop offset="0" stopColor="#efe6d6" />
          <stop offset="1" stopColor="#d9ccb5" />
        </linearGradient>
        <linearGradient id="ax-wood" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#e2b783" />
          <stop offset="1" stopColor="#bf8b55" />
        </linearGradient>
        <linearGradient id="ax-mug" x1="0" x2="1">
          <stop offset="0" stopColor="#f7eee0" />
          <stop offset="1" stopColor="#e4d5bb" />
        </linearGradient>
        <filter id="ax-blur" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* shadows */}
      <ellipse cx="320" cy="506" rx="340" ry="20" fill="rgba(110,70,25,.35)" filter="url(#ax-blur)" />
      <ellipse cx="668" cy="503" rx="74" ry="9" fill="rgba(110,70,25,.35)" filter="url(#ax-blur)" />

      {/* notebook + pen */}
      <polygon points="-168,468 52,452 62,478 -150,500" fill="#f2e8d6" stroke="rgba(150,115,60,.3)" />
      <polygon points="-150,500 62,478 62,485 -150,508" fill="#d9c9a9" />
      {[0, 1, 2].map((i) => (
        <line key={i} x1={-130 + i * 8} y1={474 - i * 2} x2={30 + i * 6} y2={462 - i * 2} stroke="rgba(120,90,50,.22)" />
      ))}
      <line x1="-96" y1="482" x2="8" y2="466" stroke="#8a6a3a" strokeWidth="4" strokeLinecap="round" />

      {/* wooden board behind the stack */}
      <rect x="470" y="396" width="340" height="24" rx="5" fill="url(#ax-wood)" />
      <rect x="470" y="414" width="340" height="6" rx="3" fill="rgba(90,55,20,.25)" />

      {/* plant pot */}
      <path d="M498 286 H614 L604 396 Q603 404 595 404 H517 Q509 404 508 396 Z" fill="url(#ax-pot)" />
      <ellipse cx="556" cy="286" rx="58" ry="8" fill="#d8cbb4" />
      <ellipse cx="556" cy="287" rx="50" ry="5" fill="#4a3a28" />
      {Array.from({ length: 16 }).map((_, i) => (
        <circle key={i} cx={512 + ((i * 37) % 86)} cy={300 + ((i * 53) % 88)} r="1.4" fill="rgba(110,85,55,.35)" />
      ))}

      {/* leaves (sway as one group) */}
      <g className="ax-plant">
        {LEAVES.map((lf, i) => {
          const sx = 556;
          const sy = 288;
          const ex = sx + lf.l * Math.cos(rad(lf.a));
          const ey = sy + lf.l * Math.sin(rad(lf.a));
          return (
            <g key={i}>
              <path d={`M${sx} ${sy} L${ex.toFixed(1)} ${ey.toFixed(1)}`} stroke="#4f7d3a" strokeWidth="2.5" strokeLinecap="round" />
              <g transform={`translate(${ex.toFixed(1)} ${ey.toFixed(1)}) rotate(${lf.ra}) scale(${lf.s})`}>
                <path d={LEAF} fill="url(#ax-leaf)" />
                <path d="M0 0 L92 0" stroke="rgba(255,255,255,.28)" strokeWidth="1.2" />
              </g>
            </g>
          );
        })}
      </g>

      {/* book stack */}
      {BOOKS.map((b) => {
        const cx = b.x + b.w / 2;
        const cy = b.y + b.h / 2;
        return (
          <g key={b.title} transform={`rotate(${b.rot} ${cx} ${cy})`}>
            <path
              d={`M${b.x + b.w - 3} ${b.y + 4} L${b.x + b.w + 30} ${b.y + 9} L${b.x + b.w + 30} ${b.y + b.h - 5} L${b.x + b.w - 3} ${b.y + b.h - 1} Z`}
              fill="url(#ax-pages)"
            />
            {[0.25, 0.5, 0.75].map((t) => (
              <line key={t} x1={b.x + b.w} x2={b.x + b.w + 28} y1={b.y + 4 + (b.h - 8) * t} y2={b.y + 8 + (b.h - 12) * t} stroke="rgba(120,95,60,.28)" />
            ))}
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="5" fill={b.bg} />
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="5" fill="url(#ax-gloss)" />
            <rect x={b.x + 5} y={b.y + 5} width={b.w - 10} height={b.h - 10} rx="3" fill="none" stroke={b.ink} strokeOpacity=".28" />
            <line x1={b.x + 16} x2={b.x + 54} y1={cy} y2={cy} stroke={b.ink} strokeOpacity=".5" strokeDasharray="1 4" />
            <g transform={`translate(${b.x + b.w - 34} ${cy})`} stroke={b.ink} fill="none" strokeWidth="1.4" opacity=".75">
              <path d="M-9 0 H9 M0 -9 V9" />
              <rect x="-5" y="-5" width="10" height="10" transform="rotate(45)" />
            </g>
            <text
              x={cx - 8}
              y={cy + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fill={b.ink}
              fontSize={b.size}
              fontWeight={500}
              letterSpacing={b.track}
              style={{ fontFamily: 'var(--ax-serif)' }}
            >
              {b.title}
            </text>
          </g>
        );
      })}

      {/* mug */}
      <path d="M724 384 C772 374 782 440 728 458" stroke="#eadcc5" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M724 384 C772 374 782 440 728 458" stroke="rgba(150,115,60,.35)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M612 352 H724 L718 484 Q717 498 703 498 H633 Q619 498 618 484 Z" fill="url(#ax-mug)" />
      <rect x="612" y="352" width="112" height="7" rx="3" fill="#d4a95f" />
      <g textAnchor="middle" fill="#7a5a2a" fontStyle="italic" fontSize="20" style={{ fontFamily: 'var(--ax-serif)' }}>
        <text x="668" y="396">Better</text>
        <text x="668" y="421">Books</text>
        <text x="668" y="446">Brighter</text>
        <text x="668" y="471">Days</text>
      </g>
      <path d="M668 490 c-5 -5 -9 -8 -9 -12 a5 5 0 0 1 9 -2 a5 5 0 0 1 9 2 c0 4 -4 7 -9 12z" fill="#7a5a2a" transform="translate(0 -2) scale(.8) translate(167 118)" />
    </svg>
  );
}

/* ---------------------------------------------------------------------
   MAIN COMPONENT
   --------------------------------------------------------------------- */
export function HeroSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const trustItems = TRUST.map((item) => ({
    ...item,
    title: t.trust[item.titleKey as keyof typeof t.trust],
    text: t.trust[item.textKey as keyof typeof t.trust],
  }));

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const floatY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -50]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduced ? 1 : 0.2]);

  /* Pointer parallax: refs + CSS variables only (no React state) */
  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const loop = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      el.style.setProperty('--px', cx.toFixed(3));
      el.style.setProperty('--py', cy.toFixed(3));
      raf = Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section ref={sectionRef} className="ax-hero" aria-label="Welcome">
      <div className="ax-main">
        {/* ---- background layers ---- */}
        <div className="ax-layer ax-window" aria-hidden="true" />
        <Foliage
          className="tl"
          leaves={[
            { x: 30, y: 40, r: 35, s: 1.6 },
            { x: 70, y: 10, r: 60, s: 1.3 },
            { x: 10, y: 120, r: 10, s: 1.4 },
            { x: 120, y: 90, r: 50, s: 1.1 },
            { x: -10, y: 200, r: -20, s: 1.2 },
          ]}
        />
        <Foliage
          className="bl"
          books
          leaves={[
            { x: 20, y: 150, r: -50, s: 1.3 },
            { x: 60, y: 120, r: -20, s: 1.1 },
          ]}
        />
        <div className="ax-layer ax-table" aria-hidden="true" />

        {/* ---- scene: SVG illustration or your photo ---- */}
        <motion.div className="ax-scene-wrap" style={{ y: sceneY }} aria-hidden={HERO_IMAGE ? true : undefined}>
          {HERO_IMAGE ? (
            <img className="ax-photo" src={HERO_IMAGE} alt="" decoding="async" />
          ) : (
            <div className="ax-scene">
              <HeroScene />
            </div>
          )}
        </motion.div>

        <div className="ax-layer ax-shade" aria-hidden="true" />

        {/* ---- floating pages ---- */}
        <motion.div className="ax-floaters" style={{ y: floatY }} aria-hidden="true">
          {FLOATERS.map((f, i) => (
            <div
              key={i}
              className={`ax-fl${'hideSm' in f && f.hideSm ? ' hide-sm' : ''}`}
              style={cv({ ...f.pos, '--k': f.k })}
            >
              <div className="ax-float" style={cv(f.v)}>
                {f.kind === 'book' ? <OpenBook /> : <span className="ax-sheet" />}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="ax-layer ax-grain" aria-hidden="true" />

        {/* ---- copy ---- */}
        <motion.div className="container-shell" style={{ position: 'relative', zIndex: 4, y: copyY, opacity: copyOpacity }}>
          <div className="ax-copy">
            <Reveal delay={0.2}>
              <p className="ax-eyebrow">{t.hero.eyebrow}</p>
            </Reveal>

            <SplitLines
              className="ax-title"
              lines={[
                <>{t.hero.title[0]}</>,
                <><span className="ax-quiet">{t.hero.title[1]}</span></>,
                <><span className="ax-indent">{t.hero.title[2]}</span></>,
              ]}
              delay={0.4}
            />

            <Reveal delay={0.9}>
              <p className="ax-lead">
                {t.hero.lead}
              </p>
            </Reveal>

            <Reveal delay={1.1}>
              <Link to="/books" className="ax-btn">
                {t.hero.cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Reveal>
          </div>
        </motion.div>
      </div>

      {/* ---- trust strip ---- */}
      <div className="ax-strip">
        <div className="container-shell">
          <div className="ax-strip-in">
            {trustItems.map(({ icon: Icon, title, text }) => (
              <div className="ax-trust" key={title}>
                <Icon size={36} strokeWidth={1.3} />
                <div>
                  <b>{title}</b>
                  <span>{text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}