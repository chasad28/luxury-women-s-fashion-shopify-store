import { useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';

export default function HeroSection() {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.classList.remove('opacity-0-init');
    el.classList.add('animate-fade-in-up');
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-lifestyle.dim_1920x1080.jpg"
          alt="Luxury lifestyle"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir/50 via-noir/30 to-noir/60" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 max-w-3xl mx-auto opacity-0-init"
      >
        <p className="font-sans text-[10px] tracking-widest-luxury uppercase text-gold mb-6 font-light">
          New Collection 2026
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-ivory leading-tight mb-6">
          Carry the Art<br />
          <em>of Elegance</em>
        </h1>
        <p className="font-sans text-sm lg:text-base text-ivory/80 mb-10 max-w-md mx-auto leading-relaxed font-light tracking-wide">
          Handcrafted luxury accessories for the woman who defines her own standard of beauty.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate({ to: '/collections' })}
            className="px-10 py-3.5 bg-gold text-ivory font-sans text-xs tracking-widest-luxury uppercase hover:bg-gold/90 transition-all duration-300 hover:shadow-luxury"
          >
            Shop Now
          </button>
          <button
            onClick={() => navigate({ to: '/about' })}
            className="px-10 py-3.5 border border-ivory/60 text-ivory font-sans text-xs tracking-widest-luxury uppercase hover:border-gold hover:text-gold transition-all duration-300"
          >
            Our Story
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-500">
        <span className="font-sans text-[9px] tracking-widest-luxury uppercase text-ivory/50">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-ivory/50 to-transparent" />
      </div>
    </section>
  );
}
