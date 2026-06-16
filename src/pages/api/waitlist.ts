import type { APIRoute } from "astro";

// On-demand (server) endpoint — keep it out of the static prerender pass.
export const prerender = false;

const PROCESIO_WEBHOOK =
  "https://webapi.procesio.app/api/webhooks/launch/92f2de5f-6868-421e-aff5-6b84a9a28dc1";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

export const OPTIONS: APIRoute = () =>
  new Response(null, { status: 204, headers: corsHeaders });

// Only string fields are forwarded; everything else is dropped.
const ALLOWED = new Set([
  "type", "email", "name", "telegram", "tg_channel", "upwork",
  "company", "website", "team_size",
]);

export const POST: APIRoute = async ({ request }) => {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) ?? {};
  } catch {
    return json(400, { error: "invalid json" });
  }

  const email = payload.email;
  if (typeof email !== "string" || !email.includes("@")) {
    return json(400, { error: "email required" });
  }

  // Pass through known fields (type + the persona form fields).
  const data: Record<string, string> = {};
  for (const [k, v] of Object.entries(payload)) {
    if (ALLOWED.has(k) && typeof v === "string" && v.trim()) data[k] = v.trim();
  }

  try {
    const upstream = await fetch(PROCESIO_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!upstream.ok) {
      return json(502, { error: "upstream failed", status: upstream.status });
    }

    return json(200, { ok: true });
  } catch {
    return json(502, { error: "upstream unreachable" });
  }
};
