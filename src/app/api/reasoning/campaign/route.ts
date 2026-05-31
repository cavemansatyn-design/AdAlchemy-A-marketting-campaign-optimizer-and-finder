import { NextResponse } from "next/server";
import { getClientId, rateLimit } from "@/lib/api/rate-limit";
import { safeErrorMessage } from "@/lib/api/validate";
import { runCampaignWithCache } from "@/lib/intelligence/orchestrator";
import type { BrandDNA, ClientBrief } from "@/lib/types/workflow";

export async function POST(request: Request) {
  const clientId = getClientId(request);
  const limit = rateLimit(`campaign:${clientId}`);
  if (!limit.ok) {
    return NextResponse.json({ error: "Rate limit exceeded." }, { status: 429 });
  }

  try {
    const body = (await request.json()) as {
      brief: ClientBrief;
      brandDNA: BrandDNA;
    };

    if (!body.brief?.brand || !body.brandDNA?.positioning) {
      return NextResponse.json(
        { error: "brief and brandDNA are required" },
        { status: 400 }
      );
    }

    const result = await runCampaignWithCache(body.brief, body.brandDNA);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: safeErrorMessage(error) },
      { status: 500 }
    );
  }
}
