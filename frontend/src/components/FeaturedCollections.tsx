import { useNavigate } from '@tanstack/react-router';
import { useIntersectionObserver } from '../lib/useIntersectionObserver';

const collections = [
  {
    name: 'Handbags',
    subtitle: 'Structured Elegance',
    image: '/assets/generated/collection-handbags.dim_800x600.jpg',
    filter: 'Handbags',
  },
  {
    name: 'Purses',
    subtitle: 'Refined Femininity',
    image: '/assets/generated/collection-purses.dim_800x600.jpg',
    filter: 'Purses',
  },
  {
    name: 'New Arrivals',
    subtitle: 'Fresh Perspectives',
    image: '/assets/generated/collection-new-arrivals.dim_800x600.jpg',
    filter: 'new',
  },
  {
    name: 'Best Sellers',
    subtitle: 'Timeless Favourites',
    image: '/assets/generated/collection-best-sellers.dim_800x600.jpg',
    filter: 'best',
  },
];

export default function FeaturedCollections() {
  const navigate = useNavigate();
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-20 lg:py-28 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className={`text-center mb-14 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <p className="font-sans text-[10px] tracking-widest-luxury uppercase text-gold mb-3">
          Curated for You
        </p>
        <h2 className="font-serif text-3xl lg:text-4xl text-noir">Our Collections</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {collections.map((col, i) => (
          <div
            key={col.name}
            className={`group cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: `${i * 0.1 + 0.1}s` }}
            onClick={() => navigate({ to: `/collections?filter=${col.filter}` })}
          >
            <div className="relative overflow-hidden aspect-[3/4]">
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-noir/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                <p className="font-sans text-[9px] tracking-widest-luxury uppercase text-gold/80 mb-1">
                  {col.subtitle}
                </p>
                <h3 className="font-serif text-lg lg:text-xl text-ivory">{col.name}</h3>
                <span className="inline-block mt-2 font-sans text-[10px] tracking-luxury uppercase text-ivory/70 group-hover:text-gold transition-colors duration-300 border-b border-ivory/30 group-hover:border-gold pb-0.5">
                  Explore →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
