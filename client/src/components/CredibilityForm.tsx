import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface CredibilityFormProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export function CredibilityForm({ onSubmit, isLoading }: CredibilityFormProps) {
  const [text, setText] = useState("");
  const charCount = text.length;
  const maxChars = 2000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSubmit(text.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-6">
      <div className="space-y-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste news headline, article excerpt, or social media post..."
          className="min-h-48 text-base resize-none focus-visible:ring-2"
          maxLength={maxChars}
          disabled={isLoading}
          data-testid="input-news-text"
        />
        <div className="flex justify-end">
          <span className="text-sm text-muted-foreground" data-testid="text-char-count">
            {charCount} / {maxChars}
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          className="px-12 py-6 text-lg font-semibold rounded-full"
          disabled={!text.trim() || isLoading}
          data-testid="button-check-credibility"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Check Credibility"
          )}
        </Button>
      </div>
    </form>
  );
}
