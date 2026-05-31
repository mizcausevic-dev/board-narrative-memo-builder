import { toExport } from "../analyze.js";
import { sampleBoardNarrativeMemoBuilder } from "../data/sampleVerticalBrief.js";
import { investmentPosture, memoLane, narrativeGaps, payload, riskMap, summary, verification } from "./verticalBriefService.js";

const productTitle = "Board Narrative Memo Builder";
const domain = "https://memo.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function shell(title: string, active: string, body: string, description: string) {
  const routes = [
    ["/", "Overview"],
    ["/memo-lane", "Memo lane"],
    ["/narrative-gaps", "Narrative gaps"],
    ["/investment-posture", "Investment posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ];

  const nav = routes
    .map(([href, label]) => {
      const current = href === active ? ' aria-current="page"' : "";
      return `<a href="${href}"${current}>${label}</a>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${productTitle} · ${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${domain}${active === "/" ? "/" : `${active}/`}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${productTitle} · ${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${domain}${active === "/" ? "/" : `${active}/`}" />
    <meta name="twitter:card" content="summary_large_image" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #071019;
        --panel: #101a2b;
        --panel-alt: #0d1624;
        --ink: #ecf2ff;
        --muted: #9fb1c9;
        --accent: #45f2b4;
        --line: rgba(114, 142, 188, 0.24);
        --chip: rgba(73, 242, 180, 0.12);
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(85, 92, 224, 0.18), transparent 36%),
          linear-gradient(180deg, #071019, #081221 55%, #0b1830);
        color: var(--ink);
      }
      a { color: #8fd0ff; text-decoration: none; }
      a:hover { text-decoration: underline; }
      .wrap { max-width: 1200px; margin: 0 auto; padding: 40px 24px 56px; }
      .hero, .section, .table-wrap {
        background: rgba(16, 26, 43, 0.94);
        border: 1px solid var(--line);
        border-radius: 28px;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
      }
      .hero { padding: 28px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 14px;
        border-radius: 999px;
        border: 1px solid rgba(69, 242, 180, 0.3);
        background: rgba(69, 242, 180, 0.08);
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font: 600 12px/1.2 "Consolas", monospace;
      }
      h1, h2, h3 {
        margin: 18px 0 10px;
        font-family: Georgia, serif;
        line-height: 1.05;
      }
      h1 { font-size: clamp(40px, 7vw, 72px); max-width: 14ch; }
      h2 { font-size: clamp(28px, 4vw, 42px); }
      .lede, .section p, td, th, li, .metric-copy {
        color: var(--muted);
        line-height: 1.6;
      }
      .topbar {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        align-items: center;
        margin-bottom: 18px;
      }
      .product { font: 700 24px/1.2 "Segoe UI", system-ui, sans-serif; }
      nav { display: flex; flex-wrap: wrap; gap: 10px; }
      nav a {
        padding: 10px 14px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,0.02);
        color: var(--muted);
      }
      nav a[aria-current="page"] {
        border-color: rgba(69, 242, 180, 0.4);
        background: var(--chip);
        color: var(--ink);
      }
      .metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 14px;
        margin-top: 22px;
      }
      .metric {
        padding: 18px;
        background: rgba(255,255,255,0.03);
        border: 1px solid var(--line);
        border-radius: 22px;
      }
      .metric-label {
        color: var(--muted);
        font: 600 12px/1.2 "Consolas", monospace;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      .metric-value {
        display: block;
        margin-top: 10px;
        font: 700 34px/1 Georgia, serif;
      }
      .section, .table-wrap { margin-top: 28px; padding: 24px; }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 16px;
        margin-top: 18px;
      }
      .card {
        padding: 18px;
        border-radius: 22px;
        border: 1px solid var(--line);
        background: var(--panel-alt);
      }
      .pill {
        display: inline-flex;
        align-items: center;
        padding: 7px 11px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,0.02);
        color: var(--muted);
        font: 600 12px/1.1 "Consolas", monospace;
      }
      .pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
      .table-wrap table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 14px;
      }
      th, td {
        text-align: left;
        vertical-align: top;
        padding: 14px 12px;
        border-top: 1px solid var(--line);
      }
      th {
        color: var(--ink);
        font: 600 12px/1.2 "Consolas", monospace;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      footer {
        margin-top: 28px;
        padding-top: 18px;
        border-top: 1px solid var(--line);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 12px;
        color: var(--muted);
      }
      .footer-links { display: flex; flex-wrap: wrap; gap: 16px; }
      code {
        padding: 2px 6px;
        border-radius: 6px;
        background: rgba(255,255,255,0.05);
      }
      ul { padding-left: 20px; }
      @media (max-width: 720px) {
        .topbar { flex-direction: column; align-items: flex-start; }
        .wrap { padding: 18px 14px 28px; }
        .hero, .section, .table-wrap { padding: 18px; border-radius: 20px; }
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <section class="hero">
        <div class="topbar">
          <div class="product">${productTitle}</div>
          <nav>${nav}</nav>
        </div>
        <span class="eyebrow">Executive intelligence · board memo layer</span>
        ${body}
        <footer>
          <div>Board-ready narratives, investment framing, risk prioritization, and memo-safe evidence packaging for executive teams.</div>
          <div class="footer-links">
            <a href="https://github.com/mizcausevic-dev/">GitHub</a>
            <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
            <a href="https://kineticgain.com/">Kinetic Gain</a>
          </div>
        </footer>
      </section>
    </div>
  </body>
</html>`;
}

export function renderOverview() {
  const executiveSummary = summary();
  const memos = memoLane();
  const risks = riskMap().slice(0, 5);
  const cards = memos
    .slice(0, 6)
    .map(
      (item) => `<article class="card">
        <span class="pill">${escapeHtml(item.readiness)}</span>
        <h3>${escapeHtml(item.audience)}</h3>
        <p>${escapeHtml(item.boardQuestion)}</p>
        <div class="pills">
          <span class="pill">${escapeHtml(item.owner)}</span>
          <span class="pill">${escapeHtml(item.memoTheme)}</span>
        </div>
      </article>`
    )
    .join("");
  const riskRows = risks
    .map(
      (item) => `<tr><td>${escapeHtml(item.audience)}</td><td>${escapeHtml(item.code)}</td><td>${escapeHtml(item.severity)}</td><td>${escapeHtml(item.message)}</td></tr>`
    )
    .join("");

  return shell(
    "Overview",
    "/",
    `
      <h1>Turn scorecards and proof packets into one board-safe narrative.</h1>
      <p class="lede">Board Narrative Memo Builder compresses exposure, savings, investment priority, and confidence into a reusable executive memo layer so leaders stop rebuilding the story by hand for every board or investor cycle.</p>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Memo tracks</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled board tracks in the current narrative estate.</div></div>
        <div class="metric"><span class="metric-label">Average risk</span><span class="metric-value">${executiveSummary.averageRiskScore}</span><div class="metric-copy">How much unresolved exposure is still sitting inside the narrative set.</div></div>
        <div class="metric"><span class="metric-label">Savings potential</span><span class="metric-value">${executiveSummary.averageSavingsPotential}</span><div class="metric-copy">How strongly each memo can argue for efficiency or margin recovery.</div></div>
        <div class="metric"><span class="metric-label">Investment priority</span><span class="metric-value">${executiveSummary.averageInvestmentPriority}</span><div class="metric-copy">How clearly the next funded decision is already visible.</div></div>
        <div class="metric"><span class="metric-label">Board-ready tracks</span><span class="metric-value">${executiveSummary.boardReadyTracks}</span><div class="metric-copy">Narrative packets strong enough to travel now.</div></div>
        <div class="metric"><span class="metric-label">Hours recovered</span><span class="metric-value">${formatNumber(executiveSummary.hoursRecoveredPerQuarter)}</span><div class="metric-copy">Modeled quarterly hours recovered when narrative assembly stops being manual.</div></div>
      </div>
      <section class="section">
        <h2>Memo lane</h2>
        <p>Each board track keeps the audience, memo theme, narrative question, readiness, and next board decision visible before the next review cycle begins.</p>
        <div class="grid">${cards}</div>
      </section>
      <section class="table-wrap">
        <h2>Risk map</h2>
        <p>The risk map keeps weak evidence bridges, vague investment asks, blocked ownership, and thin savings stories visible before the board narrative drifts.</p>
        <table>
          <thead><tr><th>Audience</th><th>Code</th><th>Severity</th><th>Message</th></tr></thead>
          <tbody>${riskRows}</tbody>
        </table>
      </section>
    `,
    "Executive memo surface for board narrative, investment posture, evidence gaps, and confidence scoring."
  );
}

export function renderMemoLane() {
  const cards = memoLane()
    .map(
      (item) => `<article class="card">
        <span class="pill">${escapeHtml(item.readiness)}</span>
        <h3>${escapeHtml(item.audience)}</h3>
        <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
        <p><strong>Theme:</strong> ${escapeHtml(item.memoTheme)}</p>
        <p><strong>Question:</strong> ${escapeHtml(item.boardQuestion)}</p>
        <p><strong>Gap:</strong> ${escapeHtml(item.headlineGap)}</p>
        <p><strong>Decision:</strong> ${escapeHtml(item.nextBoardDecision)}</p>
      </article>`
    )
    .join("");

  return shell(
    "Memo lane",
    "/memo-lane",
    `
      <h1>Keep every board track, question, and next decision visible.</h1>
      <p class="lede">The memo-lane view shows which narratives are ready now, which still need evidence compression, and where leadership still needs a clearer board decision.</p>
      <section class="section">
        <h2>Board queue</h2>
        <div class="grid">${cards}</div>
      </section>
    `,
    "Memo-lane view for board questions, narrative readiness, and next executive decisions."
  );
}

export function renderNarrativeGaps() {
  const rows = narrativeGaps()
    .map(
      (item) => `<tr><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.audience)}</td><td>${escapeHtml(item.memoTheme)}</td><td>${item.riskScore}</td><td>${item.confidenceScore}</td><td>${escapeHtml(item.headlineGap)}</td><td>${escapeHtml(item.companyTags.join(", "))}</td></tr>`
    )
    .join("");

  return shell(
    "Narrative gaps",
    "/narrative-gaps",
    `
      <h1>See where the board story is still thin, vague, or under-supported.</h1>
      <p class="lede">Narrative gaps keep risk, confidence, company-tag context, and the actual headline gap readable before leadership turns proof into a weak memo.</p>
      <section class="table-wrap">
        <h2>Gap matrix</h2>
        <table>
          <thead><tr><th>Owner</th><th>Audience</th><th>Memo theme</th><th>Risk</th><th>Confidence</th><th>Headline gap</th><th>Company tags</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
    `,
    "Narrative-gap matrix for board memo confidence, risk pressure, and weak evidence bridges."
  );
}

export function renderInvestmentPosture() {
  const rows = investmentPosture()
    .map(
      (item) => `<tr><td>${escapeHtml(item.audience)}</td><td>${escapeHtml(item.owner)}</td><td>${item.savingsPotentialScore}</td><td>${item.investmentPriorityScore}</td><td>${item.recommendationStrengthScore}</td><td>${escapeHtml(item.companyTags.join(", "))}</td><td>${escapeHtml(item.relatedSurfaces.join(", "))}</td></tr>`
    )
    .join("");

  return shell(
    "Investment posture",
    "/investment-posture",
    `
      <h1>Keep savings, investment priority, and recommendation strength together.</h1>
      <p class="lede">The investment-posture view shows whether each narrative can make a credible savings argument, a strong investment ask, and a defensible memo recommendation.</p>
      <section class="table-wrap">
        <h2>Investment matrix</h2>
        <table>
          <thead><tr><th>Audience</th><th>Owner</th><th>Savings</th><th>Priority</th><th>Recommendation</th><th>Company tags</th><th>Related surfaces</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
    `,
    "Investment-posture matrix for savings narrative, executive prioritization, and board recommendation strength."
  );
}

export function renderVerification() {
  const items = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    "/verification",
    `
      <h1>Verification posture stays explicit.</h1>
      <p class="lede">This memo-building surface is synthetic, read-only, and reproducible from the included sample export. This page keeps those guardrails visible before the repo is shown externally.</p>
      <section class="section"><h2>Verification notes</h2><ul>${items}</ul></section>
    `,
    "Verification notes for the synthetic board-memo surface, sample export, and read-only executive workflow."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `
      <h1>Board Narrative Memo Builder docs</h1>
      <p class="lede">This repo compresses scorecards and proof layers into one board-safe memo surface: memo lane, narrative gaps, investment posture, and risk map.</p>
      <section class="section">
        <h2>Core routes</h2>
        <ul>
          <li><code>/memo-lane</code> keeps owners, questions, and next board decisions visible.</li>
          <li><code>/narrative-gaps</code> shows where the board story is still thin or under-supported.</li>
          <li><code>/investment-posture</code> compares savings, investment priority, and recommendation strength.</li>
          <li><code>/verification</code> makes the synthetic and read-only posture explicit.</li>
        </ul>
      </section>
    `,
    "Product documentation for Board Narrative Memo Builder and its executive memo routes."
  );
}

export function renderSample() {
  return JSON.stringify(toExport(sampleBoardNarrativeMemoBuilder, payload().generatedAt), null, 2);
}
