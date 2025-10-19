import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, AlertCircle, CheckCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type Verdict = "Likely True" | "Possibly False" | "Unverified";

export interface CredibilityResult {
  verdict: Verdict;
  reasoning: string;
  sources: string[];
  confidence?: number;
  timestamp: number;
  text: string;
}

interface ResultsCardProps {
  result: CredibilityResult;
}

const verdictConfig = {
  "Likely True": {
    color: "bg-chart-2 text-white border-chart-2",
    icon: CheckCircle,
  },
  "Possibly False": {
    color: "bg-chart-4 text-white border-chart-4",
    icon: AlertCircle,
  },
  "Unverified": {
    color: "bg-chart-3 text-white border-chart-3",
    icon: HelpCircle,
  },
};

export function ResultsCard({ result }: ResultsCardProps) {
  const config = verdictConfig[result.verdict];
  const Icon = config.icon;

  return (
    <Card className="max-w-3xl mx-auto shadow-lg animate-slide-up" data-testid="card-results">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-3">
          <Badge
            className={cn(
              "px-4 py-2 text-base font-semibold rounded-full flex items-center gap-2",
              config.color
            )}
            data-testid="badge-verdict"
          >
            <Icon className="h-5 w-5" />
            {result.verdict}
          </Badge>
          {result.confidence && (
            <span className="text-sm text-muted-foreground" data-testid="text-confidence">
              {result.confidence}% confidence
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Analysis</h3>
          <p className="text-foreground leading-relaxed" data-testid="text-reasoning">
            {result.reasoning}
          </p>
        </div>

        {result.sources.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Suggested Fact-Check Sources</h3>
            <ul className="space-y-2">
              {result.sources.map((source, index) => (
                <li key={index}>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(source)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-2"
                    data-testid={`link-source-${index}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            AI-assisted analysis, not definitive fact-checking. Always verify important information
            through multiple trusted sources.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
