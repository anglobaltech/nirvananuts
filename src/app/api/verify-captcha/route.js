import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { captchaToken } = await req.json();
    if (!captchaToken) {
    return NextResponse.json(
    { success: false, error: "Missing captcha token" },
    { status: 400 }
    );
    }


    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const googleResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${captchaToken}`,
      }
    );

    const data = await googleResponse.json();

    return NextResponse.json({ success: data.success });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}
