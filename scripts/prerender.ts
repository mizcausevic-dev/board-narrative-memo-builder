import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import request from "supertest";
import { createApp } from "../src/app.js";

async function run() {
  const app = createApp();
  const root = "site";
  mkdirSync(root, { recursive: true });

  const pages = [
    ["/", "index.html"],
    ["/memo-lane", "memo-lane/index.html"],
    ["/narrative-gaps", "narrative-gaps/index.html"],
    ["/investment-posture", "investment-posture/index.html"],
    ["/verification", "verification/index.html"],
    ["/docs", "docs/index.html"]
  ];

  for (const [route, output] of pages) {
    const response = await request(app).get(route);
    const target = path.join(root, output);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, response.text);
  }

  writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://memo.kineticgain.com/sitemap.xml\n");
  writeFileSync(
    path.join(root, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://memo.kineticgain.com/</loc></url><url><loc>https://memo.kineticgain.com/memo-lane/</loc></url><url><loc>https://memo.kineticgain.com/narrative-gaps/</loc></url><url><loc>https://memo.kineticgain.com/investment-posture/</loc></url><url><loc>https://memo.kineticgain.com/verification/</loc></url><url><loc>https://memo.kineticgain.com/docs/</loc></url></urlset>`
  );

  const apis = [
    ["/api/dashboard/summary", "dashboard-summary.json"],
    ["/api/memo-lane", "memo-lane.json"],
    ["/api/narrative-gaps", "narrative-gaps.json"],
    ["/api/investment-posture", "investment-posture.json"],
    ["/api/risk-map", "risk-map.json"],
    ["/api/verification", "verification.json"],
    ["/api/sample", "sample.json"],
    ["/api/payload", "payload.json"]
  ];

  for (const [route, output] of apis) {
    const response = await request(app).get(route);
    writeFileSync(path.join(root, output), JSON.stringify(response.body, null, 2));
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
