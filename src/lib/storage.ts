/**
 * Unified storage adapter — auto-detects backend from environment variables.
 *
 * Priority order:
 *  1. CUSTOM_STORAGE_URL  → Your shared hosting PHP API  (free, you own it)
 *  2. KV_REST_API_URL     → Vercel KV / Upstash Redis    (free tier on Vercel)
 *  3. fallback            → Local JSON files              (dev only)
 */
import fs from 'fs';
import path from 'path';

const DATA_DIR      = path.join(process.cwd(), 'src', 'data');
const CUSTOM_URL    = process.env.CUSTOM_STORAGE_URL;
const CUSTOM_KEY    = process.env.CUSTOM_STORAGE_KEY ?? '';
const USE_KV        = !CUSTOM_URL && !!process.env.KV_REST_API_URL;
const USE_CUSTOM    = !!CUSTOM_URL;

export const STORAGE_MODE: 'custom' | 'kv' | 'file' =
  USE_CUSTOM ? 'custom' : USE_KV ? 'kv' : 'file';

// ── Custom shared-hosting PHP API ────────────────────────────────────────────

async function customGet<T>(endpoint: string): Promise<T | null> {
  const res = await fetch(`${CUSTOM_URL}/${endpoint}`, {
    headers: { 'X-Api-Key': CUSTOM_KEY },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json() as Promise<T>;
}

async function customPut(endpoint: string, data: unknown): Promise<void> {
  await fetch(`${CUSTOM_URL}/${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Api-Key': CUSTOM_KEY },
    body: JSON.stringify(data),
  });
}

export async function uploadImage(file: File): Promise<string> {
  if (!USE_CUSTOM) throw new Error('Image upload requires CUSTOM_STORAGE_URL');
  const form = new FormData();
  form.append('file', file);
  const res  = await fetch(`${CUSTOM_URL}/upload.php`, {
    method: 'POST',
    headers: { 'X-Api-Key': CUSTOM_KEY },
    body: form,
  });
  if (!res.ok) throw new Error('Upload failed');
  const { url } = await res.json() as { url: string };
  return url;
}

// ── Vercel KV ────────────────────────────────────────────────────────────────

async function kvGet<T>(key: string): Promise<T | null> {
  const { kv } = await import('@vercel/kv');
  return kv.get<T>(key);
}

async function kvSet(key: string, value: unknown): Promise<void> {
  const { kv } = await import('@vercel/kv');
  await kv.set(key, value);
}

// ── Local JSON files (dev) ────────────────────────────────────────────────────

function fileGet<T>(file: string): T {
  const raw = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
  return JSON.parse(raw) as T;
}

function fileSet(file: string, data: unknown): void {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), 'utf8');
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function storageGet<T>(key: string, jsonFile: string): Promise<T> {
  if (USE_CUSTOM) {
    // Map key to PHP endpoint, e.g. "fbv:site-content" → "content.php"
    const endpoint = keyToEndpoint(key);
    const val      = await customGet<T>(endpoint);
    if (val !== null) return val;
    // Seed from local file on first use
    const seed = fileGet<T>(jsonFile);
    await customPut(endpoint, seed);
    return seed;
  }

  if (USE_KV) {
    const val = await kvGet<T>(key);
    if (val !== null) return val;
    const seed = fileGet<T>(jsonFile);
    await kvSet(key, seed);
    return seed;
  }

  return fileGet<T>(jsonFile);
}

export async function storageSet(key: string, jsonFile: string, data: unknown): Promise<void> {
  if (USE_CUSTOM) { await customPut(keyToEndpoint(key), data); return; }
  if (USE_KV)     { await kvSet(key, data); return; }
  fileSet(jsonFile, data);
}

function keyToEndpoint(key: string): string {
  // "fbv:site-content" → "content.php"
  // "fbv:site-settings" → "settings.php"
  const slug = key.replace('fbv:', '').replace('site-', '');
  return `${slug}.php`;
}

export const IS_KV     = USE_KV;
export const IS_CUSTOM = USE_CUSTOM;
