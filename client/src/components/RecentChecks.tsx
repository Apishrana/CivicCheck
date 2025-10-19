import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Clock } from "lucide-react";
import type { CredibilityResult, Verdict } from "./ResultsCard";
import { cn } from "@/lib/utils";

interface RecentChecksProps {
  checks: CredibilityResult[];
  onSelectCheck: (check: CredibilityResult) => void;
}

const verdictColors = {
  "Likely True": "bg-chart-2/10 text-chart-2 border-chart-2/20",
  "Possibly False": "bg-chart-4/10 text-chart-4 border-chart-4/20",
  "Unverified": "bg-chart-3/10 text-chart-3 border-chart-3/20",
};

export function RecentChecks({ checks, onSelectCheck }: RecentChecksProps) {
  if (checks.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Recent Checks</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {checks.slice(0, 3).map((check, index) => (
          <Card
            key={index}
            className="cursor-pointer hover-elevate active-elevate-2 transition-all"
            onClick={() => onSelectCheck(check)}
            data-testid={`card-recent-${index}`}
          >
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <Badge
                  className={cn(
                    "px-3 py-1 text-sm font-medium rounded-full border",
                    verdictColors[check.verdict]
                  )}
                  data-testid={`badge-recent-verdict-${index}`}
                >
                  {check.verdict}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span data-testid={`text-recent-time-${index}`}>
                    {formatDistanceToNow(check.timestamp, { addSuffix: true })}
                  </span>
                </div>
              </div>
              <p className="text-sm text-foreground line-clamp-3" data-testid={`text-recent-excerpt-${index}`}>
                {check.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
