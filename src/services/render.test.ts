import { describe, expect, it } from "vitest";
import { renderOverview } from "./render.js";

describe("render", () => {
  it("prints the product title", () => {
    expect(renderOverview()).toContain("Board Narrative Memo Builder");
  });
});
