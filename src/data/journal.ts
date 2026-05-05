/**
 * Journal / Blog post data.
 *
 * ── How to add a new post ───────────────────────────────────────────
 * 1. Add a new object to the POSTS array below.
 * 2. Give it a unique `slug` (used in the URL: /journal/[slug]).
 * 3. Drop the cover image in public/images/journal/[slug]-cover.webp
 *
 * ── How to choose which posts appear on the Home page ──────────────
 * Edit HOME_FEATURED_SLUGS at the bottom of this file.
 * You can list 3 slugs in any order — the first becomes the big card,
 * the 2nd and 3rd become the smaller side-by-side cards.
 */

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;   // path inside /public
  date: string;         // ISO date string e.g. '2025-01-15'
  category?: string;    // optional label e.g. 'Lifestyle'
}

export const POSTS: JournalPost[] = [
  {
    slug: 'art-of-slowing-down',
    title: 'The Art Of Slowing Down',
    excerpt:
      'Discover the philosophy behind Forever Bali Villas — where time slows, senses awaken, and every moment is crafted for pure presence.',
    coverImage: '/images/journal/blog-image-1.jpg',
    date: '2025-01-15',
    category: 'Lifestyle',
  },
  {
    slug: 'blog-fbv-1',
    title: 'Blog FBV #1',
    excerpt:
      'Perched above Pandawa Beach, Forever Santai blends Balinese architecture with contemporary luxury for an unforgettable retreat.',
    coverImage: '/images/journal/blog-image-2.jpg',
    date: '2025-02-10',
    category: 'Villas',
  },
  {
    slug: 'blog-fbv-2',
    title: 'Blog FBV #2',
    excerpt:
      'Sweeping ocean views, an infinity pool, and six spacious suites — Forever Pandawa is designed for moments that last forever.',
    coverImage: '/images/journal/blog-image-3.jpg',
    date: '2025-03-05',
    category: 'Villas',
  },
  // ─── Add more posts below ───────────────────────────────────────────
  // {
  //   slug: 'bali-travel-guide',
  //   title: 'Bali Travel Guide 2025',
  //   excerpt: '...',
  //   coverImage: '/images/journal/bali-travel-guide.webp',
  //   date: '2025-04-01',
  //   category: 'Travel',
  // },
];

/**
 * ── HOME PAGE FEATURED POSTS ────────────────────────────────────────
 * List exactly 3 slugs. Order matters:
 *   [0] → big full-width top card
 *   [1] → bottom-left card
 *   [2] → bottom-right card
 *
 * Change these slugs any time to swap which posts appear on the home page.
 */
export const HOME_FEATURED_SLUGS = [
  'art-of-slowing-down',  // [0] big full-width top card
  'blog-fbv-1',           // [1] bottom-left card
  'blog-fbv-2',           // [2] bottom-right card
];

/** Helper: get the 3 home-featured posts in order */
export function getHomeFeaturedPosts(): JournalPost[] {
  return HOME_FEATURED_SLUGS
    .map(slug => POSTS.find(p => p.slug === slug))
    .filter((p): p is JournalPost => Boolean(p));
}
