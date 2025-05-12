import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import mainStore from "../../store/mainStore";
import { fetchAllProducts } from "../api/FetchProduct";
import EcomProduct, { EcomProductProps } from "./EcommProduct";

const EcommCombo = () => {
  const baseURL = mainStore((state) => state.baseURL);

  const [products, setProducts] = useState<EcomProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ───────── fetch once on mount ───────── */
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAllProducts(baseURL);
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Could not load products.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ─────── filter for “Special Combo Offers” ─────── */
  const comboProducts = products
    .filter(
      (p) => p.productCategory?.name?.toLowerCase() === "special combo offers"
    )
    .slice(0, 12);

  /* ──────────────── UI ───────────────── */
  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;
  if (error)
    return <Text style={{ color: "red", padding: 16 }}>Error: {error}</Text>;

  return (
    <SafeAreaView>
      {/* Header */}
      <View
        style={{
          backgroundColor: "#2E5C51",
          marginTop: -50,
          marginHorizontal: 10,
          borderRadius: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 15,
          }}
        >
          <Text style={{ fontSize: 19, color: "white" }}>COMBO OFFERS</Text>

          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderRadius: 24,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
            onPress={() => {
              /* navigation.navigate("ComboOffersScreen"); */
            }}
          >
            <Text>Explore All</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal product rail */}
        <FlatList
          data={comboProducts}
          horizontal
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <EcomProduct {...item} />}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ padding: 16 }}>No Special Combo Offers found.</Text>
          }
          contentContainerStyle={{ paddingHorizontal: 4, paddingVertical: 12 }}
          initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={2}
        />
      </View>
    </SafeAreaView>
  );
};

export default EcommCombo;
