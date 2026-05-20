import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

export const getUserOrders = async (userId) => {
  try {
    const q = query(
      collection(db, "orders"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

      console.log("Firestore Data:", snapshot.docs.map(doc => doc.data())); // 🔥

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      items: doc.data().items || [],
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};