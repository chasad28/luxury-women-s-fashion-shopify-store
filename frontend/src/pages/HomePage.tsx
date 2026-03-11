import HeroSection from '../components/HeroSection';
import FeaturedCollections from '../components/FeaturedCollections';
import BrandStory from '../components/BrandStory';
import ProductShowcase from '../components/ProductShowcase';
import Testimonials from '../components/Testimonials';
import TrustBadges from '../components/TrustBadges';
import Newsletter from '../components/Newsletter';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedCollections />
      <TrustBadges />
      <ProductShowcase />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
