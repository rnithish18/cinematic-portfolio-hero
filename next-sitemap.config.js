/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Keep this in sync with SITE_URL in app/layout.tsx once you have your
  // real Vercel domain.
  siteUrl: process.env.SITE_URL || "https://cinematic-portfolio-hero.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "monthly",
  priority: 0.8,
};
