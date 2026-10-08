import type { MetadataRoute } from "next";
import { demoProjects } from "../lib/project-data";

const baseUrl = "https://lmar-marketing-real-estate.nasrat02abid.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = demoProjects.map(project => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...projectPages,
  ];
}
