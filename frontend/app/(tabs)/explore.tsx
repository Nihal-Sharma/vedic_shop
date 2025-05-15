import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFetchCategories } from "../../components/api/FetchProduct";

const { width } = Dimensions.get("window");
// 3 items per row, with 15px padding each side, 16px total gutter between items
const ITEM_SIZE = (width - 30 - 32) / 3;

export default function ExploreScreen() {
  const router = useRouter();
  const { cats, loading, error } = useFetchCategories();

  if (loading) return <ActivityIndicator style={{ marginTop: 24 }} />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <View style={styles.screen}>
      {/* — Header — */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Category</Text>
        <TouchableOpacity
          onPress={() => {
            /* open search */
          }}
        >
          <EvilIcons name="search" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* — Sub‐header: “SHOP ALL” with underline — */}
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>SHOP ALL</Text>
        <View style={styles.subHeaderLine} />
      </View>

      {/* — Grid of category cards — */}
      <FlatList
        data={cats}
        keyExtractor={(item) => item._id}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "../Category/CategoryPage",
                params: { id: item._id, name: item.categoryName },
              })
            }
          >
            {item.productCategoryImage?.[0] ? (
              <Image
                source={{ uri: item.productCategoryImage[0] }}
                style={styles.image}
              />
            ) : (
              <View style={[styles.image, styles.imagePlaceholder]}>
                <Text style={styles.imagePlaceholderText}>No Image</Text>
              </View>
            )}
            <Text style={styles.label}>{item.categoryName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40, // adjust for status bar
    paddingHorizontal: 15,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  subHeaderText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280", // gray-500
    letterSpacing: 1,
  },
  subHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB", // gray-300
    marginLeft: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: ITEM_SIZE,
    alignItems: "center",
  },
  image: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 8,
    backgroundColor: "#F3F4F6", // light gray bg
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    color: "#9CA3AF", // gray-400
    fontSize: 12,
  },
  label: {
    marginTop: 8,
    fontSize: 13,
    textAlign: "center",
    color: "#111827", // gray-900
  },
  error: {
    color: "red",
    padding: 16,
  },
});
