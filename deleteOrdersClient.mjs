import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCCPbVzNyiJveMel_ii60q58QoEXk7ol4U',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'nirvananuts.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'nirvananuts',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'nirvananuts.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '461292141084',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:461292141084:web:5f5d803207b5df0d857dd9',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function deleteAllOrders() {
  try {
    const ordersCol = collection(db, "orders");
    const snapshot = await getDocs(ordersCol);
    if (snapshot.empty) {
      console.log("No orders found.");
      process.exit(0);
    }

    console.log(`Found ${snapshot.size} orders. Deleting...`);
    
    let count = 0;
    for (const document of snapshot.docs) {
      await deleteDoc(doc(db, "orders", document.id));
      count++;
    }

    console.log(`Successfully deleted ${count} orders.`);
    process.exit(0);
  } catch (error) {
    console.error("Error deleting orders:", error);
    process.exit(1);
  }
}

deleteAllOrders();
