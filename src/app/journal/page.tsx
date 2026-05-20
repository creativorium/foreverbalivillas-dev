import type { Metadata } from 'next';
import Link from 'next/link';
import NewsletterStrip from '@/components/NewsletterStrip';
import Footer from '@/components/Footer';
import { getPosts } from '@/lib/admin-data';
import styles from './page.module.css';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'The Journal — Stories, Travel Guides & Culture',
  description:
    'Dive into the soul of Bali. Lifestyle stories, travel guides, and cultural insights from the team behind Forever Bali Villas.',
};

const FILTER_TABS = ['Lifestyle', 'Travel Guides', 'Culture'];

export default async function JournalPage() {
  const allPosts = await getPosts();
  const published = allPosts.filter(p => p.published !== false);
  const [featured, ...rest] = published;

  if (!featured) {
    return (
      <>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>The Journal</h1>
          </div>
        </section>
        <section className={styles.postsSection}>
          <p style={{ textAlign: 'center', padding: '80px 20px', color: '#6b7280' }}>No posts yet.</p>
        </section>
        <NewsletterStrip />
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroImg}>
          <img
            src={featured.coverImage}
            alt="The Journal"
            className={styles.heroBgImg}
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>The Journal</h1>
        </div>
      </section>

      {/* Filter tabs */}
      <div className={styles.filters}>
        <div className={styles.filterInner}>
          {FILTER_TABS.map((tab, i) => (
            <button
              key={tab}
              className={`${styles.filterBtn} ${i === 1 ? styles.filterActive : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <section className={styles.postsSection}>
        {/* Featured — full width */}
        <Link href={`/journal/${featured.slug}`} className={styles.featuredCard}>
          <img
            src={featured.coverImage}
            alt={featured.title}
            className={styles.featuredImg}
          />
          <div className={styles.featuredOverlay} />
          <div className={styles.featuredFooter}>
            <h2 className={styles.featuredTitle}>{featured.title}</h2>
            <span className={styles.readBtn}>Read More &nbsp;→</span>
          </div>
        </Link>

        {/* Bottom row — 3 equal columns */}
        <div className={styles.bottomRow}>
          {rest[0] && (
            <Link href={`/journal/${rest[0].slug}`} className={styles.card}>
              <img src={rest[0].coverImage} alt={rest[0].title} className={styles.cardImg} />
              <div className={styles.cardOverlay} />
              <div className={styles.cardFooter}>
                <h3 className={styles.cardTitle}>{rest[0].title}</h3>
                <span className={styles.readBtn}>Read More &nbsp;→</span>
              </div>
            </Link>
          )}

          {rest[1] && (
            <Link href={`/journal/${rest[1].slug}`} className={styles.card}>
              <img src={rest[1].coverImage} alt={rest[1].title} className={styles.cardImg} />
              <div className={styles.cardOverlay} />
              <div className={styles.cardFooter}>
                <h3 className={styles.cardTitle}>{rest[1].title}</h3>
                <span className={styles.readBtn}>Read More &nbsp;→</span>
              </div>
            </Link>
          )}

          {/* Load More card */}
          <div className={styles.loadMoreCard}>
            <div className={styles.loadMoreOverlay} />
            <button className={styles.loadMoreBtn}>Load More</button>
          </div>
        </div>
      </section>

      <NewsletterStrip />
      <Footer />
    </>
  );
}
