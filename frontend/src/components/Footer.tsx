import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { SiInstagram, SiPinterest, SiFacebook, SiTiktok } from 'react-icons/si';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/collections' },
  { label: 'New Arrivals', to: '/collections?filter=new' },
  { label: 'Best Sellers', to: '/collections?filter=best' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'maison-elite');

  return (
    <footer className="bg-noir text-ivory/70">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex flex-col leading-none mb-5">
            <span className="font-serif text-2xl text-ivory tracking-wide">MAISON</span>
            <span className="font-sans text-[10px] tracking-widest-luxury text-gold uppercase font-light">Élite</span>
          </div>
          <p className="font-serif text-sm italic text-ivory/50 leading-relaxed mb-6">
            Where elegance meets artistry. Crafted for women who define their own standard of beauty.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4">
            {[
              { Icon: SiInstagram, href: '#', label: 'Instagram' },
              { Icon: SiPinterest, href: '#', label: 'Pinterest' },
              { Icon: SiFacebook, href: '#', label: 'Facebook' },
              { Icon: SiTiktok, href: '#', label: 'TikTok' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center border border-ivory/20 text-ivory/40 hover:text-gold hover:border-gold transition-all duration-300"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-sans text-[10px] tracking-widest-luxury uppercase text-gold mb-5">Navigate</h4>
          <ul className="space-y-3">
            {quickLinks.map(link => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="font-sans text-xs text-ivory/50 hover:text-gold transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-sans text-[10px] tracking-widest-luxury uppercase text-gold mb-5">Customer Care</h4>
          <ul className="space-y-3">
            {legalLinks.map(link => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="font-sans text-xs text-ivory/50 hover:text-gold transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="mailto:hello@maisonelite.com" className="font-sans text-xs text-ivory/50 hover:text-gold transition-colors tracking-wide">
                hello@maisonelite.com
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-sans text-[10px] tracking-widest-luxury uppercase text-gold mb-5">Atelier</h4>
          <p className="font-sans text-xs text-ivory/40 leading-relaxed font-light">
            12 Rue de la Paix<br />
            Paris, France 75002<br />
            <br />
            Mon – Sat: 10:00 – 19:00<br />
            Sun: By appointment
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[10px] text-ivory/30 tracking-wide">
            © {year} Maison Élite. All rights reserved.
          </p>
          <p className="font-sans text-[10px] text-ivory/30 flex items-center gap-1.5">
            Built with <Heart size={10} className="text-gold fill-gold" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
