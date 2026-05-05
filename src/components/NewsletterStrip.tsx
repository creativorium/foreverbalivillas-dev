'use client';

import { useState } from 'react';

export default function NewsletterStrip() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) { setStatus('error'); return; }
    // TODO: Wire to newsletter provider (Mailchimp, ConvertKit, etc.)
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="newsletter-strip">
      <div className="container">
        <div className="newsletter-inner">
          <div className="newsletter-text" data-reveal>
            <p className="t-label" style={{ color: 'var(--forest)', marginBottom: '6px' }}>
              Stay Connected
            </p>
            <h3 className="t-h2">Stories Delivered to You</h3>
            <p style={{ marginTop: '10px', color: 'var(--gray)', fontSize: '0.88rem' }}>
              Subscribe to The Journal and receive our latest stories, travel guides and exclusive villa news directly to your inbox.
            </p>
          </div>

          <form className="newsletter-form" onSubmit={handleSubmit} data-reveal>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={status === 'success' ? '✓ You\'re subscribed!' : 'Email'}
              aria-label="Your email address"
              required
              disabled={status === 'success'}
            />
            <button type="submit" disabled={status === 'success'}>
              {status === 'success' ? 'Subscribed' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
