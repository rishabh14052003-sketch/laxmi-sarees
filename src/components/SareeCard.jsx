import { MessageCircle } from 'lucide-react';
import { formatPrice, whatsappLink } from '../shopConfig';

export default function SareeCard({ saree }) {
  const enquireMessage = `Hello! I'm interested in "${saree.name}" (${formatPrice(saree.price)}). Could you share more details?`;

  return (
    <article className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-maroon-lift">
      <div className="zari-border h-[6px] w-full" />

      <div className="relative aspect-[3/4] overflow-hidden bg-maroon/5">
        {saree.imageUrl ? (
          <img
            src={saree.imageUrl}
            alt={saree.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-ink/30">
            No image
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-4 sm:p-5">
        {saree.category && (
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-teal sm:text-xs">
            {saree.category}
          </p>
        )}
        <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-maroon sm:text-xl">
          {saree.name}
        </h3>

        {saree.colors?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {saree.colors.map((color, i) => (
              <span
                key={`${color}-${i}`}
                className="h-4 w-4 rounded-full border border-ink/10 shadow-sm transition-transform duration-200 hover:scale-125"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-serif text-lg font-semibold text-ink">
            {formatPrice(saree.price)}
          </p>
          <a
            href={whatsappLink(enquireMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-maroon/20 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-maroon transition-all duration-300 hover:border-maroon hover:bg-maroon hover:text-ivory sm:text-xs"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
}

export function SareeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="zari-border h-[6px] w-full" />
      <div className="skeleton aspect-[3/4] w-full" />
      <div className="space-y-3 p-4 sm:p-5">
        <div className="skeleton h-3 w-20" />
        <div className="skeleton h-6 w-3/4" />
        <div className="flex gap-1.5">
          <div className="skeleton h-4 w-4 rounded-full" />
          <div className="skeleton h-4 w-4 rounded-full" />
          <div className="skeleton h-4 w-4 rounded-full" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="skeleton h-6 w-24" />
          <div className="skeleton h-10 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}
