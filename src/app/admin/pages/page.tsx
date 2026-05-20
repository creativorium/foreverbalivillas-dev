'use client';

import { useEffect, useState, useCallback } from 'react';
import ImageField from '@/components/admin/ImageField';
import StorageBanner from '@/components/admin/StorageBanner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;

const TABS = [
  { key: 'homepage',   label: 'Homepage' },
  { key: 'faq',        label: 'FAQ' },
  { key: 'villas',     label: 'Villas' },
  { key: 'legal',      label: 'Legal Pages' },
  { key: 'categories', label: 'Blog Categories' },
];

export default function PagesEditorPage() {
  const validTabs = TABS.map(t => t.key);
  const [content, setContent] = useState<Content | null>(null);
  const [activeTab, setActiveTab] = useState('homepage');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');

  const [storageMode, setStorageMode] = useState<'custom' | 'kv' | 'file' | null>(null);

  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get('tab');
    if (tab && validTabs.includes(tab)) setActiveTab(tab);

    fetch('/api/admin/content').then(r => r.json()).then(res => {
      setContent(res.data ?? res);
      setStorageMode(res.storage ?? 'file');
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setStatus('idle');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      setStatus(res.ok ? 'ok' : 'error');
      setTimeout(() => setStatus('idle'), 3500);
    } catch { setStatus('error'); }
    finally { setSaving(false); }
  };

  const setDeep = useCallback((path: string[], value: unknown) => {
    setContent(prev => {
      if (!prev) return prev;
      const next = structuredClone(prev) as Record<string, unknown>;
      let cur: Record<string, unknown> = next;
      for (let i = 0; i < path.length - 1; i++) {
        cur = cur[path[i]] as Record<string, unknown>;
      }
      cur[path[path.length - 1]] = value;
      return next;
    });
  }, []);

  if (!content) return <div style={{ color: 'var(--adm-muted)', padding: '40px' }}>Loading…</div>;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--adm-text)' }}>Page Content Editor</h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--adm-muted)', marginTop: '2px' }}>Edit copy, titles, and text across all pages</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>

      {status === 'ok'    && <div className="adm-alert adm-alert-ok">Saved! Changes will appear on the site within a few minutes.</div>}
      {status === 'error' && <div className="adm-alert adm-alert-error">Save failed — check the console.</div>}

      <StorageBanner mode={storageMode} />

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', borderBottom: '1px solid var(--adm-border)', paddingBottom: '0' }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '10px 18px',
              fontSize: '0.82rem',
              fontWeight: activeTab === tab.key ? 600 : 400,
              color: activeTab === tab.key ? 'var(--adm-accent)' : 'var(--adm-muted)',
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${activeTab === tab.key ? 'var(--adm-accent)' : 'transparent'}`,
              cursor: 'pointer',
              marginBottom: '-1px',
              fontFamily: 'var(--adm-font)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── HOMEPAGE ── */}
      {activeTab === 'homepage' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Section title="Hero Image">
            <ImageField
              label="Hero Background"
              hint="full-screen background on the homepage"
              value={(content.homepage as Content)?.heroImage as string ?? ''}
              onChange={v => setDeep(['homepage', 'heroImage'], v)}
              folder="homepage"
              aspect="16/9"
            />
          </Section>

          <Section title="Gallery Images">
            {((content.homepage as Content)?.galleryImages as string[] ?? []).map((img: string, i: number) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', marginBottom: '12px', alignItems: 'end' }}>
                <ImageField
                  label={`Gallery Image ${i + 1}`}
                  value={img}
                  onChange={v => {
                    const images = [...((content.homepage as Content)?.galleryImages as string[] ?? [])];
                    images[i] = v;
                    setDeep(['homepage', 'galleryImages'], images);
                  }}
                  folder="homepage"
                  aspect="4/3"
                />
                <button
                  className="adm-btn adm-btn-danger adm-btn-sm"
                  style={{ marginBottom: '8px' }}
                  onClick={() => {
                    const images = ((content.homepage as Content)?.galleryImages as string[] ?? []).filter((_: string, j: number) => j !== i);
                    setDeep(['homepage', 'galleryImages'], images);
                  }}
                >Remove</button>
              </div>
            ))}
            <button
              className="adm-btn adm-btn-ghost adm-btn-sm"
              onClick={() => {
                const images = [...((content.homepage as Content)?.galleryImages as string[] ?? []), ''];
                setDeep(['homepage', 'galleryImages'], images);
              }}
            >+ Add Gallery Image</button>
          </Section>

          <Section title="About Us Section">
            <Field label="Section Heading" value={(content.homepage as Content)?.about?.heading as string}
              onChange={v => setDeep(['homepage', 'about', 'heading'], v)} />
            <Field label="Body Text" multiline rows={6}
              value={(content.homepage as Content)?.about?.body as string}
              onChange={v => setDeep(['homepage', 'about', 'body'], v)}
              hint="Use \\n\\n for new paragraphs" />
          </Section>

          <Section title="Key Features Section">
            <Field label="Section Title" value={(content.homepage as Content)?.features?.title as string}
              onChange={v => setDeep(['homepage', 'features', 'title'], v)} />
            <Field label="Subtitle" value={(content.homepage as Content)?.features?.subtitle as string}
              onChange={v => setDeep(['homepage', 'features', 'subtitle'], v)} />
            <Field label="Subtitle Italic" value={(content.homepage as Content)?.features?.subtitleItalic as string}
              onChange={v => setDeep(['homepage', 'features', 'subtitleItalic'], v)} />
            <Field label="Spa Menu URL" value={(content.homepage as Content)?.features?.spaMenuUrl as string}
              onChange={v => setDeep(['homepage', 'features', 'spaMenuUrl'], v)} />
            <Field label="Food Menu URL" value={(content.homepage as Content)?.features?.foodMenuUrl as string}
              onChange={v => setDeep(['homepage', 'features', 'foodMenuUrl'], v)} />

            <div className="adm-form-group">
              <label className="adm-label">Feature Items <span className="adm-label-hint">label and column (left/right)</span></label>
              {((content.homepage as Content)?.features?.items as Array<{label: string; col: string}> ?? []).map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 32px', gap: '8px', marginBottom: '6px', alignItems: 'center' }}>
                  <input className="adm-input" value={item.label}
                    onChange={e => {
                      const items = [...((content.homepage as Content)?.features?.items as Array<{label: string; col: string}>)];
                      items[i] = { ...items[i], label: e.target.value };
                      setDeep(['homepage', 'features', 'items'], items);
                    }} />
                  <select className="adm-select" value={item.col}
                    onChange={e => {
                      const items = [...((content.homepage as Content)?.features?.items as Array<{label: string; col: string}>)];
                      items[i] = { ...items[i], col: e.target.value };
                      setDeep(['homepage', 'features', 'items'], items);
                    }}>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                  <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => {
                    const items = ((content.homepage as Content)?.features?.items as Array<unknown>).filter((_, j) => j !== i);
                    setDeep(['homepage', 'features', 'items'], items);
                  }}>✕</button>
                </div>
              ))}
              <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ marginTop: '4px' }} onClick={() => {
                const items = [...((content.homepage as Content)?.features?.items as Array<unknown>), { label: 'New Feature', col: 'left' }];
                setDeep(['homepage', 'features', 'items'], items);
              }}>+ Add Feature</button>
            </div>
          </Section>
        </div>
      )}

      {/* ── FAQ ── */}
      {activeTab === 'faq' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Section title="Hero">
            <Field label="Title" value={(content.faq as Content)?.hero?.title as string}
              onChange={v => setDeep(['faq', 'hero', 'title'], v)} />
            <Field label="Subtitle" value={(content.faq as Content)?.hero?.subtitle as string}
              onChange={v => setDeep(['faq', 'hero', 'subtitle'], v)} />
          </Section>

          <Section title="CTA (Bottom)">
            <Field label="Title" value={(content.faq as Content)?.cta?.title as string}
              onChange={v => setDeep(['faq', 'cta', 'title'], v)} />
            <Field label="Description" value={(content.faq as Content)?.cta?.description as string}
              onChange={v => setDeep(['faq', 'cta', 'description'], v)} />
          </Section>

          <Section title="FAQ Items">
            {((content.faq as Content)?.items as Array<{question: string; answer: string}> ?? []).map((item, i) => (
              <div key={i} className="adm-card" style={{ padding: '16px', marginBottom: '12px', position: 'relative' }}>
                <button className="adm-btn adm-btn-danger adm-btn-sm" style={{ position: 'absolute', top: '12px', right: '12px' }}
                  onClick={() => {
                    const items = ((content.faq as Content)?.items as Array<unknown>).filter((_, j) => j !== i);
                    setDeep(['faq', 'items'], items);
                  }}>Remove</button>
                <Field label={`Q${i + 1}: Question`} value={item.question}
                  onChange={v => {
                    const items = [...((content.faq as Content)?.items as Array<{question: string; answer: string}>)];
                    items[i] = { ...items[i], question: v };
                    setDeep(['faq', 'items'], items);
                  }} />
                <Field label="Answer" multiline rows={4} value={item.answer}
                  onChange={v => {
                    const items = [...((content.faq as Content)?.items as Array<{question: string; answer: string}>)];
                    items[i] = { ...items[i], answer: v };
                    setDeep(['faq', 'items'], items);
                  }} />
              </div>
            ))}
            <button className="adm-btn adm-btn-ghost" onClick={() => {
              const items = [...((content.faq as Content)?.items as Array<unknown>), { question: '', answer: '' }];
              setDeep(['faq', 'items'], items);
            }}>+ Add Question</button>
          </Section>
        </div>
      )}

      {/* ── LEGAL ── */}
      {activeTab === 'legal' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {(['terms', 'privacy'] as const).map(key => {
            const page = ((content.legal as Content)?.[key] ?? {}) as Content;
            const label = key === 'terms' ? 'Terms & Conditions' : 'Privacy Policy';
            const sections = (page.sections as Array<{ title: string; body: string }>) ?? [];
            return (
              <Section key={key} title={label}>
                <Field label="Page Title" value={page.pageTitle as string ?? ''}
                  onChange={v => setDeep(['legal', key, 'pageTitle'], v)} />
                {key === 'terms' && (
                  <Field label="Subtitle" value={page.subtitle as string ?? ''}
                    onChange={v => setDeep(['legal', key, 'subtitle'], v)} />
                )}
                <Field label="Last Updated" value={page.lastUpdated as string ?? ''}
                  onChange={v => setDeep(['legal', key, 'lastUpdated'], v)}
                  hint="e.g. January 2025" />
                <Field label="Introduction Paragraph" multiline rows={4}
                  value={page.intro as string ?? ''}
                  onChange={v => setDeep(['legal', key, 'intro'], v)} />
                <Field label="Footer Note" multiline rows={2}
                  value={page.footnote as string ?? ''}
                  onChange={v => setDeep(['legal', key, 'footnote'], v)} />

                <div className="adm-form-group">
                  <label className="adm-label">
                    Sections
                    <span className="adm-label-hint">body supports HTML — use &lt;p&gt;, &lt;ul&gt;&lt;li&gt;, &lt;h3&gt;, &lt;strong&gt;</span>
                  </label>
                  {sections.map((sec, i) => (
                    <div key={i} className="adm-card" style={{ padding: '14px', marginBottom: '10px', position: 'relative' }}>
                      <button
                        className="adm-btn adm-btn-danger adm-btn-sm"
                        style={{ position: 'absolute', top: '10px', right: '10px' }}
                        onClick={() => {
                          const next = sections.filter((_, j) => j !== i);
                          setDeep(['legal', key, 'sections'], next);
                        }}
                      >Remove</button>
                      <Field
                        label={`Section ${i + 1} Title`}
                        value={sec.title}
                        onChange={v => {
                          const next = [...sections];
                          next[i] = { ...next[i], title: v };
                          setDeep(['legal', key, 'sections'], next);
                        }}
                      />
                      <Field
                        label="Body (HTML)"
                        multiline
                        rows={6}
                        value={sec.body}
                        onChange={v => {
                          const next = [...sections];
                          next[i] = { ...next[i], body: v };
                          setDeep(['legal', key, 'sections'], next);
                        }}
                      />
                    </div>
                  ))}
                  <button
                    className="adm-btn adm-btn-ghost adm-btn-sm"
                    onClick={() => setDeep(['legal', key, 'sections'], [...sections, { title: '', body: '' }])}
                  >+ Add Section</button>
                </div>
              </Section>
            );
          })}
        </div>
      )}

      {/* ── CATEGORIES ── */}
      {activeTab === 'categories' && <CategoriesPanel />}

      {/* ── VILLAS ── */}
      {activeTab === 'villas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {(['forever-pandawa', 'forever-santai'] as const).map(slug => {
            const villa = (content.villas as Content)?.[slug] as Content;
            return (
              <Section key={slug} title={villa?.name as string || slug}>
                <Field label="Villa Name" value={villa?.name as string}
                  onChange={v => setDeep(['villas', slug, 'name'], v)} />
                <Field label="Tagline (under name in description)" value={villa?.tagline as string}
                  onChange={v => setDeep(['villas', slug, 'tagline'], v)} />
                <Field label="Description (short)" multiline rows={3} value={villa?.description as string}
                  onChange={v => setDeep(['villas', slug, 'description'], v)} />
                <Field label="Long Description" multiline rows={5} value={villa?.longDescription as string}
                  onChange={v => setDeep(['villas', slug, 'longDescription'], v)} />

                <ImageField
                  label="Hero Image"
                  hint="main full-screen hero background"
                  value={(villa?.heroImage as string) ?? ''}
                  onChange={v => setDeep(['villas', slug, 'heroImage'], v)}
                  folder={`villas/${slug}`}
                  aspect="16/9"
                />

                <ImageField
                  label="Separator Image"
                  hint="full-width image between gallery and facilities sections"
                  value={(villa?.separatorImage as string) ?? ''}
                  onChange={v => setDeep(['villas', slug, 'separatorImage'], v)}
                  folder={`villas/${slug}`}
                  aspect="21/9"
                />

                <div className="adm-form-group">
                  <label className="adm-label">Gallery Images <span className="adm-label-hint">slideshow shown on the villa page</span></label>
                  {((villa?.galleryImages as string[]) ?? []).map((img: string, i: number) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', marginBottom: '12px', alignItems: 'end' }}>
                      <ImageField
                        label={`Gallery Image ${i + 1}`}
                        value={img}
                        onChange={v => {
                          const images = [...((villa?.galleryImages as string[]) ?? [])];
                          images[i] = v;
                          setDeep(['villas', slug, 'galleryImages'], images);
                        }}
                        folder={`villas/${slug}`}
                        aspect="4/3"
                      />
                      <button
                        className="adm-btn adm-btn-danger adm-btn-sm"
                        style={{ marginBottom: '8px' }}
                        onClick={() => {
                          const images = ((villa?.galleryImages as string[]) ?? []).filter((_: string, j: number) => j !== i);
                          setDeep(['villas', slug, 'galleryImages'], images);
                        }}
                      >Remove</button>
                    </div>
                  ))}
                  <button
                    className="adm-btn adm-btn-ghost adm-btn-sm"
                    onClick={() => {
                      const images = [...((villa?.galleryImages as string[]) ?? []), ''];
                      setDeep(['villas', slug, 'galleryImages'], images);
                    }}
                  >+ Add Gallery Image</button>
                </div>
              </Section>
            );
          })}
        </div>
      )}
    </>
  );
}

// ── Categories panel ─────────────────────────────────────────────────────────

function CategoriesPanel() {
  const [cats, setCats]     = useState<string[]>([]);
  const [newCat, setNewCat] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  const load = () => fetch('/api/admin/categories').then(r => r.json()).then(setCats);
  useEffect(() => { load(); }, []);

  const add = async () => {
    const name = newCat.trim();
    if (!name) return;
    setSaving(true); setError('');
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (res.ok) { const data = await res.json(); setCats(data); setNewCat(''); }
    else { setError('Failed to add category'); }
    setSaving(false);
  };

  const remove = async (cat: string) => {
    if (!confirm(`Remove "${cat}"? Posts keep their current category label.`)) return;
    const res = await fetch('/api/admin/categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: cat }),
    });
    if (res.ok) { const data = await res.json(); setCats(data.categories ?? cats.filter(c => c !== cat)); }
  };

  return (
    <div className="adm-card">
      <div className="adm-card-header">
        <span className="adm-card-title">Blog Categories</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--adm-muted)' }}>{cats.length} categories</span>
      </div>
      <div className="adm-card-body">
        {error && <div className="adm-alert adm-alert-error">{error}</div>}

        {/* Add new */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <input
            className="adm-input"
            value={newCat}
            onChange={e => setNewCat(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            placeholder="New category name…"
            style={{ flex: 1 }}
          />
          <button className="adm-btn adm-btn-primary" onClick={add} disabled={saving || !newCat.trim()}>
            {saving ? '…' : '+ Add'}
          </button>
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {cats.length === 0 && <p style={{ color: 'var(--adm-muted)', fontSize: '0.82rem' }}>No categories yet.</p>}
          {cats.map(cat => (
            <div key={cat} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f9fafb', borderRadius: '8px', border: '1px solid var(--adm-border)' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 500, color: 'var(--adm-text)' }}>{cat}</span>
              <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => remove(cat)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Reusable components ───────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="adm-card">
      <div className="adm-card-header"><span className="adm-card-title">{title}</span></div>
      <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
  hint?: string;
}

function Field({ label, value, onChange, multiline, rows = 3, hint }: FieldProps) {
  return (
    <div className="adm-form-group">
      <label className="adm-label">{label}{hint && <span className="adm-label-hint">{hint}</span>}</label>
      {multiline
        ? <textarea className="adm-textarea" rows={rows} value={value ?? ''} onChange={e => onChange(e.target.value)} />
        : <input    className="adm-input"              value={value ?? ''} onChange={e => onChange(e.target.value)} />
      }
    </div>
  );
}
