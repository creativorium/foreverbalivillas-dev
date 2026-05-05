import styles from './HomeFeatures.module.css';

const FEATURES = [
  { label: '6 Bedrooms', col: 'left' },
  { label: 'Air Conditioning', col: 'right' },
  { label: '6 Bathrooms', col: 'left' },
  { label: 'TV Cable', col: 'right' },
  { label: 'Living Room', col: 'left' },
  { label: 'Free Wifi', col: 'right' },
  { label: 'Dining Room', col: 'left' },
  { label: 'Spa', col: 'right' },
  { label: 'Kitchen', col: 'left' },
  { label: 'Breakfast Private Chef', col: 'right' },
  { label: 'Tip Map', col: 'left' },
  { label: 'Nomi Services', col: 'right' },
  { label: '24/7 Security', col: 'left' },
  { label: 'BBQ Facility', col: 'right' },
];

// Split into two columns
const leftFeatures = FEATURES.filter(f => f.col === 'left');
const rightFeatures = FEATURES.filter(f => f.col === 'right');

export default function HomeFeatures() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          {/* Left: heading */}
          <div className={styles.headingCol} data-reveal>
            <h2 className={`t-h2 ${styles.title}`}>
              Key<br />
              Features<br />
              Per Villas
            </h2>
            <p className={styles.subtitle}>
              Forever Bali Villas<br />
              <em>at a glance</em>
            </p>
          </div>

          {/* Right: feature table */}
          <div className={styles.featureTable} data-reveal>
            {leftFeatures.map((feat, i) => (
              <div key={feat.label} className={styles.featureRow}>
                <div className={styles.featureCell}>
                  <span className={styles.dot} />
                  <span>{feat.label}</span>
                </div>
                {rightFeatures[i] && (
                  <div className={styles.featureCell}>
                    <span className={styles.dot} />
                    <span>{rightFeatures[i].label}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
