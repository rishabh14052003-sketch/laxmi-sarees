import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import SareeCard, { SareeCardSkeleton } from '../components/SareeCard';
import { subscribeSarees } from '../sareeService';
import { shopConfig, whatsappLink, categoryChips } from '../shopConfig';

export default function Home() {
  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeSarees(
      (data) => {
        setSarees(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const newestArrivals = sarees.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-maroon">
        <div className="absolute inset-0 flex">
          <div className="hero-unfurl-left w-1/2 bg-gradient-to-b from-maroon-light/40 to-transparent" />
          <div className="hero-unfurl-right w-1/2 bg-gradient-to-b from-gold/20 to-transparent" />
        </div>

        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-2xl">
            <p className="hero-fade-1 eyebrow text-gold-light">
              Welcome to {shopConfig.shopName}
            </p>
            <h1 className="hero-fade-2 mt-4 font-serif text-4xl font-bold leading-tight text-ivory sm:text-5xl md:text-6xl lg:text-7xl">
              Drape Yourself in{' '}
              <span className="italic text-gold-light">Tradition</span>
            </h1>
            <p className="hero-fade-3 mt-6 max-w-lg text-base leading-relaxed text-ivory/80 sm:text-lg">
              {shopConfig.tagline}. Explore our handpicked collection of exquisite
              sarees — from timeless Kanjivaram silks to contemporary designer
              weaves.
            </p>
            <div className="hero-fade-4 mt-10 flex flex-wrap gap-4">
              <Link to="/collection" className="btn-primary">
                View Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-ivory/30 text-ivory hover:border-gold hover:text-gold"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="zari-border absolute bottom-0 left-0 right-0 h-[4px]" />
      </section>

      {/* Browse by Weave */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="eyebrow">Explore</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-maroon sm:text-4xl">
              Browse by Weave
            </h2>
          </div>

          <div className="mt-10 -mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
            <div className="flex w-max gap-3 sm:gap-4">
              {categoryChips.map((cat) => (
                <Link
                  key={cat}
                  to="/collection"
                  state={{ category: cat }}
                  className="group inline-flex min-h-[44px] shrink-0 items-center rounded-full border border-maroon/15 bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-ink/70 shadow-sm transition-all duration-300 hover:border-gold hover:bg-gold/5 hover:text-maroon hover:shadow-md sm:px-6 sm:text-sm"
                >
                  <Sparkles className="mr-2 h-3.5 w-3.5 text-gold opacity-0 transition-opacity group-hover:opacity-100" />
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newest Arrivals */}
      <section className="bg-white/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Just In</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-maroon sm:text-4xl">
                Newest Arrivals
              </h2>
            </div>
            <Link
              to="/collection"
              className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-maroon transition-colors hover:text-gold"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {error && (
            <div className="mt-10 rounded-xl border border-maroon/20 bg-maroon/5 p-6 text-center">
              <p className="text-sm text-maroon">
                Unable to load sarees. Please check your Firebase configuration.
              </p>
            </div>
          )}

          {!error && loading && (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <SareeCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!error && !loading && newestArrivals.length === 0 && (
            <div className="mt-10 rounded-xl border border-dashed border-maroon/20 bg-ivory p-12 text-center">
              <Sparkles className="mx-auto h-8 w-8 text-gold" />
              <p className="mt-4 font-serif text-xl text-maroon">Coming Soon</p>
              <p className="mt-2 text-sm text-ink/60">
                Our newest sarees will appear here. Check back soon!
              </p>
            </div>
          )}

          {!error && !loading && newestArrivals.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
              {newestArrivals.map((saree) => (
                <SareeCard key={saree.id} saree={saree} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
