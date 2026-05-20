import Link from 'next/link';

const VILLAS = [
  {
    slug: 'forever-pandawa',
    name: 'Forever Pandawa',
    desc: 'Clifftop villa overlooking Pandawa Beach',
    thumb: '/images/villas/forever-pandawa/hero/hero.jpg',
    href: '/forever-pandawa',
  },
  {
    slug: 'forever-santai',
    name: 'Forever Santai',
    desc: 'Three-story luxury villa, newly renovated',
    thumb: '/images/villas/forever-santai/hero/hero.jpg',
    href: '/forever-santai',
  },
];

export default function VillasIndexPage() {
  return (
    <>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--adm-text)' }}>Villas</h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--adm-muted)', marginTop: '2px' }}>
          Select a villa to edit its content, rooms, gallery, and images.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {VILLAS.map(v => (
          <div key={v.slug} className="adm-card" style={{ overflow: 'hidden' }}>
            {/* Thumb */}
            <div style={{ height: '160px', background: '#e5e7eb', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.thumb} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="adm-card-body">
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--adm-text)', marginBottom: '4px' }}>{v.name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--adm-muted)', marginBottom: '16px' }}>{v.desc}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link href={`/admin/villas/${v.slug}`} className="adm-btn adm-btn-primary adm-btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                  Edit Villa
                </Link>
                <Link href={v.href} target="_blank" className="adm-btn adm-btn-ghost adm-btn-sm">
                  View ↗
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
