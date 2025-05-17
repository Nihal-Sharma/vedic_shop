import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";

/* --------- data: title • image • individual height (px) --------- */

const numColumns = 2;
const GAP = 12; // horizontal & vertical gap
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = (SCREEN_WIDTH - GAP * (numColumns + 1)) / numColumns; // keep 2‑up grid

/* ───────────────────────── component ─────────────────────────── */
const EcommGrid = () => {
  const CARD_DATA = [
  {
    title: "Puja Offering",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/pujsOffering-min.webp", // ⬅️ replace
    height: 220,
  },
  {
    title: "Home Decor",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/home-min.webp", // ⬅️ replace
    height: 270,
  },
  {
    title: "God Idol",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/god-min.webp", // ⬅️ replace
    height: 240,
  },
  {
    title: "Bracelet",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/stone-min.webp", // ⬅️ replace
    height: 190,
  },
];

  const handlePress = (title: string) => {
    // navigation or filter goes here
    console.log("Pressed:", title);
  };

  const renderItem = ({ item }: { item: (typeof CARD_DATA)[0] }) => {
    const isGodIdol = item.title === "God Idol";

    return (
      <TouchableOpacity
        key={item.title}
        // activeOpacity={0.85}
        onPress={() => handlePress(item.title)}
        style={[
          styles.cardBase,
          {
            height: item.height ?? CARD_WIDTH * 1.2,
            marginTop: isGodIdol ? -50 : 0, // ✅ apply marginTop only to God Idol
          },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.overlay} />
        <Text style={styles.label}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={{ paddingHorizontal: GAP, marginTop: 25, }}>
      <Text style={styles.header}>VEDIC VAIBHAV WORLD</Text>

      <FlatList
        data={CARD_DATA}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        numColumns={numColumns}
        scrollEnabled={false} // static grid – set to true if you want scrolling
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ItemSeparatorComponent={() => <View style={{ height: GAP }} />}
      />
    </View>
  );
};

/* ───────────────────────── styles ────────────────────────────── */
const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    // fontWeight: "bold",
     
    marginBottom: 10,
  },
  cardBase: {
    width: CARD_WIDTH,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#eee", // placeholder while image loads
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)", // darker for readable text
  },
  label: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    color: "#fff",
    fontSize: 16,
    // fontWeight: "600",
     
  },
});

export default EcommGrid;
