import { HeroSection } from '@/components/store/HeroSection';
import { FeaturedBook } from '@/components/store/FeaturedBook';
import { CategoryTiles } from '@/components/store/CategoryTiles';
import { Bestsellers } from '@/components/store/Bestsellers';
import { PagesTurn } from '@/components/store/PagesTurn';
import { NewReleases } from '@/components/store/NewReleases';
import { AuthorsSpotlight } from '@/components/store/AuthorsSpotlight';
import { Collections } from '@/components/store/Collections';
import { OffersBanner } from '@/components/store/OffersBanner';
import { Reviews } from '@/components/store/Reviews';
import { Newsletter } from '@/components/store/Newsletter';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedBook />
      <CategoryTiles />
      <Bestsellers />
      <PagesTurn />
      <NewReleases />
      <AuthorsSpotlight />
      <Collections />
      <OffersBanner />
      <Reviews />
      <Newsletter />
    </>
  );
}
