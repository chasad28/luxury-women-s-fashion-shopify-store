import { Lock, Package, Award } from 'lucide-react';
import { useIntersectionObserver } from '../lib/useIntersectionObserver';

const badges = [
  {
    icon: Lock,
    title: 'Secure Checkout',
    description: 'Your payment information is always protected with industry-leading encryption.',
  },
  {
    icon: Package,
    title: 'Fast & Free Shipping',
    description: 'Complimentary express delivery on all orders. Arrives in signature packaging.',
  },
  {
    icon: Award,
    title: 'Premium Quality Guaranteed',
    description: 'Every piece is inspected by our master artisans before it reaches your hands.',
  },
];

export default function TrustBadges() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-16 lg:py-20 px-4 border-y border-gold/20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
        {badges.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.title}
              className={`flex flex-col items-center text-center gap-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="w-12 h-12 flex items-center justify-center border border-gold/40">
                <Icon size={20} className="text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-base text-noir mb-2">{badge.title}</h3>
                <p className="font-sans text-xs text-noir/55 leading-relaxed font-light">{badge.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
