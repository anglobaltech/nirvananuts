import { adminAuth } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    const { uid } = await req.json();

    await adminAuth.deleteUser(uid);

    return NextResponse.json({
      success: true,
      message: "Admin deleted from auth"
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });

  }
}