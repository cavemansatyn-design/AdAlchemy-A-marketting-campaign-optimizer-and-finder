import { TRUSTED_BRANDS } from "@/lib/data/india-2026";

export function BrandMarquee() {
  const brands = [...TRUSTED_BRANDS, ...TRUSTED_BRANDS];

  return (
    <section className="overflow-hidden border-b border-outline-variant/40 bg-surface-container-lowest/90 py-2.5">
      <div className="mb-1 px-4 text-center font-data-mono text-[9px] uppercase tracking-[0.25em] text-on-surface-variant">
        Trusted by teams at
      </div>
      <div className="brand-marquee flex w-max items-center gap-10 px-6">
        {brands.map((brand, index) => (
          <span
            key={`${brand}-${index}`}
            className="whitespace-nowrap font-headline-md text-sm font-semibold text-on-surface-variant/80"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
