import { Product } from "./mock-data";

/**
 * Deterministically assigns a stock status to a product based on its index in the total list.
 * Proportions: 70% In Stock, 20% Low Stock, 10% Contact for Lead Time.
 */
export const getAssignedStockStatus = (index: number, totalProducts: number): Product["stockStatus"] => {
  const inStockCount = Math.floor(totalProducts * 0.7);
  const lowStockCount = Math.floor(totalProducts * 0.2);
  
  // Deterministic shuffle logic to make it look randomized but stable
  const pseudoRandom = (index * 13) % totalProducts;
  
  if (pseudoRandom < inStockCount) return "IN_STOCK";
  if (pseudoRandom < inStockCount + lowStockCount) return "LOW_STOCK";
  return "CONTACT";
};

export const getStatusLabel = (status: Product["stockStatus"]): string => {
  switch (status) {
    case "IN_STOCK": return "In Stock";
    case "LOW_STOCK": return "Low Stock";
    case "CONTACT": return "Contact for Lead Time";
    default: return "";
  }
};
