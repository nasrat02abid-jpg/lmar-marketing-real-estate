import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { projects } from "../../../../db/schema";
import { requireAdminApi } from "../../../admin-auth";

const allowedStatuses = new Set(["active", "draft"]);

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const projectId = Number(id);
  if (!Number.isInteger(projectId) || projectId < 1) return Response.json({ error: "Invalid project ID" }, { status: 400 });
  const body = await request.json() as Record<string, string | number>;
  const title = String(body.title ?? "").trim();
  const city = String(body.city ?? "").trim();
  const status = String(body.status || "active");
  const progress = Number(body.constructionProgress || 0);
  if (!title || !city) return Response.json({ error: "Title and city are required" }, { status: 400 });
  if (!allowedStatuses.has(status)) return Response.json({ error: "Invalid project status" }, { status: 400 });
  if (!Number.isFinite(progress) || progress < 0 || progress > 100) return Response.json({ error: "Progress must be between 0 and 100" }, { status: 400 });
  const [project] = await getDb().update(projects).set({
    title, city, category: String(body.category || "Residential"), price: Math.max(0, Number(body.price || 0)),
    downPaymentPercent: Math.min(100, Math.max(0, Number(body.downPaymentPercent || 0))), installmentMonths: Math.max(0, Number(body.installmentMonths || 0)),
    description: String(body.description || ""), imageUrl: String(body.imageUrl || "/lmar-hero.jpg"), videoUrl: String(body.videoUrl || ""),
    brochureUrl: String(body.brochureUrl || "/lmar-brochure.html"), locationUrl: String(body.locationUrl || ""), constructionProgress: progress, status,
  }).where(eq(projects.id, projectId)).returning();
  if (!project) return Response.json({ error: "Project not found" }, { status: 404 });
  return Response.json({ project });
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const projectId = Number(id);
  if (!Number.isInteger(projectId) || projectId < 1) return Response.json({ error: "Invalid project ID" }, { status: 400 });
  const [project] = await getDb().delete(projects).where(eq(projects.id, projectId)).returning();
  if (!project) return Response.json({ error: "Project not found" }, { status: 404 });
  return Response.json({ success: true });
}
