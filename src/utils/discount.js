// utils/discount.js
export function calculateDiscount(offers, quantity, basePrice) {
  // सबसे बड़ा applicable discount चुनें
  const applicable = offers
    ?.filter((o) => quantity >= o.qty)
    .sort((a, b) => b.qty - a.qty)[0];

  if (!applicable) {
    return { finalPrice: basePrice * quantity, discount: 0 };
  }

  const discountPercent = applicable.discount;
  const totalPrice = basePrice * quantity;
  const discountAmount = (totalPrice * discountPercent) / 100;

  return {
    finalPrice: totalPrice - discountAmount,
    discount: discountPercent,
  };
}
