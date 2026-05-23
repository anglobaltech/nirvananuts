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

    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,

        orderId: data.orderId || "",

        customerName: data.customerName || "",

        email: data.email || "",

        phone: data.phone || "",

        address: data.address || {},

        products: data.products || [],

        totalAmount: data.totalAmount || 0,

        totalItems: data.totalItems || 0,

        payment: data.payment || "COD",

        status: data.status || "Placed",

        createdAt: data.createdAt || null,
      };
    });
  } catch (error) {
    console.error("Order Fetch Error:", error);
    return [];
  }
};