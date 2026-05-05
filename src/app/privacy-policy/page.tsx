import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <section style={{ padding: '140px 0 80px', minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <h1 className="t-h1" style={{ marginBottom: '24px' }}>Privacy Policy</h1>
          <p className="t-body" style={{ color: '#555' }}>
            Privacy policy details will be added here. We respect your privacy and handle your data in accordance with applicable laws.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
