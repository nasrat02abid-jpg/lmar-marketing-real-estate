import { redirect } from "next/navigation";
import { requireChatGPTUser } from "../chatgpt-auth";
import { ADMIN_EMAIL } from "../admin-auth";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
  if (user.email.toLowerCase() !== ADMIN_EMAIL) redirect("/");
  return <AdminDashboard displayName={user.fullName ?? "Nasrat Abid"} />;
}
