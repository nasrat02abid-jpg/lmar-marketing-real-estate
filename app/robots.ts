import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    ],
    sitemap: "https://lmar-marketing-real-estate.nasrat02abid.chatgpt.site/sitemap.xml",
  };
}
