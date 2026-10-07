import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { leads } from "../../../../db/schema";
import { requireAdminApi } from "../../../admin-auth";
const allowedStatuses = new Set(["new", "contacted", "qualified", "closed"]);
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); const { id } = await context.params; const body = await request.json() as { status?: string; adminNotes?: string }; const changes: {status?:string;adminNotes?:string} = {}; if(body.status){if(!allowedStatuses.has(body.status))return Response.json({error:"Invalid lead status"},{status:400});changes.status=body.status} if(body.adminNotes!==undefined)changes.adminNotes=body.adminNotes.trim().slice(0,2000); const [lead] = await getDb().update(leads).set(changes).where(eq(leads.id, Number(id))).returning(); if(!lead)return Response.json({error:"Lead not found"},{status:404}); return Response.json({ lead }); }
export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); const { id } = await context.params; await getDb().delete(leads).where(eq(leads.id, Number(id))); return Response.json({ success: true }); }
