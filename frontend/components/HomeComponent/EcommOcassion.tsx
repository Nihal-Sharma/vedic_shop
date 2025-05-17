import { useFonts } from "expo-font";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";



const EcommOccasion = () => {
  const OCCASIONS = [
  {
    
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/birthday.webp",
  },
  {
    
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/anniversery.webp",
  },
  {
    
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/marriage.webp",
  },
  {
    
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/grah.webp",
  },
];
  
  const { width } = useWindowDimensions();
  const isSmall = width < 392;

  // dynamic sizes
  const cardSize = isSmall ? 70 : 85;

  const imageHeight = isSmall ? 65 : 75;
  // const fontSize = isSmall ? 12 : 12;

  const handlePress = (title: string) => {
    console.log("Pressed:", title);
  };
  // if (!fontsLoaded) return <ActivityIndicator style={{ marginTop: 20 }} />;
  return (
    <View
      style={{
        paddingHorizontal: 16,
        marginTop: 20,
        backgroundColor: "#F8F8F8",
        paddingBottom: 26,
      }}
    >
      <Text style={styles.header}>SHOP BY OCCASION</Text>

      <View style={styles.row}>
        {OCCASIONS.map((item) => (
          <TouchableOpacity
            key={item.image}
            activeOpacity={0.8}
            onPress={() => handlePress(item.image)}
            style={[styles.card, { width: cardSize }]}
          >
            <Image
              source={{ uri: item.image }}
              style={[styles.image, { width: cardSize, height: imageHeight }]}
            />
            {/* <Text style={[styles.caption, { fontSize }]} numberOfLines={1}>
              {item.title}
            </Text> */}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    // fontWeight: "700",
    fontFamily: "PoppinsMedium",
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    alignItems: "center",
    // height: 95,
  },
  image: {
    borderRadius: 16,
  },
  caption: {
    marginTop: 6,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default EcommOccasion;
