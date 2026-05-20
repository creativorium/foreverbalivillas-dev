'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ImageField from '@/components/admin/ImageField';
import StorageBanner from '@/components/admin/StorageBanner';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Room {
  id: string;
  label: string;
  description: string;
  images: string[];
}

interface VillaContent {
  name?: string;
  tagline?: string;
  heroTagline?: string;
  heroDescription?: string;
  description?: string;
  longDescription?: string;
  heroImage?: string;
  separatorImage?: string;
  galleryImages?: string[];
  rooms?: Room[];
}

// ── Default room seeds (fallback if storage has no rooms yet) ─────────────────

const DEFAULT_ROOMS: Record<string, Room[]> = {
  'forever-pandawa': [
    { id: 'ocean-suite-1',   label: 'Ocean Suite 1',   description: 'The epitome of modern Balinese luxury, Ocean Suite 1 offers uninterrupted ocean views directly from the bed. The experience is elevated by a sculptural marble bathtub and striking stone relief artwork, creating a serene and indulgent retreat.',
      images: ['/images/villas/forever-pandawa/rooms/ocean-suite-1/ocean-suite-1-a.jpg','/images/villas/forever-pandawa/rooms/ocean-suite-1/ocean-suite-1-b.jpg','/images/villas/forever-pandawa/rooms/ocean-suite-1/ocean-suite-1-c.jpg','/images/villas/forever-pandawa/rooms/ocean-suite-1/ocean-suite-1-d.jpg','/images/villas/forever-pandawa/rooms/ocean-suite-1/ocean-suite-1-e.jpg'] },
    { id: 'ocean-suite-2',   label: 'Ocean Suite 2',   description: 'Designed for added privacy, Ocean Suite 2 features a separate private entrance and a secluded balcony, perfect for quiet mornings overlooking the ocean. The suite also includes an outdoor bathtub set beside the tranquil turtle pond.',
      images: ['/images/villas/forever-pandawa/rooms/ocean-suite-2/ocean-suite-2-a.jpg','/images/villas/forever-pandawa/rooms/ocean-suite-2/ocean-suite-2-b.jpg','/images/villas/forever-pandawa/rooms/ocean-suite-2/ocean-suite-2-c.jpg','/images/villas/forever-pandawa/rooms/ocean-suite-2/ocean-suite-2-d.jpg','/images/villas/forever-pandawa/rooms/ocean-suite-2/ocean-suite-2-e.jpg'] },
    { id: 'garden-view-room', label: 'Garden View Room', description: 'Conveniently located near the living area and pool, the Garden View Room enjoys easy access to the villa\'s social spaces while overlooking Pandawa\'s koi and turtle pond. A peaceful setting that balances connection and calm.',
      images: ['/images/villas/forever-pandawa/rooms/garden-view-room/garden-view-room-1.jpg','/images/villas/forever-pandawa/rooms/garden-view-room/garden-view-room-2.jpg','/images/villas/forever-pandawa/rooms/garden-view-room/garden-view-room-3.jpg','/images/villas/forever-pandawa/rooms/garden-view-room/garden-view-room-4.jpg','/images/villas/forever-pandawa/rooms/garden-view-room/garden-view-room-5.jpg'] },
    { id: 'pool-view-room',  label: 'Pool View Room',  description: 'With the infinity pool just steps from the bed, the Pool View Room offers an effortless indoor–outdoor living experience. Wake to ocean views and step straight into the pool, with the sea always within sight.',
      images: ['/images/villas/forever-pandawa/rooms/pool-view-room/pool-view-room-1.jpg','/images/villas/forever-pandawa/rooms/pool-view-room/pool-view-room-2.jpg','/images/villas/forever-pandawa/rooms/pool-view-room/pool-view-room-3.jpg'] },
    { id: 'pandawa-studio',  label: 'Pandawa Studio',  description: 'Situated on the lower garden level, the Pandawa Studio features its own dining area and generous space, making it ideal for families or guests requiring additional room. The studio comfortably accommodates extra beds.',
      images: ['/images/villas/forever-pandawa/rooms/pandawa-studio/pandawa-studio-1.jpg','/images/villas/forever-pandawa/rooms/pandawa-studio/pandawa-studio-2.jpg','/images/villas/forever-pandawa/rooms/pandawa-studio/pandawa-studio-3.jpg','/images/villas/forever-pandawa/rooms/pandawa-studio/pandawa-studio-4.jpg','/images/villas/forever-pandawa/rooms/pandawa-studio/pandawa-studio-5.jpg'] },
    { id: 'pandawa-room',    label: 'Pandawa Room',    description: 'Also located on the lower garden level, the Pandawa Room is a spacious yet intimate retreat with a warm, cozy atmosphere — perfect for guests seeking comfort and privacy.',
      images: ['/images/villas/forever-pandawa/rooms/pandawa-room/pandawa-room-1.jpg','/images/villas/forever-pandawa/rooms/pandawa-room/pandawa-room-2.jpg','/images/villas/forever-pandawa/rooms/pandawa-room/pandawa-room-3.jpg','/images/villas/forever-pandawa/rooms/pandawa-room/pandawa-room-4.jpg','/images/villas/forever-pandawa/rooms/pandawa-room/pandawa-room-5.jpg','/images/villas/forever-pandawa/rooms/pandawa-room/pandawa-room-6.jpg','/images/villas/forever-pandawa/rooms/pandawa-room/pandawa-room-7.jpg'] },
  ],
  'forever-santai': [
    { id: 'ocean-lookout-master', label: 'Ocean Lookout Master', description: 'Perched on the 3rd and highest level, this suite comes with marble bathtub, indoor and outdoor shower and closest access to the ocean lookout patio.',
      images: ['/images/villas/forever-santai/rooms/ocean-lookout-master/1.jpg','/images/villas/forever-santai/rooms/ocean-lookout-master/2.jpg','/images/villas/forever-santai/rooms/ocean-lookout-master/3.jpg','/images/villas/forever-santai/rooms/ocean-lookout-master/4.jpg','/images/villas/forever-santai/rooms/ocean-lookout-master/5.jpg','/images/villas/forever-santai/rooms/ocean-lookout-master/6.jpg'] },
    { id: 'santai-master',        label: 'Santai Master',        description: 'Located on one side of the infinity pool, this master suite has an indoor shower, a private outdoor tub and a separate balcony.',
      images: ['/images/villas/forever-santai/rooms/santai-master/1.jpg','/images/villas/forever-santai/rooms/santai-master/2.jpg','/images/villas/forever-santai/rooms/santai-master/3.jpg','/images/villas/forever-santai/rooms/santai-master/4.jpg'] },
    { id: 'santai-guest',         label: 'Santai Guest',         description: 'This suite\'s beautiful view will have you stepping straight from bed to the pool in just a few effortless steps.',
      images: ['/images/villas/forever-santai/rooms/santai-guest/1.jpg','/images/villas/forever-santai/rooms/santai-guest/2.jpg','/images/villas/forever-santai/rooms/santai-guest/3.jpg'] },
    { id: 'santai-twin',          label: 'Twin Room',            description: 'This suite is ideal for children or teenagers who want their own space. It features two twin beds however they can be converted to a King size upon request.',
      images: ['/images/villas/forever-santai/rooms/santai-childrens/1.jpg','/images/villas/forever-santai/rooms/santai-childrens/2.jpg','/images/villas/forever-santai/rooms/santai-childrens/3.jpg'] },
    { id: 'garden-view-studio',   label: 'Garden View Studio',   description: 'Equipped with a kitchenette for simple cooking and a private, tucked-away feel on the garden level. Enjoy the quaint garden pathway and your own plunge pool for quiet moments of relaxation.',
      images: ['/images/villas/forever-santai/rooms/garden-view-studio/1.jpg','/images/villas/forever-santai/rooms/garden-view-studio/2.jpg','/images/villas/forever-santai/rooms/garden-view-studio/3.jpg','/images/villas/forever-santai/rooms/garden-view-studio/4.jpg','/images/villas/forever-santai/rooms/garden-view-studio/5.jpg','/images/villas/forever-santai/rooms/garden-view-studio/6.jpg','/images/villas/forever-santai/rooms/garden-view-studio/7.jpg','/images/villas/forever-santai/rooms/garden-view-studio/8.jpg'] },
    { id: 'santai-garden-view',   label: 'Garden View Guest',    description: 'This large and spacious suite is tucked in a cozy corner in the garden level. Perfect for the guest who relishes a little extra privacy.',
      images: ['/images/villas/forever-santai/rooms/santai-garden-view-guest/1.jpg','/images/villas/forever-santai/rooms/santai-garden-view-guest/2.jpg'] },
  ],
};

