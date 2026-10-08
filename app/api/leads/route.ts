import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { leads } from "../../../db/schema";
import { requireAdminApi } from "../../admin-auth";
import { cleanText, readJson, validPhone } from "../../../lib/api-validation";
export async function GET() { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); return Response.json({ leads: await getDb().select().from(leads).orderBy(desc(leads.id)).limit(100) }); }
export async function POST(request: Request) { const body = await readJson(request); if (!body) return Response.json({ error: "Invalid request" }, { status: 400 }); const name=cleanText(body.name,100),phone=validPhone(body.phone); if (!name || !phone) return Response.json({ error: "Enter a valid name and phone number" }, { status: 400 }); const [lead] = await getDb().insert(leads).values({ name, phone, project: cleanText(body.project,150,"General inquiry"), message: cleanText(body.message,1500), source: cleanText(body.source,50,"website") }).returning(); return Response.json({ lead }, { status: 201 }); }
