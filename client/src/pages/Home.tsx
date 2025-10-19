import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { CredibilityForm } from "@/components/CredibilityForm";
import { ResultsCard, type CredibilityResult } from "@/components/ResultsCard";
import { RecentChecks } from "@/components/RecentChecks";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "civic-check-recent";

export default function Home() {
  const [currentResult, setCurrentResult] = useState<CredibilityResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) {
          setCurrentResult(parsed[0]);
        }
      } catch (e) {
        console.error("Failed to parse stored checks:", e);
      }
    }
  }, []);

  const checkCredibilityMutation = useMutation({
    mutationFn: async (text: string) => {
      const res = await fetch("/api/credibility-check", {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to analyze credibility");
      }

      return await res.json();
    },
    onSuccess: (data) => {
      const result: CredibilityResult = {
        verdict: data.verdict,
        reasoning: data.reasoning,
        sources: data.sources,
        confidence: data.confidence || undefined,
        timestamp: new Date(data.createdAt).getTime(),
        text: data.text,
      };

      setCurrentResult(result);

      const stored = localStorage.getItem(STORAGE_KEY);
      let existingChecks: CredibilityResult[] = [];
      if (stored) {
        try {
          existingChecks = JSON.parse(stored);
        } catch (e) {
          console.error("Failed to parse stored checks:", e);
        }
      }

      const updated = [result, ...existingChecks.filter(c => c.timestamp !== result.timestamp)].slice(0, 10);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze the text. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (text: string) => {
    checkCredibilityMutation.mutate(text);
  };

  const handleSelectCheck = (check: CredibilityResult) => {
    setCurrentResult(check);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const localRecentChecks = (() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return [];
      }
    }
    return [];
  })();

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

          <CredibilityForm
            onSubmit={handleSubmit}
            isLoading={checkCredibilityMutation.isPending}
          />

          {currentResult && (
            <section className="pt-8">
              <ResultsCard result={currentResult} />
            </section>
          )}

          {localRecentChecks.length > 0 && (
            <section className="pt-12">
              <RecentChecks checks={localRecentChecks} onSelectCheck={handleSelectCheck} />
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
