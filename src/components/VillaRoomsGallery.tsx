'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styles from './VillaRoomsGallery.module.css';
import type { RoomTab } from './VillaPage';

export default function VillaRoomsGallery({ rooms }: { rooms: RoomTab[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [activeRoomIdx, setActiveRoomIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPressed, setCursorPressed] = useState(false);

  // Drag state
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const prevX = useRef(0);
  const vel = useRef(0);
  const animRaf = useRef(0);

  const currentRoom = rooms[activeRoomIdx];
  const images = currentRoom?.images || [];

  const slideW = () => wrapRef.current?.clientWidth ?? window.innerWidth;

  const clampAndSetIdx = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const sw = slideW();
    const cur = Math.round(t.scrollLeft / sw);
    const safeCur = Math.max(0, Math.min(cur, images.length - 1));
    setActiveImageIdx(safeCur);
  }, [images.length]);

  const snap = useCallback((velocityPx: number) => {
    const t = trackRef.current;
    if (!t) return;
    const sw = slideW();
    
    // Calculate projected destination based on momentum
    let targetIdx = Math.round((t.scrollLeft + velocityPx * 50) / sw);
    targetIdx = Math.max(0, Math.min(targetIdx, images.length - 1));
    
    const target = targetIdx * sw;

    cancelAnimationFrame(animRaf.current);
    const from = t.scrollLeft;
    const dist = target - from;
    const dur = Math.min(Math.abs(dist) * 0.6, 500);
    const start = performance.now();
    
    if (dist === 0) {
      clampAndSetIdx();
      return;
    }

    const animate = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      t.scrollLeft = from + dist * ease;
      if (p < 1) {
        animRaf.current = requestAnimationFrame(animate);
      } else {
        t.scrollLeft = target;
        clampAndSetIdx();
      }
    };
    animRaf.current = requestAnimationFrame(animate);
  }, [clampAndSetIdx, images.length]);

  const goToImage = useCallback((idx: number) => {
    const safeIdx = Math.max(0, Math.min(idx, images.length - 1));
    const t = trackRef.current;
    if (!t) return;
    const sw = slideW();
    const target = safeIdx * sw;
    
    cancelAnimationFrame(animRaf.current);
    const from = t.scrollLeft;
    const dist = target - from;
    const dur = Math.min(Math.abs(dist) * 0.5, 600) + 100;
    const start = performance.now();
    
    if (dist === 0) {
      setActiveImageIdx(safeIdx);
      return;
    }

    const go = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      t.scrollLeft = from + dist * ease;
      if (p < 1) animRaf.current = requestAnimationFrame(go);
      else { t.scrollLeft = target; setActiveImageIdx(safeIdx); }
    };
    animRaf.current = requestAnimationFrame(go);
    setActiveImageIdx(safeIdx);
  }, [images.length]);

  const handleRoomChange = (idx: number) => {
    setActiveRoomIdx(idx);
    setActiveImageIdx(0);
    if (trackRef.current) {
      cancelAnimationFrame(animRaf.current);
      trackRef.current.scrollLeft = 0;
    }
  };

  // Handle Resize correctly
  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current) {
        trackRef.current.scrollLeft = activeImageIdx * slideW();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeImageIdx]);

  // Touch handlers
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      e.preventDefault(); // prevent vertical scroll while swiping gallery
      const t = trackRef.current;
      if (!t) return;
      const dx = e.touches[0].clientX - startX.current;
      t.scrollLeft = startScroll.current - dx;
      vel.current = prevX.current - e.touches[0].clientX;
      prevX.current = e.touches[0].clientX;
    };
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => el.removeEventListener('touchmove', onTouchMove);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const t = trackRef.current;
    if (!t) return;
    cancelAnimationFrame(animRaf.current);
    dragging.current = true;
    startX.current = e.clientX;
    startScroll.current = t.scrollLeft;
    prevX.current = e.clientX;
    vel.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
    setCursorPressed(true);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    }
    if (!dragging.current || !trackRef.current) return;
    const dx = e.clientX - startX.current;
    trackRef.current.scrollLeft = startScroll.current - dx;
    vel.current = prevX.current - e.clientX;
    prevX.current = e.clientX;
  }, []);

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setCursorPressed(false);
    snap(vel.current);
  }, [snap]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = trackRef.current;
    if (!t) return;
    cancelAnimationFrame(animRaf.current);
    dragging.current = true;
    startX.current = e.touches[0].clientX;
    startScroll.current = t.scrollLeft;
    prevX.current = e.touches[0].clientX;
    vel.current = 0;
  }, []);

  const onTouchEnd = useCallback(() => {
    dragging.current = false;
    snap(vel.current);
  }, [snap]);

  if (!rooms || rooms.length === 0 || images.length === 0) return null;

  return (
    <section className={styles.section} aria-label="The Rooms">
      <div className={styles.header} data-reveal>
        <h2 className={styles.title}>The Rooms</h2>
        <div className={styles.tabs} role="tablist">
          {rooms.map((room, idx) => (
            <button
              key={room.id}
              role="tab"
              aria-selected={activeRoomIdx === idx}
              className={`${styles.tab} ${activeRoomIdx === idx ? styles.tabActive : ''}`}
              onClick={() => handleRoomChange(idx)}
            >
              {room.label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={wrapRef}
        className={styles.galleryWrap}
        data-reveal
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => { setCursorVisible(false); if (dragging.current) { dragging.current = false; setCursorPressed(false); snap(vel.current); } }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={cursorRef}
          className={`${styles.dragCursor} ${cursorVisible ? styles.cursorVisible : ''} ${cursorPressed ? styles.cursorPress : ''}`}
          aria-hidden="true"
        >
          <span>DRAG</span>
        </div>

        <div ref={trackRef} className={styles.track}>
          {images.map((src, idx) => (
            <div key={`${currentRoom.id}-${idx}`} className={styles.slide}>
              <Image
                src={src}
                alt={`${currentRoom.label} - Image ${idx + 1}`}
                fill
                sizes="100vw"
                priority={idx === 0}
                className={styles.slideImg}
                draggable={false}
              />
              <div className={styles.slideContent}>
                <p className={styles.slideDesc}>{currentRoom.description}</p>
                
                {images.length > 1 && (
                  <div className={styles.counter} aria-hidden="true">
                    <span className={styles.counterCurrent}>
                      {String(activeImageIdx + 1).padStart(2, '0')}
                    </span>
                    <div className={styles.counterTrack}>
                      <div
                        className={styles.counterFill}
                        style={{ width: `${((activeImageIdx + 1) / images.length) * 100}%` }}
                      />
                    </div>
                    <span className={styles.counterTotal}>
                      {String(images.length).padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {activeImageIdx > 0 && images.length > 1 && (
          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => goToImage(activeImageIdx - 1)} aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {activeImageIdx < images.length - 1 && images.length > 1 && (
          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => goToImage(activeImageIdx + 1)} aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
