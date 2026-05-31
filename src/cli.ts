import { readFileSync } from "node:fs";
import { analyze } from "./analyze.js";
import { toSummary } from "./format.js";
import type { NarrativeMemoItem } from "./types.js";

const defaultPath = "fixtures/board-narrative-memo-builder.json";

function usage() {
  console.error("Usage: board-narrative-memo-builder <file> --format <summary|json>");
}

const args = process.argv.slice(2);
const path = args[0] ?? defaultPath;
const format = args.includes("--format") ? args[args.indexOf("--format") + 1] : "summary";

if (!["summary", "json"].includes(format)) {
  usage();
  process.exit(1);
}

try {
  const items = JSON.parse(readFileSync(path, "utf8")) as { items: NarrativeMemoItem[] };
  const report = analyze(items.items);
  if (format === "json") {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(toSummary(report));
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}
