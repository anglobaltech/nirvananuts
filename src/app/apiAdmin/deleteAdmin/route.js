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

    // 🔥 STEP 1: Delete from Firebase Auth
    try {
      await adminAuth.getUser(uid); // check exists
      await adminAuth.deleteUser(uid);
      console.log("Deleted from Auth");
    } catch (error) {
      console.log("User not found in Auth, skipping...");
    }

    // 🔥 STEP 2: Delete from Firestore
    await adminDb.collection("users").doc(uid).delete();
    console.log("Deleted from Firestore");

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