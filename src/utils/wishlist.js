// 🔍 Sort helper
export const sortProducts = (products, type) => {
  if (type === "low") return [...products].sort((a, b) => a.price - b.price);
  if (type === "high") return [...products].sort((a, b) => b.price - a.price);
  return products;
};

// 🔎 Search helper
export const searchProducts = (products, query) => {
  return products.filter((p) =>
    p.title?.toLowerCase().includes(query.toLowerCase())
  );
};