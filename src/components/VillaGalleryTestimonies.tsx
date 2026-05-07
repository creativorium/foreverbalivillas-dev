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
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
    author: "John Doe",
    age: 42
  },
  {
    id: 2,
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
    author: "John Doe",
    age: 42
  },
  {
    id: 3,
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
    author: "John Doe",
    age: 42
  },
  {
    id: 4,
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
    author: "John Doe",
    age: 42
  },
  {
    id: 5,
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
    author: "John Doe",
    age: 42
  }
];

interface Props {
  images?: string[];
  testimonies?: TestimonyData[];
}

export default function VillaGalleryTestimonies({ images = [], testimonies = DEFAULT_TESTIMONIES }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const testTrackRef = useRef<HTMLDivElement>(null);
  
  const extendedImages = [...images, ...images, ...images, ...images, ...images]; // duplicate to fake infinite scroll
  
  const [activeIdx, setActiveIdx] = useState(0);
  const [testIdx, setTestIdx] = useState(0); // middle card on desktop = testIdx+1, so idx=1 is highlighted on load
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prevSlide = () => {
    if (!trackRef.current) return;
    const slideW = trackRef.current.children[0]?.clientWidth || 0;
    trackRef.current.scrollBy({ left: -(slideW + 16), behavior: 'smooth' });
  };

  const nextSlide = () => {
    if (!trackRef.current) return;
    const slideW = trackRef.current.children[0]?.clientWidth || 0;
    trackRef.current.scrollBy({ left: slideW + 16, behavior: 'smooth' });
  };

  const prevTest = () => {
    if (!testTrackRef.current) return;
    const cardW = testTrackRef.current.children[0]?.clientWidth || 0;
    testTrackRef.current.scrollBy({ left: -(cardW + 24), behavior: 'smooth' });
  };

  const nextTest = () => {
    if (!testTrackRef.current) return;
    const cardW = testTrackRef.current.children[0]?.clientWidth || 0;
    testTrackRef.current.scrollBy({ left: cardW + 24, behavior: 'smooth' });
  };

  const handleGalleryScroll = () => {
    if (!trackRef.current) return;
    const scrollLeft = trackRef.current.scrollLeft;
    const slideW = trackRef.current.children[0]?.clientWidth || 0;
    const totalW = slideW + 16;
    
    if (slideW > 0) {
      setActiveIdx(Math.round(scrollLeft / totalW));
      
      // Infinite scroll trick: Snap back to middle seamlessly
      const singleSetWidth = totalW * images.length;
      if (scrollLeft < singleSetWidth) {
        trackRef.current.scrollLeft += singleSetWidth * 2;
      } else if (scrollLeft > singleSetWidth * 4) {
        trackRef.current.scrollLeft -= singleSetWidth * 2;
      }
    }
  };

  useEffect(() => {
    // initialize scroll to middle set so we can scroll left immediately
    if (trackRef.current && images.length > 0) {
      const slideW = trackRef.current.children[0]?.clientWidth || 0;
      const totalW = slideW + 16;
      trackRef.current.scrollLeft = totalW * images.length * 2;
    }
  }, [images.length]);

  const handleTestScroll = () => {
    if (!testTrackRef.current) return;
    const scrollLeft = testTrackRef.current.scrollLeft;
    const cardW = testTrackRef.current.children[0]?.clientWidth || 0;
    if (cardW > 0) {
      // setTestIdx = leftmost card fully in view (0-based). Middle = testIdx+1.
      setTestIdx(Math.round(scrollLeft / (cardW + 24)));
    }
  };

  // Mouse drag handlers for gallery
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.pageX - trackRef.current.offsetLeft;
    dragScrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
    trackRef.current.style.userSelect = 'none';
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = x - dragStartX.current;
    trackRef.current.scrollLeft = dragScrollLeft.current - walk;
  };
  const handleMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
      trackRef.current.style.userSelect = '';
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <section className={styles.section}>
      {/* GALLERY CAROUSEL */}
      <div className={styles.carouselContainer} data-reveal>
        <button 
          className={`${styles.navBtn} ${styles.navBtnLeft}`} 
          onClick={prevSlide}
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.trackWrapper}>
          <div 
            className={styles.track} 
            ref={trackRef} 
            onScroll={handleGalleryScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: 'grab' }}
          >
            {extendedImages.map((src, idx) => (
              <div key={idx} className={styles.slide} onClick={() => setLightboxImg(src)}>
                <Image 
                  src={src} 
                  alt={`Gallery Image ${(idx % images.length) + 1}`} 
                  fill 
                  className={styles.slideImg}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>

        <button 
          className={`${styles.navBtn} ${styles.navBtnRight}`} 
          onClick={nextSlide}
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* TESTIMONIES */}
      <div className={`container ${styles.testimoniesContainer}`}>
        <div className={styles.testimoniesHeader}>
          <h2 className={`t-h2 ${styles.testimoniesTitle}`} data-reveal>Testimonies</h2>
          
          <div className={styles.testNavBtns}>
            <button 
              className={styles.testNavBtn} 
              onClick={prevTest}
              disabled={testIdx === 0}
              aria-label="Previous testimony"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button 
              className={styles.testNavBtn} 
              onClick={nextTest}
              disabled={testIdx === testimonies.length - 1}
              aria-label="Next testimony"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.testimoniesTrackWrapper}>
          <div className={styles.testimoniesTrack} ref={testTrackRef} onScroll={handleTestScroll}>
            {testimonies.map((t, idx) => {
              // On desktop (3 visible), the middle one is testIdx + 1. On mobile (1 visible), it is testIdx.
              const isActive = isMobile ? testIdx === idx : testIdx + 1 === idx;
              return (
              <div key={idx} className={`${styles.testimonyCard} ${isActive ? styles.testimonyCardActive : ''}`} data-reveal>
                <div className={styles.quoteIcon}>
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="var(--gray-light)" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.6 }}>
                    <path d="M9.983 3v7.391C9.983 16.095 6.252 19.961 3 21l-1.542-2.735c2.222-1.05 4.39-3.238 4.39-6.39v-.484H2V3h7.983zm12.017 0v7.391c0 5.704-3.731 9.57-6.983 10.609l-1.542-2.735c2.222-1.05 4.39-3.238 4.39-6.39v-.484h-3.834V3h7.967z" />
                  </svg>
                </div>
                <div className={styles.stars}>
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#ECA23B" xmlns="http://www.w3.org/2000/svg">
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

      {/* LIGHTBOX */}
      {lightboxImg && (
        <div className={styles.lightbox} onClick={() => setLightboxImg(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightboxImg(null)} aria-label="Close image">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className={styles.lightboxContent}>
            <Image 
              src={lightboxImg} 
              alt="Enlarged gallery image" 
              fill 
              className={styles.lightboxImg}
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}
