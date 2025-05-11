import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import EcommBestSellerCard, { EcomProductProps } from "./EcommBestSellerCard";
import mainStore from "../../store/mainStore";

/* util: turn “1 234 reviews” → 1234 */
const parseReviewCount = (v: unknown): number => {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const m = v.match(/\d+/g);
    return m ? Number(m.join("")) : 0;
  }
  return 0;
};

const EcommBestSeller: React.FC = () => {
  const baseURL = mainStore((s) => s.baseURL) ?? "http://localhost:5001";

  const [products, setProducts] = useState<EcomProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* fetch once */
  const loadProducts = useCallback(async () => {
    try {
      const { data } = await axios.get(`${baseURL}/fetch-all-products`);
      
      const mapped: EcomProductProps[] = data.map((p: any) => ({
        _id: p._id,
        productId: p.productId,
        productName: p.productName,
        productCategory: p.productCategory,
        description: p.description,
        originalPrice: p.originalPrice,
        discountedPrice: p.discountedPrice,
        subCategories: p.subCategories,
        stock: p.stock,
        productColors: p.productColors,
        availableSizes: p.availableSizes,
        dimensions: p.dimensions,
        productImages: p.productImages,
        addedOn: p.addedOn,
        shop: p.shop,
        isActive: p.isActive,
        isFeatured: p.isFeatured,
        isApproved: p.isApproved,
        productRating: p.productRating,

        /* keep raw string & numeric count */
        productReview: p.productReview ?? "",
        reviewCount: parseReviewCount(p.productReview),

        __v: p.__v,
        productBasePrice: p.productBasePrice,
      }));

      /* highest reviewCount first */
      mapped.sort((a, b) => b.reviewCount - a.reviewCount);
      setProducts(mapped.slice(0, 20));
    } catch (e) {
      console.error(e);
      setError("Failed to load best‑seller products.");
    } finally {
      setLoading(false);
    }
  }, [baseURL]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /* states */
  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  /* render */
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Best Sellers</Text>
      <FlatList
        data={products}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <EcommBestSellerCard {...item} />}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ padding: 16 }}>No products found.</Text>
        }
      />
    </View>
  );
};

export default EcommBestSeller;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
  },
  error: { color: "red", padding: 16 },
});
