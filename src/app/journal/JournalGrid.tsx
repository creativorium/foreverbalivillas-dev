'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

interface Post { slug: string; title: string; coverImage: string; category?: string; }

const FILTER_TABS = ['All', 'Lifestyle', 'Travel Guides', 'Culture'];
const PER_LOAD = 6;

export default function JournalGrid({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visible, setVisible]               = useState(3);

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const featured    = filtered[0];
  const shown       = filtered.slice(1, visible);
  const initialRow  = shown.slice(0, 2);   // posts[1], posts[2]
  const extraPosts  = shown.slice(2);       // posts[3] onward after Load More
  const hasMore     = visible < filtered.length;

  // Group extra posts into rows of 3
  const extraRows: Post[][] = [];
  for (let i = 0; i < extraPosts.length; i += 3) {
    extraRows.push(extraPosts.slice(i, i + 3));
  }

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisible(3); // reset pagination when filter changes
  };

  return (
    <>
      {/* Filter tabs */}
      <div className={styles.filters}>
        <div className={styles.filterInner}>
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => handleCategoryChange(tab)}
              className={`${styles.filterBtn} ${activeCategory === tab ? styles.filterActive : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <section className={styles.postsSection}>
        {!featured ? (
          <p style={{ textAlign: 'center', padding: '80px 20px', color: '#888' }}>
            No posts in this category yet.
          </p>
        ) : (
          <>
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

            {/* Initial bottom row: up to 2 posts + Load More / That's All in 3rd slot */}
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

              {/* 3rd slot */}
              {hasMore ? (
                <div className={styles.loadMoreCard} onClick={() => setVisible(v => v + PER_LOAD)}>
                  <button className={styles.loadMoreBtn}>Load More</button>
                </div>
              ) : (
                <div className={styles.thatsAllCard}>
                  <p className={styles.thatsAllLabel}>The Journal</p>
                  <p className={styles.thatsAllText}>
                    You&rsquo;ve reached the end of our stories.
                    <br />More coming soon.
                  </p>
                </div>
              )}
            </div>

            {/* Extra rows revealed by Load More — no empty black slots */}
            {extraRows.map((row, ri) => (
              <div key={ri} className={styles.extraRow}>
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
              </div>
            ))}

            {/* Load More at bottom when extra rows exist but still more posts */}
            {hasMore && extraRows.length > 0 && (
              <div className={styles.loadMoreCard} style={{ minHeight: '100px' }}
                onClick={() => setVisible(v => v + PER_LOAD)}>
                <button className={styles.loadMoreBtn}>Load More</button>
              </div>
            )}

            {/* That's All at bottom after extra rows when all shown */}
            {!hasMore && extraRows.length > 0 && (
              <div className={styles.thatsAllCard} style={{ padding: '48px 24px' }}>
                <p className={styles.thatsAllLabel}>The Journal</p>
                <p className={styles.thatsAllText}>
                  You&rsquo;ve reached the end of our stories.
                  <br />More coming soon.
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
