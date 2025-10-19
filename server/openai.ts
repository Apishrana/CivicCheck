import OpenAI from "openai";

// This code uses the OpenAI blueprint: blueprint:javascript_openai
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface CredibilityAnalysis {
  verdict: "Likely True" | "Possibly False" | "Unverified";
  reasoning: string;
  sources: string[];
  confidence: number;
}

export async function analyzeNewsCredibility(text: string): Promise<CredibilityAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are an AI fact-checker. Analyze the provided news text and evaluate its credibility.

Provide your analysis in JSON format with these fields:
- verdict: One of "Likely True", "Possibly False", or "Unverified"
- reasoning: A 2-3 sentence explanation of your assessment based on tone, evidence, context clues, and credibility indicators
- sources: An array of 1-2 fact-checking website names (e.g., "Snopes.com", "PolitiFact.org", "FactCheck.org", "Reuters Fact Check") that would be helpful for verification
- confidence: A number between 60 and 95 representing your confidence level in this assessment

Consider these factors:
- Language patterns (sensationalist vs. factual)
- Specificity of claims (vague vs. detailed)
- Presence of verifiable elements
- Emotional manipulation indicators
- Source attribution
- Context and plausibility

Remember: You're providing credibility assessment, not definitive fact-checking. Be honest about uncertainty.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    const validVerdicts = ["Likely True", "Possibly False", "Unverified"];
    const verdict = validVerdicts.includes(result.verdict)
      ? result.verdict
      : "Unverified";

    return {
      verdict,
      reasoning: result.reasoning || "Unable to analyze the provided text.",
      sources: Array.isArray(result.sources) ? result.sources.slice(0, 2) : [],
      confidence: Math.max(60, Math.min(95, Math.round(result.confidence || 75))),
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to analyze credibility. Please try again.");
  }
}
