import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { projects } from "../../../../db/schema";
import { requireAdminApi } from "../../../admin-auth";
export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1) return Response.json({ error: "Project not found" }, { status: 404 });
  const [project] = await getDb().select().from(projects).where(eq(projects.id, numericId)).limit(1);
  if (!project || project.status !== "active") return Response.json({ error: "Project not found" }, { status: 404 });
  return Response.json({ project });
}
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params; const body = await request.json() as Record<string, string | number>;
  const [project] = await getDb().update(projects).set({ title: String(body.title), city: String(body.city), category: String(body.category), price: Number(body.price), downPaymentPercent: Number(body.downPaymentPercent), installmentMonths: Number(body.installmentMonths), description: String(body.description || ""), imageUrl: String(body.imageUrl || "/lmar-hero.jpg"), videoUrl: String(body.videoUrl || ""), brochureUrl: String(body.brochureUrl || "/lmar-brochure.html"), locationUrl: String(body.locationUrl || ""), constructionProgress: Number(body.constructionProgress || 0), status: String(body.status || "active") }).where(eq(projects.id, Number(id))).returning();
  return Response.json({ project });
}
export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); const { id } = await context.params; await getDb().delete(projects).where(eq(projects.id, Number(id))); return Response.json({ success: true }); }
