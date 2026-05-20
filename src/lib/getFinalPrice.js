export function getFinalPrice(product, qty = 1) {
  const price = Number(product.price || 0);
  const quantity = Number(qty || 1);

  if (!price || price <= 0) {
    return {
      final: 0,
      mrp: 0,
      discount: 0,
      type: "invalid",
    };
  }

  // =========================
  // 1. RETAIL TIER PRICING
  // =========================
  let retailDiscount = 0;

  const pricingRules = product.pricingRules || [];

  for (let rule of pricingRules) {
    if (quantity >= rule.minQty) {
      if (rule.type === "percent") {
        retailDiscount = (price * quantity * rule.value) / 100;
      } else if (rule.type === "fixed") {
        retailDiscount = rule.value * quantity;
      }
    }
  }

  const retailTotal = price * quantity;
  const retailFinal = retailTotal - retailDiscount;

  // =========================
  // 2. BULK PRICING
  // =========================
  let bulkFinal = Infinity;

  const bulkPricing = product.bulkPricing || [];

  for (let slab of bulkPricing) {
    if (quantity >= slab.minQty) {
      const total = slab.pricePerUnit * quantity;
      bulkFinal = Math.min(bulkFinal, total);
    }
  }

  // if no bulk rule matched
  if (bulkFinal === Infinity) bulkFinal = retailFinal;

  // =========================
  // 3. BEST PRICE LOGIC
  // =========================
  const final = Math.min(retailFinal, bulkFinal);

  const mrp = price * quantity;
  const discount = mrp - final;

  let type = "retail";
  if (final === bulkFinal && bulkFinal < retailFinal) {
    type = "bulk";
  } else if (quantity >= 2) {
    type = "buy-more";
  }

  return {
    final: Number(final.toFixed(2)),
    mrp: Number(mrp.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    type,
  };
}