import { NextResponse } from "next/server";
import { getClientId, rateLimit } from "@/lib/api/rate-limit";
import { sanitizeText, safeErrorMessage } from "@/lib/api/validate";
import { queryIntelligence } from "@/lib/intelligence/layer";
import { getDashboardSnapshot } from "@/lib/intelligence/dashboard";

export async function POST(request: Request) {
  const clientId = getClientId(request);
  const limit = rateLimit(`intelligence:${clientId}`);
  if (!limit.ok) {
    return NextResponse.json({ error: "Rate limit exceeded." }, { status: 429 });
  }

  try {
    const body = (await request.json()) as { query?: string; region?: string; brand?: string; audience?: string };

    const query = sanitizeText(body.query ?? "", 500);
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const result = await queryIntelligence({
      query,
      region: body.region ? sanitizeText(body.region, 80) : undefined,
      brand: body.brand ? sanitizeText(body.brand, 120) : undefined,
      audience: body.audience ? sanitizeText(body.audience, 120) : undefined,
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: safeErrorMessage(error) },
      { status: 500 }
    );
  }
}

/** Lightweight GET — dashboard cache only (no LLM spend). */
export async function GET(request: Request) {
  const clientId = getClientId(request);
  const limit = rateLimit(`intelligence-get:${clientId}`);
  if (!limit.ok) {
    return NextResponse.json({ error: "Rate limit exceeded." }, { status: 429 });
  }

  try {
    const snapshot = await getDashboardSnapshot();
    return NextResponse.json(snapshot);
  } catch (error) {
    return NextResponse.json(
      { error: safeErrorMessage(error) },
      { status: 500 }
    );
  }
}
