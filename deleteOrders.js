require("dotenv").config({ path: ".env" });
const admin = require("firebase-admin");

// Determine which env variables to use (sometimes they are prefixed with NEXT_PUBLIC_)
const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL;
const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY || process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY;

if (projectId && clientEmail && privateKeyRaw) {
  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
} else {
  console.log("No credentials found");
  console.log(process.env);
  process.exit(1);
}

const db = admin.firestore();

async function deleteAllOrders() {
  try {
    const snapshot = await db.collection("orders").get();
    if (snapshot.empty) {
      console.log("No orders found.");
      return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`Successfully deleted ${snapshot.size} orders.`);
  } catch (error) {
    console.error("Error deleting orders:", error);
  }
}

deleteAllOrders();
