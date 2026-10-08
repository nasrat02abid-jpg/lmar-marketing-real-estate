import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { leads } from "../../../../db/schema";
import { requireAdminApi } from "../../../admin-auth";
import { allowedValue, readJson, validId } from "../../../../lib/api-validation";
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); const { id }=await context.params,numericId=validId(id),body=await readJson(request); if(!numericId||!body)return Response.json({error:"Invalid request"},{status:400}); const [lead]=await getDb().update(leads).set({status:allowedValue(body.status,["new","contacted","qualified","closed"] as const,"contacted")}).where(eq(leads.id,numericId)).returning(); if(!lead)return Response.json({error:"Lead not found"},{status:404}); return Response.json({lead}); }
export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); const { id }=await context.params,numericId=validId(id); if(!numericId)return Response.json({error:"Invalid lead ID"},{status:400}); await getDb().delete(leads).where(eq(leads.id,numericId)); return Response.json({ success: true }); }
