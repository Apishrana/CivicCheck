import { ResultsCard } from "../ResultsCard";

export default function ResultsCardExample() {
  const mockResult = {
    verdict: "Likely True" as const,
    reasoning:
      "This claim appears to be factually accurate based on the language used and available context. The statement references verifiable events and uses specific details that can be cross-checked. However, it's always recommended to verify through primary sources.",
    sources: ["Snopes.com", "PolitiFact.org"],
    confidence: 85,
    timestamp: Date.now(),
    text: "Sample news text being checked",
  };

  return (
    <div className="p-8 bg-background">
      <ResultsCard result={mockResult} />
    </div>
  );
}
