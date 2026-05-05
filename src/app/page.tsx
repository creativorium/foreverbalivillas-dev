import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import HomeHero from '@/components/home/HomeHero';
import HomeAmenities from '@/components/home/HomeAmenities';
import HomeFeatures from '@/components/home/HomeFeatures';
import HomeGallery from '@/components/home/HomeGallery';
import HomeJournal from '@/components/home/HomeJournal';

export const metadata: Metadata = {
  title: 'Forever Bali Villas — Where Tradition Meets Modern Luxury',
  description:
    'Discover two exquisite private villas in Bali. Forever Santai and Forever Pandawa — your luxury escape awaits.',
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — video/image fullscreen with headline */}
      <HomeHero />

      {/* 2. About Us — cream, icons, description */}
      <HomeAmenities />

      {/* 3. Key Features Per Villas — feature table */}
      <HomeFeatures />

      {/* 4. Photo Gallery — 2×2 image grid */}
      <HomeGallery />

      {/* 5. The Journal — banner + Art of Slowing Down + Blog #1/#2 */}
      <HomeJournal />

      {/* 7. Footer */}
      <Footer />
    </>
  );
}
