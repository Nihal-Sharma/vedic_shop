// products.ts (or useProducts.ts)
import mainStore from "../../store/mainStore";
import axios from "axios";
import { useState, useEffect } from "react";

// Define the shape of your product data based on the API response
export interface Product {
  _id: string;
  productId: string;
  productName: string;
  productCategory: {
    id: string;
    name: string;
  };
  description: string;
  originalPrice: number;
  discountedPrice: number;
  subCategories: string[];
  stock: number;
  productColors: string[];
  availableSizes: string[];
  dimensions: {
    length: { value: number; unit: string };
    width: { value: number; unit: string };
    height: { value: number; unit: string };
    weight: { value: number; unit: string };
  };
  productImages: string[];
  addedOn: string;
  shop: {
    id: string;
    name: string;
  };
  isActive: boolean;
  isFeatured: boolean;
  isApproved: boolean;
  productRating: number;
  productReview: string;
  __v: number;
  productBasePrice: number;
}

// ✅ 1. Create a standalone API function
export async function fetchAllProducts(baseURL: string): Promise<Product[]> {
   
  // const response = await fetch("http://192.168.29.171:5001/fetch-all-products");
  const response = await fetch(`${baseURL}/fetch-all-products`);
  if (!response.ok) {
    throw new Error(`Network response was not OK (status ${response.status})`);
  }
  const data: Product[] = await response.json();
 
  return data;
}

// ✅ 2. Optional: still export hook if you want to use it in isolated cases (not recommended for shared layout use)
export function useFetchProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseURL = mainStore((state)=>state.baseURL)
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAllProducts(baseURL);
        setProducts(data);
      } catch (err: any) {
        setError(
          err.message || "Something went wrong while fetching products."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { products, loading, error };
}

export const fetchProductsByCategory = async (
  baseURL: string,
  categoryId: string
) => {
  const res = await fetch(`${baseURL}/products?categoryId=${categoryId}`);

  if (!res.ok) throw new Error("Could not load category products");

  // adjust if your backend wraps data differently
  const data = await res.json();
  return data;
};