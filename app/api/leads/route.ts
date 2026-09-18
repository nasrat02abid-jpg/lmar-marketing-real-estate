import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { leads } from "../../../db/schema";
import { requireAdminApi } from "../../admin-auth";
export async function GET() { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); return Response.json({ leads: await getDb().select().from(leads).orderBy(desc(leads.id)).limit(100) }); }
export async function POST(request: Request) { const body = await request.json() as Record<string, string>; if (!body.name?.trim() || !body.phone?.trim()) return Response.json({ error: "Name and phone are required" }, { status: 400 }); const [lead] = await getDb().insert(leads).values({ name: body.name.trim(), phone: body.phone.trim(), project: body.project || "General inquiry", message: body.message || "", source: body.source || "website" }).returning(); return Response.json({ lead }, { status: 201 }); }
