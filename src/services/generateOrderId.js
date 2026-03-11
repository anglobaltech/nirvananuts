import { db } from "@/lib/firebase";
import { doc, runTransaction } from "firebase/firestore";

export const generateOrderId = async () => {

  const counterRef = doc(db, "counters", "orders");

  const newId = await runTransaction(db, async (transaction) => {

    const counterDoc = await transaction.get(counterRef);

    let lastId = 0;

    if (counterDoc.exists()) {

      lastId = counterDoc.data().lastId || 0;

      transaction.update(counterRef, { lastId: lastId + 1 });

    } else {

      // create document if not exists
      transaction.set(counterRef, { lastId: 1 });

      return "NNOID00001";
    }

    const nextId = lastId + 1;

    return "NNOID" + String(nextId).padStart(5, "0");

  });

  return newId;
};