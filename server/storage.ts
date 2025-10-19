import { type CredibilityCheck, type InsertCredibilityCheck } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createCredibilityCheck(check: InsertCredibilityCheck): Promise<CredibilityCheck>;
  getRecentCredibilityChecks(limit: number): Promise<CredibilityCheck[]>;
}

export class MemStorage implements IStorage {
  private credibilityChecks: Map<string, CredibilityCheck>;

  constructor() {
    this.credibilityChecks = new Map();
  }

  async createCredibilityCheck(insertCheck: InsertCredibilityCheck): Promise<CredibilityCheck> {
    const id = randomUUID();
    const check: CredibilityCheck = {
      ...insertCheck,
      sources: insertCheck.sources || [],
      confidence: insertCheck.confidence || null,
      id,
      createdAt: new Date(),
    };
    this.credibilityChecks.set(id, check);
    return check;
  }

  async getRecentCredibilityChecks(limit: number): Promise<CredibilityCheck[]> {
    const checks = Array.from(this.credibilityChecks.values());
    return checks
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
