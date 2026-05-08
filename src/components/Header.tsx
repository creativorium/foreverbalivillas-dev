'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import NavOverlay from './NavOverlay';
import styles from './Header.module.css';

// Pages that have a light/white background behind the header
// — on these, logo and buttons should default to dark colours
const LIGHT_BG_PATHS = [
  '/cancellation-policy',
  '/faq',
];

const isLightBgPath = (path: string) =>
  LIGHT_BG_PATHS.some(p => path === p || path.startsWith(p + '/')) ||
  // journal detail pages (not the archive itself)
  (path.startsWith('/journal/') && path.length > '/journal/'.length);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const forcedLight = isLightBgPath(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when nav is open
  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  const toggleNav = () => setNavOpen(prev => !prev);

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${navOpen ? styles.navActive : ''} ${forcedLight ? styles.forcedLight : ''}`}
      >
        <div className={styles.inner}>
          {/* Left: nav group capsule = hamburger + FEATURES pill inside a bordered container */}
          <div className={styles.left}>
            <div className={styles.navGroup} onClick={toggleNav} role="button" aria-label={navOpen ? 'Close menu' : 'Open menu'} aria-expanded={navOpen}>
              <button
                className={styles.hamburger}
                tabIndex={-1}
                aria-hidden="true"
              >
                <span className={styles.bar} />
                <span className={styles.bar} />
              </button>
              <span className={styles.featuresLabel} aria-hidden="true">
                FEATURES
              </span>
            </div>
          </div>

          {/* Center: Logo */}
          <Link href="/" className={styles.logo} aria-label="Forever Bali Villas – Home">
            <Image
              src="/images/logos/Logo_FBV.svg"
              alt="Forever Bali Villas"
              width={200}
              height={100}
              style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', width: '100%'}}
              className={styles.logoImg}
              priority
            />
          </Link>

          {/* Right: BOOK NOW ghost pill */}
          <div className={styles.right}>
            <Link
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookBtn}
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      </header>

      <NavOverlay isOpen={navOpen} onClose={() => setNavOpen(false)} />
    </>
  );
}
