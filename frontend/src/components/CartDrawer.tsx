import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../lib/products';
import { useState } from 'react';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const [checkoutDone, setCheckoutDone] = useState(false);

  const handleCheckout = () => {
    setCheckoutDone(true);
    setTimeout(() => {
      setCheckoutDone(false);
      clearCart();
      onClose();
    }, 2500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-noir/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-ivory shadow-luxury-lg animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20">
          <div>
            <h2 className="font-serif text-lg text-noir">Your Selection</h2>
            <p className="font-sans text-xs text-noir/50 tracking-luxury uppercase mt-0.5">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-noir/40 hover:text-gold transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={40} className="text-gold/40" />
              <p className="font-serif text-lg text-noir/50">Your bag is empty</p>
              <p className="font-sans text-xs text-noir/40 tracking-wide">
                Discover our curated collection of luxury pieces.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedColor}-${idx}`} className="flex gap-4">
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden bg-beige">
                    <img
                      src={item.product.images[0] || '/assets/generated/product-tote-black.dim_800x800.jpg'}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-serif text-sm text-noir leading-tight">{item.product.name}</p>
                        {item.selectedColor && (
                          <p className="font-sans text-xs text-noir/50 mt-0.5">{item.selectedColor}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedColor)}
                        className="text-noir/30 hover:text-gold transition-colors ml-2 flex-shrink-0"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gold/30">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                          className="w-7 h-7 flex items-center justify-center text-noir/50 hover:text-gold transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center font-sans text-xs text-noir">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                          className="w-7 h-7 flex items-center justify-center text-noir/50 hover:text-gold transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="font-sans text-sm font-medium text-noir">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gold/20 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-sans text-xs tracking-luxury uppercase text-noir/60">Subtotal</span>
              <span className="font-serif text-lg text-noir">{formatPrice(subtotal)}</span>
            </div>
            <p className="font-sans text-xs text-noir/40 text-center">
              Shipping & taxes calculated at checkout
            </p>
            {checkoutDone ? (
              <div className="w-full py-3 bg-gold/20 border border-gold text-center">
                <p className="font-serif text-sm text-gold italic">Thank you for your order ✦</p>
              </div>
            ) : (
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-noir text-ivory font-sans text-xs tracking-widest-luxury uppercase hover:bg-charcoal transition-colors duration-300"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
