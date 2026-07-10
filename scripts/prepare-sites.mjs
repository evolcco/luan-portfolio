import { access, cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "out");
const dist = path.join(root, "dist");
const worker = path.join(root, "worker", "index.js");
const hosting = path.join(root, ".openai", "hosting.json");

await Promise.all([access(output), access(worker), access(hosting)]);
await rm(dist, { recursive: true, force: true });
await Promise.all([
  mkdir(path.join(dist, "server"), { recursive: true }),
  mkdir(path.join(dist, ".openai"), { recursive: true }),
]);

await Promise.all([
  cp(output, path.join(dist, "client"), { recursive: true }),
  cp(worker, path.join(dist, "server", "index.js")),
  cp(hosting, path.join(dist, ".openai", "hosting.json")),
]);
