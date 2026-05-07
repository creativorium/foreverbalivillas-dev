'use client';

import { useState } from 'react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import styles from './page.module.css';

const FAQ_ITEMS = [
  {
    question: 'What time is check-in and check-out?',
    answer: 'Check-in is from 3:00 PM onwards, and check-out is by 11:00 AM. We kindly ask guests to share their estimated arrival time or flight details in advance so we can prepare for a smooth welcome. If you are arriving with your own driver, please send us a WhatsApp message when youʼre on the way. Early check-in and late check-out requests must be made at least 24 hours in advance and are subject to availability. We may offer up to 45 minutes complimentary late check-out if available; beyond that, a fee of Rp 1.5 million per hour applies.',
  },
  {
    question: 'Do you offer airport transfers?',
    answer: 'Yes — and we highly recommend booking your airport transfer with us. Forever Bali Villas is located within Gapura Vista Residences, a secluded clifftop estate where inner roads can be tricky to navigate and Google Maps is not always reliable. Our experienced drivers know the exact route and ensure the smoothest arrival experience. Airport transfers start from Rp 500,000 per car. If you prefer to arrange your own driver, please share our contact number with them so we can assist with directions if needed.',
  },
  {
    question: 'What is the check-in process?',
    answer: 'As a fully staffed private villa, a member of our team will be on-site to personally greet you upon arrival and guide you through a smooth and welcoming check-in. To ensure everything is prepared for you, we kindly ask that you provide your flight details or estimated arrival time in advance. This allows our team to coordinate staffing and have the villa ready for your arrival. If you are arriving with your own driver, a quick WhatsApp message when you are on the way is always appreciated.',
  },
  {
    question: 'What is nearby?',
    answer: 'Forever Bali Villas is tucked away on the clifftops of Gapura Vista Residences, offering privacy and a peaceful atmosphere away from Baliʼs busier districts. While the immediate surroundings are quiet and residential, Pandawa Beach is just a short drive away, and the popular areas of Bingin and Uluwatu — known for beach clubs, surf breaks, and sunset dining — are approximately 30 minutes away (traffic dependent). The location is ideal for guests seeking a tranquil retreat while remaining within reach of Baliʼs most iconic southern coastline experiences.',
  },
  {
    question: 'Is the Private Chef Mandatory? What is the fee?',
    answer: 'The private chef is not mandatory. Your stay already includes daily breakfast prepared by our team. If you’d like to enhance your experience, our private chef is available at Rp 1.8 million per day (excluding the cost of ingredients) and can prepare a wide range of dishes, from Western favourites to traditional Balinese cuisine.\nYou’re also welcome to order food via delivery apps like GoJek or Grab, or dine out in nearby areas such as Uluwatu and Bingin.',
  },
  {
    question: 'What dining options are available besides the private chef?',
    answer: 'In addition to our in-villa private chef (available at Rp 1.8 million per day plus ingredients), guests may also order food delivery through GoJek or Grab, Baliʼs equivalent of UberEats. Local restaurants within immediate walking distance are limited due to the villaʼs secluded cliffside location. However, Bingin, Uluwatu, and surrounding areas offer a wide selection of cafes, beach clubs, and international restaurants, all approximately 30 minutes away depending on traffic. We are happy to recommend our favourite spots or assist with reservations.',
  },
  {
    question: 'Do you offer in Villa Spa?',
    answer: 'Yes — we offer a range of in-villa spa treatments that can be enjoyed in the comfort and privacy of your villa. You can view our full spa menu here, and we would be happy to arrange treatments for you.\nWe recommend booking in advance to ensure therapist availability, especially during peak periods. Once you arrive, simply let the in-villa team know your preferred time and treatments, and we will take care of the rest so you can fully relax and unwind.',
  },
  {
    question: 'Do you offer excursions, tours, and bike rentals?',
    answer: 'Yes — we’re happy to assist with arranging a wide range of excursions, tours, and transport options, including bike and scooter rentals. Whether you’d like to explore Bali’s beaches, temples, or hidden gems, our team can help curate experiences to suit your interests.\nSimply let us know what you have in mind, and we’ll take care of the arrangements for you.',
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
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
          <p className={styles.heroSubtitle}>
            Wondering how to book one of our beautiful Bali villas? Here are the most common questions from our guests.
          </p>
        </div>
      </section>

      <div className={styles.faqWrapper}>
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
      </div>

      <Footer />
    </>
  );
}
