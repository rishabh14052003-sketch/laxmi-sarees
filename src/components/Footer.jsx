import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Instagram } from 'lucide-react';
import { shopConfig, whatsappLink, callLink } from '../shopConfig';

export default function Footer() {
  const year = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/collection', label: 'Collection' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="mt-auto">
      <div className="zari-border h-[4px] w-full" />

      <div className="bg-maroon-dark text-ivory">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            <div>
              <h3 className="font-serif text-2xl font-semibold">
                Laxmi <span className="italic text-gold-light">Sarees</span>
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/75">
                {shopConfig.tagline}. Discover timeless weaves — from Kanjivaram
                silks to elegant chiffons — curated for every occasion.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href={callLink()}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:scale-105"
                  aria-label="Call us"
                >
                  <Phone className="h-4 w-4" />
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:scale-105"
                  aria-label="WhatsApp us"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={shopConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:scale-105"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-gold-light">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-ivory/75 transition-colors duration-200 hover:text-gold-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-gold-light">
                Visit Us
              </h4>
              <address className="mt-4 space-y-2 not-italic text-sm leading-relaxed text-ivory/75">
                <p>{shopConfig.address}</p>
                <p>{shopConfig.storeHours}</p>
                <p>
                  <a
                    href={callLink()}
                    className="transition-colors hover:text-gold-light"
                  >
                    {shopConfig.displayPhoneNumber}
                  </a>
                </p>
              </address>
            </div>
          </div>

          <div className="mt-12 border-t border-ivory/10 pt-8 text-center text-xs text-ivory/50">
            &copy; {year} {shopConfig.shopName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
