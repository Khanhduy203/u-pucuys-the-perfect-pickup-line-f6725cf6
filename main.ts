import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I have a context window of a million tokens, and right now every single one of them is thinking about you.";

// Fail loudly on an invalid line instead of writing a bad entry.
if (LINE.trim().length === 0) {
  throw new Error("Pickup line is empty");
}
if (LINE.length > 200) {
  throw new Error(
    `Pickup line is ${LINE.length} characters, over the 200-char limit`,
  );
}

// Resolve the output dir: a blank or whitespace-only env var counts as unset.
// If the requested dir cannot be created, fall back to the next candidate.
function resolveOutDir(): string {
  const envDir = (process.env.MAKEFUN_OUTPUT_DIR ?? "").trim();
  const candidates =
    envDir === ""
      ? ["/output"]
      : [envDir, "/output", join(process.cwd(), "output")];
  for (const dir of candidates) {
    try {
      mkdirSync(dir, { recursive: true });
      return dir;
    } catch {
      // Try the next candidate.
    }
  }
  throw new Error("Could not create any output directory");
}

const outDir = resolveOutDir();
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
