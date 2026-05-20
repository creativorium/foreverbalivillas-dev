import fs from 'fs';
import path from 'path';
import { storageGet, storageSet } from './storage';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

// ── Blog posts ────────────────────────────────────────────────────────────────

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  body?: string;
  coverImage: string;
  gallery?: string[];
  date: string;
  category?: string;
  published?: boolean;
}

export async function getPosts(): Promise<Post[]> {
  return storageGet<Post[]>('fbv:posts', 'posts.json');
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find(p => p.slug === slug);
}

export async function createPost(post: Post): Promise<Post> {
  const posts = await getPosts();
  if (posts.find(p => p.slug === post.slug)) {
    throw new Error(`Post with slug "${post.slug}" already exists`);
  }
  posts.unshift(post);
  await storageSet('fbv:posts', 'posts.json', posts);
  return post;
}

export async function updatePost(slug: string, data: Partial<Post>): Promise<Post> {
  const posts = await getPosts();
  const idx = posts.findIndex(p => p.slug === slug);
  if (idx === -1) throw new Error(`Post "${slug}" not found`);
  const updated = { ...posts[idx], ...data };
  posts[idx] = updated;
  await storageSet('fbv:posts', 'posts.json', posts);
  return updated;
}

export async function deletePost(slug: string): Promise<void> {
  const posts = await getPosts();
  await storageSet('fbv:posts', 'posts.json', posts.filter(p => p.slug !== slug));
}

// ── Site settings ─────────────────────────────────────────────────────────────

export interface SiteSettings {
  contact: { email: string; phone: string; whatsapp: string };
  social: { instagram: string; facebook: string; youtube: string };
  booking: { url: string };
  hero: { scrollText: string };
}

export async function getSettings(): Promise<SiteSettings> {
  return storageGet<SiteSettings>('fbv:site-settings', 'site-settings.json');
}

export async function updateSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSettings();
  const updated: SiteSettings = {
    contact: { ...current.contact, ...data.contact },
    social:  { ...current.social,  ...data.social  },
    booking: { ...current.booking, ...data.booking },
    hero:    { ...current.hero,    ...data.hero    },
  };
  await storageSet('fbv:site-settings', 'site-settings.json', updated);
  return updated;
}

// ── Site content (all page copy) ─────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SiteContent = Record<string, any>;

export function getSiteContent(): SiteContent {
  const raw = fs.readFileSync(path.join(DATA_DIR, 'site-content.json'), 'utf8');
  return JSON.parse(raw) as SiteContent;
}

// ── Admin users (local only — contains password hashes) ───────────────────────

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'editor';
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
}

function readUsers(): AdminUser[] {
  const raw = fs.readFileSync(path.join(DATA_DIR, 'admin-users.json'), 'utf8');
  return JSON.parse(raw) as AdminUser[];
}

function writeUsers(users: AdminUser[]): void {
  fs.writeFileSync(path.join(DATA_DIR, 'admin-users.json'), JSON.stringify(users, null, 2), 'utf8');
}

export function getUsers(): AdminUser[] {
  return readUsers();
}

export function getUser(username: string): AdminUser | undefined {
  return readUsers().find(u => u.username === username);
}

export function createUser(user: AdminUser): AdminUser {
  const users = readUsers();
  if (users.find(u => u.username === user.username)) {
    throw new Error(`User "${user.username}" already exists`);
  }
  users.push(user);
  writeUsers(users);
  return user;
}

export function deleteUser(id: string): void {
  writeUsers(readUsers().filter(u => u.id !== id));
}

export function updateUser(id: string, data: Partial<AdminUser>): AdminUser {
  const users = readUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) throw new Error('User not found');
  users[idx] = { ...users[idx], ...data };
  writeUsers(users);
  return users[idx];
}
