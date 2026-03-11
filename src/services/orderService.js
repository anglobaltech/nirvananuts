import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";


// GET ALL ORDERS
export const getOrders = async () => {

  const snapshot = await getDocs(collection(db, "orders"));

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

};


// UPDATE ORDER STATUS
export const updateOrder = async (id, data) => {

  const orderRef = doc(db, "orders", id);

  await updateDoc(orderRef, data);

};


// DELETE ORDER
export const deleteOrder = async (id) => {

  const orderRef = doc(db, "orders", id);

  await deleteDoc(orderRef);

};