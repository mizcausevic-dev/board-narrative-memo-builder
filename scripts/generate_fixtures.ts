import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { toExport } from "../src/analyze.js";
import { sampleBoardNarrativeMemoBuilder } from "../src/data/sampleVerticalBrief.js";

const clean = sampleBoardNarrativeMemoBuilder.map((item) => ({
  ...item,
  readiness: "BOARD_READY" as const,
  riskScore: Math.min(item.riskScore, 35),
  savingsPotentialScore: Math.max(item.savingsPotentialScore, 74),
  investmentPriorityScore: Math.max(item.investmentPriorityScore, 82),
  confidenceScore: Math.max(item.confidenceScore, 88),
  recommendationStrengthScore: Math.max(item.recommendationStrengthScore, 88)
}));

mkdirSync("fixtures", { recursive: true });
for (const entry of readdirSync("fixtures")) {
  if (entry.endsWith(".json")) {
    rmSync(`fixtures/${entry}`, { force: true });
  }
}
writeFileSync("fixtures/board-narrative-memo-builder.json", JSON.stringify(toExport(sampleBoardNarrativeMemoBuilder), null, 2));
writeFileSync("fixtures/board-narrative-memo-builder-clean.json", JSON.stringify(toExport(clean), null, 2));
