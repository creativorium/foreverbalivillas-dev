import type { Metadata } from 'next';
import VillaPage from '@/components/VillaPage';
import type { VillaData } from '@/components/VillaPage';

export const metadata: Metadata = {
  title: 'Forever Santai — Luxury Private Villa Bali',
  description:
    'Newly renovated and ready for your stay. Forever Santai offers private pool, lush tropical gardens and Balinese luxury in Nusa Dua, Bali.',
};

const santaiData: VillaData = {
  slug: 'forever-santai',
  name: 'Forever Santai',
  tagline: 'Newly Renovated and Ready for Your Stay',
  heroTagline: 'Forever Santai • Nusa Dua, Bali',
  heroDescription:
    'Some villas offer a stay. Forever Santai offers a transformation. Santai — meaning "relaxed" in Balinese — is a haven of calm, surrounded by lush tropical gardens overlooking the endless azure.',
  description:
    'Our villas are fully equipped and acquainted with luxuries and generous amenities including private spa and massage spaces, fully functional gym and areas for other recreational sports such as table tennis.',
  longDescription:
    'Forever Santai is newly renovated, blending contemporary design with authentic Balinese craftsmanship. Every detail has been considered — from the hand-carved stone statues to the infinity-edge pool that appears to merge with the ocean horizon.',
  heroImage: '/images/villas/forever-santai/hero/hero.jpg',
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
      id: 'ocean-suite',
      label: 'Ocean Suite',
      description:
        'Wake up to panoramic ocean views from your private balcony. The Ocean Suite features a king-size bed, open-plan bathroom with soaking tub, and direct pool access.',
      imagePath: '/images/villas/forever-santai/rooms/ocean-suite/main.jpg',
    },
    {
      id: 'garden-suite',
      label: 'Garden Suite',
      description:
        'Nestled among lush tropical gardens, the Garden Suite is a serene retreat. Natural materials, ambient lighting, and garden-facing floor-to-ceiling windows.',
      imagePath: '/images/villas/forever-santai/rooms/garden-suite/main.jpg',
    },
    {
      id: 'pool-suite',
      label: 'Pool Suite',
      description:
        'Step directly from your room into the private pool. The Pool Suite offers seamless indoor-outdoor living with a private plunge pool and sun deck.',
      imagePath: '/images/villas/forever-santai/rooms/pool-suite/main.jpg',
    },
    {
      id: 'family-suite',
      label: 'Family Suite',
      description:
        'Thoughtfully designed for families, with connecting rooms, children\'s amenities, and a dedicated family living area overlooking the garden.',
      imagePath: '/images/villas/forever-santai/rooms/family-suite/main.jpg',
    },
    {
      id: 'villa-suite',
      label: 'Villa Suite',
      description:
        'The crown jewel of Forever Santai. A full-floor suite with private terrace, butler service, and sweeping 270-degree views of the Balinese landscape.',
      imagePath: '/images/villas/forever-santai/rooms/villa-suite/main.jpg',
    },
  ],
  facilities: [
    {
      title: 'On-Site Staff',
      description: 'Dedicated villa manager, butler, and housekeeping available 24 hours.',
      imagePath: '/images/villas/forever-santai/facilities/facility-1.jpg',
    },
    {
      title: 'On-Site Laundry',
      description: 'In-villa laundry service with same-day turnaround.',
      imagePath: '/images/villas/forever-santai/facilities/facility-2.jpg',
    },
    {
      title: '24hr Security',
      description: 'Round-the-clock security team ensuring your privacy and safety.',
      imagePath: '/images/villas/forever-santai/facilities/facility-3.jpg',
    },
    {
      title: 'Private Chef',
      description: 'Personalised menus crafted by our in-house Balinese chef.',
      imagePath: '/images/villas/forever-santai/facilities/facility-4.jpg',
    },
    {
      title: 'Spa & Wellness',
      description: 'In-villa spa treatments, yoga sessions, and massage therapy.',
      imagePath: '/images/villas/forever-santai/facilities/facility-5.jpg',
    },
  ],
};

export default function ForeverSantaiPage() {
  return <VillaPage villa={santaiData} />;
}
