import jsPDF from "jspdf";

export const generateInvoice = (order) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Invoice", 20, 20);

  doc.setFontSize(12);
  doc.text(`Order ID: ${order.orderId || order.id}`, 20, 40);
  doc.text(`Payment: ${order.payment}`, 20, 50);
  doc.text(`Status: ${order.status}`, 20, 60);

  let y = 80;

  order.items?.forEach((item, i) => {
    doc.text(
      `${i + 1}. ${item.name} - ₹${item.price} x ${item.qty}`,
      20,
      y
    );
    y += 10;
  });

  doc.text(
    `Total: ₹${order.total || order.totalAmount}`,
    20,
    y + 10
  );

  doc.save(`Invoice-${order.orderId || order.id}.pdf`);
};