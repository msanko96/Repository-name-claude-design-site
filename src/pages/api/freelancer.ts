import type { APIRoute } from "astro";

// On-demand (server) endpoint — keep it out of the static prerender pass.
export const prerender = false;

// Freelancer form → its own Procesio webhook. Payload: name, email, telegram, upwork_profile.
const PROCESIO_WEBHOOK =
  "https://webapi.procesio.app/api/webhooks/launch/0021b505-0faf-4a42-ba5d-35525634e73d";

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

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export const OPTIONS: APIRoute = () =>
  new Response(null, { status: 204, headers: corsHeaders });

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

  // Map our form fields → the webhook's expected payload (no `type`).
  const body = {
    name: str(payload.name),
    email: str(payload.email),
    telegram: str(payload.telegram),
    upwork_profile: str(payload.upwork ?? payload.upwork_profile),
  };

  try {
    const upstream = await fetch(PROCESIO_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!upstream.ok) {
      return json(502, { error: "upstream failed", status: upstream.status });
    }
    return json(200, { ok: true });
  } catch {
    return json(502, { error: "upstream unreachable" });
  }
};
