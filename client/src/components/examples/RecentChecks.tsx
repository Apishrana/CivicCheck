import { RecentChecks } from "../RecentChecks";

export default function RecentChecksExample() {
  const mockChecks = [
    {
      verdict: "Likely True" as const,
      reasoning: "Analysis shows this is credible...",
      sources: ["Snopes.com"],
      timestamp: Date.now() - 120000,
      text: "Breaking: Scientists discover new renewable energy source that could revolutionize solar power.",
    },
    {
      verdict: "Possibly False" as const,
      reasoning: "Several inconsistencies detected...",
      sources: ["PolitiFact.org"],
      timestamp: Date.now() - 3600000,
      text: "Celebrity announces shocking career change in exclusive interview.",
    },
    {
      verdict: "Unverified" as const,
      reasoning: "Unable to confirm or deny...",
      sources: ["FactCheck.org"],
      timestamp: Date.now() - 7200000,
      text: "New study suggests unexpected health benefits of popular food item.",
    },
  ];

  return (
    <div className="p-8 bg-background">
      <RecentChecks
        checks={mockChecks}
        onSelectCheck={(check) => console.log("Selected check:", check)}
      />
    </div>
  );
}
