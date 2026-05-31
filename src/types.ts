export type MemoSector =
  | "AI_PLATFORM"
  | "CLOUD_IDENTITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "PROCUREMENT_TRUST"
  | "PUBLIC_SECTOR";

export type MemoReadiness = "BOARD_READY" | "NEEDS_EVIDENCE" | "INVESTMENT_DECISION" | "BLOCKED";

export interface NarrativeMemoItem {
  id: string;
  owner: string;
  audience: string;
  sector: MemoSector;
  readiness: MemoReadiness;
  memoTheme: string;
  boardQuestion: string;
  currentNarrative: string;
  headlineGap: string;
  riskScore: number;
  savingsPotentialScore: number;
  investmentPriorityScore: number;
  confidenceScore: number;
  recommendationStrengthScore: number;
  boardMemoHeadline: string;
  boardNarrative: string;
  nextBoardDecision: string;
  companyTags: string[];
  relatedSurfaces: string[];
  requiredEvidence: string[];
}

export interface NarrativeMemoExport {
  generatedAt: string;
  items: NarrativeMemoItem[];
}

export type FindingCode =
  | "board-ready-track"
  | "thin-evidence-bridge"
  | "weak-savings-story"
  | "unclear-investment-priority"
  | "blocked-board-owner";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  sector: MemoSector;
  audience: string;
  message: string;
}

export interface BoardNarrativeMemoReport {
  generatedAt: string;
  items: number;
  averageRiskScore: number;
  averageSavingsPotential: number;
  averageInvestmentPriority: number;
  averageConfidence: number;
  averageRecommendationStrength: number;
  boardReadyTracks: number;
  blockedTracks: number;
  averageNarrativeCycleDays: number;
  hoursRecoveredPerQuarter: number;
  findingsList: Finding[];
  ok: boolean;
}
