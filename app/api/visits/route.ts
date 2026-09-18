import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { siteVisits } from "../../../db/schema";
import { requireAdminApi } from "../../admin-auth";
export async function GET() { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); return Response.json({ visits: await getDb().select().from(siteVisits).orderBy(desc(siteVisits.id)).limit(100) }); }
export async function POST(request: Request) { const body = await request.json() as Record<string, string>; if (!body.name?.trim() || !body.phone?.trim() || !body.city || !body.preferredDate) return Response.json({ error: "Complete all required fields" }, { status: 400 }); const [visit] = await getDb().insert(siteVisits).values({ name: body.name.trim(), phone: body.phone.trim(), city: body.city, preferredDate: body.preferredDate, interest: body.interest || "" }).returning(); return Response.json({ visit }, { status: 201 }); }
