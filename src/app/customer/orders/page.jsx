"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserOrders } from "@/customerService/orderServiceCustomer";
import OrderCard from "../components/OrderCards"; // 🔥 Checked file name casing
import EmptyOrders from "../components/EmptyOrder"; // 🔥 Checked file name casing

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        const data = await getUserOrders(user.uid);
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching production orders:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-light text-sm animate-pulse">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen antialiased">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-light tracking-tight text-gray-900 mb-8">My Orders</h1>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <EmptyOrders />
        )}
      </div>
    </div>
  );
}