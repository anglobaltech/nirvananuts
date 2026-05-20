"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const useDashboard = () => {
  const [data, setData] = useState({
    totalSales: 0,
    orders: 0,
    customers: 0,
    products: 0,
    salesData: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // PRODUCTS - Real-time count of inventory items
    const unsubProducts = onSnapshot(collection(db, "products"), (snap) => {
      setData(prev => ({
        ...prev,
        products: snap.size
      }));
    });

    // CUSTOMERS - Real-time count of users with role 'customer'
    // Logic: Queries 'users' collection where role is 'customer'
    const customerQuery = query(collection(db, "users"), where("role", "==", "customer"));
    
    const unsubCustomers = onSnapshot(customerQuery, (snap) => {
      setData(prev => ({
        ...prev,
        customers: snap.size
      }));
    });

    // ORDERS & REVENUE ANALYTICS
    const unsubOrders = onSnapshot(collection(db, "orders"), (snap) => {
      let totalSales = 0;
      let monthlySales = {};

      snap.forEach((doc) => {
        const order = doc.data();
        const amount = Number(order.totalAmount || order.amount || 0);
        totalSales += amount;

        const date = order?.createdAt?.toDate
          ? order.createdAt.toDate()
          : order?.createdAt
          ? new Date(order.createdAt)
          : new Date();

        const month = date.toLocaleString("default", { month: "short" });
        monthlySales[month] = (monthlySales[month] || 0) + amount;
      });

      const monthOrder = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ];

      const salesData = monthOrder.map((m) => ({
        name: m,
        sales: monthlySales[m] || 0
      }));

      setData(prev => ({
        ...prev,
        totalSales,
        orders: snap.size,
        salesData
      }));

      setLoading(false);
    });

    return () => {
      unsubProducts();
      unsubCustomers();
      unsubOrders();
    };
  }, []);

  return { ...data, loading };
};