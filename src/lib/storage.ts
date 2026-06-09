/**
 * Unified storage adapter — auto-detects backend from environment variables.
 *
 * Priority order:
 *  1. CUSTOM_STORAGE_URL  → Your shared hosting PHP API  (free, you own it)
 *  2. fallback            → Bundled JSON defaults         (edge / no storage configured)
 *
 * All env vars are read inside functions (not at module init) so that
 * Cloudflare Workers runtime bindings are picked up correctly on every request.
 */
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

function getCustomUrl()  { return process.env.CUSTOM_STORAGE_URL; }
function getCustomKey()  { return process.env.CUSTOM_STORAGE_KEY ?? ''; }

export function getStorageMode(): 'custom' | 'kv' | 'file' {
  return process.env.CUSTOM_STORAGE_URL ? 'custom' : 'file';
}

// Kept for backwards-compat — always use getStorageMode() for runtime checks
export const STORAGE_MODE: 'custom' | 'kv' | 'file' = 'file';
export const IS_CUSTOM = false;
export const IS_KV     = false;

// ── Custom shared-hosting PHP API ─────────────────────────────────────────────

async function customGet<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${getCustomUrl()}/${endpoint}`, {
      headers: { 'X-Api-Key': getCustomKey() },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return await res.json() as T;
  } catch {
    return null;
  }
}

async function customPut(endpoint: string, data: unknown): Promise<void> {
  const res = await fetch(`${getCustomUrl()}/${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Api-Key': getCustomKey() },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`Storage write failed (${endpoint}): ${res.status} ${msg}`);
  }
}

export async function uploadImage(file: File): Promise<string> {
  if (!getCustomUrl()) throw new Error('Image upload requires CUSTOM_STORAGE_URL');
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${getCustomUrl()}/media.php`, {
    method: 'POST',
    headers: { 'X-Api-Key': getCustomKey() },
    body: form,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`Hosting upload failed: ${msg}`);
  }
  const { url } = await res.json() as { url: string };
  return url;
}

// ── Local JSON files (dev fallback) ──────────────────────────────────────────

function fileGet<T>(file: string): T {
  try {
    const raw = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return (file.includes('posts') ? [] : {}) as T;
  }
}

function fileSet(file: string, data: unknown): void {
  try {
    fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), 'utf8');
  } catch {
    // No writable filesystem on edge — silently skip
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function storageGet<T>(key: string, jsonFile: string): Promise<T> {
  try {
    if (getCustomUrl()) {
      const val = await customGet<T>(keyToEndpoint(key));
      return val !== null ? val : fileGet<T>(jsonFile);
    }
    return fileGet<T>(jsonFile);
  } catch {
    try { return fileGet<T>(jsonFile); } catch { /* no fs on edge */ }
    return (jsonFile.includes('posts') ? [] : {}) as T;
  }
}

export async function storageSet(key: string, jsonFile: string, data: unknown): Promise<void> {
  if (getCustomUrl()) { await customPut(keyToEndpoint(key), data); return; }
  fileSet(jsonFile, data);
}

function keyToEndpoint(key: string): string {
  const slug = key.replace('fbv:', '').replace('site-', '');
  return `${slug}.php`;
}
