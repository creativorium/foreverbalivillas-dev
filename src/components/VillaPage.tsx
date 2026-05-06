'use client';

import { useState } from 'react';
import Link from 'next/link';
import NewsletterStrip from '@/components/NewsletterStrip';
import Footer from '@/components/Footer';
import VillaRoomsGallery from './VillaRoomsGallery';
import styles from './VillaPage.module.css';

export interface RoomTab {
  id: string;
  label: string;
  description: string;
  images: string[];
}

export interface FacilityCard {
  title: string;
  description: string;
  imagePath: string;
}

export interface VillaData {
  slug: string;
  name: string;
  tagline: string;
  heroTagline: string;
  heroDescription: string;
  description: string;
  longDescription: string;
  heroImage?: string;
  heroVideo?: string;
  amenityTags: string[];
  rooms: RoomTab[];
  facilities: FacilityCard[];
  bookingUrl?: string;
}

interface VillaPageProps {
  villa: VillaData;
}

export default function VillaPage({ villa }: VillaPageProps) {
  const [activeRoom, setActiveRoom] = useState(villa.rooms[0]?.id || '');
  const [facilityIndex, setFacilityIndex] = useState(0);
  const currentRoom = villa.rooms.find(r => r.id === activeRoom) || villa.rooms[0];

  const prevFacility = () =>
    setFacilityIndex(i => (i - 1 + villa.facilities.length) % villa.facilities.length);
  const nextFacility = () =>
    setFacilityIndex(i => (i + 1) % villa.facilities.length);

  // Show 3 facilities at a time
  const visibleFacilities = [0, 1, 2].map(
    offset => villa.facilities[(facilityIndex + offset) % villa.facilities.length]
  );

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero} aria-label={`${villa.name} hero`}>
        <div className={styles.heroImg}>
          {villa.heroVideo ? (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className={styles.heroVideo}
            >
              <source 
                src={villa.heroVideo} 
                type={villa.heroVideo.endsWith('.webm') ? 'video/webm' : 'video/mp4'} 
              />
            </video>
          ) : villa.heroImage ? (
            <img src={villa.heroImage} alt={villa.name} className={styles.heroVideo} />
          ) : (
            <div className={styles.heroBg} />
          )}
        </div>
        <div className={styles.heroOverlay} />

        <div className={`container ${styles.heroContent}`} data-reveal>
          <h1 className={`t-hero ${styles.heroTitle}`}>{villa.name}</h1>
          <div className={styles.heroDivider} />
          
          <div className={styles.heroAmenities}>
            {villa.amenityTags.map(tag => (
              <span key={tag} className={styles.heroAmenityItem}>
                {/* For now rendering the string as is. Replace with SVG icons if needed. */}
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── VILLA DESCRIPTION ── */}
      <section className={`section ${styles.descSection}`}>
        <div className="container">
          <div className={styles.descCenterWrapper} data-reveal>
            <h2 className={styles.descTitle}>{villa.tagline}</h2>
            <p className={styles.descText}>{villa.description}</p>
            <p className={styles.descText}>{villa.longDescription}</p>
          </div>
        </div>
      </section>

      {/* ── THE ROOMS ── */}
      {/* ── THE ROOMS ── */}
      <VillaRoomsGallery rooms={villa.rooms} />

      {/* ── FACILITIES & SERVICES ── */}
      <section className={styles.facilitiesSection} aria-label="Facilities and services">
        <div className="container">
          <h2 className={`t-h2 ${styles.facilitiesTitle}`} data-reveal>
            Facilities &amp; Services
          </h2>
          <p className={styles.facilitiesDesc} data-reveal>
            {villa.name} is fully equipped and acquainted with luxuries and generous amenities including private spa and massage spaces, fully functional gym and areas for other recreational sports such as table tennis.
          </p>

          <div className={styles.facilitiesCarousel}>
            <button className={styles.carouselBtn} onClick={prevFacility} aria-label="Previous facility">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <div className={styles.facilitiesGrid}>
              {visibleFacilities.map((facility, i) => (
                <div key={`${facility.title}-${i}`} className={styles.facilityCard}>
                  <div className={styles.facilityImg}>
                    {/* REPLACE: add facility-[n].jpg to public/images/villas/[slug]/facilities/ */}
                    <div className={styles.facilityImgPlaceholder}>
                      <span>{facility.title}</span>
                    </div>
                    <div className={styles.facilityOverlay} />
                  </div>
                  <div className={styles.facilityBody}>
                    <h4 className={styles.facilityTitle}>{facility.title}</h4>
                    <p className={styles.facilityDesc}>{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className={styles.carouselBtn} onClick={nextFacility} aria-label="Next facility">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── OTA PARTNERS ── */}
      <section className={styles.otaSection} aria-label="Book on">
        <div className="container">
          <div className={styles.otaInner}>
            <p className={`t-label ${styles.otaLabel}`}>Also Available On</p>
            <div className={styles.otaLogos}>
              {/* REPLACE: add actual logos to public/images/logos/ */}
              <div className={styles.otaLogo}>Booking.com</div>
              <div className={styles.otaLogo}>agoda ●●●●●</div>
              <div className={styles.otaLogo}>traveloka✦</div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterStrip />
      <Footer />
    </>
  );
}
