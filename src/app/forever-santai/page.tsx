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
  heroVideo: '/videos/villas/forever-santai/forever-santai-video.mp4',
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
      id: 'garden-view-studio',
      label: 'Garden View Studio',
      description: 'A beautifully appointed studio surrounded by lush tropical greenery, offering complete privacy and peace.',
      images: [
        '/images/villas/forever-santai/rooms/garden-view-studio/1.jpg',
        '/images/villas/forever-santai/rooms/garden-view-studio/2.jpg',
        '/images/villas/forever-santai/rooms/garden-view-studio/3.jpg',
        '/images/villas/forever-santai/rooms/garden-view-studio/4.jpg',
        '/images/villas/forever-santai/rooms/garden-view-studio/5.jpg',
        '/images/villas/forever-santai/rooms/garden-view-studio/6.jpg',
        '/images/villas/forever-santai/rooms/garden-view-studio/7.jpg',
        '/images/villas/forever-santai/rooms/garden-view-studio/8.jpg'
      ],
    },
    {
      id: 'ocean-lookout-master',
      label: 'Ocean Lookout Master',
      description: 'An elevated master suite offering sweeping, uninterrupted views of the ocean from a private balcony.',
      images: [
        '/images/villas/forever-santai/rooms/ocean-lookout-master/1.jpg',
        '/images/villas/forever-santai/rooms/ocean-lookout-master/2.jpg',
        '/images/villas/forever-santai/rooms/ocean-lookout-master/3.jpg',
        '/images/villas/forever-santai/rooms/ocean-lookout-master/4.jpg',
        '/images/villas/forever-santai/rooms/ocean-lookout-master/5.jpg',
        '/images/villas/forever-santai/rooms/ocean-lookout-master/6.jpg'
      ],
    },
    {
      id: 'santai-childrens',
      label: "Santai Children's",
      description: 'A thoughtfully designed room crafted specially for our younger guests to rest and play.',
      images: [
        '/images/villas/forever-santai/rooms/santai-childrens/1.jpg',
        '/images/villas/forever-santai/rooms/santai-childrens/2.jpg',
        '/images/villas/forever-santai/rooms/santai-childrens/3.jpg'
      ],
    },
    {
      id: 'santai-garden-view',
      label: 'Santai Garden View',
      description: 'Immersed in nature, this spacious room features natural materials and floor-to-ceiling garden views.',
      images: [
        '/images/villas/forever-santai/rooms/santai-garden-view-guest/1.jpg',
        '/images/villas/forever-santai/rooms/santai-garden-view-guest/2.jpg'
      ],
    },
    {
      id: 'santai-guest',
      label: 'Santai Guest',
      description: 'A luxurious and welcoming space designed to provide the ultimate comfort for visiting guests.',
      images: [
        '/images/villas/forever-santai/rooms/santai-guest/1.jpg',
        '/images/villas/forever-santai/rooms/santai-guest/2.jpg',
        '/images/villas/forever-santai/rooms/santai-guest/3.jpg'
      ],
    },
    {
      id: 'santai-master',
      label: 'Santai Master',
      description: 'Our signature master suite featuring premium amenities, an open-plan bathroom, and unparalleled luxury.',
      images: [
        '/images/villas/forever-santai/rooms/santai-master/1.jpg',
        '/images/villas/forever-santai/rooms/santai-master/2.jpg',
        '/images/villas/forever-santai/rooms/santai-master/3.jpg',
        '/images/villas/forever-santai/rooms/santai-master/4.jpg'
      ],
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
