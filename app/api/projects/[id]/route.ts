import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { projects } from "../../../../db/schema";
import { requireAdminApi } from "../../../admin-auth";
import { allowedValue, cleanText, numberInRange, readJson, safeUrl, validId } from "../../../../lib/api-validation";
export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const numericId = validId(id);
  if (!numericId) return Response.json({ error: "Project not found" }, { status: 404 });
  const [project] = await getDb().select().from(projects).where(eq(projects.id, numericId)).limit(1);
  if (!project || project.status !== "active") return Response.json({ error: "Project not found" }, { status: 404 });
  return Response.json({ project });
}
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params; const numericId=validId(id),body=await readJson(request);
  if(!numericId||!body)return Response.json({error:"Invalid request"},{status:400});
  const title=cleanText(body.title,150),city=cleanText(body.city,80); if(!title||!city)return Response.json({error:"Title and city are required"},{status:400});
  const [project] = await getDb().update(projects).set({ title, city, category: cleanText(body.category,80,"Residential"), price: numberInRange(body.price,0,1_000_000_000,0), downPaymentPercent: numberInRange(body.downPaymentPercent,0,100,20), installmentMonths: numberInRange(body.installmentMonths,1,240,36), description: cleanText(body.description,3000), imageUrl: safeUrl(body.imageUrl,"/lmar-hero.jpg"), videoUrl: safeUrl(body.videoUrl), brochureUrl: safeUrl(body.brochureUrl,"/lmar-brochure.html"), locationUrl: safeUrl(body.locationUrl), constructionProgress: numberInRange(body.constructionProgress,0,100,0), status: allowedValue(body.status,["active","draft"] as const,"active") }).where(eq(projects.id, numericId)).returning();
  if(!project)return Response.json({error:"Project not found"},{status:404});
  return Response.json({ project });
}
export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); const { id } = await context.params,numericId=validId(id); if(!numericId)return Response.json({error:"Invalid project ID"},{status:400}); await getDb().delete(projects).where(eq(projects.id,numericId)); return Response.json({ success: true }); }
