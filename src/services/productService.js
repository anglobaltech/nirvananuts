// src/services/productService.js
import { db } from "@/lib/firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

// Create a new product
export const createProduct = async (product) => {
  await addDoc(collection(db, "products"), product);
};

// Delete product by id
export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
};

// Update product by id
export const updateProduct = async (id, data) => {
  await updateDoc(doc(db, "products", id), data);
};