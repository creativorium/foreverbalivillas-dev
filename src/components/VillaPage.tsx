'use client';

import { useState } from 'react';
import Link from 'next/link';
import NewsletterStrip from '@/components/NewsletterStrip';
import Footer from '@/components/Footer';
import styles from './VillaPage.module.css';

export interface RoomTab {
  id: string;
  label: string;
  description: string;
  imagePath: string;
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
  heroImage: string;
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
          {/* REPLACE: add hero.jpg to public/images/villas/[slug]/hero/ */}
          <div className={styles.heroBg} />
        </div>
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <p className={`t-label ${styles.heroEyebrow}`}>{villa.heroTagline}</p>
          <h1 className={`t-hero ${styles.heroTitle}`}>{villa.tagline}</h1>
          <p className={styles.heroDesc}>{villa.heroDescription}</p>
          <div className={styles.heroCtas}>
            <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary">
              Book Now
            </Link>
            <button className="btn btn-outline">Direct Book</button>
          </div>
        </div>
      </section>

      {/* ── AMENITY FILTER BAR ── */}
      <section className={styles.amenityBar} aria-label="Amenities">
        <div className={styles.amenityScroll}>
          {villa.amenityTags.map(tag => (
            <span key={tag} className={styles.amenityTag}>{tag}</span>
          ))}
        </div>
      </section>

      {/* ── VILLA DESCRIPTION ── */}
      <section className={`section ${styles.descSection}`}>
        <div className="container">
          <div className={styles.descGrid}>
            <div data-reveal>
              <p className={`t-label ${styles.descLabel}`}>Our Villa</p>
              <h2 className={`t-h2 ${styles.descName}`}>{villa.name}</h2>
            </div>
            <div data-reveal>
              <p className={`t-body ${styles.descText}`}>{villa.description}</p>
              <p className={`t-body ${styles.descText}`} style={{ marginTop: '16px' }}>
                {villa.longDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE ROOMS ── */}
      <section className={styles.roomsSection} aria-label="Rooms">
        <div className="container">
          <h2 className={`t-h2 ${styles.roomsTitle}`} data-reveal>The Rooms</h2>

          {/* Tab bar */}
          <div className={styles.roomTabs} role="tablist">
            {villa.rooms.map(room => (
              <button
                key={room.id}
                role="tab"
                aria-selected={activeRoom === room.id}
                className={`${styles.roomTab} ${activeRoom === room.id ? styles.tabActive : ''}`}
                onClick={() => setActiveRoom(room.id)}
              >
                {room.label}
              </button>
            ))}
          </div>

          {/* Room display */}
          {currentRoom && (
            <div className={styles.roomDisplay}>
              <div className={styles.roomImgWrap}>
                {/* REPLACE: add main.jpg to public/images/villas/[slug]/rooms/[room-id]/ */}
                <div className={styles.roomImgPlaceholder}>
                  <span>{currentRoom.label}</span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>
                    Drop main.jpg in rooms/{currentRoom.id}/
                  </span>
                </div>
              </div>
              <div className={styles.roomInfo} data-reveal>
                <h3 className={`t-h3 ${styles.roomName}`}>{currentRoom.label}</h3>
                <p className={`t-body ${styles.roomDesc}`}>{currentRoom.description}</p>
                <Link
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark"
                  style={{ marginTop: '24px' }}
                >
                  Book This Room
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

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
