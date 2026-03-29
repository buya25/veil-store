import { HeroSection } from '@/components/home/HeroSection';
import { MoodCollections } from '@/components/home/MoodCollections';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { BrandManifesto } from '@/components/home/BrandManifesto';
import { HowItDrapes } from '@/components/home/HowItDrapes';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { getOnSale } from '@/lib/api/products';

export default async function HomePage() {
  const onSale = await getOnSale().catch(() => []);

  return (
    <>
      <Header />
      <CartDrawer />
      <main>
        <HeroSection />
        <MoodCollections />
        <FeaturedProducts products={onSale} />
        <HowItDrapes />
        <BrandManifesto />
      </main>
      <Footer />
    </>
  );
}
