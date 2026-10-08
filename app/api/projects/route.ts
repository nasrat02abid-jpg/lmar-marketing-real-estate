import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { projects } from "../../../db/schema";
import { requireAdminApi } from "../../admin-auth";
import { allowedValue, cleanText, numberInRange, readJson, safeUrl } from "../../../lib/api-validation";
export async function GET() { try { return Response.json({ projects: await getDb().select().from(projects).orderBy(desc(projects.id)) }); } catch { return Response.json({ projects: [], fallback: true }); } }
export async function POST(request: Request) {
  if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await readJson(request);
  if (!body) return Response.json({ error: "Invalid request" }, { status: 400 });
  const title=cleanText(body.title,150),city=cleanText(body.city,80);
  if (!title || !city) return Response.json({ error: "Title and city are required" }, { status: 400 });
  const [project] = await getDb().insert(projects).values({
    title, city, category: cleanText(body.category,80,"Residential"), price: numberInRange(body.price,0,1_000_000_000,0),
    downPaymentPercent: numberInRange(body.downPaymentPercent,0,100,20), installmentMonths: numberInRange(body.installmentMonths,1,240,36), description: cleanText(body.description,3000),
    imageUrl: safeUrl(body.imageUrl,"/lmar-hero.jpg"), videoUrl: safeUrl(body.videoUrl), brochureUrl: safeUrl(body.brochureUrl,"/lmar-brochure.html"),
    locationUrl: safeUrl(body.locationUrl), constructionProgress: numberInRange(body.constructionProgress,0,100,0), status: allowedValue(body.status,["active","draft"] as const,"active")
  }).returning();
  return Response.json({ project }, { status: 201 });
}
