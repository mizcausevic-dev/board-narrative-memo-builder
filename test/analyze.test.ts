import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardNarrativeMemoBuilder } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected item count", () => {
    const report = analyze(sampleBoardNarrativeMemoBuilder, { now: "2026-05-31T23:40:00Z" });
    expect(report.items).toBe(7);
  });

  it("computes positive memo metrics", () => {
    const report = analyze(sampleBoardNarrativeMemoBuilder, { now: "2026-05-31T23:40:00Z" });
    expect(report.averageRiskScore).toBeGreaterThan(0);
    expect(report.averageConfidence).toBeGreaterThan(0);
    expect(report.averageInvestmentPriority).toBeGreaterThan(0);
    expect(report.averageRecommendationStrength).toBeGreaterThan(0);
  });

  it("counts board-ready and blocked memo tracks", () => {
    const report = analyze(sampleBoardNarrativeMemoBuilder, { now: "2026-05-31T23:40:00Z" });
    expect(report.boardReadyTracks).toBeGreaterThanOrEqual(1);
    expect(report.blockedTracks).toBeGreaterThanOrEqual(1);
  });

  it("emits memo-gap and ownership findings", () => {
    const report = analyze(sampleBoardNarrativeMemoBuilder, { now: "2026-05-31T23:40:00Z" });
    expect(report.findingsList.some((finding) => finding.code === "thin-evidence-bridge")).toBe(true);
    expect(report.findingsList.some((finding) => ["blocked-board-owner", "weak-savings-story", "unclear-investment-priority"].includes(finding.code))).toBe(true);
  });

  it("rolls up annual savings upside", () => {
    const report = analyze(sampleBoardNarrativeMemoBuilder, { now: "2026-05-31T23:40:00Z" });
    expect(report.hoursRecoveredPerQuarter).toBeGreaterThan(0);
  });
});
