const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";
const API_KEY = process.env.API_KEY;
const API_VERSION = process.env.API_VERSION ?? "v1";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  if (typeof payload.query !== "string" || payload.query.trim().length === 0) {
    return Response.json({ error: "query is required" }, { status: 400 });
  }
  if (payload.query.length > 5000) {
    return Response.json({ error: "query exceeds maximum length" }, { status: 400 });
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (API_KEY) headers["X-API-Key"] = API_KEY;

  try {
    const upstream = await fetch(
      `${API_BASE_URL}/api/${API_VERSION}/analyze`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(120_000),
      }
    );

    const data = await upstream.json();

    if (!upstream.ok) {
      return Response.json({ error: "Analysis failed. Please try again." }, { status: upstream.status });
    }

    return Response.json(data, { status: upstream.status });
  } catch {
    return Response.json({ error: "Analysis failed. Please try again." }, { status: 502 });
  }
}
