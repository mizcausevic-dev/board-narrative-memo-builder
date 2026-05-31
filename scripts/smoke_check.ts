import request from "supertest";
import { createApp } from "../src/app.js";

async function run() {
  const app = createApp();
  const htmlRoutes = ["/", "/memo-lane", "/narrative-gaps", "/investment-posture", "/verification", "/docs"];
  const jsonRoutes = [
    "/api/dashboard/summary",
    "/api/memo-lane",
    "/api/narrative-gaps",
    "/api/investment-posture",
    "/api/risk-map",
    "/api/verification",
    "/api/sample",
    "/api/payload"
  ];

  for (const route of htmlRoutes) {
    const response = await request(app).get(route);
    if (response.status !== 200) throw new Error(`Expected 200 on ${route}, got ${response.status}`);
  }

  for (const route of jsonRoutes) {
    const response = await request(app).get(route);
    if (response.status !== 200) throw new Error(`Expected 200 on ${route}, got ${response.status}`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
