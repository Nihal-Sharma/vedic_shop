import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import mainStore from "../../store/mainStore";
import { fetchProductsByCategory } from "../../components/api/FetchProduct";
import EcomProduct, { EcomProductProps } from "../../components/HomeComponent/EcommProduct";

const CategoryPage = () => {
  // id & name arrive from ExploreScreen
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();

  const baseURL = mainStore((s) => s.baseURL);
  const [products, setProducts] = useState<EcomProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await fetchProductsByCategory(baseURL, id as string);
      setProducts(data);
    } catch (err: any) {
      setError(err.message ?? "Could not load products");
    } finally {
      setLoading(false);
    }
  }, [baseURL, id]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <ActivityIndicator style={{ marginTop: 24 }} />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{name}</Text>

      {products.length === 0 ? (
        <Text style={styles.empty}>No products in this category.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <EcomProduct {...item} />}
          numColumns={2}
          columnWrapperStyle={{ gap: 16 }}
          contentContainerStyle={{ gap: 16, paddingBottom: 32 }}
        />
      )}
    </View>
  );
};

export default CategoryPage;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 35,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  empty: {
    fontSize: 16,
    color: "#6b7280",
  },
  error: {
    color: "red",
    padding: 16,
  },
});
