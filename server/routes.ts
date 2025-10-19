import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeNewsCredibility } from "./openai";
import { insertCredibilityCheckSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/credibility-check", async (req, res) => {
    try {
      const { text } = z.object({ text: z.string().min(10).max(2000) }).parse(req.body);

      const analysis = await analyzeNewsCredibility(text);

      const check = await storage.createCredibilityCheck({
        text,
        verdict: analysis.verdict,
        reasoning: analysis.reasoning,
        sources: analysis.sources,
        confidence: analysis.confidence,
      });

      res.json(check);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input. Text must be between 10 and 2000 characters." });
      } else {
        console.error("Error processing credibility check:", error);
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to process request" });
      }
    }
  });

  app.get("/api/credibility-checks/recent", async (req, res) => {
    try {
      const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
      const checks = await storage.getRecentCredibilityChecks(limit);
      res.json(checks);
    } catch (error) {
      console.error("Error fetching recent checks:", error);
      res.status(500).json({ error: "Failed to fetch recent checks" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
