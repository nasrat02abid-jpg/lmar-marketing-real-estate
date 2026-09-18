import { getChatGPTUser } from "./chatgpt-auth";
export const ADMIN_EMAIL = "nasrat02abid@gmail.com";
export async function requireAdminApi() {
  const user = await getChatGPTUser();
  return user && user.email.toLowerCase() === ADMIN_EMAIL ? user : null;
}
