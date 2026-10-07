import { redirect } from "next/navigation";
import { requireChatGPTUser } from "../chatgpt-auth";
import { isAdminEmail } from "../admin-auth";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
  if (!isAdminEmail(user.email)) redirect("/");
  return <AdminDashboard displayName={user.fullName ?? "Nasrat Abid"} />;
}
