// components/EcommComboCard.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export interface EcomProductProps {
  _id: string;
  productName: string;
  originalPrice: number;
  discountedPrice: number;
  productImages: string[];
  stock: number;
  productRating: number;
}

const EcommComboCard: React.FC<EcomProductProps> = (props) => {
  const {
    _id,
    productName,
    originalPrice,
    discountedPrice,
    productImages,
    stock,
    productRating,
  } = props;
  const router = useRouter();

  // Responsiveness for < 392dp
  const { width } = useWindowDimensions();
  const isSmall = width < 392;
  const stylesDynamic = StyleSheet.create({
    card: { width: isSmall ? 155 : 175 },
    image: { height: isSmall ? 140 : 170 },
    title: { fontSize: isSmall ? 13 : 14 },
    price: { fontSize: isSmall ? 14 : 16 },
    originalPrice: { fontSize: isSmall ? 11 : 13 },
    taxNote: { fontSize: isSmall ? 9 : 10 },
    ratingText: { fontSize: isSmall ? 11 : 12 },
  });

  // compute discount %
  const discount =
    originalPrice > discountedPrice
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;

  // fallback image
  const imgSrc: ImageSourcePropType = {
    uri:
      productImages && productImages.length > 0
        ? productImages[0]
        : "https://via.placeholder.com/150",
  };

  // “Add to cart” alert stub
  const handleAdd = () => {
    if (stock <= 0) return Alert.alert("Out of Stock");
    Alert.alert("Added to Cart", productName);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        router.push({ pathname: "/Detail/[id]", params: { id: _id } })
      }
    >
      <View style={[styles.card, stylesDynamic.card]}>
        {/* Discount badge */}
        {discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}%</Text>
            <Text style={styles.discountText}>OFF</Text>
          </View>
        )}

        {/* Add button */}
        <TouchableOpacity onPress={handleAdd} style={styles.addIcon}>
          <LinearGradient colors={["#fff", "#FFD7B9"]} style={styles.plusBg}>
            <Entypo name="plus" size={28} color="#FF6B00" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Image + Rating */}
        <View>
          <Image source={imgSrc} style={[styles.image, stylesDynamic.image]} />
          <View style={styles.rating}>
            <Text style={[styles.ratingText, stylesDynamic.ratingText]}>
              {typeof productRating === "number"
                ? productRating.toFixed(1) + " ★"
                : "★"}
            </Text>
          </View>
        </View>

        {/* Details */}
        <View style={{ paddingLeft: 10 }}>
          <Text style={[styles.title, stylesDynamic.title]} numberOfLines={1}>
            {productName.split("Idol")[0] + "Idol"}
          </Text>

          <View style={styles.priceRow}>
            {typeof discountedPrice === "number" ? (
              <Text style={[styles.price, stylesDynamic.price]}>
                ₹{discountedPrice.toFixed(2).split(".")[0]}
                {/* <Text>.{discountedPrice.toFixed(2).split(".")[1]}</Text> */}
              </Text>
            ) : (
              <Text style={[styles.price, stylesDynamic.price]}>
                Price Unavailable
              </Text>
            )}

            {typeof originalPrice === "number" &&
              typeof discountedPrice === "number" &&
              originalPrice > discountedPrice && (
                <Text
                  style={[styles.originalPrice, stylesDynamic.originalPrice]}
                >
                  ₹{originalPrice.toFixed(2).split(".")[0]}
                </Text>
              )}
          </View>

          <Text style={[styles.taxNote, stylesDynamic.taxNote]}>
            Inclusive of all Taxes
          </Text>
        </View>

        {/* Wishlist Heart (static) */}
        <TouchableOpacity style={styles.heartIcon}>
          <AntDesign name="hearto" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(EcommComboCard);

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    overflow: "hidden",
    marginHorizontal: 6,
    position: "relative",
    width: 160,
  },
  discountBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#f60",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 5,
    zIndex: 10,
  },
  discountText: { fontSize: 12, color: "#fff", fontFamily: "RobotoMedium" },
  discountText1: {
    fontSize: 13,
    color: "#fff",
    fontFamily: "RobotoMedium",
    marginTop: -5,
  },
  addIcon: {
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 10,
    borderWidth: 1,
    borderColor: "#FF6B00",
    borderRadius: 10,
    overflow: "hidden",
  },
  plusBg: { padding: 5 },
  image: { width: "100%", marginBottom: 8 },
  rating: {
    position: "absolute",
    bottom: 12,
    left: 6,
    backgroundColor: "green",
    paddingHorizontal: 6,
    // paddingBottom: 2,
    paddingTop: 2,
    borderRadius: 12,
  },
  ratingText: { color: "#fff", fontFamily: "PoppinsRegular" },
  title: { marginBottom: 4, fontFamily: "PoppinsRegular" },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  price: { fontSize: 16, fontFamily: "OpenSansSemiBold" },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: "line-through",
    fontFamily: "OpenSansRegular",
    color: "#888",
  },
  taxNote: {
    color: "#666",
    marginTop: 2,
    paddingBottom: 18,
    fontFamily: "LatoRegular",
 fontSize:9 },
  heartIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 1,
    borderColor: "#ddd",
    borderTopLeftRadius: 8,
    padding: 5,
  },
});
