'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styles from './VillaGalleryTestimonies.module.css';

export interface TestimonyData {
  id: number | string;
  rating: number;
  text: string;
  author: string;
  age: number | string;
}

const DEFAULT_TESTIMONIES: TestimonyData[] = [
  {
    id: 1,
    rating: 5,
    text: "Waking up to the sound of the ocean every morning was pure magic. The villa staff anticipated every need before we even asked — truly world-class hospitality.",
    author: "Sarah M.",
    age: 34,
  },
  {
    id: 2,
    rating: 5,
    text: "We celebrated our anniversary here and it exceeded every expectation. The private pool, the sunset views, the breakfast spread — everything was flawless. We'll be back.",
    author: "James & Lisa",
    age: 41,
  },
  {
    id: 3,
    rating: 5,
    text: "Forever Pandawa felt like our own private corner of Bali. The architecture is stunning and the team made us feel completely at home. Already planning our return trip.",
    author: "Nico B.",
    age: 29,
  },
  {
    id: 4,
    rating: 5,
    text: "The level of privacy and tranquility here is unmatched. After a week of exploring Bali, coming back to the villa each evening felt like a true retreat.",
    author: "Priya K.",
    age: 37,
  },
  {
    id: 5,
    rating: 5,
    text: "From the seamless check-in to the thoughtful little touches throughout our stay, this is exactly what a luxury villa experience should feel like. Absolutely stunning.",
    author: "Tom & Rachel",
    age: 45,
  },
];

interface Props {
  images?: string[];
  testimonies?: TestimonyData[];
}

// ─── Smooth drag hook ─────────────────────────────────────────────────────────
function useDrag(trackRef: React.RefObject<HTMLDivElement>) {
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const prevX = useRef(0);
  const vel = useRef(0);
  const raf = useRef(0);

  const fling = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const speed = vel.current * 0.92; // friction
    if (Math.abs(speed) < 0.5) return;
    el.scrollLeft += speed;
    vel.current = speed;
    raf.current = requestAnimationFrame(fling);
  }, [trackRef]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    dragging.current = true;
    startX.current = e.clientX;
    startScroll.current = el.scrollLeft;
    prevX.current = e.clientX;
    vel.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [trackRef]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current || !trackRef.current) return;
    const dx = e.clientX - startX.current;
    trackRef.current.scrollLeft = startScroll.current - dx;
    vel.current = prevX.current - e.clientX;
    prevX.current = e.clientX;
  }, [trackRef]);

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    raf.current = requestAnimationFrame(fling);
  }, [fling]);

  return { onPointerDown, onPointerMove, onPointerUp };
}