const VILLA_NAMES: Record<string, string> = {
  'forever-pandawa': 'Forever Pandawa',
  'forever-santai':  'Forever Santai',
};

// ── Section wrapper ───────────────────────────────────────────────────────────

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="adm-card" style={{ marginBottom: '20px' }}>
      <div className="adm-card-header">
        <span className="adm-card-title">{title}</span>
        {hint && <span style={{ fontSize: '0.72rem', color: 'var(--adm-muted)' }}>{hint}</span>}
      </div>
      <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, multiline, rows = 3, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; rows?: number; hint?: string;
}) {
  return (
    <div className="adm-form-group">
      <label className="adm-label">{label}{hint && <span className="adm-label-hint">{hint}</span>}</label>
      {multiline
        ? <textarea className="adm-textarea" rows={rows} value={value ?? ''} onChange={e => onChange(e.target.value)} />
        : <input className="adm-input" value={value ?? ''} onChange={e => onChange(e.target.value)} />}
    </div>
  );
}

// ── Room card ─────────────────────────────────────────────────────────────────

function RoomCard({
  room, index, slug,
  onChange, onRemove,
}: {
  room: Room; index: number; slug: string;
  onChange: (r: Room) => void; onRemove: () => void;
}) {
  const [open, setOpen] = useState(index === 0);

  const setField = (k: keyof Room, v: string) => onChange({ ...room, [k]: v });
  const setImage = (i: number, v: string) => {
    const imgs = [...room.images]; imgs[i] = v; onChange({ ...room, images: imgs });
  };
  const removeImage = (i: number) => onChange({ ...room, images: room.images.filter((_, j) => j !== i) });
  const addImage = () => onChange({ ...room, images: [...room.images, ''] });

  return (
    <div style={{ border: '1px solid var(--adm-border)', borderRadius: '10px', marginBottom: '12px', overflow: 'hidden' }}>
      {/* Room header — click to toggle */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', background: open ? '#f8fafb' : '#fff', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--adm-font)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: 'var(--adm-accent)', color: '#fff', borderRadius: '6px',
            width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.72rem', fontWeight: 700, flexShrink: 0,
          }}>{index + 1}</span>
          <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--adm-text)' }}>
            {room.label || `Room ${index + 1}`}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--adm-muted)' }}>
            {room.images.filter(Boolean).length} image{room.images.filter(Boolean).length !== 1 ? 's' : ''}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={e => { e.stopPropagation(); if (confirm(`Remove room "${room.label}"?`)) onRemove(); }}
            className="adm-btn adm-btn-danger adm-btn-sm"
            style={{ fontSize: '0.72rem' }}
          >Remove</button>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </button>

      {/* Room body */}
      {open && (
        <div style={{ padding: '16px', borderTop: '1px solid var(--adm-border)', display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Room Name" value={room.label} onChange={v => setField('label', v)} />
          </div>
          <Field label="Description" value={room.description} onChange={v => setField('description', v)} multiline rows={3} />

          <div className="adm-form-group" style={{ marginBottom: 0 }}>
            <label className="adm-label">Room Images</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginBottom: '10px' }}>
              {room.images.map((img, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <ImageField
                    label={`Image ${i + 1}`}
                    value={img}
                    onChange={v => setImage(i, v)}
                    folder={`villas/${slug}`}
                    aspect="4/3"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    style={{
                      position: 'absolute', top: 0, right: 0, background: '#ef4444', color: '#fff',
                      border: 'none', borderRadius: '0 0 0 6px', padding: '2px 7px',
                      fontSize: '0.7rem', cursor: 'pointer',
                    }}
                  >✕</button>
                </div>
              ))}
            </div>
            <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={addImage}>
              + Add Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function VillaEditorPage() {
  const { slug } = useParams() as { slug: string };
  const villaName = VILLA_NAMES[slug] ?? slug;

  const [villa, setVilla] = useState<VillaContent | null>(null);
  const [storageMode, setStorageMode] = useState<'custom' | 'kv' | 'file' | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/admin/content').then(r => r.json()).then(res => {
      const data = res.data ?? res;
      setStorageMode(res.storage ?? 'file');
      const v = (data?.villas?.[slug] ?? {}) as VillaContent;
      // Seed default rooms if storage has none
      if (!v.rooms || v.rooms.length === 0) {
        v.rooms = DEFAULT_ROOMS[slug] ?? [];
      }
      setVilla(v);
    });
  }, [slug]);

  const set = useCallback((k: keyof VillaContent, v: unknown) =>
    setVilla(prev => prev ? { ...prev, [k]: v } : prev), []);

  const setRoom = useCallback((i: number, r: Room) =>
    setVilla(prev => {
      if (!prev) return prev;
      const rooms = [...(prev.rooms ?? [])];
      rooms[i] = r;
      return { ...prev, rooms };
    }), []);

  const removeRoom = useCallback((i: number) =>
    setVilla(prev => {
      if (!prev) return prev;
      return { ...prev, rooms: (prev.rooms ?? []).filter((_, j) => j !== i) };
    }), []);

  const addRoom = () => setVilla(prev => {
    if (!prev) return prev;
    const newRoom: Room = { id: `room-${Date.now()}`, label: 'New Room', description: '', images: [] };
    return { ...prev, rooms: [...(prev.rooms ?? []), newRoom] };
  });

  const save = async () => {
    if (!villa) return;
    setSaving(true); setStatus('idle');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ villas: { [slug]: villa } }),
      });
      setStatus(res.ok ? 'ok' : 'error');
      setTimeout(() => setStatus('idle'), 5000);
    } catch { setStatus('error'); }
    finally { setSaving(false); }
  };

  if (!villa) return <div style={{ padding: '40px', color: 'var(--adm-muted)' }}>Loading…</div>;

  const rooms = villa.rooms ?? [];
  const galleryImages = villa.galleryImages ?? [];

  return (
    <>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <Link href="/admin/villas" className="adm-btn adm-btn-ghost adm-btn-sm">← All Villas</Link>
        <h1 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--adm-text)', flex: 1 }}>{villaName}</h1>
        <Link href={`/${slug}`} target="_blank" className="adm-btn adm-btn-ghost adm-btn-sm">View live ↗</Link>
        <button
          className="adm-btn adm-btn-primary"
          onClick={save}
          disabled={saving}
          style={{ gap: '8px' }}
        >
          {saving && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ animation: 'spin 1s linear infinite' }}>
              <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/><path d="M12 2a10 10 0 0 1 10 10"/>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </svg>
          )}
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      <StorageBanner mode={storageMode} />

      {status === 'ok'    && <div className="adm-alert adm-alert-ok" style={{ marginBottom: '16px' }}>Saved! Changes appear on the site within a few minutes.</div>}
      {status === 'error' && <div className="adm-alert adm-alert-error" style={{ marginBottom: '16px' }}>Save failed — check your connection.</div>}

      {/* ── 1. Villa Info ── */}
      <Section title="Villa Information">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Field label="Villa Name" value={villa.name ?? ''} onChange={v => set('name', v)} />
          <Field label="Tagline" value={villa.tagline ?? ''} onChange={v => set('tagline', v)} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Field label="Hero Label" value={villa.heroTagline ?? ''} onChange={v => set('heroTagline', v)} hint="shown over hero video" />
          <Field label="Hero Description" value={villa.heroDescription ?? ''} onChange={v => set('heroDescription', v)} multiline rows={2} />
        </div>
        <Field label="Short Description" value={villa.description ?? ''} onChange={v => set('description', v)} multiline rows={3} />
        <Field label="Long Description" value={villa.longDescription ?? ''} onChange={v => set('longDescription', v)} multiline rows={4} />
      </Section>

      {/* ── 2. Hero Image ── */}
      <Section title="Hero Image" hint="full-screen background behind the villa name">
        <ImageField
          label="Hero Background"
          value={villa.heroImage ?? ''}
          onChange={v => set('heroImage', v)}
          folder={`villas/${slug}`}
          aspect="16/9"
        />
      </Section>

      {/* ── 3. Rooms ── */}
      <Section title="Rooms" hint={`${rooms.length} room${rooms.length !== 1 ? 's' : ''} · click a room to expand`}>
        {rooms.length === 0 && (
          <p style={{ color: 'var(--adm-muted)', fontSize: '0.82rem', margin: '8px 0' }}>No rooms yet. Add one below.</p>
        )}
        {rooms.map((room, i) => (
          <RoomCard
            key={room.id}
            room={room}
            index={i}
            slug={slug}
            onChange={r => setRoom(i, r)}
            onRemove={() => removeRoom(i)}
          />
        ))}
        <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" style={{ alignSelf: 'flex-start' }} onClick={addRoom}>
          + Add Room
        </button>
      </Section>

      {/* ── 4. Gallery ── */}
      <Section title="Main Gallery" hint="shown below the rooms section on the villa page">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '12px' }}>
          {galleryImages.map((img, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <ImageField
                label={`Gallery ${i + 1}`}
                value={img}
                onChange={v => {
                  const next = [...galleryImages]; next[i] = v;
                  set('galleryImages', next);
                }}
                folder={`villas/${slug}`}
                aspect="4/3"
              />
              <button
                type="button"
                onClick={() => set('galleryImages', galleryImages.filter((_, j) => j !== i))}
                style={{
                  position: 'absolute', top: 0, right: 0, background: '#ef4444', color: '#fff',
                  border: 'none', borderRadius: '0 0 0 6px', padding: '2px 7px',
                  fontSize: '0.7rem', cursor: 'pointer',
                }}
              >✕</button>
            </div>
          ))}
        </div>
        <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" style={{ alignSelf: 'flex-start' }}
          onClick={() => set('galleryImages', [...galleryImages, ''])}>
          + Add Gallery Image
        </button>
      </Section>

      {/* ── 5. Separator Image ── */}
      <Section title="Separator Image" hint="full-width image displayed just above the footer">
        <ImageField
          label="Separator Image"
          value={villa.separatorImage ?? ''}
          onChange={v => set('separatorImage', v)}
          folder={`villas/${slug}`}
          aspect="21/9"
        />
      </Section>
    </>
  );
}
