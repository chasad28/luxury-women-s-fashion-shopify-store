import { useIntersectionObserver } from '../lib/useIntersectionObserver';

export default function BrandStory() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-noir overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <div className={`relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src="/assets/generated/brand-story-craftsmanship.dim_1200x700.jpg"
              alt="Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative frame */}
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/30 -z-10" />
        </div>

        {/* Text */}
        <div className={`${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <p className="font-sans text-[10px] tracking-widest-luxury uppercase text-gold mb-5">
            Our Heritage
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl text-ivory leading-tight mb-8">
            Born from a Love of<br />
            <em>Fine Craftsmanship</em>
          </h2>
          <div className="space-y-5 font-sans text-sm text-ivory/70 leading-relaxed font-light">
            <p>
              Maison Élite was founded on a singular belief: that a truly exceptional accessory is not merely purchased — it is inherited. Each piece in our collection is the result of hundreds of hours of meticulous handwork, executed by master artisans who have devoted their lives to the pursuit of perfection.
            </p>
            <p>
              We source only the finest full-grain leathers from heritage tanneries in Italy and France, selecting hides that will develop a rich, personal patina over decades of wear. Our hardware is cast in solid brass and finished by hand, ensuring that every clasp, every ring, every detail speaks of enduring quality.
            </p>
            <p>
              This is not fast fashion. This is a legacy — crafted for women who understand that true luxury is measured not in seasons, but in lifetimes.
            </p>
          </div>
          <div className="mt-10 flex items-center gap-6">
            <div className="text-center">
              <p className="font-serif text-2xl text-gold">12+</p>
              <p className="font-sans text-[10px] tracking-luxury uppercase text-ivory/50 mt-1">Years of Craft</p>
            </div>
            <div className="w-px h-10 bg-gold/30" />
            <div className="text-center">
              <p className="font-serif text-2xl text-gold">100%</p>
              <p className="font-sans text-[10px] tracking-luxury uppercase text-ivory/50 mt-1">Handcrafted</p>
            </div>
            <div className="w-px h-10 bg-gold/30" />
            <div className="text-center">
              <p className="font-serif text-2xl text-gold">40+</p>
              <p className="font-sans text-[10px] tracking-luxury uppercase text-ivory/50 mt-1">Artisans</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
