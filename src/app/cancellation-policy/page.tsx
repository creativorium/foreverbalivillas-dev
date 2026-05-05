import Footer from '@/components/Footer';

export default function CancellationPolicyPage() {
  return (
    <>
      <section style={{ padding: '140px 0 80px', minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <h1 className="t-h1" style={{ marginBottom: '24px' }}>Cancellation & Refund Policy</h1>
          <p className="t-body" style={{ color: '#555' }}>
            Policy details will be added here. Please contact us via WhatsApp for current cancellation and refund terms.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
