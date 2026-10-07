import { env } from "cloudflare:workers";
import { requireAdminApi } from "../../admin-auth";

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "video/mp4",
  "video/webm",
]);

const MAX_FILE_SIZE = 25 * 1024 * 1024;

export async function POST(request: Request) {
  if (!await requireAdminApi()) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return Response.json({ error: "Select a file to upload." }, { status: 400 });
  }
  if (!allowedTypes.has(file.type)) {
    return Response.json({ error: "Only images, PDF brochures, MP4 and WebM videos are allowed." }, { status: 415 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return Response.json({ error: "File size must be 25 MB or less." }, { status: 413 });
  }
  if (!env.BUCKET) {
    return Response.json({ error: "Media storage is not configured." }, { status: 503 });
  }

  const extension = file.name.includes(".")
    ? file.name.split(".").pop()!.toLowerCase().replace(/[^a-z0-9]/g, "")
    : "bin";
  const key = `projects/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;

  await env.BUCKET.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
    customMetadata: { originalName: file.name.slice(0, 200) },
  });

  return Response.json({
    key,
    url: `/api/media/${key}`,
    name: file.name,
    type: file.type,
    size: file.size,
  }, { status: 201 });
}
