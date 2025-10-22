const fs = require("fs");
const path = require("path");

const DIST_DIR = path.resolve(__dirname, "..", "dist");
const BASE_URL = process.env.SITE_URL || "https://banjohootson.com";

// Keep in sync with app.routes.tsx (public routes only)
const ROUTES = [
  "/",
  "/about",
  "/contact",
  "/calendar",
  "/calendar/view",
  "/login",
  "/signup",
];

function xmlEscape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function generate() {
  const urls = ROUTES.map((r) => `${BASE_URL}${r}`);
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${xmlEscape(u)}</loc></url>`).join("\n") +
    `\n</urlset>\n`;

  await fs.promises.mkdir(DIST_DIR, { recursive: true });
  await fs.promises.writeFile(path.join(DIST_DIR, "sitemap.xml"), xml, "utf-8");
  console.log("Sitemap generated:", path.join(DIST_DIR, "sitemap.xml"));
}

generate().catch((err) => {
  console.error("Failed to generate sitemap", err);
  process.exit(1);
});
