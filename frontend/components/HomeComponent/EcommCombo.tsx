// components/EcommCombo.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import mainStore from "../../store/mainStore";
import { fetchAllProducts } from "../api/FetchProduct";
import { EcomProductProps } from "./EcommProduct";
import EcommComboCard from "./EcommComboCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/** Helper: split array into chunks of given size */
const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const EcommCombo = () => {
  const baseURL = mainStore((state) => state.baseURL);
  const [products, setProducts] = useState<EcomProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* Fetch on mount */
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
  }, [baseURL]);

  /* Filter & chunk into slides of two */
  const comboProducts = products
    .filter(
      (p) => p.productCategory?.name?.toLowerCase() === "special combo offers"
    )
    .slice(0, 12);
  const slides = chunkArray<EcomProductProps>(comboProducts, 2);

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;
  if (error)
    return <Text style={{ color: "red", padding: 16 }}>Error: {error}</Text>;

  return (
    <SafeAreaView>
      {/* Header */}
      <View style={styles.headerContainer1}>
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row", alignItems: "center",gap: 10 }}>
            <Text style={styles.headerTitle}>COMBO OFFERS</Text>
            <Image
              source={{
                uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/arrow2.png",
              }}
              style={{ width: 32, height: 12 }}
            />
          </View>
          <TouchableOpacity style={styles.exploreBtn}>
            <Text>Explore All</Text>
          </TouchableOpacity>
        </View>

        {/* Carousel: one slide = two cards */}
        <FlatList
          data={slides}
          horizontal
          pagingEnabled
          snapToAlignment="start"
          decelerationRate="fast"
          keyExtractor={(_, idx) => `slide-${idx}`}
          renderItem={({ item: pair }) => (
            <View style={styles.slide}>
              {pair.map((product) => (
                <View key={product._id} style={styles.cardWrapper}>
                  <EcommComboCard {...product} />
                </View>
              ))}
              {/* If odd number, fill the space */}
              {pair.length === 1 && <View style={styles.cardWrapper} />}
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ padding: 16 }}>No Special Combo Offers found.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(EcommCombo);

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: "#2E5C51",
    // marginTop: -20,
    // marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  headerContainer1: {
    backgroundColor: "#2E5C51",
    marginTop: -20,
    marginBottom: 15,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // padding: 15,
  },
  headerTitle: { fontSize: 19, color: "white",  },
  exploreBtn: {
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  slide: {
    width: SCREEN_WIDTH,         
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 12,},
  cardWrapper: {
    // flex: 1,
    // marginHorizontal: 6,
  },
});
