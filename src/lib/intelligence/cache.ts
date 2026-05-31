interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const store = new Map<string, CacheEntry<unknown>>();

export function cacheGet<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.value as T;
}

export function cacheSet<T>(key: string, value: T, ttlMs: number): void {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
}

export function cacheKey(parts: (string | undefined)[]): string {
  return parts
    .filter(Boolean)
    .join("|")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 240);
}

/** TTL presets (credit-conscious) */
export const TTL = {
  discovery: 60 * 60 * 1000, // 1h — Anakin search
  analysis: 30 * 60 * 1000, // 30m — full brief + pipeline
  campaign: 30 * 60 * 1000,
  dashboard: 45 * 60 * 1000, // 45m — dashboard pulse
} as const;

export function cacheStats() {
  return { size: store.size };
}
