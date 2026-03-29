const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";
const API_KEY = process.env.API_KEY;
const API_VERSION = process.env.API_VERSION ?? "v1";

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const docId = formData.get("doc_id");
  if (typeof docId === "string" && !/^[a-zA-Z0-9_-]{1,64}$/.test(docId)) {
    return Response.json({ error: "Invalid doc_id format" }, { status: 400 });
  }

  const headers: Record<string, string> = {};
  if (API_KEY) headers["X-API-Key"] = API_KEY;

  try {
    const upstream = await fetch(
      `${API_BASE_URL}/api/${API_VERSION}/documents/upload`,
      {
        method: "POST",
        headers,
        body: formData,
        signal: AbortSignal.timeout(120_000),
      }
    );

    const data = await upstream.json();

    if (!upstream.ok) {
      return Response.json({ error: "Upload failed. Please try again." }, { status: upstream.status });
    }

    return Response.json(data, { status: upstream.status });
  } catch {
    return Response.json({ error: "Upload failed. Please try again." }, { status: 502 });
  }
}
