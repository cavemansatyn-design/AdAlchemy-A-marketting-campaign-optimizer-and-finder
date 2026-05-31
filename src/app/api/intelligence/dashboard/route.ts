import { NextResponse } from "next/server";
import { getClientId, rateLimit } from "@/lib/api/rate-limit";
import { safeErrorMessage } from "@/lib/api/validate";
import { getDashboardSnapshot } from "@/lib/intelligence/dashboard";

export async function GET(request: Request) {
  const clientId = getClientId(request);
  const limit = rateLimit(`dashboard:${clientId}`);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.retryAfterMs ?? 60000) / 1000)) } }
    );
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
