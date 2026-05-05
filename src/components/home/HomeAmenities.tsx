import Image from 'next/image';
import styles from './HomeAmenities.module.css';

// All icons are SVGs in public/images/icons/
const AMENITIES = [
  { id: 'luxury',    label: 'Luxury\nAccommodations', imgSrc: '/images/icons/luxury.svg' },
  { id: 'spa',       label: 'SPA',                    imgSrc: '/images/icons/spa.svg' },
  { id: 'chef',      label: 'Personal\nChef',          imgSrc: '/images/icons/chef.svg' },
  { id: 'pool',      label: 'Pool',                   imgSrc: '/images/icons/pool.svg' },
  { id: 'ondemand',  label: 'On Demand\nServices',    imgSrc: '/images/icons/on-demand.svg' },
];

export default function HomeAmenities() {
  return (
    <section className={styles.section}>
      <div className={styles.topLine} />

      <div className="container">
        <h2 className={`t-h2 ${styles.heading}`} data-reveal>About Us</h2>

        {/* Icon row */}
        <div className={styles.icons} data-reveal>
          {AMENITIES.map((a) => (
            <div key={a.id} className={styles.iconItem}>
              <div className={styles.iconSvg}>
                <Image
                  src={a.imgSrc}
                  alt={a.label.replace('\n', ' ')}
                  width={44}
                  height={44}
                  style={{ objectFit: 'contain' }}
                  unoptimized
                />
              </div>
              <span className={`t-label ${styles.iconLabel}`}>
                {a.label.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className={styles.desc} data-reveal>
          Forever Bali Villas is a curated collection of owner-operated luxury villas designed for elevated stays in Bali.  
          We have 2 stunning villas  located overlooking Pandawa Beach, Forever Santai and Forever Pandawa.<br/><br/>
          Both our properties offer privacy, sweeping ocean views, and easy access to one of the island’s most beautiful coastlines. 
          <br/><br/>Each villa features six spacious bedrooms, six bathrooms, expansive living areas, a fully equipped kitchen, private infinity pool, and dedicated staff, with private chef services available on request. 
          Perfect for retreats, intimate events, group celebrations, and family holidays, we combine genuine Balinese hospitality with refined comfort, creating stays that feel both exclusive and effortless.
        </p>
      </div>

      <div className={styles.bottomLine} />
    </section>
  );
}
