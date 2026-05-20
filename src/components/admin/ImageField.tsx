'use client';

import { useRef, useState } from 'react';

interface Props {
  label:     string;
  value:     string;           // current image URL or path
  onChange:  (url: string) => void;
  hint?:     string;
  folder?:   string;           // e.g. "blog", "villas/pandawa", "homepage"
  aspect?:   string;           // CSS aspect-ratio for preview, e.g. "16/9"
}

export default function ImageField({ label, value, onChange, hint, aspect = '16/9' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setUploading(true); setError('');
    const form = new FormData();
    form.append('file', file);
    try {
      const res  = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Upload failed'); return; }
      onChange(data.url);
    } catch {
      setError('Upload failed — check your connection.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="adm-form-group">
      <label className="adm-label">
        {label}
        {hint && <span className="adm-label-hint">{hint}</span>}
      </label>

      <div style={{ display: 'grid', gridTemplateColumns: value ? '180px 1fr' : '1fr', gap: '12px', alignItems: 'start' }}>

        {/* Current image preview */}
        {value && (
          <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--adm-border)', aspectRatio: aspect, background: '#f3f4f6' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Current" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <button
              type="button"
              onClick={() => onChange('')}
              style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Remove image"
            >✕</button>
          </div>
        )}

        {/* Controls */}
        <div>
          {/* URL input */}
          <input
            className="adm-input"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="/images/your-image.jpg  or paste a full URL"
            style={{ marginBottom: '8px' }}
          />

          {/* Upload button */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
              className="adm-btn adm-btn-ghost adm-btn-sm"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
            >
              {uploading
                ? <><Spinner /> Uploading…</>
                : <>{value ? '↑ Replace image' : '↑ Upload image'}</>
              }
            </button>

            {value && (
              <a href={value} target="_blank" rel="noreferrer" className="adm-btn adm-btn-ghost adm-btn-sm" style={{ textDecoration: 'none' }}>
                Preview ↗
              </a>
            )}
          </div>

          {error && <p style={{ color: 'var(--adm-danger)', fontSize: '0.75rem', marginTop: '6px' }}>{error}</p>}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }}
          />

          <p style={{ fontSize: '0.7rem', color: 'var(--adm-muted)', marginTop: '6px' }}>
            Paste a path from your project (<code>/images/…</code>) or upload a new file.
          </p>
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      style={{ animation: 'spin 1s linear infinite' }}>
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
      <path d="M12 2a10 10 0 0 1 10 10" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}
