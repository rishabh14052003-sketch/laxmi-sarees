import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, MessageCircle } from 'lucide-react';
import { shopConfig, whatsappLink } from '../shopConfig';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/collection', label: 'Collection' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'shadow-md shadow-maroon/10' : ''
      }`}
    >
      <nav className="relative bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-baseline gap-1">
            <span className="font-serif text-2xl font-semibold tracking-wide text-maroon transition-colors group-hover:text-maroon-light md:text-3xl">
              Laxmi
            </span>
            <span className="font-serif text-2xl italic text-gold md:text-3xl">Sarees</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs font-medium uppercase tracking-[0.25em] transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-gold'
                    : 'text-ink/70 hover:text-maroon'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-maroon px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-ivory transition-all duration-300 hover:bg-maroon-light hover:shadow-maroon-soft"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-lg text-maroon transition-colors hover:bg-maroon/5 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="relative h-5 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 bg-maroon transition-all duration-300 ${
                  menuOpen ? 'top-2 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-0.5 w-6 bg-maroon transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-0.5 w-6 bg-maroon transition-all duration-300 ${
                  menuOpen ? 'top-2 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        <div className="zari-border h-[4px] w-full" />
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed right-0 top-0 z-40 flex h-full w-[min(320px,85vw)] flex-col bg-ivory shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-maroon/10 px-6 py-5">
          <span className="font-serif text-xl text-maroon">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-maroon hover:bg-maroon/5"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-1 px-4 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-4 py-3.5 text-sm font-medium uppercase tracking-[0.2em] transition-colors ${
                location.pathname === link.to
                  ? 'bg-maroon/5 text-gold'
                  : 'text-ink/80 hover:bg-maroon/5 hover:text-maroon'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-maroon px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-ivory"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>
        <div className="border-t border-maroon/10 px-6 py-4">
          <p className="text-xs text-ink/50">{shopConfig.tagline}</p>
        </div>
      </div>
    </header>
  );
}
