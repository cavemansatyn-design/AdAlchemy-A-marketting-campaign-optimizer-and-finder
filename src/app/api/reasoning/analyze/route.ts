import { NextResponse } from "next/server";
import { getClientId, rateLimit } from "@/lib/api/rate-limit";
import { parseAnalyzeBody, safeErrorMessage } from "@/lib/api/validate";
import { runFullAnalysis } from "@/lib/intelligence/orchestrator";

export async function POST(request: Request) {
  const clientId = getClientId(request);
  const limit = rateLimit(`analyze:${clientId}`);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Retry shortly." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const parsed = parseAnalyzeBody(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const result = await runFullAnalysis(parsed);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: safeErrorMessage(error) },
      { status: 500 }
    );
  }
}
