import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { leads } from "../../../../db/schema";
import { requireAdminApi } from "../../../admin-auth";
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); const { id } = await context.params; const body = await request.json() as { status?: string }; const [lead] = await getDb().update(leads).set({ status: body.status || "contacted" }).where(eq(leads.id, Number(id))).returning(); return Response.json({ lead }); }
export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); const { id } = await context.params; await getDb().delete(leads).where(eq(leads.id, Number(id))); return Response.json({ success: true }); }
