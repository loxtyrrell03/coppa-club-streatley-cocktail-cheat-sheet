import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const port =
  typeof process === "undefined" ? 4173 : Number(process.env.PORT || 4173);
const pagesBase = "/coppa-club-streatley-cocktail-cheat-sheet";
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);
  let pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === pagesBase) {
    response.writeHead(302, { Location: `${pagesBase}/` });
    response.end();
    return;
  }

  if (pathname.startsWith(`${pagesBase}/`)) {
    pathname = pathname.slice(pagesBase.length);
  }

  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  let filePath = normalize(join(root, relativePath));

  if (
    !filePath.startsWith(normalize(root)) ||
    relativePath.startsWith("node_modules/") ||
    relativePath.startsWith(".git/") ||
    relativePath.startsWith("tmp/")
  ) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    const acceptsHtml = request.headers.accept?.includes("text/html");
    if (!acceptsHtml) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    filePath = join(root, "index.html");
  }

  response.writeHead(200, {
    "Cache-Control": "no-store",
    "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream"
  });
  createReadStream(filePath).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Coppa Drinks running at http://127.0.0.1:${port}${pagesBase}/`);
});
