import { siteConfig } from "@/lib/config";
import { properties } from "@/data/properties";
import { journalArticles } from "@/data/journal";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = [
    "",
    "/collection",
    "/collection/salvador",
    "/about",
    "/journal",
    "/contact",
    "/emi-calculator",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
  }));

  const propertyRoutes = properties.map((property) => ({
    url: `${siteConfig.url}/collection/${property.slug}`,
    lastModified,
  }));

  const journalRoutes = journalArticles.map((article) => ({
    url: `${siteConfig.url}/journal/${article.slug}`,
    lastModified,
  }));

  return [...staticRoutes, ...propertyRoutes, ...journalRoutes];
}
