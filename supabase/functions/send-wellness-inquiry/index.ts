const corsHeaders: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
};

type PersonalInfo = {
  gender?: string;
  fullName: string;
  email: string;
  country?: string;
  mobile?: string;
  comment?: string;
};

type WellnessInquiryPayload = {
  booking: unknown;
  personal: PersonalInfo;
  hotelName: string;
};

const RESEND_API_URL = "https://api.resend.com/emails";

function jsonResponse(
  body: unknown,
  init: ResponseInit & { status: number },
): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
      ...(init.headers ?? {}),
    },
  });
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse(
      { error: "Method not allowed. Only POST is supported." },
      { status: 405 },
    );
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    return jsonResponse(
      { error: "Missing RESEND_API_KEY environment variable." },
      { status: 500 },
    );
  }

  let payload: WellnessInquiryPayload;
  try {
    payload = (await req.json()) as WellnessInquiryPayload;
  } catch {
    return jsonResponse(
      { error: "Invalid JSON body in request." },
      { status: 400 },
    );
  }

  const { booking, personal, hotelName } = payload ?? {};

  if (!personal?.fullName || !personal?.email || !hotelName) {
    return jsonResponse(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const { fullName, email, country, mobile, comment } = personal;

  // 🔥 IMPORTANT: Sandbox-safe settings
  const fromAddress = "Raya Ayurveda <onboarding@resend.dev>";
  const toAddress = Deno.env.get("WELLNESS_INQUIRY_TO");

  if (!toAddress) {
    return jsonResponse(
      { error: "Missing WELLNESS_INQUIRY_TO secret." },
      { status: 500 },
    );
  }

  const subject = `New Wellness Inquiry - ${hotelName}`;

  const html = `
    <h2>New Wellness Inquiry</h2>
    <p><strong>Hotel:</strong> ${hotelName}</p>
    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Country:</strong> ${country ?? "N/A"}</p>
    <p><strong>Mobile:</strong> ${mobile ?? "N/A"}</p>
    <p><strong>Comment:</strong> ${comment ?? "N/A"}</p>
    <h3>Booking Details</h3>
    <pre>${JSON.stringify(booking, null, 2)}</pre>
  `;

  try {
    const resendResp = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toAddress],
        subject,
        html,
      }),
    });

    const responseText = await resendResp.text();

    if (!resendResp.ok) {
      console.error("Resend error:", responseText);

      return jsonResponse(
        {
          error: "Resend API rejected request",
          details: responseText,
        },
        { status: 500 },
      );
    }

    return jsonResponse(
      {
        success: true,
        message: "Inquiry email sent successfully.",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Unexpected error:", err);

    return jsonResponse(
      { error: "Unexpected server error while sending email." },
      { status: 500 },
    );
  }
});