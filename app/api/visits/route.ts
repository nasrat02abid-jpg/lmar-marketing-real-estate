import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { siteVisits } from "../../../db/schema";
import { requireAdminApi } from "../../admin-auth";
import { allowedValue, cleanText, readJson, validPhone } from "../../../lib/api-validation";
export async function GET() { if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 }); return Response.json({ visits: await getDb().select().from(siteVisits).orderBy(desc(siteVisits.id)).limit(100) }); }
export async function POST(request: Request) { const body=await readJson(request); if(!body)return Response.json({error:"Invalid request"},{status:400}); const name=cleanText(body.name,100),phone=validPhone(body.phone),date=cleanText(body.preferredDate,10); if(!name||!phone||!/^\d{4}-\d{2}-\d{2}$/.test(date))return Response.json({error:"Enter valid contact details and date"},{status:400}); const [visit]=await getDb().insert(siteVisits).values({name,phone,city:allowedValue(body.city,["Peshawar","Islamabad"] as const,"Peshawar"),preferredDate:date,interest:cleanText(body.interest,1500)}).returning(); return Response.json({visit},{status:201}); }
