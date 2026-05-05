'use client';

import { useState } from 'react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import NewsletterStrip from '@/components/NewsletterStrip';
import Footer from '@/components/Footer';
import styles from './page.module.css';

const FAQ_ITEMS = [
  {
    question: 'What amenities are included in your villa?',
    answer:
      'Our villas are fully equipped and acquainted with luxuries and generous amenities including private spa and massage spaces, fully functional gym and areas for other recreational sports such as table tennis. Each villa also comes with a private infinity pool, dedicated villa manager, butler service, and housekeeping.',
  },
  {
    question: 'Lorem Ipsum Dolor sit Amet?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Lorem Ipsum Dolor sit Amet?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  },
  {
    question: 'Lorem Ipsum Dolor sit Amet?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    const animate = async () => {
      const { gsap } = await import('gsap');
      if (isOpen) {
        gsap.set(el, { height: 'auto', opacity: 1 });
        const h = el.offsetHeight;
        gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.45, ease: 'power3.out' });
      } else {
        gsap.to(el, { height: 0, opacity: 0, duration: 0.35, ease: 'power3.in' });
      }
    };

    animate();
  }, [isOpen]);

  return (
    <div className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
      <button
        className={styles.question}
        onClick={onToggle}
        aria-expanded={isOpen}
        id={`faq-q-${index}`}
        aria-controls={`faq-a-${index}`}
      >
        <span>{item.question}</span>
        <span className={styles.icon} aria-hidden="true">
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="18 15 12 9 6 15"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          )}
        </span>
      </button>
      <div
        ref={bodyRef}
        id={`faq-a-${index}`}
        role="region"
        aria-labelledby={`faq-q-${index}`}
        className={styles.answer}
        style={{ height: 0, overflow: 'hidden', opacity: 0 }}
      >
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <h1 className={`t-hero ${styles.heroTitle}`}>
            Frequently<br/>Asked Questions
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className={`section ${styles.introSection}`}>
        <div className="container">
          <div className={styles.introInner}>
            <p className={`t-label ${styles.introLabel}`} data-reveal>
              Before You Arrive
            </p>
            <h2 className={`t-h2 ${styles.introTitle}`} data-reveal>
              Everything You Need to Know
            </h2>
            <p className={styles.introDesc} data-reveal>
              Wondering how to book one of our beautiful Bali villas on our website? Here are the most common questions from our customers.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section className={styles.accordionSection}>
        <div className="container">
          <div className={styles.accordion} role="list">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quote banner */}
      <section className={styles.quoteBanner} aria-label="Quote">
        <div className={styles.quoteBg} />
        <div className={styles.quoteOverlay} />
        <div className={`container ${styles.quoteContent}`}>
          <blockquote className={styles.quoteText} data-reveal>
            &ldquo;A stay that becomes a story you tell for years.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaInner} data-reveal>
            <h2 className={`t-h2 ${styles.ctaTitle}`}>Still Have Questions?</h2>
            <p className={styles.ctaDesc}>
              Our team is here to help. Reach out and we&apos;ll respond within 24 hours.
            </p>
            <Link
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
