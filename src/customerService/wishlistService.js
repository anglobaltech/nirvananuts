import { db, auth } from "@/lib/firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Get wishlist items for a user
export const getWishlist = async (userId) => {
  try {
    const ref = doc(db, "wishlists", userId);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      return snap.data().items || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Wishlist fetch error:", error);
    return [];
  }
};

export const subscribeWishlist = (callback, errorCallback) => {
  let unsubscribeSnapshot = null;

  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (!user) {
      callback([]);
      return;
    }

    const ref = doc(db, "wishlists", user.uid);

    unsubscribeSnapshot = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          callback(snap.data().items || []);
        } else {
          callback([]);
        }
      },
      (error) => {
        console.error(error);
        if (errorCallback) errorCallback(error);
      }
    );
  });

  return () => {
    unsubscribeAuth();

    if (unsubscribeSnapshot) {
      unsubscribeSnapshot();
    }
  };
};

// Add to wishlist
export const addToWishlist = async (product) => {
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  try {
    const ref = doc(db, "wishlists", user.uid);
    const snap = await getDoc(ref);

    const wishlistItem = {
      id: product.id,
      title: product.title,
      description: product.description || "",
      image: product.image,

      // full variants
      variants: product.variants || [],

      // backend discounts
      tieredDiscounts:
        product.tieredDiscounts ||
        product.buyMoreSaveMore ||
        [],

      stock: product.stock ?? true,
      rating: product.rating ?? 4,
    };

    if (snap.exists()) {
      const items = snap.data().items || [];

      const already = items.find(
        (i) => i.id === product.id
      );

      if (already) return;

      await updateDoc(ref, {
        items: [...items, wishlistItem],
      });
    } else {
      await setDoc(ref, {
        items: [wishlistItem],
      });
    }
  } catch (error) {
    console.error("Wishlist Error:", error);
  }
};

// Remove
export const removeFromWishlist = async (id) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const ref = doc(db, "wishlists", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const items = snap.data().items || [];

    const updated = items.filter(
      (item) =>
        item.id !== id &&
        item.docId !== id
    );

    await updateDoc(ref, {
      items: updated,
    });
  } catch (error) {
    console.error("Wishlist remove error:", error);
  }
};