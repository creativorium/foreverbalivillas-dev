import type { Metadata } from 'next';
import NewsletterStrip from '@/components/NewsletterStrip';
import Footer from '@/components/Footer';
import { getPosts } from '@/lib/admin-data';
import JournalGrid from './JournalGrid';
import styles from './page.module.css';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'The Journal — Stories, Travel Guides & Culture',
  description:
    'Dive into the soul of Bali. Lifestyle stories, travel guides, and cultural insights from the team behind Forever Bali Villas.',
};

const FILTER_TABS = ['Lifestyle', 'Travel Guides', 'Culture'];

export default async function JournalPage() {
  const allPosts = await getPosts();
  const published = allPosts.filter(p => p.published !== false);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        {published[0]?.coverImage && (
          <div className={styles.heroImg}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={published[0].coverImage} alt="The Journal" className={styles.heroBgImg} />
          </div>
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>The Journal</h1>
        </div>
      </section>

      {/* Filter tabs */}
      <div className={styles.filters}>
        <div className={styles.filterInner}>
          {FILTER_TABS.map((tab, i) => (
            <button key={tab} className={`${styles.filterBtn} ${i === 1 ? styles.filterActive : ''}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {published.length === 0 ? (
        <section className={styles.postsSection} style={{ minHeight: '40vh', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ textAlign: 'center', padding: '80px 20px', color: '#888' }}>No posts yet.</p>
        </section>
      ) : (
        <JournalGrid posts={published} />
      )}

      <NewsletterStrip />
      <Footer />
    </>
  );
}
