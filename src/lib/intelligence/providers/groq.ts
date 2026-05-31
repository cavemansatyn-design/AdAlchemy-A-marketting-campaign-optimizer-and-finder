import { getIntelligenceConfig } from "@/lib/intelligence/config";

interface GroqChatResponse {
  choices?: {
    message?: {
      content?: string;
    };
  }[];
}

export async function runGroqPrompt(
  prompt: string,
  options: { json?: boolean } = {}
): Promise<{ answerText: string; model: string }> {
  const { groqApiKey, groqModel } = getIntelligenceConfig();

  if (!groqApiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${groqApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: groqModel,
      messages: [
        {
          role: "system",
          content:
            "You are AdAlchemy's India 2026 campaign intelligence reasoning layer. Use supplied source evidence, be specific, and never mention backend tools to the end user.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      response_format: options.json ? { type: "json_object" } : undefined,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Groq request failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as GroqChatResponse;
  const answerText = data.choices?.[0]?.message?.content;
  if (!answerText) {
    throw new Error("Groq response did not include message content");
  }

  return { answerText, model: groqModel };
}
