import type { BoardNarrativeMemoReport, Finding, NarrativeMemoExport, NarrativeMemoItem } from "./types.js";

function average(items: NarrativeMemoItem[], pick: (item: NarrativeMemoItem) => number) {
  return Math.round(items.reduce((sum, item) => sum + pick(item), 0) / items.length);
}

function evaluate(item: NarrativeMemoItem): Finding[] {
  const findings: Finding[] = [];

  if (item.readiness === "BOARD_READY" && item.confidenceScore >= 85 && item.recommendationStrengthScore >= 85) {
    findings.push({
      code: "board-ready-track",
      severity: "high",
      sector: item.sector,
      audience: item.audience,
      message: "This track is strong enough to support a board memo or investor packet right now."
    });
  }

  if (item.confidenceScore < 76 || item.requiredEvidence.length > 4) {
    findings.push({
      code: "thin-evidence-bridge",
      severity: item.confidenceScore < 64 ? "high" : "medium",
      sector: item.sector,
      audience: item.audience,
      message: "The narrative still depends on too many unstated proof bridges, which weakens the board packet."
    });
  }

  if (item.savingsPotentialScore < 45 && item.investmentPriorityScore < 70) {
    findings.push({
      code: "weak-savings-story",
      severity: "low",
      sector: item.sector,
      audience: item.audience,
      message: "The memo does not yet make a compelling savings case or urgent efficiency story."
    });
  }

  if (item.investmentPriorityScore >= 70 && item.nextBoardDecision.length < 85) {
    findings.push({
      code: "unclear-investment-priority",
      severity: "medium",
      sector: item.sector,
      audience: item.audience,
      message: "The narrative implies investment priority but the next board decision is not yet explicit enough."
    });
  }

  if (item.readiness === "BLOCKED") {
    findings.push({
      code: "blocked-board-owner",
      severity: "high",
      sector: item.sector,
      audience: item.audience,
      message: "This board track is blocked by missing ownership or memo packaging discipline."
    });
  }

  return findings;
}

export function analyze(items: NarrativeMemoItem[], options: { now?: string } = {}): BoardNarrativeMemoReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap((item) => evaluate(item));
  const boardReadyTracks = items.filter((item) => item.readiness === "BOARD_READY").length;
  const blockedTracks = items.filter((item) => item.readiness === "BLOCKED").length;
  const averageNarrativeCycleDays = Number(
    (
      items.reduce((sum, item) => sum + Math.max(3, Math.round((100 - item.confidenceScore) / 8 + 3)), 0) / items.length
    ).toFixed(1)
  );

  return {
    generatedAt,
    items: items.length,
    averageRiskScore: average(items, (item) => item.riskScore),
    averageSavingsPotential: average(items, (item) => item.savingsPotentialScore),
    averageInvestmentPriority: average(items, (item) => item.investmentPriorityScore),
    averageConfidence: average(items, (item) => item.confidenceScore),
    averageRecommendationStrength: average(items, (item) => item.recommendationStrengthScore),
    boardReadyTracks,
    blockedTracks,
    averageNarrativeCycleDays,
    hoursRecoveredPerQuarter: boardReadyTracks * 18 + items.filter((item) => item.readiness === "NEEDS_EVIDENCE").length * 9,
    findingsList,
    ok: findingsList.filter((item) => item.severity === "high").length <= items.length
  };
}

export function toExport(items: NarrativeMemoItem[], now?: string): NarrativeMemoExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}
