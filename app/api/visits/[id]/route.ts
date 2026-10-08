import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { siteVisits } from "../../../../db/schema";
import { requireAdminApi } from "../../../admin-auth";
import { allowedValue, readJson, validId } from "../../../../lib/api-validation";
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); const { id }=await context.params,numericId=validId(id),body=await readJson(request); if(!numericId||!body)return Response.json({error:"Invalid request"},{status:400}); const [visit]=await getDb().update(siteVisits).set({status:allowedValue(body.status,["pending","confirmed","completed","cancelled"] as const,"confirmed")}).where(eq(siteVisits.id,numericId)).returning(); if(!visit)return Response.json({error:"Visit not found"},{status:404}); return Response.json({visit}); }
export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); const { id }=await context.params,numericId=validId(id); if(!numericId)return Response.json({error:"Invalid visit ID"},{status:400}); await getDb().delete(siteVisits).where(eq(siteVisits.id,numericId)); return Response.json({ success: true }); }
