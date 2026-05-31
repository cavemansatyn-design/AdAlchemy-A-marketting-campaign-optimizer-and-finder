import { Anakin } from "@anakin-io/sdk";
import { getIntelligenceConfig } from "@/lib/intelligence/config";
import {
  ChatGPTWireResponseSchema,
  type ChatGPTWireResponse,
} from "@/lib/intelligence/schemas";

let client: Anakin | null = null;

function getAnakinClient(): Anakin {
  if (!client) {
    const { anakinApiKey } = getIntelligenceConfig();
    client = new Anakin({
      apiKey: anakinApiKey,
      pollTimeoutMs: 300_000,
    });
  }
  return client;
}

export interface ChatGPTPromptOptions {
  prompt: string;
  pollTimeoutMs?: number;
}

/**
 * Anakin WIRE — ChatGPT Prompt action.
 * Sends a prompt via browser-backed ChatGPT and returns structured intelligence.
 */
export async function runChatGPTPrompt(
  options: ChatGPTPromptOptions
): Promise<ChatGPTWireResponse> {
  const { chatgptActionId } = getIntelligenceConfig();

  if (!chatgptActionId) {
    throw new Error("ANAKIN_WIRE_CHATGPT_ACTION_ID is not configured");
  }

  const result = await getAnakinClient().wire(
    chatgptActionId,
    { prompt: options.prompt },
    { pollTimeoutMs: options.pollTimeoutMs }
  );

  if (result.status === "failed" || !result.data) {
    throw new Error(
      result.error?.message ?? "ChatGPT WIRE action failed without details"
    );
  }

  return ChatGPTWireResponseSchema.parse(result.data);
}

export async function runChatGPTStructured<T>(
  prompt: string,
  parse: (answer: ChatGPTWireResponse) => T
): Promise<{ data: T; wire: ChatGPTWireResponse }> {
  const wire = await runChatGPTPrompt({ prompt });
  return { data: parse(wire), wire };
}
