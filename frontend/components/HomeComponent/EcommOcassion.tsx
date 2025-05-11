import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const OCCASIONS = [
  {
    title: "Happy Birthday",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/birthday.webp",
  },
  {
    title: "Anniversary",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/anniversery.webp",
  },
  {
    title: "Marriage",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/marriage.webp",
  },
  {
    title: "Grah Pravesh",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/grah.webp",
  },
];

const CARD_SIZE = 90; // width of card image

const EcommOccasion = () => {
  const handlePress = (title: string) => {
    console.log("Pressed:", title);
  };

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
      <Text style={styles.header}>SHOP BY OCCASION</Text>

      {/* single‑row grid */}
      <View style={styles.row}>
        {OCCASIONS.map((item) => (
          <TouchableOpacity
            key={item.title}
            activeOpacity={0.8}
            onPress={() => handlePress(item.title)}
            style={styles.card}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            {/* <Text style={styles.caption}>{item.title}</Text> */}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

/* ————— styles ————— */
const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between", // ⬅️ even spacing, no extra gap components
  },
  card: {
    alignItems: "center",
    width: CARD_SIZE,
  },
  image: {
    width: CARD_SIZE,
    height: 80,
    borderRadius: 16,
  },
  caption: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default EcommOccasion;
