import { env } from "cloudflare:workers";

export async function GET(_: Request, context: { params: Promise<{ key: string[] }> }) {
  const { key } = await context.params;
  const objectKey = key.join("/");

  if (!objectKey.startsWith("projects/") || !env.BUCKET) {
    return new Response("Not found", { status: 404 });
  }

  const object = await env.BUCKET.get(objectKey);
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  headers.set("x-content-type-options", "nosniff");

  return new Response(object.body, { headers });
}
