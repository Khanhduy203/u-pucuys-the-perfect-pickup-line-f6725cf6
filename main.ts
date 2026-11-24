import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I have a context window of a million tokens, and right now every single one of them is thinking about you.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
