import site from "../content/settings/site.json";

const trainingFiles = import.meta.glob("../content/trainings/*.json", { eager: true });
const trainings = Object.values(trainingFiles).map((entry: any) => entry.default);
const blogFiles = import.meta.glob("../content/blogs/*.json", { eager: true });
const blogs = Object.values(blogFiles).map((entry: any) => entry.default);

export async function GET() {
  const staticPaths = ["/", "/juridisch/privacy-statement/", ...site.navigation.map((item) => item.href)];
  const trainingPaths = trainings.filter((training) => training.visible).map((training) => training.href);
  const blogPaths = blogs.filter((blog) => blog.visible).map((blog) => `/nieuws/${blog.title.slug}/`);
  const paths = Array.from(new Set([...staticPaths, ...trainingPaths, ...blogPaths]));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((path) => {
    const url = new URL(path, site.url);
    return `  <url>
    <loc>${url.href}</loc>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
