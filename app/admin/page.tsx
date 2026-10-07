import { redirect } from "next/navigation";
import { requireChatGPTUser } from "../chatgpt-auth";
import { isAdminUser } from "../admin-auth";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");

  if (!isAdminUser(user)) {
    redirect("/");
  }

  return (
    <AdminDashboard
      displayName={user.fullName ?? user.displayName ?? "Nasrat Abid"}
    />
  );
}