import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function POST(request) {
  try {
    const { email, newPassword } = await request.json();

    if (!email || !newPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!adminAuth) {
      return NextResponse.json({ 
        error: "Firebase Admin SDK is not configured. Missing FIREBASE_PRIVATE_KEY in .env." 
      }, { status: 500 });
    }

    // Find the user by email
    const userRecord = await adminAuth.getUserByEmail(email);
    
    // Update the password
    await adminAuth.updateUser(userRecord.uid, {
      password: newPassword,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json({ error: error.message || "Failed to reset password" }, { status: 500 });
  }
}
