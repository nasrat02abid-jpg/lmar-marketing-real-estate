import { getChatGPTUser, type ChatGPTUser } from "./chatgpt-auth";

export const ADMIN_EMAIL = "nasrat02abid@gmail.com";
export const LOCAL_ADMIN_EMAIL = "seedy@sites.test";

export function isAdminUser(user: ChatGPTUser | null) {
  if (!user) return false;

  const email = user.email.toLowerCase();

  return email === ADMIN_EMAIL || email === LOCAL_ADMIN_EMAIL;
}

export async function requireAdminApi() {
  const user = await getChatGPTUser();
  return isAdminUser(user) ? user : null;
}