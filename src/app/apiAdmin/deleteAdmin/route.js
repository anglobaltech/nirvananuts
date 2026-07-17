import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json(
        { error: "UID missing" },
        { status: 400 }
      );
    }

    try {
      await adminAuth.getUser(uid); // check exists
      await adminAuth.deleteUser(uid);
    } catch {
      // User not found in Auth, skip
    }

    await adminDb.collection("users").doc(uid).delete();

    return NextResponse.json({
      success: true,
      message: "Admin deleted from Auth + Firestore"
    });

  } catch (error) {
    console.error("DELETE ADMIN ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}