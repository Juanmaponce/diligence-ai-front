const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";
const API_KEY = process.env.API_KEY;
const API_VERSION = process.env.API_VERSION ?? "v1";

export async function GET() {
  const headers: Record<string, string> = {};
  if (API_KEY) headers["X-API-Key"] = API_KEY;

  try {
    const upstream = await fetch(
      `${API_BASE_URL}/api/${API_VERSION}/health`,
      {
        method: "GET",
        headers,
        signal: AbortSignal.timeout(10_000),
      }
    );

    const data = await upstream.json();

    if (!upstream.ok) {
      return Response.json({ error: "Health check failed" }, { status: upstream.status });
    }

    return Response.json(data, { status: upstream.status });
  } catch {
    return Response.json({ status: "unhealthy" }, { status: 502 });
  }
}
