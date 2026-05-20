import { NextRequest, NextResponse } from 'next/server';
import { STORAGE_MODE } from '@/lib/storage';
import path from 'path';
import fs from 'fs';

const CUSTOM_URL = process.env.CUSTOM_STORAGE_URL;
const CUSTOM_KEY = process.env.CUSTOM_STORAGE_KEY ?? '';

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf'];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: 'File type not allowed. Use JPG, PNG, WEBP, GIF, SVG, or PDF.' }, { status: 400 });
    }
    const maxSize = file.type === 'application/pdf' ? 25 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: `File too large. Max ${file.type === 'application/pdf' ? '25MB' : '10MB'}.` }, { status: 400 });
    }

    // ── Custom shared hosting ────────────────────────────────────────────────
    if (CUSTOM_URL) {
      const upstream = new FormData();
      upstream.append('file', file);
      const res = await fetch(`${CUSTOM_URL}/upload.php`, {
        method: 'POST',
        headers: { 'X-Api-Key': CUSTOM_KEY },
        body: upstream,
      });
      if (!res.ok) {
        const err = await res.text();
        return NextResponse.json({ error: `Hosting upload failed: ${err}` }, { status: 502 });
      }
      return NextResponse.json(await res.json());
    }

    // ── Vercel Blob ──────────────────────────────────────────────────────────
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import('@vercel/blob');
      const ext      = path.extname(file.name);
      const name     = path.basename(file.name, ext).replace(/[^a-z0-9-]/gi, '-').toLowerCase();
      const filename = `${name}-${Date.now()}${ext}`;
      const blob     = await put(`uploads/${filename}`, file, { access: 'public' });
      return NextResponse.json({ url: blob.url, filename });
    }

    // ── Local fallback (dev only) ────────────────────────────────────────────
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const ext      = path.extname(file.name);
    const name     = path.basename(file.name, ext).replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    const filename = `${name}-${Date.now()}${ext}`;
    const dest     = path.join(uploadsDir, filename);
    const bytes    = await file.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(bytes));

    return NextResponse.json({ url: `/uploads/${filename}`, filename });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Upload failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// List uploaded images (local dev only)
export async function GET() {
  if (CUSTOM_URL || process.env.BLOB_READ_WRITE_TOKEN) {
    // Remote storage — can't list here; handled client-side
    return NextResponse.json({ images: [], mode: STORAGE_MODE });
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) return NextResponse.json({ images: [], mode: 'file' });

  const files = fs.readdirSync(uploadsDir)
    .filter(f => /\.(jpe?g|png|webp|gif|svg|pdf)$/i.test(f))
    .map(f => ({ filename: f, url: `/uploads/${f}`, isPdf: /\.pdf$/i.test(f) }))
    .reverse();

  return NextResponse.json({ files, images: files.filter(f => !f.isPdf), mode: 'file' });
}