export default function VillaGalleryTestimonies({ images = [], testimonies = DEFAULT_TESTIMONIES }: Props) {
  const trackRef = useRef<HTMLDivElement>(null!);
  const testTrackRef = useRef<HTMLDivElement>(null!);

  const extendedImages = [...images, ...images, ...images, ...images, ...images];

  const [testIdx, setTestIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Gallery drag
  const galleryDrag = useDrag(trackRef);
  // Testimony drag
  const testDrag = useDrag(testTrackRef);

  // Gallery scroll: init to middle set + infinite loop
  useEffect(() => {
    const el = trackRef.current;
    if (!el || images.length === 0) return;
    const firstChild = el.children[0] as HTMLElement | undefined;
    if (!firstChild) return;
    const slideW = firstChild.clientWidth + 16;
    el.scrollLeft = slideW * images.length * 2;
  }, [images.length]);

  const handleGalleryScroll = () => {
    const el = trackRef.current;
    if (!el || images.length === 0) return;
    const firstChild = el.children[0] as HTMLElement | undefined;
    if (!firstChild) return;
    const slideW = firstChild.clientWidth + 16;
    const single = slideW * images.length;
    if (el.scrollLeft < single) el.scrollLeft += single * 2;
    else if (el.scrollLeft > single * 4) el.scrollLeft -= single * 2;
  };

  const handleTestScroll = () => {
    const el = testTrackRef.current;
    if (!el) return;
    const firstChild = el.children[0] as HTMLElement | undefined;
    if (!firstChild) return;
    const cardW = firstChild.clientWidth + 16;
    if (cardW > 0) setTestIdx(Math.round(el.scrollLeft / cardW));
  };

  const prevSlide = () => {
    const el = trackRef.current;
    if (!el) return;
    const slideW = (el.children[0] as HTMLElement)?.clientWidth + 16 || 0;
    el.scrollBy({ left: -slideW, behavior: 'smooth' });
  };
  const nextSlide = () => {
    const el = trackRef.current;
    if (!el) return;
    const slideW = (el.children[0] as HTMLElement)?.clientWidth + 16 || 0;
    el.scrollBy({ left: slideW, behavior: 'smooth' });
  };
  const prevTest = () => {
    const el = testTrackRef.current;
    if (!el) return;
    const cardW = (el.children[0] as HTMLElement)?.clientWidth + 16 || 0;
    el.scrollBy({ left: -cardW, behavior: 'smooth' });
  };
  const nextTest = () => {
    const el = testTrackRef.current;
    if (!el) return;
    const cardW = (el.children[0] as HTMLElement)?.clientWidth + 16 || 0;
    el.scrollBy({ left: cardW, behavior: 'smooth' });
  };

  if (!images || images.length === 0) return null;

  return (
    <section className={styles.section}>
      {/* ── GALLERY ── */}
      <div className={styles.carouselContainer} data-reveal>
        <button className={`${styles.navBtn} ${styles.navBtnLeft}`} onClick={prevSlide} aria-label="Previous image">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.trackWrapper}>
          <div
            className={styles.track}
            ref={trackRef}
            onScroll={handleGalleryScroll}
            {...galleryDrag}
            style={{ cursor: 'grab', userSelect: 'none' }}
          >
            {extendedImages.map((src, idx) => (
              <div key={idx} className={styles.slide} onClick={() => setLightboxImg(src)}>
                <Image
                  src={src}
                  alt={`Gallery Image ${(idx % images.length) + 1}`}
                  fill
                  className={styles.slideImg}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <button className={`${styles.navBtn} ${styles.navBtnRight}`} onClick={nextSlide} aria-label="Next image">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ── TESTIMONIES ── */}
      <div className={`container ${styles.testimoniesContainer}`}>
        <div className={styles.testimoniesHeader}>
          <h2 className={`t-h2 ${styles.testimoniesTitle}`} data-reveal>Testimonies</h2>
          <div className={styles.testNavBtns}>
            <button className={styles.testNavBtn} onClick={prevTest} aria-label="Previous testimony">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className={styles.testNavBtn} onClick={nextTest} aria-label="Next testimony">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.testimoniesTrackWrapper}>
          <div
            className={styles.testimoniesTrack}
            ref={testTrackRef}
            onScroll={handleTestScroll}
            {...testDrag}
            style={{ cursor: 'grab', userSelect: 'none' }}
          >
            {testimonies.map((t, idx) => {
              const isActive = isMobile ? testIdx === idx : testIdx + 1 === idx;
              return (
                <div key={idx} className={`${styles.testimonyCard} ${isActive ? styles.testimonyCardActive : ''}`}>
                  <div className={styles.quoteIcon}>
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="var(--gray-light)" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.5 }}>
                      <path d="M9.983 3v7.391C9.983 16.095 6.252 19.961 3 21l-1.542-2.735c2.222-1.05 4.39-3.238 4.39-6.39v-.484H2V3h7.983zm12.017 0v7.391c0 5.704-3.731 9.57-6.983 10.609l-1.542-2.735c2.222-1.05 4.39-3.238 4.39-6.39v-.484h-3.834V3h7.967z" />
                    </svg>
                  </div>
                  <div className={styles.stars}>
                    {[...Array(t.rating)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#ECA23B">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                  <p className={styles.testimonyText}>{t.text}</p>
                  <div className={styles.authorRow}>
                    <div className={styles.authorAvatar}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <span className={styles.authorName}>{t.author}, {t.age}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxImg && (
        <div className={styles.lightbox} onClick={() => setLightboxImg(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightboxImg(null)} aria-label="Close image">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className={styles.lightboxContent}>
            <Image src={lightboxImg} alt="Enlarged gallery image" fill className={styles.lightboxImg} sizes="100vw" />
          </div>
        </div>
      )}
    </section>
  );
}
