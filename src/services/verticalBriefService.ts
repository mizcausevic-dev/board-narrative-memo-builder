import { analyze } from "../analyze.js";
import { sampleBoardNarrativeMemoBuilder } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardNarrativeMemoBuilder, { now: "2026-05-31T23:59:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averageRiskScore: report.averageRiskScore,
    averageSavingsPotential: report.averageSavingsPotential,
    averageInvestmentPriority: report.averageInvestmentPriority,
    averageConfidence: report.averageConfidence,
    averageRecommendationStrength: report.averageRecommendationStrength,
    boardReadyTracks: report.boardReadyTracks,
    blockedTracks: report.blockedTracks,
    averageNarrativeCycleDays: report.averageNarrativeCycleDays,
    hoursRecoveredPerQuarter: report.hoursRecoveredPerQuarter,
    highFindings,
    recommendation:
      "Package AI and biotech as board-ready tracks now, compress procurement and revenue into clearer savings memos next, and assign explicit ownership for the public-sector narrative."
  };
}

export function memoLane() {
  return sampleBoardNarrativeMemoBuilder.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    readiness: item.readiness,
    memoTheme: item.memoTheme,
    boardQuestion: item.boardQuestion,
    headlineGap: item.headlineGap,
    nextBoardDecision: item.nextBoardDecision
  }));
}

export function narrativeGaps() {
  return sampleBoardNarrativeMemoBuilder.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    memoTheme: item.memoTheme,
    riskScore: item.riskScore,
    confidenceScore: item.confidenceScore,
    headlineGap: item.headlineGap,
    currentNarrative: item.currentNarrative,
    companyTags: item.companyTags
  }));
}

export function investmentPosture() {
  return sampleBoardNarrativeMemoBuilder.map((item) => ({
    audience: item.audience,
    owner: item.owner,
    savingsPotentialScore: item.savingsPotentialScore,
    investmentPriorityScore: item.investmentPriorityScore,
    recommendationStrengthScore: item.recommendationStrengthScore,
    boardMemoHeadline: item.boardMemoHeadline,
    companyTags: item.companyTags,
    relatedSurfaces: item.relatedSurfaces,
    requiredEvidence: item.requiredEvidence
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return [...report.findingsList].sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic board-memo data only - no live board packets, investor documents, or internal company notes are included.",
    "Risk, savings, investment priority, confidence, and recommendation metrics are modeled from the sample narrative set in this repo.",
    "This surface is read-only and designed to show how Kinetic Gain can compress scorecards and proof layers into board-ready memo packets.",
    "Company tags and related surfaces are synthetic narrative-design aids rather than audited references.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    memoLane: memoLane(),
    narrativeGaps: narrativeGaps(),
    investmentPosture: investmentPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardNarrativeMemoBuilder
  };
}
