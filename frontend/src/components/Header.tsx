import { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingBag, Heart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

interface HeaderProps {
  onCartOpen: () => void;
}

export default function Header({ onCartOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/collections' },
    { label: 'New Arrivals', to: '/collections?filter=new' },
    { label: 'Best Sellers', to: '/collections?filter=best' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-sm shadow-luxury border-b border-gold/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <div className="flex flex-col leading-none">
                <span className="font-serif text-xl lg:text-2xl text-noir tracking-wide">
                  MAISON
                </span>
                <span className="font-sans text-[10px] tracking-widest-luxury text-gold uppercase font-light">
                  Élite
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="font-sans text-xs tracking-luxury uppercase text-noir/70 hover:text-gold transition-colors duration-300 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-3 lg:gap-4">
              <button
                className="hidden lg:flex p-2 text-noir/60 hover:text-gold transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <button
                onClick={() => navigate({ to: '/wishlist' })}
                className="relative p-2 text-noir/60 hover:text-gold transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-ivory text-[9px] font-sans font-semibold rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              <button
                onClick={onCartOpen}
                className="relative p-2 text-noir/60 hover:text-gold transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-noir text-ivory text-[9px] font-sans font-semibold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 text-noir/60 hover:text-gold transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-noir/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-ivory animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20">
              <div className="flex flex-col leading-none">
                <span className="font-serif text-xl text-noir">MAISON</span>
                <span className="font-sans text-[9px] tracking-widest-luxury text-gold uppercase">Élite</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-noir/50 hover:text-gold transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans text-sm tracking-luxury uppercase text-noir/70 hover:text-gold transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto px-6 py-6 border-t border-gold/20">
              <p className="font-serif text-xs italic text-noir/40">Where elegance meets artistry.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
