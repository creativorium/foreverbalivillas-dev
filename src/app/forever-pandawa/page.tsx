import type { Metadata } from 'next';
import VillaPage from '@/components/VillaPage';
import type { VillaData } from '@/components/VillaPage';

export const metadata: Metadata = {
  title: 'Forever Pandawa — Where Tradition Meets Modern Luxury',
  description:
    'Inspired by the Mahabharata, Forever Pandawa is a five-bedroom luxury villa in Bali offering grandeur, sweeping ocean views, and impeccable service.',
};

const pandawaData: VillaData = {
  slug: 'forever-pandawa',
  name: 'Forever Pandawa',
  tagline: 'Where Tradition Meets Modern Luxury',
  heroTagline: 'Forever Pandawa • Nusa Dua, Bali',
  heroDescription:
    'Inspired by the heroic Pandawa of the Mahabharata, this villa is a masterwork of cultural storytelling and modern luxury. Five bedrooms. Five elements. One unforgettable journey.',
  description:
    'Our villas are fully equipped and acquainted with luxuries and generous amenities including private spa and massage spaces, fully functional gym and areas for other recreational sports such as table tennis.',
  longDescription:
    'Forever Pandawa draws from the rich mythology of Bali, where five brothers — Yudhistira, Bima, Arjuna, Nakula, and Sahadeva — each represent a virtue. Each bedroom is a tribute: wisdom, strength, grace, harmony, and beauty manifest in extraordinary design.',
  heroImage: '/images/villas/forever-pandawa/hero/hero.jpg',
  amenityTags: [
    '🌊 À la Carte',
    '💆 Spa',
    '🛁 Bathroom',
    '🍽️ Dining Room',
    '📚 Board Games',
    '🏋️ Gym',
    '🌿 Garden',
    '🏊 Pool',
    '🎾 Tennis',
    '🌙 Terrace',
  ],
  rooms: [
    {
      id: 'yudhistira',
      label: 'Yudhistira Suite',
      description:
        'Named for the eldest Pandawa — the embodiment of wisdom and justice. A regal master suite with panoramic ocean views, hand-carved four-poster bed, and private meditation pavilion.',
      imagePath: '/images/villas/forever-pandawa/rooms/ocean-suite/main.jpg',
    },
    {
      id: 'bima',
      label: 'Bima Suite',
      description:
        'For the bold and the strong. Bima Suite features dramatic double-height ceilings, private gym access, and a plunge pool framed by volcanic stone walls.',
      imagePath: '/images/villas/forever-pandawa/rooms/garden-suite/main.jpg',
    },
    {
      id: 'arjuna',
      label: 'Arjuna Suite',
      description:
        'Grace and precision define this suite. Arjuna overlooks the tropical garden, with a four-poster king bed, carved timber accents, and private ensuite with rainfall shower.',
      imagePath: '/images/villas/forever-pandawa/rooms/pool-suite/main.jpg',
    },
    {
      id: 'nakula',
      label: 'Nakula Suite',
      description:
        'Twin to Sahadeva, the Nakula Suite is a symphony of harmony — balanced proportions, soft natural light, and a shared internal courtyard garden.',
      imagePath: '/images/villas/forever-pandawa/rooms/family-suite/main.jpg',
    },
    {
      id: 'sahadeva',
      label: 'Sahadeva Suite',
      description:
        'Beauty in every detail. Sahadeva Suite features hand-woven textiles, a sunken bath carved from a single volcanic stone, and floor-to-ceiling garden views.',
      imagePath: '/images/villas/forever-pandawa/rooms/villa-suite/main.jpg',
    },
  ],
  facilities: [
    {
      title: 'On-Site Staff',
      description: 'Dedicated villa manager, butler, and housekeeping available 24 hours.',
      imagePath: '/images/villas/forever-pandawa/facilities/facility-1.jpg',
    },
    {
      title: 'On-Site Laundry',
      description: 'In-villa laundry service with same-day turnaround.',
      imagePath: '/images/villas/forever-pandawa/facilities/facility-2.jpg',
    },
    {
      title: '24hr Security',
      description: 'Round-the-clock security team ensuring your privacy and safety.',
      imagePath: '/images/villas/forever-pandawa/facilities/facility-3.jpg',
    },
    {
      title: 'Private Chef',
      description: 'Personalised Balinese and international menus by our in-house chef team.',
      imagePath: '/images/villas/forever-pandawa/facilities/facility-4.jpg',
    },
    {
      title: 'Spa & Wellness',
      description: 'Traditional Balinese healing rituals, in-villa yoga, and massage.',
      imagePath: '/images/villas/forever-pandawa/facilities/facility-5.jpg',
    },
  ],
};

export default function ForeverPandawaPage() {
  return <VillaPage villa={pandawaData} />;
}
