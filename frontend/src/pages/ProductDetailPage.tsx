import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Heart, Minus, Plus, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { useGetProductById } from '../hooks/useQueries';
import { PLACEHOLDER_PRODUCTS, formatPrice } from '../lib/products';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import ImageGallery from '../components/ImageGallery';
import ReviewsSection from '../components/ReviewsSection';
import { Skeleton } from '@/components/ui/skeleton';

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gold/20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-sans text-xs tracking-luxury uppercase text-noir/70">{title}</span>
        {open ? <ChevronUp size={14} className="text-gold" /> : <ChevronDown size={14} className="text-gold" />}
      </button>
      {open && (
        <div className="pb-4 font-sans text-sm text-noir/60 leading-relaxed font-light">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
  const productId = BigInt(id || '0');

  const { data: backendProduct, isLoading } = useGetProductById(productId);
  const placeholder = PLACEHOLDER_PRODUCTS.find(p => p.id === productId) || PLACEHOLDER_PRODUCTS[0];
  const product = backendProduct || placeholder;

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen pt-20 lg:pt-24 max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Back */}
        <button
          onClick={() => navigate({ to: '/collections' })}
          className="flex items-center gap-2 font-sans text-xs tracking-luxury uppercase text-noir/50 hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Collection
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <ImageGallery images={product.images.length > 0 ? product.images : [placeholder.images[0]]} productName={product.name} />

          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.isNewArrival && (
                <span className="font-sans text-[9px] tracking-luxury uppercase px-2 py-0.5 bg-beige text-noir">New Arrival</span>
              )}
              {product.isBestSeller && (
                <span className="font-sans text-[9px] tracking-luxury uppercase px-2 py-0.5 bg-gold text-ivory">Best Seller</span>
              )}
            </div>

            <div className="flex items-start justify-between">
              <h1 className="font-serif text-2xl lg:text-3xl text-noir leading-tight">{product.name}</h1>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2 transition-colors ml-4 flex-shrink-0 ${inWishlist ? 'text-gold' : 'text-noir/30 hover:text-gold'}`}
                aria-label="Toggle wishlist"
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            <p className="font-serif text-2xl text-noir mt-3">{formatPrice(product.price)}</p>
            <p className="font-sans text-xs text-noir/40 tracking-wide mt-1">Free shipping & returns</p>

            <p className="font-sans text-sm text-noir/65 leading-relaxed mt-5 font-light">{product.description}</p>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="mt-6">
                <p className="font-sans text-[10px] tracking-luxury uppercase text-noir/60 mb-3">
                  Color: <span className="text-noir">{selectedColor}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-1.5 font-sans text-xs transition-all duration-200 ${
                        selectedColor === color
                          ? 'bg-noir text-ivory'
                          : 'border border-noir/30 text-noir/60 hover:border-noir hover:text-noir'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-6">
              <p className="font-sans text-[10px] tracking-luxury uppercase text-noir/60 mb-3">Quantity</p>
              <div className="flex items-center border border-noir/20 w-fit">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-noir/50 hover:text-gold transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center font-sans text-sm text-noir">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-noir/50 hover:text-gold transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 font-sans text-xs tracking-widest-luxury uppercase transition-all duration-300 ${
                  addedToCart
                    ? 'bg-gold text-ivory'
                    : 'bg-noir text-ivory hover:bg-charcoal'
                }`}
              >
                {addedToCart ? 'Added to Bag ✦' : 'Add to Bag'}
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 border border-gold text-gold font-sans text-xs tracking-widest-luxury uppercase hover:bg-gold hover:text-ivory transition-all duration-300"
              >
                Buy Now
              </button>
            </div>

            {/* Accordion */}
            <div className="mt-8">
              <AccordionItem title="Shipping & Delivery">
                <p>Complimentary express shipping on all orders. Delivered within 2–4 business days in signature Maison Élite packaging. International delivery available in 5–8 business days.</p>
              </AccordionItem>
              <AccordionItem title="Returns & Exchanges">
                <p>We offer complimentary returns within 30 days of delivery. Items must be in original, unworn condition with all tags attached. Contact our client services team to initiate a return.</p>
              </AccordionItem>
              <AccordionItem title="Care Instructions">
                <p>Store your piece in the provided dust bag when not in use. Clean with a soft, dry cloth. Avoid prolonged exposure to direct sunlight and moisture. For deep cleaning, consult a professional leather specialist.</p>
              </AccordionItem>
            </div>

            {/* Reviews */}
            <ReviewsSection productId={product.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
