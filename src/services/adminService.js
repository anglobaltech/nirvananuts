import { adminAuth } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { uid } = await req.json();

    await adminAuth.deleteUser(uid);

    return NextResponse.json({ message: "Admin deleted from auth" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}