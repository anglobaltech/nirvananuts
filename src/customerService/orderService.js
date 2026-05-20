
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { generateOrderId } from "../services/generateOrderId"; // 👈 adjust path

export const createOrder = async (order) => {
  const user = auth.currentUser;

  if (!user) return;

  const customOrderId = await generateOrderId(); // ✅ generate ID

  await addDoc(collection(db, "orders"), {
    ...order,

    orderId: customOrderId,      // ✅ SAVE THIS
    userId: user.uid,
    createdAt: serverTimestamp(),

    status: "Placed",
    payment: "COD",
  });
};

export const getOrders = async()=>{

const snapshot = await getDocs(collection(db,"orders"));

return snapshot.docs.map((doc) => ({
  id: doc.data().orderId || doc.id, // 🔥 MAIN FIX
  ...doc.data(),
}));

};