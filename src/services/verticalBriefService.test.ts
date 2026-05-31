import { describe, expect, it } from "vitest";
import { investmentPosture, memoLane, narrativeGaps, payload, riskMap, summary, verification } from "./verticalBriefService.js";

describe("board narrative memo service", () => {
  it("returns an executive summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the memo lane", () => {
    expect(memoLane()[0]?.audience).toBeTruthy();
  });

  it("returns the narrative gaps view", () => {
    expect(narrativeGaps()[0]?.riskScore).toBeGreaterThan(0);
  });

  it("returns the investment posture view", () => {
    expect(investmentPosture()[0]?.investmentPriorityScore).toBeGreaterThan(0);
  });

  it("keeps the board memo headline in the investment posture", () => {
    expect(investmentPosture()[0]?.boardMemoHeadline).toBeTruthy();
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
    expect(payload().verification.length).toBeGreaterThan(0);
  });
});
