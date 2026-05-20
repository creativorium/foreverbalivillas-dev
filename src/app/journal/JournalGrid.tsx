'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

interface Post { slug: string; title: string; coverImage: string; }

const INITIAL = 3;   // posts shown before Load More
const PER_LOAD = 6;  // posts revealed per Load More click

export default function JournalGrid({ posts }: { posts: Post[] }) {
  const [visible, setVisible] = useState(INITIAL);

  const featured = posts[0];
  const rest      = posts.slice(1, visible);
  const hasMore   = visible < posts.length;

  if (!featured) return null;

  // Split rest into rows of 3 for the "load more" rows
  // The initial bottom row is handled separately (includes Load More card slot)
  const initialRow = rest.slice(0, 2);      // posts[1], posts[2]
  const extraPosts = rest.slice(2);          // posts[3], posts[4], ... after load more

  // Group extra posts into rows of 3
  const extraRows: Post[][] = [];
  for (let i = 0; i < extraPosts.length; i += 3) {
    extraRows.push(extraPosts.slice(i, i + 3));
  }

  return (
    <section className={styles.postsSection}>
      {/* Featured — full width */}
      <Link href={`/journal/${featured.slug}`} className={styles.featuredCard}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={featured.coverImage} alt={featured.title} className={styles.featuredImg} />
        <div className={styles.featuredOverlay} />
        <div className={styles.featuredFooter}>
          <h2 className={styles.featuredTitle}>{featured.title}</h2>
          <span className={styles.readBtn}>Read More &nbsp;→</span>
        </div>
      </Link>

      {/* Initial bottom row: 2 posts + Load More card */}
      <div className={styles.bottomRow}>
        {initialRow.map(post => (
          <Link key={post.slug} href={`/journal/${post.slug}`} className={styles.card}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImage} alt={post.title} className={styles.cardImg} />
            <div className={styles.cardOverlay} />
            <div className={styles.cardFooter}>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <span className={styles.readBtn}>Read More &nbsp;→</span>
            </div>
          </Link>
        ))}

        {/* Load More card always in the 3rd slot of the initial row */}
        {hasMore && (
          <div className={styles.loadMoreCard} onClick={() => setVisible(v => v + PER_LOAD)}>
            <button className={styles.loadMoreBtn}>Load More</button>
          </div>
        )}

        {/* Empty placeholder if initial row has < 2 posts and no Load More */}
        {!hasMore && initialRow.length < 2 && (
          <div style={{ background: '#0d0d0d' }} />
        )}
      </div>

      {/* Extra rows revealed by Load More */}
      {extraRows.map((row, ri) => (
        <div key={ri} className={styles.bottomRow}>
          {row.map(post => (
            <Link key={post.slug} href={`/journal/${post.slug}`} className={styles.card}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImage} alt={post.title} className={styles.cardImg} />
              <div className={styles.cardOverlay} />
              <div className={styles.cardFooter}>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <span className={styles.readBtn}>Read More &nbsp;→</span>
              </div>
            </Link>
          ))}
          {/* Fill empty slots so grid stays 3-col */}
          {Array.from({ length: 3 - row.length }).map((_, i) => (
            <div key={`empty-${i}`} style={{ background: '#0d0d0d' }} />
          ))}
        </div>
      ))}

      {/* Bottom Load More if there are still more after extra rows */}
      {hasMore && extraRows.length > 0 && (
        <div className={styles.loadMoreCard} onClick={() => setVisible(v => v + PER_LOAD)}
          style={{ minHeight: '80px' }}>
          <button className={styles.loadMoreBtn}>Load More</button>
        </div>
      )}
    </section>
  );
}
