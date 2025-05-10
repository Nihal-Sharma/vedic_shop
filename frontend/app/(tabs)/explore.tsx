import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";

import { fetchAllProducts } from "../../components/api/FetchProduct";
import mainStore from "../../store/mainStore";
import { useRouter } from "expo-router";

interface CategoryItem {
  id: string;
  name: string;
}

// Helper to title-case category names
const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

const ExploreScreen = () => {
  const baseURL = mainStore((state) => state.baseURL);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const products = await fetchAllProducts(baseURL);

        const uniqueMap = new Map<string, CategoryItem>();

        products.forEach((p: any) => {
          if (p.productCategory) {
            const { id, name } = p.productCategory as CategoryItem;
            const displayName = titleCase(name.trim());
            if (!uniqueMap.has(id)) {
              uniqueMap.set(id, { id, name: displayName });
            }
          }
        });

        setCategories(
          Array.from(uniqueMap.values()).sort((a, b) =>
            a.name.localeCompare(b.name)
          )
        );
      } catch (err: any) {
        setError(err.message || "Could not load categories.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 24 }} />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <View style={styles.screen}>
      {/* Top bar */}
      <View style={styles.headerRow}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.headerTitle}>Categories</Text>
        <EvilIcons name="search" size={34} color="black" />
      </View>

      {/* Category chips */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chip}
            onPress={() =>
              router.push({
                pathname: "../Category/CategoryPage.tsx", // ⬅️  points to app/category.tsx
                params: { id: item.id, name: item.name },
              })
            }
          >
            <Text style={styles.chipText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 35,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  chip: {
    flex: 1,
    minWidth: 90,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  chipText: {
    fontSize: 14,
    color: "#111827",
  },
  error: {
    color: "red",
    padding: 16,
  },
});
