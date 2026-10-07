import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { siteVisits } from "../../../../db/schema";
import { requireAdminApi } from "../../../admin-auth";
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); const { id } = await context.params; const body = await request.json() as { status?: string }; const [visit] = await getDb().update(siteVisits).set({ status: body.status || "confirmed" }).where(eq(siteVisits.id, Number(id))).returning(); return Response.json({ visit }); }
export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); const { id } = await context.params; await getDb().delete(siteVisits).where(eq(siteVisits.id, Number(id))); return Response.json({ success: true }); }
