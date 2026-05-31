import type { BoardNarrativeMemoReport } from "./types.js";

export function toSummary(report: BoardNarrativeMemoReport) {
  return [
    `Memo tracks: ${report.items}`,
    `Average risk score: ${report.averageRiskScore}`,
    `Average savings potential: ${report.averageSavingsPotential}`,
    `Average investment priority: ${report.averageInvestmentPriority}`,
    `Average confidence: ${report.averageConfidence}`,
    `Average recommendation strength: ${report.averageRecommendationStrength}`,
    `Board-ready tracks: ${report.boardReadyTracks}`,
    `Blocked tracks: ${report.blockedTracks}`,
    `Average narrative cycle days: ${report.averageNarrativeCycleDays}`,
    `Hours recovered per quarter: ${report.hoursRecoveredPerQuarter}`,
    `High findings: ${report.findingsList.filter((item) => item.severity === "high").length}`
  ].join("\n");
}
