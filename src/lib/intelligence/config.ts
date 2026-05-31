export function getIntelligenceConfig() {
  return {
    anakinApiKey: process.env.ANAKIN_API_KEY ?? "",
    chatgptActionId: process.env.ANAKIN_WIRE_CHATGPT_ACTION_ID ?? "",
    groqApiKey: process.env.GROQ_API_KEY ?? "",
    groqModel: process.env.GROQ_MODEL ?? "llama-3.1-8b-instant",
  };
}

export function isChatGPTWireConfigured(): boolean {
  const { anakinApiKey, chatgptActionId } = getIntelligenceConfig();
  return Boolean(anakinApiKey && chatgptActionId);
}

export function isGroqConfigured(): boolean {
  const { groqApiKey } = getIntelligenceConfig();
  return Boolean(groqApiKey);
}

export function isAnakinConfigured(): boolean {
  const { anakinApiKey } = getIntelligenceConfig();
  return Boolean(anakinApiKey);
}
