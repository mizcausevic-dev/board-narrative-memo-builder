import express from "express";
import { renderDocs, renderInvestmentPosture, renderMemoLane, renderNarrativeGaps, renderOverview, renderSample, renderVerification } from "./services/render.js";
import { investmentPosture, memoLane, narrativeGaps, payload, riskMap, summary, verification } from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/memo-lane", (_req, res) => res.type("html").send(renderMemoLane()));
  app.get("/narrative-gaps", (_req, res) => res.type("html").send(renderNarrativeGaps()));
  app.get("/investment-posture", (_req, res) => res.type("html").send(renderInvestmentPosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/memo-lane", (_req, res) => res.json(memoLane()));
  app.get("/api/narrative-gaps", (_req, res) => res.json(narrativeGaps()));
  app.get("/api/investment-posture", (_req, res) => res.json(investmentPosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));
  app.get("/sample.json", (_req, res) => res.type("json").send(renderSample()));

  return app;
}

export function startServer(port = Number(process.env.PORT ?? 3000)) {
  return createApp().listen(port, () => {
    console.log(`board-narrative-memo-builder listening on http://127.0.0.1:${port}`);
  });
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  startServer();
}
