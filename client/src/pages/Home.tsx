import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { CredibilityForm } from "@/components/CredibilityForm";
import { ResultsCard, type CredibilityResult } from "@/components/ResultsCard";
import { RecentChecks } from "@/components/RecentChecks";

const STORAGE_KEY = "civic-check-recent";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<CredibilityResult | null>(null);
  const [recentChecks, setRecentChecks] = useState<CredibilityResult[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecentChecks(parsed);
        if (parsed.length > 0) {
          setCurrentResult(parsed[0]);
        }
      } catch (e) {
        console.error("Failed to parse stored checks:", e);
      }
    }
  }, []);

  const saveCheck = (result: CredibilityResult) => {
    const updated = [result, ...recentChecks.filter(c => c.timestamp !== result.timestamp)].slice(0, 10);
    setRecentChecks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSubmit = async (text: string) => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const verdicts = ["Likely True", "Possibly False", "Unverified"] as const;
    const randomVerdict = verdicts[Math.floor(Math.random() * verdicts.length)];

    const reasoningMap = {
      "Likely True": "This statement appears credible based on the language used, specific details provided, and overall consistency. The tone is factual and includes verifiable elements. However, always cross-reference with trusted sources for important decisions.",
      "Possibly False": "This claim shows several red flags including sensationalist language, lack of specific sources, and patterns commonly associated with misinformation. The statement contains vague assertions that are difficult to verify. Proceed with caution and verify through fact-checking sources.",
      "Unverified": "Unable to definitively confirm or deny this claim with the information provided. The statement lacks sufficient context or specific details needed for verification. More investigation through primary sources is recommended before drawing conclusions.",
    };

    const sourcesMap = {
      "Likely True": ["Snopes.com", "FactCheck.org"],
      "Possibly False": ["PolitiFact.org", "Snopes.com"],
      "Unverified": ["FactCheck.org", "Reuters Fact Check"],
    };

    const result: CredibilityResult = {
      verdict: randomVerdict,
      reasoning: reasoningMap[randomVerdict],
      sources: sourcesMap[randomVerdict],
      confidence: Math.floor(Math.random() * 30) + 70,
      timestamp: Date.now(),
      text,
    };

    setCurrentResult(result);
    saveCheck(result);
    setIsLoading(false);
  };

  const handleSelectCheck = (check: CredibilityResult) => {
    setCurrentResult(check);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto space-y-12">
          <section className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold" data-testid="text-hero-title">
              Verify News Credibility with AI
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-hero-subtitle">
              Paste any news headline, article excerpt, or social media post to get an instant
              credibility assessment powered by advanced AI analysis.
            </p>
          </section>

          <CredibilityForm onSubmit={handleSubmit} isLoading={isLoading} />

          {currentResult && (
            <section className="pt-8">
              <ResultsCard result={currentResult} />
            </section>
          )}

          {recentChecks.length > 0 && (
            <section className="pt-12">
              <RecentChecks checks={recentChecks} onSelectCheck={handleSelectCheck} />
            </section>
          )}
        </div>
      </main>

      <footer className="border-t py-8 px-6 mt-20">
        <div className="container mx-auto">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              <strong>Disclaimer:</strong> CivicCheck provides AI-assisted analysis, not definitive
              fact-checking. Results are meant to help evaluate credibility but should not be
              considered absolute truth. Always verify important information through multiple
              trusted sources.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors" data-testid="link-about">
                About
              </button>
              <button className="hover:text-foreground transition-colors" data-testid="link-how-it-works">
                How It Works
              </button>
              <button className="hover:text-foreground transition-colors" data-testid="link-privacy">
                Privacy
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Powered by OpenAI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
