export interface ParsedResponse<T = any> {
  ok: boolean;
  status: number;
  data: T | null;
  rawText: string;
}

export async function parseResponse<T = any>(
  res: Response,
): Promise<ParsedResponse<T>> {
  const rawText = await res.text();
  let data: any = null;
  try {
    data = rawText ? JSON.parse(rawText) : null;
  } catch {
    data = null;
  }
  return { ok: res.ok, status: res.status, data, rawText };
}
