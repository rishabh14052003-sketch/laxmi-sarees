import { useState } from 'react';
import { Phone, MessageCircle, Instagram, MapPin, Clock, Send } from 'lucide-react';
import { shopConfig, whatsappLink, callLink } from '../shopConfig';

export default function Contact() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleQuickEnquiry = (e) => {
    e.preventDefault();
    const text = `Hello! My name is ${name || 'a customer'}. ${message}`;
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
  };

  const contactMethods = [
    {
      icon: Phone,
      label: 'Call Us',
      value: shopConfig.displayPhoneNumber,
      href: callLink(),
      external: false,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat with us instantly',
      href: whatsappLink(),
      external: true,
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: `@${shopConfig.instagramHandle}`,
      href: shopConfig.instagramUrl,
      external: true,
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      value: shopConfig.address,
      href: null,
      external: false,
    },
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="eyebrow">Get in Touch</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-maroon sm:text-4xl md:text-5xl">
            We&apos;d Love to Hear From You
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-ink/60 sm:text-base">
            Have a question about a saree, need styling advice, or want to visit
            our shop? Reach out — we&apos;re always happy to help.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            const content = (
              <div className="group flex h-full flex-col rounded-2xl border border-maroon/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-maroon-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon/5 text-maroon transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-teal">
                  {method.label}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
                  {method.value}
                </p>
                {method.label === 'Visit Us' && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-ink/50">
                    <Clock className="h-3.5 w-3.5" />
                    {shopConfig.storeHours}
                  </p>
                )}
              </div>
            );

            if (method.href) {
              return (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.external ? '_blank' : undefined}
                  rel={method.external ? 'noopener noreferrer' : undefined}
                  className="block"
                >
                  {content}
                </a>
              );
            }

            return <div key={method.label}>{content}</div>;
          })}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-maroon/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-serif text-2xl font-semibold text-maroon">
              Quick Enquiry
            </h2>
            <p className="mt-2 text-sm text-ink/60">
              Send us a message on WhatsApp — we typically reply within a few
              hours.
            </p>

            <form onSubmit={handleQuickEnquiry} className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you're looking for..."
                  className="input-field resize-none"
                  required
                />
              </div>
              <button type="submit" className="btn-maroon w-full sm:w-auto">
                <Send className="mr-2 h-4 w-4" />
                Send via WhatsApp
              </button>
            </form>
          </div>

          {shopConfig.mapEmbedUrl ? (
            <div className="overflow-hidden rounded-2xl border border-maroon/10 shadow-sm">
              <iframe
                src={shopConfig.mapEmbedUrl}
                title="Store location"
                className="h-full min-h-[300px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-maroon/20 bg-ivory p-8">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 text-gold" />
                <p className="mt-4 font-serif text-lg text-maroon">Find Us Here</p>
                <p className="mt-2 text-sm text-ink/60">{shopConfig.address}</p>
                <p className="mt-1 text-xs text-ink/40">{shopConfig.storeHours}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
