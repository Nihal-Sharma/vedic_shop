import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useFetchProducts } from "../../components/api/FetchProduct";
import EcomProduct, {
  EcomProductProps,
} from "../../components/HomeComponent/EcommProduct";

const { height } = Dimensions.get("window");
const BOTTOM_BAR_HEIGHT = 56;

export default function CategoryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; name?: string }>();
  const categoryId = typeof params.id === "string" ? params.id : undefined;
  const categoryName =
    typeof params.name === "string" ? params.name : undefined;

  const { products, loading, error } = useFetchProducts();
  const [showFilters, setShowFilters] = useState(false);

  // FILTER MODAL STATE
  const filterCategories = [
    "God",
    "Purpose",
    "Place",
    "Occasion",
    "Material",
    "Price",
    "Festival",
    "Gender",
  ];
  const [activeFilter, setActiveFilter] = useState(filterCategories[0]);
  const filterOptions = useMemo(() => {
    switch (activeFilter) {
      case "God":
        return ["Krishna", "Shiva", "Ganesh"];
      case "Purpose":
        return ["Wealth", "Health", "Love", "Spiritual"];
      default:
        return [];
    }
  }, [activeFilter]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const toggleOption = (opt: string) =>
    setSelectedOptions((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );

  // FILTER LOGIC
  const looksLikeId = (s: string) => /^[0-9a-f]{24}$/i.test(s);
  const label = (categoryName || categoryId)?.toLowerCase() || "";
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (categoryId && looksLikeId(categoryId)) {
      const byId = products.filter((p) => p.productCategory?.id === categoryId);
      if (byId.length) return byId;
    }
    return products.filter(
      (p) =>
        p.productCategory?.name?.toLowerCase() === label ||
        p.subCategories?.some((sub) => sub.toLowerCase() === label)
    );
  }, [products, categoryId, label]);

  // HEADER FOR FlatList
  const ListHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>
        {categoryName || categoryId || "Category"}
      </Text>
      <View style={{ width: 24 }} />
      {/* placeholder */}
    </View>
  );

  return (
    <View style={styles.screen}>
      {loading || error || filteredProducts.length === 0 ? (
        loading ? (
          <ActivityIndicator style={{ marginTop: 24 }} />
        ) : error ? (
          <Text style={styles.error}>Error: {error}</Text>
        ) : (
          <Text style={styles.emptyText}>
            No products found for “{categoryName || categoryId}”.
          </Text>
        )
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={
            <View style={{ height: BOTTOM_BAR_HEIGHT + 16 }} />
          }
          renderItem={({ item }) => <EcomProduct {...item} />}
          contentContainerStyle={{ paddingTop: 16 }}
        />
      )}

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => setShowFilters(true)}
        >
          <AntDesign name="filter" size={20} color="#111" />
          <Text style={styles.bottomButtonText}>HIDE FILTERS</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.bottomButton}>
          <AntDesign name="swap" size={20} color="#111" />
          <Text style={styles.bottomButtonText}>SORT</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Filters ({selectedOptions.length})
              </Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <AntDesign name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            {/* Modal Body */}
            <View style={styles.modalBody}>
              <ScrollView style={styles.leftPane}>
                {filterCategories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setActiveFilter(cat)}
                    style={[
                      styles.filterTab,
                      activeFilter === cat && styles.filterTabActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterTabText,
                        activeFilter === cat && styles.filterTabTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <ScrollView style={styles.rightPane}>
                <TextInput
                  placeholder={`Search ${activeFilter}`}
                  style={styles.searchInput}
                />
                {filterOptions.map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    onPress={() => toggleOption(opt)}
                    style={styles.optionRow}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        selectedOptions.includes(opt) && styles.checkboxChecked,
                      ]}
                    />
                    <Text style={styles.optionText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            {/* Modal Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity onPress={() => setSelectedOptions([])}>
                <Text style={styles.clearAllText}>Clear all</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowFilters(false)}
                style={styles.applyButton}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  error: { color: "red", textAlign: "center", marginTop: 20 },
  emptyText: { textAlign: "center", marginTop: 20, color: "#555" },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: BOTTOM_BAR_HEIGHT,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  bottomButton: { flexDirection: "row", alignItems: "center" },
  bottomButtonText: { marginLeft: 8, fontSize: 14, fontWeight: "600" },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "#ddd",
    marginHorizontal: 24,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: height * 0.85,
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  modalTitle: { fontSize: 18, fontWeight: "600" },

  modalBody: { flex: 1, flexDirection: "row" },
  leftPane: { width: 100, borderRightWidth: 1, borderColor: "#eee" },
  filterTab: { padding: 12 },
  filterTabActive: { backgroundColor: "#ffeedd" },
  filterTabText: { fontSize: 14, color: "#555" },
  filterTabTextActive: { color: "#d35400", fontWeight: "600" },

  rightPane: { flex: 1, padding: 16 },
  searchInput: {
    height: 36,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  optionRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 4,
  },
  checkboxChecked: { backgroundColor: "#d35400", borderColor: "#d35400" },
  optionText: { marginLeft: 8, fontSize: 14 },

  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  clearAllText: { color: "#d35400", fontWeight: "600" },
  applyButton: {
    backgroundColor: "#d35400",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  applyButtonText: { color: "#fff", fontWeight: "600" },
});
