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
  heroVideo: '/videos/villas/forever-pandawa/forever-pandawa-video.mp4',
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
      id: 'garden-view-room',
      label: 'Garden View Room',
      description: 'A serene retreat surrounded by lush tropical gardens, offering a peaceful escape.',
      images: [
        '/images/villas/forever-pandawa/rooms/garden-view-room/garden-view-room-1.jpg',
        '/images/villas/forever-pandawa/rooms/garden-view-room/garden-view-room-2.jpg',
        '/images/villas/forever-pandawa/rooms/garden-view-room/garden-view-room-3.jpg',
        '/images/villas/forever-pandawa/rooms/garden-view-room/garden-view-room-4.jpg',
        '/images/villas/forever-pandawa/rooms/garden-view-room/garden-view-room-5.jpg'
      ],
    },
    {
      id: 'living-and-dinning',
      label: 'Living and Dinning',
      description: 'Spacious open-plan living areas designed for relaxation and entertaining with ocean views.',
      images: [
        '/images/villas/forever-pandawa/rooms/living-and-dinning/living-and-dinning-1.jpg',
        '/images/villas/forever-pandawa/rooms/living-and-dinning/living-and-dinning-2.jpg',
        '/images/villas/forever-pandawa/rooms/living-and-dinning/living-and-dinning-3.jpg',
        '/images/villas/forever-pandawa/rooms/living-and-dinning/living-and-dinning-4.jpg',
        '/images/villas/forever-pandawa/rooms/living-and-dinning/living-and-dinning-5.jpg'
      ],
    },
    {
      id: 'ocean-suite-1',
      label: 'Ocean Suite 1',
      description: 'Wake up to panoramic views of the ocean in this luxuriously appointed suite.',
      images: [
        '/images/villas/forever-pandawa/rooms/ocean-suite-1/ocean-suite-1-a.jpg',
        '/images/villas/forever-pandawa/rooms/ocean-suite-1/ocean-suite-1-b.jpg',
        '/images/villas/forever-pandawa/rooms/ocean-suite-1/ocean-suite-1-c.jpg',
        '/images/villas/forever-pandawa/rooms/ocean-suite-1/ocean-suite-1-d.jpg',
        '/images/villas/forever-pandawa/rooms/ocean-suite-1/ocean-suite-1-e.jpg'
      ],
    },
    {
      id: 'ocean-suite-2',
      label: 'Ocean Suite 2',
      description: 'Elegant design meets sweeping coastal views in our second master ocean suite.',
      images: [
        '/images/villas/forever-pandawa/rooms/ocean-suite-2/ocean-suite-2-a.jpg',
        '/images/villas/forever-pandawa/rooms/ocean-suite-2/ocean-suite-2-b.jpg',
        '/images/villas/forever-pandawa/rooms/ocean-suite-2/ocean-suite-2-c.jpg',
        '/images/villas/forever-pandawa/rooms/ocean-suite-2/ocean-suite-2-d.jpg',
        '/images/villas/forever-pandawa/rooms/ocean-suite-2/ocean-suite-2-e.jpg'
      ],
    },
    {
      id: 'pandawa-room',
      label: 'Pandawa Room',
      description: 'A beautifully crafted room featuring authentic Balinese touches and modern comfort.',
      images: [
        '/images/villas/forever-pandawa/rooms/pandawa-room/pandawa-room-1.jpg',
        '/images/villas/forever-pandawa/rooms/pandawa-room/pandawa-room-2.jpg',
        '/images/villas/forever-pandawa/rooms/pandawa-room/pandawa-room-3.jpg',
        '/images/villas/forever-pandawa/rooms/pandawa-room/pandawa-room-4.jpg',
        '/images/villas/forever-pandawa/rooms/pandawa-room/pandawa-room-5.jpg',
        '/images/villas/forever-pandawa/rooms/pandawa-room/pandawa-room-6.jpg',
        '/images/villas/forever-pandawa/rooms/pandawa-room/pandawa-room-7.jpg'
        
      ],
    },
    {
      id: 'pandawa-studio',
      label: 'Pandawa Studio',
      description: 'A private and intimate space, perfect for quiet moments and ultimate relaxation.',
      images: [
        '/images/villas/forever-pandawa/rooms/pandawa-studio/pandawa-studio-1.jpg',
        '/images/villas/forever-pandawa/rooms/pandawa-studio/pandawa-studio-2.jpg',
        '/images/villas/forever-pandawa/rooms/pandawa-studio/pandawa-studio-3.jpg',
        '/images/villas/forever-pandawa/rooms/pandawa-studio/pandawa-studio-4.jpg',
        '/images/villas/forever-pandawa/rooms/pandawa-studio/pandawa-studio-5.jpg'
      ],
    },
    {
      id: 'pool-view-room',
      label: 'Pool View Room',
      description: 'With the infinity pool just steps from the bed, offering an effortless indoor-outdoor living experience.',
      images: [
        '/images/villas/forever-pandawa/rooms/pool-view-room/pool-view-room-1.jpg',
        '/images/villas/forever-pandawa/rooms/pool-view-room/pool-view-room-2.jpg',
        '/images/villas/forever-pandawa/rooms/pool-view-room/pool-view-room-3.jpg'
      ],
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
