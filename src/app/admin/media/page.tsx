'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface FileItem { filename: string; url: string; isPdf?: boolean }

export default function MediaLibraryPage() {
  const [files,     setFiles]     = useState<FileItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver,  setDragOver]  = useState(false);
  const [copied,    setCopied]    = useState<string | null>(null);
  const [error,     setError]     = useState('');
  const [mode,      setMode]      = useState('file');
  const [filter,    setFilter]    = useState<'all' | 'images' | 'pdfs'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(() => {
    fetch('/api/admin/upload')
      .then(r => r.json())
      .then(d => { setFiles(d.files ?? d.images ?? []); setMode(d.mode ?? 'file'); });
  }, []);

  useEffect(() => { load(); }, [load]);

  const upload = async (fileList: FileList | File[]) => {
    const list = Array.from(fileList);
    if (!list.length) return;
    setUploading(true); setError('');
    const results: FileItem[] = [];

    for (const file of list) {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Upload failed'); continue; }
      results.push({ filename: data.filename, url: data.url, isPdf: file.type === 'application/pdf' });
    }

    setFiles(prev => [...results, ...prev]);
    setUploading(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    upload(e.dataTransfer.files);
  };

  const copy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const displayed = files.filter(f =>
    filter === 'all' ? true : filter === 'pdfs' ? f.isPdf : !f.isPdf
  );
  const pdfCount   = files.filter(f => f.isPdf).length;
  const imageCount = files.filter(f => !f.isPdf).length;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--adm-text)' }}>Media Library</h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--adm-muted)', marginTop: '2px' }}>
            {imageCount} image{imageCount !== 1 ? 's' : ''} · {pdfCount} PDF{pdfCount !== 1 ? 's' : ''} · Click any file to copy its URL
          </p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? 'Uploading…' : '↑ Upload File'}
        </button>
        <input ref={inputRef} type="file" accept="image/*,application/pdf" multiple style={{ display: 'none' }}
          onChange={e => e.target.files && upload(e.target.files)} />
      </div>

      {error && <div className="adm-alert adm-alert-error">{error}</div>}

      {mode === 'file' && (
        <div className="adm-alert adm-alert-info" style={{ marginBottom: '20px' }}>
          <strong>Local mode</strong> — images are saved to <code>public/uploads/</code>.
          Set up shared hosting or Vercel Blob to persist images in production. See <code>storage_how.md</code>.
        </div>
      )}
      {mode === 'custom' && (
        <div className="adm-alert adm-alert-ok" style={{ marginBottom: '20px' }}>
          ✓ <strong>Shared Hosting</strong> — images upload to your hosting server and are live immediately.
        </div>
      )}
      {mode === 'kv' && (
        <div className="adm-alert adm-alert-warn" style={{ marginBottom: '20px' }}>
          Connect <strong>Vercel Blob</strong> (<code>BLOB_READ_WRITE_TOKEN</code>) to enable image uploads in production.
        </div>
      )}

      {/* ── Drop zone ── */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? 'var(--adm-accent)' : 'var(--adm-border)'}`,
          borderRadius: '12px',
          padding: '36px',
          textAlign: 'center',
          cursor: 'pointer',
          marginBottom: '28px',
          background: dragOver ? 'rgba(44,95,90,0.04)' : 'transparent',
          transition: 'all 0.15s',
        }}
      >
        {uploading
          ? <p style={{ color: 'var(--adm-accent)', fontWeight: 500 }}>Uploading…</p>
          : <>
              <p style={{ fontSize: '2rem', marginBottom: '8px' }}>📁</p>
              <p style={{ fontSize: '0.84rem', color: 'var(--adm-text)', fontWeight: 500 }}>
                Drop images here or click to upload
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--adm-muted)', marginTop: '4px' }}>
                Images (JPG, PNG, WEBP, GIF, SVG) max 10MB · PDF max 25MB
              </p>
            </>
        }
      </div>

      {/* ── How to use ── */}
      <div className="adm-card" style={{ marginBottom: '20px', padding: '16px 20px' }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--adm-muted)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--adm-text)' }}>How to use:</strong>{' '}
          Upload an image or PDF → click <strong>Copy URL</strong> → paste into any URL field in the Pages or Blog editors.
          For spa/food menus, upload a PDF here, copy the URL, then paste it into <strong>Pages → Homepage → Key Features → Spa/Food Menu URL</strong>.
        </p>
      </div>

      {/* ── Filter tabs ── */}
      {files.length > 0 && (
        <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
          {(['all', 'images', 'pdfs'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: '6px 14px', fontSize: '0.78rem', borderRadius: '6px', border: '1px solid var(--adm-border)',
                background: filter === f ? 'var(--adm-accent)' : 'transparent',
                color: filter === f ? '#fff' : 'var(--adm-muted)',
                cursor: 'pointer', fontFamily: 'var(--adm-font)',
              }}>
              {f === 'all' ? `All (${files.length})` : f === 'pdfs' ? `PDFs (${pdfCount})` : `Images (${imageCount})`}
            </button>
          ))}
        </div>
      )}

      {/* ── File grid ── */}
      {displayed.length === 0 && !uploading && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--adm-muted)' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{filter === 'pdfs' ? '📄' : '🖼'}</p>
          <p>No {filter === 'pdfs' ? 'PDFs' : filter === 'images' ? 'images' : 'files'} uploaded yet.</p>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '12px',
      }}>
        {displayed.map(file => (
          <div key={file.url} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--adm-border)', background: '#f9fafb', cursor: 'pointer' }}
            onClick={() => copy(file.url)}
            title="Click to copy URL"
          >
            {/* Preview */}
            <div style={{ aspectRatio: '1', overflow: 'hidden', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {file.isPdf ? (
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📄</div>
                  <div style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 600, letterSpacing: '0.05em' }}>PDF</div>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={file.url} alt={file.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              )}
            </div>

            {/* Filename + copy */}
            <div style={{ padding: '8px 10px' }}>
              <p style={{ fontSize: '0.65rem', color: 'var(--adm-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '6px' }}>
                {file.filename}
              </p>
              <button
                className="adm-btn adm-btn-ghost adm-btn-sm"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.65rem',
                  background: copied === file.url ? 'var(--adm-accent)' : undefined,
                  color: copied === file.url ? '#fff' : undefined,
                  borderColor: copied === file.url ? 'var(--adm-accent)' : undefined,
                }}
                onClick={e => { e.stopPropagation(); copy(file.url); }}
              >
                {copied === file.url ? '✓ Copied!' : 'Copy URL'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
