import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function BrandManifesto() {
  return (
    <section className="py-28 md:py-40">
      <Container className="max-w-4xl">
        <ScrollReveal>
          <blockquote className="text-center">
            <p
              className="font-serif font-light italic text-charcoal leading-relaxed"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)' }}
            >
              &ldquo;Every morning, the sun touches your curtain before it touches you. That&rsquo;s the moment we design for.&rdquo;
            </p>
            <footer className="mt-8 font-sans text-xs uppercase tracking-[0.3em] text-slate">
              The VEIL Studio
            </footer>
          </blockquote>
        </ScrollReveal>
      </Container>
    </section>
  );
}
