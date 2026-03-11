import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const createOrder = async(order)=>{

await addDoc(
collection(db,"orders"),
order
);

};

export const getOrders = async()=>{

const snapshot = await getDocs(collection(db,"orders"));

return snapshot.docs.map(doc=>({
id:doc.id,
...doc.data()
}));

};