/**
 * File-based data store for the admin panel.
 *
 * ⚠️  Production note: Next.js on Vercel uses a read-only filesystem after
 *     build. For persistent writes in production, replace the fs calls with
 *     Vercel KV, Vercel Postgres, Supabase, or any other database.
 *     The API contract (function signatures) stays the same — only the
 *     storage backend needs to change.
 */
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

function readJSON<T>(file: string): T {
  const raw = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
  return JSON.parse(raw) as T;
}

function writeJSON(file: string, data: unknown): void {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), 'utf8');
}

// ── Blog posts ────────────────────────────────────────────────────────────────

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  body?: string;        // full article body (paragraphs separated by \n\n)
  coverImage: string;
  gallery?: string[];
  date: string;
  category?: string;
  published?: boolean;
}

export function getPosts(): Post[] {
  return readJSON<Post[]>('posts.json');
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find(p => p.slug === slug);
}

export function createPost(post: Post): Post {
  const posts = getPosts();
  if (posts.find(p => p.slug === post.slug)) {
    throw new Error(`Post with slug "${post.slug}" already exists`);
  }
  posts.unshift(post);
  writeJSON('posts.json', posts);
  return post;
}

export function updatePost(slug: string, data: Partial<Post>): Post {
  const posts = getPosts();
  const idx = posts.findIndex(p => p.slug === slug);
  if (idx === -1) throw new Error(`Post "${slug}" not found`);
  const updated = { ...posts[idx], ...data };
  posts[idx] = updated;
  writeJSON('posts.json', posts);
  return updated;
}

export function deletePost(slug: string): void {
  const posts = getPosts().filter(p => p.slug !== slug);
  writeJSON('posts.json', posts);
}

// ── Site settings ─────────────────────────────────────────────────────────────

export interface SiteSettings {
  contact: { email: string; phone: string; whatsapp: string };
  social: { instagram: string; facebook: string; youtube: string };
  booking: { url: string };
  hero: { scrollText: string };
}

export function getSettings(): SiteSettings {
  return readJSON<SiteSettings>('site-settings.json');
}

export function updateSettings(data: Partial<SiteSettings>): SiteSettings {
  const current = getSettings();
  const updated = {
    contact: { ...current.contact, ...data.contact },
    social: { ...current.social, ...data.social },
    booking: { ...current.booking, ...data.booking },
    hero: { ...current.hero, ...data.hero },
  };
  writeJSON('site-settings.json', updated);
  return updated;
}

// ── Site content (all page copy) ─────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SiteContent = Record<string, any>;

export function getSiteContent(): SiteContent {
  return readJSON<SiteContent>('site-content.json');
}

export function updateSiteContent(patch: SiteContent): SiteContent {
  // Deep merge: overwrite only the sections provided
  const current = getSiteContent();
  const merged = deepMerge(current, patch);
  writeJSON('site-content.json', merged);
  return merged;
}

function deepMerge(target: SiteContent, source: SiteContent): SiteContent {
  const out = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key]) &&
        target[key] !== null && typeof target[key] === 'object' && !Array.isArray(target[key])) {
      out[key] = deepMerge(target[key] as SiteContent, source[key] as SiteContent);
    } else {
      out[key] = source[key];
    }
  }
  return out;
}

// ── Admin users ───────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'editor';
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
}

export function getUsers(): AdminUser[] {
  return readJSON<AdminUser[]>('admin-users.json');
}

export function getUser(username: string): AdminUser | undefined {
  return getUsers().find(u => u.username === username);
}

export function createUser(user: AdminUser): AdminUser {
  const users = getUsers();
  if (users.find(u => u.username === user.username)) {
    throw new Error(`User "${user.username}" already exists`);
  }
  users.push(user);
  writeJSON('admin-users.json', users);
  return user;
}

export function deleteUser(id: string): void {
  const users = getUsers().filter(u => u.id !== id);
  writeJSON('admin-users.json', users);
}

export function updateUser(id: string, data: Partial<AdminUser>): AdminUser {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) throw new Error('User not found');
  users[idx] = { ...users[idx], ...data };
  writeJSON('admin-users.json', users);
  return users[idx];
}
