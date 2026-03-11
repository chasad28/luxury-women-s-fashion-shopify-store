import { useState, useMemo } from 'react';
import { useSearch } from '@tanstack/react-router';
import { useGetAllProducts } from '../hooks/useQueries';
import { PLACEHOLDER_PRODUCTS } from '../lib/products';
import ProductCard from '../components/ProductCard';
import FilterControls, { FilterState } from '../components/FilterControls';
import { Product } from '../backend';
import { Skeleton } from '@/components/ui/skeleton';

export default function CollectionsPage() {
  const search = useSearch({ strict: false }) as { filter?: string };
  const initialFilter = search?.filter;

  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    sortBy: 'default',
    color: 'all',
    popularity: initialFilter === 'new' ? 'new' : initialFilter === 'best' ? 'best' : 'all',
  });

  const { data: backendProducts, isLoading } = useGetAllProducts();
  const allProducts: Product[] = (backendProducts && backendProducts.length > 0)
    ? backendProducts
    : PLACEHOLDER_PRODUCTS;

  const availableColors = useMemo(() => {
    const colorSet = new Set<string>();
    allProducts.forEach(p => p.colors.forEach(c => colorSet.add(c)));
    return Array.from(colorSet);
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (filters.category !== 'All') {
      result = result.filter(p => p.category === filters.category);
    }
    if (filters.color !== 'all') {
      result = result.filter(p => p.colors.includes(filters.color));
    }
    if (filters.popularity === 'best') {
      result = result.filter(p => p.isBestSeller);
    } else if (filters.popularity === 'new') {
      result = result.filter(p => p.isNewArrival);
    }
    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [allProducts, filters]);

  return (
    <main className="min-h-screen pt-20 lg:pt-24">
      {/* Page Header */}
      <div className="bg-beige py-14 lg:py-20 text-center px-4">
        <p className="font-sans text-[10px] tracking-widest-luxury uppercase text-gold mb-3">
          {filters.popularity === 'new' ? 'Fresh Arrivals' : filters.popularity === 'best' ? 'Most Loved' : 'The Collection'}
        </p>
        <h1 className="font-serif text-3xl lg:text-5xl text-noir">
          {filters.category === 'All' ? 'All Pieces' : filters.category}
        </h1>
        <p className="font-sans text-xs text-noir/50 mt-3 tracking-wide">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6 border-b border-gold/20">
        <FilterControls
          filters={filters}
          onChange={setFilters}
          availableColors={availableColors}
        />
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10 lg:py-14">
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-3/4 mt-3" />
                <Skeleton className="h-3 w-1/2 mt-2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-xl text-noir/40 italic">No pieces found for this selection.</p>
            <button
              onClick={() => setFilters({ category: 'All', sortBy: 'default', color: 'all', popularity: 'all' })}
              className="mt-6 font-sans text-xs tracking-luxury uppercase text-gold border-b border-gold/40 hover:border-gold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map(product => (
              <div key={product.id.toString()} className="animate-fade-in-up">
                <ProductCard product={product} showAddToCart />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
