const WINDOW_MS = 60_000;
const MAX_REQUESTS = 12;

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(clientId: string): { ok: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const bucket = buckets.get(clientId);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(clientId, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { ok: false, retryAfterMs: bucket.resetAt - now };
  }

  bucket.count += 1;
  return { ok: true };
}

export function getClientId(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "anonymous";
  return request.headers.get("x-real-ip") ?? "local";
}
