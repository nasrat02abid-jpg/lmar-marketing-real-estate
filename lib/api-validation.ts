export function cleanText(value: unknown, maxLength: number, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim().replace(/[\u0000-\u001F\u007F]/g, "").slice(0, maxLength);
}

export function validId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export function numberInRange(value: unknown, min: number, max: number, fallback: number) {
  const number = Number(value);
  return Number.isFinite(number) && number >= min && number <= max ? number : fallback;
}

export function allowedValue<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && allowed.includes(value as T) ? value as T : fallback;
}

export function safeUrl(value: unknown, fallback = "") {
  const text = cleanText(value, 1000, fallback);
  if (!text) return fallback;
  if (text.startsWith("/")) return text.startsWith("//") ? fallback : text;
  try {
    const url = new URL(text);
    return url.protocol === "https:" ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

export function validPhone(value: unknown) {
  const phone = cleanText(value, 30);
  return /^[+]?[0-9][0-9 ()-]{7,28}$/.test(phone) ? phone : null;
}

export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) return null;
  try {
    const body = await request.json();
    return body && typeof body === "object" && !Array.isArray(body) ? body as Record<string, unknown> : null;
  } catch {
    return null;
  }
}
