import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const args = process.argv.slice(2);
const value = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const port = Number(value("--port", "4173"));
const host = value("--host", "0.0.0.0");
const types = { ".html": "text/html; charset=utf-8", ".pdf": "application/pdf", ".ico": "image/x-icon" };

createServer(async (req, res) => {
  try {
    const requested = req.url === "/" ? "index.html" : req.url.split("?")[0].replace(/^\//, "");
    const path = requested === "resume.pdf" ? join(process.cwd(), "public", requested) : join(process.cwd(), requested);
    const data = await readFile(path);
    res.writeHead(200, { "content-type": types[extname(path)] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(port, host, () => console.log(`Preview ready on ${host}:${port}`));
