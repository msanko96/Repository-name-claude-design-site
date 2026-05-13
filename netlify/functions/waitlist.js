const PROCESIO_WEBHOOK =
  "https://webapi.procesio.app/api/webhooks/launch/92f2de5f-6868-421e-aff5-6b84a9a28dc1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "method not allowed" }),
    };
  }

  let email;
  try {
    const payload = JSON.parse(event.body || "{}");
    email = payload.email;
  } catch (err) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: "invalid json" }),
    };
  }

  if (typeof email !== "string" || !email.includes("@")) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: "email required" }),
    };
  }

  try {
    const upstream = await fetch(PROCESIO_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!upstream.ok) {
      return {
        statusCode: 502,
        headers: corsHeaders,
        body: JSON.stringify({ error: "upstream failed", status: upstream.status }),
      };
    }

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: corsHeaders,
      body: JSON.stringify({ error: "upstream unreachable" }),
    };
  }
};
