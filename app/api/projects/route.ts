import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { projects } from "../../../db/schema";
import { requireAdminApi } from "../../admin-auth";
export async function GET() { try { return Response.json({ projects: await getDb().select().from(projects).orderBy(desc(projects.id)) }); } catch { return Response.json({ projects: [], fallback: true }); } }
export async function POST(request: Request) {
  if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json() as Record<string, string | number>;
  if (!String(body.title ?? "").trim() || !String(body.city ?? "").trim()) return Response.json({ error: "Title and city are required" }, { status: 400 });
  const [project] = await getDb().insert(projects).values({
    title: String(body.title), city: String(body.city), category: String(body.category || "Residential"), price: Number(body.price || 0),
    downPaymentPercent: Number(body.downPaymentPercent || 20), installmentMonths: Number(body.installmentMonths || 36), description: String(body.description || ""),
    imageUrl: String(body.imageUrl || "/lmar-hero.jpg"), videoUrl: String(body.videoUrl || ""), brochureUrl: String(body.brochureUrl || "/lmar-brochure.html"),
    locationUrl: String(body.locationUrl || ""), constructionProgress: Number(body.constructionProgress || 0), status: String(body.status || "active")
  }).returning();
  return Response.json({ project }, { status: 201 });
}
