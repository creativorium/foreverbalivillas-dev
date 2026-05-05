import type { Metadata } from 'next';
import Link from 'next/link';
import NewsletterStrip from '@/components/NewsletterStrip';
import Footer from '@/components/Footer';
import styles from './page.module.css';

// In production, fetch post data from CMS (Sanity, Contentful, etc.)
// REPLACE: wire up real data source here
const getPost = (slug: string) => ({
  slug,
  category: 'Lifestyle',
  title: slug === 'art-of-slow-living'
    ? 'The Art of Slow Living: A Balinese Way of Being'
    : 'Lorem Ipsum Dolor sit Amet',
  heroImage: `/images/journal/posts/post-${slug}.jpg`,
  body: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
  ],
  pullQuote: '"Bali does not reveal itself quickly. It rewards those who are willing to sit still long enough to truly see it."',
  inlineImage: `/images/journal/posts/post-${slug}.jpg`,
});

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return {
    title: post.title,
    description: post.body[0].slice(0, 160),
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <p className={`t-label ${styles.category}`}>{post.category}</p>
          <h1 className={`t-h1 ${styles.heroTitle}`}>{post.title}</h1>
        </div>
      </section>

      {/* Article */}
      <article className={styles.article}>
        <div className={`container ${styles.articleInner}`}>
          <p className={`t-body ${styles.bodyText}`}>{post.body[0]}</p>

          {/* Inline image */}
          <figure className={styles.inlineImg}>
            <div className={styles.inlineImgPlaceholder}>
              <span>Inline Article Image</span>
              <small>Drop post image in public/images/journal/posts/</small>
            </div>
          </figure>

          <p className={`t-body ${styles.bodyText}`}>{post.body[1]}</p>

          <blockquote className={styles.pullQuote}>{post.pullQuote}</blockquote>

          <hr className={styles.divider} />

          {/* Share */}
          <div className={styles.share}>
            <p className={`t-label ${styles.shareLabel}`}>Share this blog:</p>
            <div className={styles.shareIcons}>
              <a href="#" aria-label="Share on Instagram" className={styles.shareIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" aria-label="Share on Facebook" className={styles.shareIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" aria-label="Share on X (Twitter)" className={styles.shareIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </article>

      <NewsletterStrip />
      <Footer />
    </>
  );
}
