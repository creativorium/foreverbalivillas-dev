'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './CookieConsent.module.css';

const STORAGE_KEY = 'fbv_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if no previous choice
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Small delay so it slides in after page load
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <div className={styles.dot} aria-hidden="true" />
      <div className={styles.text}>
        <p className={styles.title}>Cookies &amp; Privacy</p>
        <p className={styles.body}>
          We use cookies to improve your experience and analyse site traffic.{' '}
          <Link href="/privacy-policy" className={styles.link}>Learn more</Link>
        </p>
      </div>
      <div className={styles.actions}>
        <button className={styles.btnDecline} onClick={decline}>Decline</button>
        <button className={styles.btnAccept} onClick={accept}>Accept</button>
      </div>
    </div>
  );
}
