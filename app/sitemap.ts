import type { MetadataRoute } from "next";
const baseUrl = "https://lmar-marketing-real-estate.nasrat02abid.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ];
}
