import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Animated,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import mainStore from "../../store/mainStore";
import { fetchAllProducts } from "../api/FetchProduct";
import EcomProduct, { EcomProductProps } from "./EcommProduct";
import { useFonts } from "expo-font";

/* ───────── helpers ───────── */
const { width: SCREEN_WIDTH } = Dimensions.get("window");

/** Split an array into chunks of `size` */
const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const GAP = 12; // horizontal gap
const CARD_WIDTH = (SCREEN_WIDTH - GAP * 3) / 2 +5; // ←  -1px “buffer”
// ◀︎ accounts for L + middle + R gap

/* ───────── component ───────── */
const EcommSilver = () => {
  
  const baseURL = mainStore((state) => state.baseURL);

  const [products, setProducts] = useState<EcomProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const silverProds = mainStore((state)=>state.allProducts)
  /* fetch once on mount */
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


  /* filter for “Silver Idols” */
  const silverIdols = products
    .filter((p) => p.productCategory?.name?.toLowerCase() === "silver idols")
    .slice(0, 12);

  const pages = chunkArray(silverIdols, 2); // two cards per page

  /* animated value for pagination dots */
  const scrollX = useRef(new Animated.Value(0)).current;

  /* reference to FlatList for auto‑scroll */
  const listRef = useRef<FlatList>(null);

  /* ── auto‑scroll every 3 s ── */
  useEffect(() => {
    if (pages.length <= 1) return; // nothing to auto‑scroll
    let page = 0;
    const timer = setInterval(() => {
      page = (page + 1) % pages.length;
      listRef.current?.scrollToOffset({
        offset: page * SCREEN_WIDTH,
        animated: true,
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [pages.length]);

  /* UI states */
  // if (!fontsLoaded) return <ActivityIndicator style={{ marginTop: 20 }} />;
  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;
  if (error)
    return <Text style={{ color: "red", padding: 16 }}>Error: {error}</Text>;

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "#0A1F44" ,marginTop:-15}}>
        {/* ── header row ── */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>SILVER IDOL</Text>

          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={() => {
              /* navigation.navigate("SilverIdolsScreen"); */
            }}
          >
            <Text>Explore All</Text>
          </TouchableOpacity>
        </View>

        {/* ── carousel ── */}
        <Animated.FlatList
          ref={listRef}
          data={pages}
          horizontal
          pagingEnabled
          keyExtractor={(_, idx) => `page-${idx}`}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate="fast"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          renderItem={({ item: pair }: { item: EcomProductProps[] }) => (
            <View style={styles.page}>
              {pair.map((product: EcomProductProps) => (
                <View key={product._id} style={styles.cardWrapper}>
                  <EcomProduct {...product} />
                </View>
              ))}
              {pair.length === 1 && <View style={styles.cardWrapper} />}
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ padding: 16, color: "white" }}>
              No Silver Idols found.
            </Text>
          }
          initialNumToRender={2}
           maxToRenderPerBatch={2}
           windowSize={2}
        />

        {/* ── pagination dots ── */}
        <View style={styles.dotRow}>
          {pages.map((_, i) => {
            const inputRange = [
              (i - 1) * SCREEN_WIDTH,
              i * SCREEN_WIDTH,
              (i + 1) * SCREEN_WIDTH,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={`dot-${i}`}
                style={[styles.dot, { opacity }]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

/* ───────── styles ───────── */
const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    // marginTop:-100,
  },
  headerTitle: { fontSize: 19, color: "white", fontFamily: "PoppinsMedium" },
  exploreBtn: {
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 5,
     fontFamily: "PoppinsRegular",
    fontSize:12,
  },

  /* carousel page */
  page: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: GAP,
    paddingVertical: 12,
  },
  cardWrapper: {
    width: CARD_WIDTH,
  },

  /* dots */
  dotRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
});

export default React.memo(EcommSilver);
