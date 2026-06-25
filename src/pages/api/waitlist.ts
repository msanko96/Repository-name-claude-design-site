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

export const POST: APIRoute = async ({ request }) => {
  let email: unknown;
  try {
    const payload = await request.json();
    email = payload?.email;
  } catch {
    return json(400, { error: "invalid json" });
  }

  if (typeof email !== "string" || !email.includes("@")) {
    return json(400, { error: "email required" });
  }

  try {
    const upstream = await fetch(PROCESIO_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!upstream.ok) {
      return json(502, { error: "upstream failed", status: upstream.status });
    }

    return json(200, { ok: true });
  } catch {
    return json(502, { error: "upstream unreachable" });
  }
};
