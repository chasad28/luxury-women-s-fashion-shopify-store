import { Heart } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Product } from '../backend';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../lib/products';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

export default function ProductCard({ product, showAddToCart = false }: ProductCardProps) {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addItem } = useCart();
  const inWishlist = isInWishlist(product.id);

  const imageUrl = product.images[0] || '/assets/generated/product-tote-black.dim_800x800.jpg';

  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => navigate({ to: `/product/${product.id.toString()}` })}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-beige aspect-square">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/10 transition-all duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNewArrival && (
            <span className="bg-ivory text-noir font-sans text-[9px] tracking-luxury uppercase px-2 py-0.5">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-gold text-ivory font-sans text-[9px] tracking-luxury uppercase px-2 py-0.5">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-300 ${
            inWishlist
              ? 'opacity-100 text-gold'
              : 'opacity-0 group-hover:opacity-100 text-noir/60 hover:text-gold'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Quick add to cart */}
        {showAddToCart && (
          <button
            onClick={e => {
              e.stopPropagation();
              addItem(product, 1, product.colors[0]);
            }}
            className="absolute bottom-0 left-0 right-0 py-2.5 bg-noir text-ivory font-sans text-[10px] tracking-widest-luxury uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          >
            Add to Bag
          </button>
        )}
      </div>

      {/* Info */}
      <div className="pt-3 pb-1">
        <h3 className="font-serif text-sm text-noir leading-snug">{product.name}</h3>
        <p className="font-sans text-xs text-noir/50 mt-0.5 tracking-wide">{product.category}</p>
        <p className="font-sans text-sm font-medium text-noir mt-1">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}
