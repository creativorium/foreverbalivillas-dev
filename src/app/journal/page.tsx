import type { Metadata } from 'next';
import Link from 'next/link';
import NewsletterStrip from '@/components/NewsletterStrip';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'The Journal — Stories, Travel Guides & Culture',
  description:
    'Dive into the soul of Bali. Lifestyle stories, travel guides, and cultural insights from the team behind Forever Bali Villas.',
};

const ALL_POSTS = [
  {
    slug: 'art-of-slow-living',
    category: 'Lifestyle',
    title: 'The Art of Slow Living: A Balinese Way of Being',
    excerpt: 'Bali does not reveal itself quickly. It rewards those who sit still long enough to truly see it.',
    image: '/images/journal/posts/post-art-of-slow-living.jpg',
    featured: true,
  },
  {
    slug: 'blog-fbv-1',
    category: 'Travel Guides',
    title: 'Lorem Ipsum Dolor sit Amet',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.',
    image: '/images/journal/posts/post-lorem-ipsum-1.jpg',
    featured: false,
  },
  {
    slug: 'blog-fbv-2',
    category: 'Culture',
    title: 'Lorem Ipsum Dolor sit Amet',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
    image: '/images/journal/posts/post-lorem-ipsum-2.jpg',
    featured: false,
  },
];

const FILTER_TABS = ['All', 'Lifestyle', 'Travel Guides', 'Culture'];

export default function JournalPage() {
  const [featured, ...rest] = ALL_POSTS;

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroImg}>
          <div className={styles.heroBg} />
        </div>
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <h1 className={`t-hero ${styles.heroTitle}`}>The Journal</h1>
        </div>
      </section>

      {/* Filter tabs */}
      <div className={styles.filters}>
        <div className="container">
          <div className={styles.filterInner}>
            {FILTER_TABS.map(tab => (
              <button key={tab} className={`${styles.filterBtn} ${tab === 'All' ? styles.filterActive : ''}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts */}
      <section className={styles.postsSection}>
        <div className="container">
          {/* Featured large */}
          <Link href={`/journal/${featured.slug}`} className={styles.featuredCard} data-reveal>
            <div className={styles.featuredImg}>
              <div className={styles.imgPlaceholder}>
                <span>{featured.title}</span>
              </div>
              <div className={styles.imgOverlay} />
            </div>
            <div className={styles.featuredBody}>
              <p className={`t-label ${styles.category}`}>{featured.category}</p>
              <h2 className={`t-h2 ${styles.featuredTitle}`}>{featured.title}</h2>
              <button className={styles.readBtn} tabIndex={-1}>
                Read More →
              </button>
            </div>
          </Link>

          {/* Grid */}
          <div className={styles.grid}>
            {rest.map((post, i) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className={styles.card}
                data-reveal
                data-delay={`${i * 0.1}`}
              >
                <div className={styles.cardImg}>
                  <div className={styles.imgPlaceholder}>
                    <span>{post.title}</span>
                  </div>
                  <div className={styles.imgOverlay} />
                </div>
                <div className={styles.cardBody}>
                  <p className={`t-label ${styles.category}`}>{post.category}</p>
                  <h3 className={`t-h3 ${styles.cardTitle}`}>{post.title}</h3>
                  <span className={styles.readMore}>Read More →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className={styles.loadMore} data-reveal>
            <button className="btn btn-outline-dark">Load More →</button>
          </div>
        </div>
      </section>

      <NewsletterStrip />
      <Footer />
    </>
  );
}
