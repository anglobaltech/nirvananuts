import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const getUser = async (userId) => {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

export const updateUser = async (userId, data) => {
  const ref = doc(db, "users", userId);
  await updateDoc(ref, data);
};