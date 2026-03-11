import { Star } from 'lucide-react';
import { useIntersectionObserver } from '../lib/useIntersectionObserver';

const testimonials = [
  {
    name: 'Isabelle M.',
    location: 'Paris',
    rating: 5,
    quote: 'The quality is simply unmatched — I receive compliments everywhere I go. My Noir Tote has become an extension of who I am.',
  },
  {
    name: 'Sophia R.',
    location: 'New York',
    rating: 5,
    quote: 'I have owned luxury bags from many houses, but Maison Élite stands apart. The craftsmanship is extraordinary, and the leather only grows more beautiful with time.',
  },
  {
    name: 'Valentina C.',
    location: 'Milan',
    rating: 5,
    quote: 'Purchasing from Maison Élite was an experience in itself — from the exquisite packaging to the first touch of the leather. Truly exceptional.',
  },
  {
    name: 'Charlotte B.',
    location: 'London',
    rating: 5,
    quote: 'My Ivory Crossbody is the most versatile piece I own. It elevates every outfit effortlessly. Worth every penny and then some.',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="text-gold fill-gold" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-beige px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-14 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="font-sans text-[10px] tracking-widest-luxury uppercase text-gold mb-3">
            Client Stories
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl text-noir">Words of Distinction</h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`bg-ivory p-6 lg:p-7 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <StarRating count={t.rating} />
              <p className="font-serif text-sm italic text-noir/80 leading-relaxed mt-4 mb-5">
                "{t.quote}"
              </p>
              <div className="border-t border-gold/20 pt-4">
                <p className="font-sans text-xs font-medium text-noir tracking-wide">{t.name}</p>
                <p className="font-sans text-[10px] text-noir/40 tracking-luxury uppercase mt-0.5">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
