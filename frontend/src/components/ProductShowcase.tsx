import { useNavigate } from '@tanstack/react-router';
import { useGetAllProducts } from '../hooks/useQueries';
import { PLACEHOLDER_PRODUCTS } from '../lib/products';
import ProductCard from './ProductCard';
import { useIntersectionObserver } from '../lib/useIntersectionObserver';

export default function ProductShowcase() {
  const navigate = useNavigate();
  const { data: backendProducts, isLoading } = useGetAllProducts();
  const { ref, isVisible } = useIntersectionObserver();

  const products = (backendProducts && backendProducts.length > 0)
    ? backendProducts.slice(0, 6)
    : PLACEHOLDER_PRODUCTS.slice(0, 6);

  return (
    <section ref={ref} className="py-20 lg:py-28 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className={`text-center mb-14 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <p className="font-sans text-[10px] tracking-widest-luxury uppercase text-gold mb-3">
          Handpicked for You
        </p>
        <h2 className="font-serif text-3xl lg:text-4xl text-noir">Featured Pieces</h2>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-beige" />
              <div className="mt-3 h-4 bg-beige w-3/4" />
              <div className="mt-2 h-3 bg-beige w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <div
              key={product.id.toString()}
              className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <ProductCard product={product} showAddToCart />
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className={`text-center mt-14 ${isVisible ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
        <button
          onClick={() => navigate({ to: '/collections' })}
          className="px-12 py-3.5 border border-noir text-noir font-sans text-xs tracking-widest-luxury uppercase hover:bg-noir hover:text-ivory transition-all duration-300"
        >
          View All Pieces
        </button>
      </div>
    </section>
  );
}
