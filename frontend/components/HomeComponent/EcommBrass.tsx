import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import mainStore from "../../store/mainStore";
import { fetchAllProducts } from "../api/FetchProduct";
import EcomProduct, { EcomProductProps } from "./EcommProduct";

/* ───────── constants ───────── */
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CURVE_HEIGHT = 25;
const GAP = 12;
const CARD_WIDTH = (SCREEN_WIDTH - GAP * 3) / 2 - 1;

/* helper */
const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const EcommBrass = () => {
  /* fetch */
  const baseURL = mainStore((s) => s.baseURL);
  const [products, setProducts] = useState<EcomProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAllProducts(baseURL);
        setProducts(data);
      } catch (err: any) {
        setError(err.message ?? "Could not load products.");
      } finally {
        setLoading(false);
      }
    })();
  }, [baseURL]);

  /* data prep */
  const brass = products
    .filter((p) => p.productCategory?.name?.toLowerCase() === "divine brass")
    .slice(0, 12);
  const pages = chunkArray(brass, 2);

  /* carousel control */
  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    if (pages.length < 2) return;
    let page = 0;
    const t = setInterval(() => {
      page = (page + 1) % pages.length;
      listRef.current?.scrollToOffset({
        offset: page * SCREEN_WIDTH,
        animated: true,
      });
    }, 3000);
    return () => clearInterval(t);
  }, [pages.length]);

  /* render guards */
  if (loading)
    return <ActivityIndicator style={{ marginTop: 24 }} size="large" />;
  if (error) return <Text style={{ color: "red", padding: 16 }}>{error}</Text>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.section}>
        {/* curved mask */}
        <Svg
          width={SCREEN_WIDTH}
          height={CURVE_HEIGHT}
          style={styles.curveSvg}
          pointerEvents="none"
        >
          <Path
            d={`M0,${CURVE_HEIGHT} C${SCREEN_WIDTH * 0.3},0 ${
              SCREEN_WIDTH * 0.7
            },0 ${SCREEN_WIDTH},${CURVE_HEIGHT} L${SCREEN_WIDTH},0 L0,0 Z`}
            fill="#fff" /* page bg colour */
          />
        </Svg>

        {/* content */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>BRASS IDOL</Text>
          <TouchableOpacity style={styles.exploreBtn}>
            <Text>Explore All</Text>
          </TouchableOpacity>
        </View>

        <Animated.FlatList
          ref={listRef}
          data={pages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => `${i}`}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          renderItem={({ item: pair }) => (
            <View style={styles.page}>
              {pair.map((p: EcomProductProps) => (
                <View key={p._id} style={styles.cardWrapper}>
                  <EcomProduct {...p} />
                </View>
              ))}
              {pair.length === 1 && <View style={styles.cardWrapper} />}
            </View>
          )}
        />

        <View style={styles.dotRow}>
          {pages.map((_, i) => {
            const opacity = scrollX.interpolate({
              inputRange: [
                (i - 1) * SCREEN_WIDTH,
                i * SCREEN_WIDTH,
                (i + 1) * SCREEN_WIDTH,
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return <Animated.View key={i} style={[styles.dot, { opacity }]} />;
          })}
        </View>
        <View style={{position:'absolute',bottom:-13,left:20}}>
          <Image
            source={{
              uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/box.png",
            }}
            style={{height:40,width:40}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EcommBrass;

/* ───────── styles ───────── */
const styles = StyleSheet.create({
  section: {
    backgroundColor: "#AD865E",
    paddingTop: CURVE_HEIGHT - 30, // push content below the curve
    paddingBottom: 16,
    position:'relative'
  },
  curveSvg: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 8,
    marginTop: 35,
  },
  headerTitle: { fontSize: 19, color: "white", fontWeight: "bold" },
  exploreBtn: {
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  page: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: GAP,
    paddingVertical: 12,
  },
  cardWrapper: { width: CARD_WIDTH },
  dotRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
});
