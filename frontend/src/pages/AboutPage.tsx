import { useIntersectionObserver } from '../lib/useIntersectionObserver';
import Newsletter from '../components/Newsletter';

export default function AboutPage() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <main className="min-h-screen pt-20 lg:pt-24">
      {/* Hero */}
      <div className="relative bg-noir py-24 lg:py-36 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/assets/generated/brand-story-craftsmanship.dim_1200x700.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <p className="font-sans text-[10px] tracking-widest-luxury uppercase text-gold mb-4">Our Heritage</p>
          <h1 className="font-serif text-4xl lg:text-6xl text-ivory leading-tight">
            The Art of<br /><em>Maison Élite</em>
          </h1>
        </div>
      </div>

      {/* Story */}
      <section ref={ref} className="max-w-3xl mx-auto px-4 py-20 lg:py-28">
        <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="font-serif text-xl lg:text-2xl text-noir leading-relaxed italic">
            "We do not create accessories. We create heirlooms."
          </p>
          <div className="space-y-5 font-sans text-sm text-noir/65 leading-relaxed font-light">
            <p>
              Founded in Paris in 2014, Maison Élite was born from a singular obsession: to create leather goods of such extraordinary quality that they would outlast trends, seasons, and generations. Our founder, a third-generation leather artisan, spent years studying under the masters of Florence and Lyon before establishing our atelier in the heart of Paris.
            </p>
            <p>
              Every piece in our collection begins as a conversation between our designers and our artisans — a dialogue about form, function, and the ineffable quality that transforms an object into a treasure. We work exclusively with heritage tanneries that have been perfecting their craft for over a century, selecting only the finest full-grain hides that will develop a rich, personal patina over decades of wear.
            </p>
            <p>
              Our hardware is cast in solid brass and finished by hand. Our stitching is executed with waxed linen thread, the same technique used by saddlers for centuries. Our linings are cut from the finest Italian suede. Nothing is rushed. Nothing is compromised.
            </p>
            <p>
              This is not fast fashion. This is a legacy — crafted for women who understand that true luxury is measured not in seasons, but in lifetimes.
            </p>
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
