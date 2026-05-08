import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Forever Bali Villas',
  description: 'Site usage agreement, service terms, booking, cancellation, refund policies, and conditions for Forever Bali Villas.',
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <section style={{ padding: '140px 0 100px', minHeight: '60vh', background: 'var(--cream, #f9f3ec)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>

          <h1 className="t-h1" style={{ marginBottom: '12px' }}>Terms &amp; Conditions</h1>
          <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '48px', fontFamily: 'var(--font-sans)' }}>
            Summary of Site Usage Agreement, Service Terms, and Conditions
          </p>

          <p className="t-body" style={{ color: '#555', marginBottom: '40px', lineHeight: 1.85 }}>
            Welcome to Forever Bali Villas! By utilizing this official website of Forever Bali Villas, you acknowledge and agree to the following terms and conditions. These materials are provided by FBV – Forever Bali Villas, its subsidiaries, affiliates, and related entities, as a service to our valued customers and are intended for informational purposes only.
          </p>

          {/* ── Section helper ── */}
          {[
            {
              title: 'Villa Rates and Prices',
              body: (
                <>
                  <p>For the most precise and up-to-date official villa rates and prices, please visit our official website, <a href="https://www.foreverbalivillas.com" style={linkStyle}>www.foreverbalivillas.com</a>, or contact our Reservation Center directly at +62 859 5417 3599 during Bali office hours (9 am – 5 pm, GMT+8).</p>
                  <h3 style={h3Style}>Rate Display &amp; Promotion</h3>
                  <ul style={ulStyle}>
                    <li>All prices are quoted and must be paid in Indonesian Rupiah (Rp).</li>
                    <li>Prices labelled "Net" or "Nett" include a tax and service charge, while prices indicated with "++" do not include / are subject to the tax and service charge.</li>
                    <li>Rates and prices are valid for standard double room occupancy (2 people in one bedroom) or single occupancy for an extra bed, inclusive of breakfast, standard amenities, and services.</li>
                    <li>Daily villa prices are subject to fluctuation and may change without prior notice, depending on factors such as season, availability, special offers, and other conditions. High/peak season surcharges or compulsory dinner charges may apply during specific periods.</li>
                  </ul>
                  <h3 style={h3Style}>Rate Guarantee</h3>
                  <p>In the event of discrepancies or better pricing found when comparing to third-party sources, such as online travel agents or booking sites, please be aware that these discrepancies may result from unauthorized distribution or potential technical errors. FBV reserves the right to disapprove such bookings or reservations.</p>
                  <p style={{ marginTop: '12px' }}>Rest assured, we guarantee that you will obtain the best online deal by booking through our official website or by contacting us directly.</p>
                </>
              ),
            },
            {
              title: 'Making a Reservation',
              body: (
                <>
                  <p>To confirm your reservation before your check-in date/time, it is imperative to have an active and accessible email address, irrespective of your chosen booking method (through the website, email, or phone).</p>
                  <p style={{ marginTop: '12px' }}>We will send your reservation/payment confirmation via email, which must be presented upon check-in for verification.</p>
                  <h3 style={h3Style}>Reservation Guarantee</h3>
                  <p>To secure your villa reservation allocation, an advance payment/deposit is required. Without a guaranteed payment, no villa allocation will be reserved for your stay.</p>
                  <p style={{ marginTop: '12px' }}>You can make a reservation through the following methods:</p>
                  <ol style={olStyle}>
                    <li><strong>Booking through the Website:</strong> Our website <a href="https://www.foreverbalivillas.com" style={linkStyle}>www.foreverbalivillas.com</a> is available 24/7. A valid credit card is required to confirm your booking.</li>
                    <li><strong>Booking through Email:</strong> Emails receive a response within 24 hours during office hours (9 am – 5 pm, GMT+8). Contact us at booking@foreverbalivillas.com. Please mention "Villa Pandawa" or "Villa Santai" for property identification.</li>
                    <li><strong>Booking through Phone:</strong> Our phone line is available during office hours. Call +62 81996488881 and mention "Villa Pandawa" or "Villa Santai" for property identification.</li>
                  </ol>
                </>
              ),
            },
            {
              title: 'Payment Method',
              body: (
                <>
                  <ul style={ulStyle}>
                    <li><strong>By Xendit:</strong> When booking through our official website, the system will guide you through the secure online payment process via Xendit. To protect your credit card from unauthorized use, a mandatory payment verification process is enforced by Xendit during online payments.</li>
                    <li><strong>By Bank Transfer:</strong> Upon request, we will send our official bank account details to your email after your reservation is made. Bank transfer is not recommended for bookings made less than 14 days before arrival. Proof of transfer must be sent by email to our Reservation Center.</li>
                    <li><strong>By ATM Transfer:</strong> ATM payment is applicable for Indonesian residents and local ATM use only, upon request. Proof of transfer must be sent by email to our Reservation Center.</li>
                  </ul>
                  <p style={{ marginTop: '16px' }}>Please note that a booking/reservation is not considered "confirmed" or "guaranteed" until FBV receives the payment as invoiced.</p>
                </>
              ),
            },
            {
              title: 'Booking Amendments, Cancellations, No-Show, and Refund Policy',
              body: (
                <>
                  <p>Modifying or cancelling your booking for Regular Rate (FLEXIBLE), Package Rate, or EARLY BIRD Saving! will be subject to the following policy:</p>
                  <h3 style={h3Style}>50% Fee Applies</h3>
                  <ul style={ulStyle}>
                    <li><strong>Low Season:</strong> Cancellation received within 13–7 days prior to arrival.</li>
                    <li><strong>High Season (Jul 15 – Aug 31):</strong> Cancellation received within 20–14 days prior to arrival.</li>
                    <li><strong>Peak Season (Dec 25 – Jan 5):</strong> Cancellation received within 30–21 days prior to arrival.</li>
                  </ul>
                  <h3 style={h3Style}>100% Fee Applies</h3>
                  <ul style={ulStyle}>
                    <li><strong>Low Season:</strong> Cancellation received less than 7 days prior to arrival.</li>
                    <li><strong>High Season (Jul 15 – Aug 31):</strong> Cancellation received less than 14 days prior to arrival.</li>
                    <li><strong>Peak Season (Dec 25 – Jan 5):</strong> Cancellation received less than 21 days prior to arrival.</li>
                  </ul>
                  <p style={{ marginTop: '16px' }}>In the event of a No-Show or an Early Departure/Check-Out, the policy remains in effect.</p>
                  <h3 style={h3Style}>Non-Refundable Policy</h3>
                  <p>For rate plans such as LAST MINUTE SALE!, 100% payment is required at the time of booking to confirm the reservation. This is a Non-Refundable reservation and cannot be cancelled, amended, or modified. No refund will be issued for No-Show or Early Departure/Check-Out.</p>
                  <h3 style={h3Style}>Exceptions</h3>
                  <p>In reasonable cases or circumstances beyond the control of the guest (force majeure, sickness, accident, death, flight delay/cancellation, major security concerns), we may consider rescheduling the reservation or waiving amendment/cancellation fees. Supporting documentation must be submitted. The final decision is solely at our discretion.</p>
                </>
              ),
            },
            {
              title: 'Refund',
              body: (
                <p>Refund policy details can be found in the Default Policy, Non-Refundable Policy, and Exceptions sections above. The timing of the refund process to your credit card or bank account depends on each bank's system and schedule (normally, up to 14 working days). Forever Bali Villas does not have control over when and how the money will be received in your account. However, we will process the refund as soon as it is required. Please contact your bank directly for time estimates and any necessary information.</p>
              ),
            },
            {
              title: 'Check-in / Check-out',
              body: (
                <>
                  <p>At Forever Bali Villa, check-in time is 3:00 p.m. and check-out time is 11:00 a.m. Early check-in or late check-out is subject to availability and may incur an additional charge.</p>
                  <h3 style={h3Style}>Upon Check-in, the following are required:</h3>
                  <ul style={ulStyle}>
                    <li>Booking confirmation email</li>
                    <li>Payment confirmation email</li>
                    <li>Valid government ID</li>
                  </ul>
                  <h3 style={h3Style}>Day Use</h3>
                  <p>Day use or late check-out is subject to availability. A 50% charge from the applicable rate applies to late check-out until 6:00 p.m. Any extended stay exceeding 6:00 p.m. will be charged at the full rate.</p>
                </>
              ),
            },
            {
              title: 'Copyright Notice',
              body: (
                <p>Forever Bali Villas retains exclusive ownership of all rights, titles, and interest in the website and its content, including intellectual property rights. You are not permitted to resell, use, copy, monitor, display, publish, download, or otherwise use the content for any commercial or competitive activity or purpose without our express written permission. Any unlawful use will constitute a material infringement of our intellectual property rights.</p>
              ),
            },
            {
              title: 'Communications',
              body: (
                <>
                  <p>Regarding all communications sent to Forever Bali Villas, including feedback, questions, comments, and suggestions:</p>
                  <ul style={ulStyle}>
                    <li>There is no confidentiality right applicable to Communications, and Forever Bali Villas has no obligation to protect Communications from disclosure.</li>
                    <li>Forever Bali Villas is free to reproduce, use, disclose, and distribute Communications to others.</li>
                    <li>Forever Bali Villas is free to use any ideas, concepts, know-how, or techniques contained in Communications for any purpose.</li>
                  </ul>
                  <p style={{ marginTop: '12px' }}>We encourage the use of Internet email solely for sending us non-confidential notes. Do not include confidential personal or private information. For further information regarding the collection, usage, control, and protection of personal data, please refer to our Privacy Statement page.</p>
                </>
              ),
            },
          ].map(({ title, body }) => (
            <div key={title} style={sectionStyle}>
              <h2 style={h2Style}>{title}</h2>
              <div style={bodyStyle}>{body}</div>
            </div>
          ))}

          <div style={{ borderTop: '1px solid #ddd', paddingTop: '32px', marginTop: '48px' }}>
            <p style={{ color: '#999', fontSize: '0.78rem', fontFamily: 'var(--font-sans)', lineHeight: 1.7 }}>
              <strong>Please Note:</strong> This page contains only the "general" policies. The latest version may not yet be updated on this page, and specific policies may be applied to certain bookings and offers. Always refer to the policies and terms mentioned during your actual booking/reservation process.
            </p>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
}

const sectionStyle: React.CSSProperties = {
  marginBottom: '48px',
  paddingBottom: '40px',
  borderBottom: '1px solid #e8e0d8',
};

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
  fontWeight: 600,
  color: '#2a2420',
  marginBottom: '16px',
  letterSpacing: '0.01em',
};

const h3Style: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.95rem',
  fontWeight: 600,
  color: '#3a3028',
  marginTop: '24px',
  marginBottom: '10px',
};

const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.92rem',
  color: '#555',
  lineHeight: 1.85,
};

const ulStyle: React.CSSProperties = {
  paddingLeft: '20px',
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const olStyle: React.CSSProperties = {
  paddingLeft: '20px',
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const linkStyle: React.CSSProperties = {
  color: 'var(--forest, #2c5f56)',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
};
