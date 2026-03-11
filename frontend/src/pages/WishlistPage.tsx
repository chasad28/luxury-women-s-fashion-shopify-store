import { useNavigate } from '@tanstack/react-router';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../lib/products';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-20 lg:pt-24">
      {/* Header */}
      <div className="bg-beige py-14 lg:py-20 text-center px-4">
        <p className="font-sans text-[10px] tracking-widest-luxury uppercase text-gold mb-3">Your Curation</p>
        <h1 className="font-serif text-3xl lg:text-5xl text-noir">Wishlist</h1>
        <p className="font-sans text-xs text-noir/50 mt-3 tracking-wide">
          {items.length} {items.length === 1 ? 'piece' : 'pieces'} saved
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={40} className="text-gold/30 mx-auto mb-5" />
            <p className="font-serif text-xl text-noir/40 italic mb-2">Your wishlist is empty</p>
            <p className="font-sans text-xs text-noir/30 tracking-wide mb-8">
              Discover pieces that speak to your elegance.
            </p>
            <button
              onClick={() => navigate({ to: '/collections' })}
              className="px-10 py-3 border border-noir text-noir font-sans text-xs tracking-widest-luxury uppercase hover:bg-noir hover:text-ivory transition-all duration-300"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(product => (
              <div key={product.id.toString()} className="group">
                {/* Image */}
                <div
                  className="relative overflow-hidden bg-beige aspect-square cursor-pointer"
                  onClick={() => navigate({ to: `/product/${product.id.toString()}` })}
                >
                  <img
                    src={product.images[0] || '/assets/generated/product-tote-black.dim_800x800.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      removeFromWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 bg-ivory/90 flex items-center justify-center text-gold hover:bg-gold hover:text-ivory transition-all duration-200"
                    aria-label="Remove from wishlist"
                  >
                    <Heart size={14} fill="currentColor" />
                  </button>
                </div>

                {/* Info */}
                <div className="pt-3">
                  <h3 className="font-serif text-sm text-noir">{product.name}</h3>
                  <p className="font-sans text-xs text-noir/50 mt-0.5">{product.category}</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="font-sans text-sm font-medium text-noir">{formatPrice(product.price)}</p>
                    <button
                      onClick={() => {
                        addItem(product, 1, product.colors[0]);
                      }}
                      className="flex items-center gap-1.5 font-sans text-[10px] tracking-luxury uppercase text-noir/60 hover:text-gold transition-colors"
                    >
                      <ShoppingBag size={12} />
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
