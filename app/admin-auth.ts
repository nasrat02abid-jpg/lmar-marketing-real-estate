import { getChatGPTUser } from "./chatgpt-auth";
export const ADMIN_EMAIL = "nasrat02abid@gmail.com";
const LOCAL_ADMIN_EMAIL = "seedy@sites.test";

export function isAdminEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  return normalizedEmail === ADMIN_EMAIL ||
    (process.env.NODE_ENV !== "production" && normalizedEmail === LOCAL_ADMIN_EMAIL);
}

export async function requireAdminApi() {
  const user = await getChatGPTUser();
  return user && isAdminEmail(user.email) ? user : null;
}
