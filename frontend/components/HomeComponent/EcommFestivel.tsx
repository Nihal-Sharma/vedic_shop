// components/EcommFestival.tsx

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

const FESTIVALS = [
  {
    title: "Holi",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/holi.webp",
  },
  {
    title: "Diwali",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/divali.webp",
  },
  {
    title: "Navratri",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/navratri.webp",
  },
  {
    title: "Sankranti",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/grah2.webp",
  },
];

const EcommFestival: React.FC = () => {
  const { width } = useWindowDimensions();
  const isSmall = width < 392;

  // if small screen, shrink cards a bit
  const cardSize = isSmall ? 70 : 85;
  const fontSize = isSmall ? 12 : 14;

  const handlePress = (title: string) => {
    console.log("Pressed festival:", title);
  };

  return (
    <View style={[styles.container, { backgroundColor: "#F8F8F8" }]}>
      <Text style={styles.header}>SHOP BY FESTIVAL</Text>
      <View style={styles.row}>
        {FESTIVALS.map(({ title, image }) => (
          <TouchableOpacity
            key={title}
            style={[styles.card, { width: cardSize }]}
            activeOpacity={0.8}
            onPress={() => handlePress(title)}
          >
            <Image
              source={{ uri: image }}
              style={[styles.image, { width: cardSize, height: cardSize }]}
            />
            <Text style={[styles.caption, { fontSize }]} numberOfLines={1}>
              {title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default EcommFestival;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    alignItems: "center",
  },
  image: {
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  caption: {
    marginTop: 6,
    fontWeight: "600",
    textAlign: "center",
    color: "#444",
  },
});
