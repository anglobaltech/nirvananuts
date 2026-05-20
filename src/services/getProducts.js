import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getProductsByCategory = async (category) => {
  const snapshot = await getDocs(collection(db, "products"));

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return data.filter(p => p.category === category);
};