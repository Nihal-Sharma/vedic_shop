import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  ImageSourcePropType,
  Alert,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import useCart from "../../store/cart";
import useWishlist from "@/store/wishList";

/* ───────– props shared by every list –─────── */
export interface EcomProductProps {
  _id: string;
  productId: string;
  productName: string;
  productCategory: { id: string; name: string };
  description: string;
  originalPrice: number;
  discountedPrice: number;
  subCategories: string[];
  stock: number;
  productColors: string[];
  availableSizes: string[];
  dimensions: {
    length: { value: number; unit: string };
    width: { value: number; unit: string };
    height: { value: number; unit: string };
    weight: { value: number; unit: string };
  };
  productImages: string[];
  addedOn: string;
  shop: { id: string; name: string };
  isActive: boolean;
  isFeatured: boolean;
  isApproved: boolean;
  productRating: number;
  productReview: string; // raw string (unused in card—still good to keep)
  reviewCount?: number; // optional so other lists compile
  __v: number;
  productBasePrice: number;
  reviews : any[];
  productVideoURLs :any[];
  isCodAvailable :boolean
}

const EcomProduct: React.FC<EcomProductProps> = (props) => {
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

  const { width } = useWindowDimensions();
  const isSmallScreen = width < 392;

  const dynamicStyles = StyleSheet.create({
    card: {
      width: isSmallScreen ? 155 : 175,
    },
    image: {
      height: isSmallScreen ? 140 : 170,
    },
    title: {
      fontSize: isSmallScreen ? 13 : 14,
    },
    price: {
      fontSize: isSmallScreen ? 14 : 16,
    },
    originalPrice: {
      fontSize: isSmallScreen ? 11 : 13,
    },
    taxNote: {
      fontSize: isSmallScreen ? 9 : 10,
    },
    ratingText: {
      fontSize: isSmallScreen ? 11 : 12,
    },
  });


  /* cart state (Zustand) */
  const productQuantity = useCart(
    (s) => s.cartProducts.find((p) => p._id === _id)?.quantity ?? 0
  );
  const incGlobalQuantity = useCart((s) => s.incGlobalQuantity);
  const decGlobalQuantity = useCart((s) => s.decGlobalQuantity);
  const addToCart = useCart((s) => s.addToCart);
  const incProductQuantity = useCart((s) => s.incProductQuantity);
  const decProductQuantity = useCart((s) => s.decProductQuantity);
  const removeFromCart = useCart((s) => s.removeFromCart);

  /* computed */
  const discount =
    originalPrice > discountedPrice
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;

  const defaultImage: ImageSourcePropType = {
    uri:
      productImages?.length > 0
        ? productImages[0]
        : "https://via.placeholder.com/150",
  };

  /* local UI */
   // Logic For  WishList
  
  const wishList = useWishlist((state)=>state.wishlist);
  const exists = wishList.some(item =>item._id === props._id);
  const liked = exists;
  const addToWishlist = useWishlist((state)=> state.addToWishlist);
  const removeFromWhishlist = useWishlist((state)=>state.removeFromWishlist);
  const handleLike = ()=>{
    if(liked) {
      removeFromWhishlist(props._id);
    }
    else{
      addToWishlist(props);
      
    }
  }

  /* handlers */
  const handleAddToCart = () => {
    if (stock <= 0) {
      Alert.alert("Out of Stock", "This product is out of stock.");
      return;
    }
    addToCart(props);
    incGlobalQuantity();
    Alert.alert("Added to Cart", `${productName} has been added to your cart.`);
  };

  /* render */
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity activeOpacity={0.9}>
          <View style={[styles.card, dynamicStyles.card]}>
            {/* discount badge */}
            {discount > 0 && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{discount}%</Text>
                <Text style={styles.discountText1}>OFF</Text>
              </View>
            )}

            {/* add / added */}
            {productQuantity > 0 ? (
              <TouchableOpacity style={styles.addIcon1}>
                <LinearGradient
                  colors={["#FFFFFF", "#C0DFC7"]}
                  style={styles.plusBg1}
                >
                  <Text style={{ color: "#24903C" }}>Added</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleAddToCart}
                style={styles.addIcon}
              >
                <LinearGradient
                  colors={["#FFFFFF", "#FFD7B9"]}
                  style={styles.plusBg}
                >
                  <Entypo name="plus" size={28} color="#FF6B00" />
                </LinearGradient>
              </TouchableOpacity>
            )}

            {/* image + rating */}
            <View style={{ position: "relative" }}>
              <Image source={defaultImage} style={styles.image} />
              <View style={styles.rating}>
                <Text style={[styles.ratingText, dynamicStyles.ratingText]}>
                  {typeof productRating === "number"
                    ? productRating.toFixed(1) + " ★"
                    : "★"}
                </Text>
              </View>
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text
                style={[styles.title, dynamicStyles.title]}
                numberOfLines={1}
              >
                {typeof productName === "string"
                  ? productName.includes("Idol")
                    ? productName.split("Idol")[0] + "Idol"
                    : productName
                  : "Unnamed"}
              </Text>

              <View style={styles.priceRow}>
                {typeof discountedPrice === "number" ? (
                  <Text style={[styles.price, dynamicStyles.price]}>
                    ₹{discountedPrice.toFixed(2).split(".")[0]}
                    {/* <Text>.{discountedPrice.toFixed(2).split(".")[1]}</Text> */}
                  </Text>
                ) : (
                  <Text style={[styles.price, dynamicStyles.price]}>
                    Price Unavailable
                  </Text>
                )}

                {typeof originalPrice === "number" &&
                  typeof discountedPrice === "number" &&
                  originalPrice > discountedPrice && (
                    <Text
                      style={[
                        styles.originalPrice,
                        dynamicStyles.originalPrice,
                      ]}
                    >
                      ₹{originalPrice.toFixed(2).split(".")[0]}
                    </Text>
                  )}
              </View>

              <Text style={[styles.taxNote, dynamicStyles.taxNote]}>
                Inclusive of all Taxes
              </Text>
            </View>

            {/* wishlist */}
            <TouchableOpacity onPress={handleLike} style={styles.heartIcon}>
              <AntDesign
                name={liked ? "heart" : "hearto"}
                size={24}
                color={liked ? "red" : "black"}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(EcomProduct);

/* --- styles (unchanged) --- */
const styles = StyleSheet.create({
  container: { alignItems: "center" },
  scroll: { paddingRight: 10, alignItems: "center" },
  card: {
    width: 180,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    overflow: "hidden",
    position: "relative",
  },
  discountBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#f60",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 5,
    zIndex: 10,
  },
  discountText: { fontSize: 13, color: "#fff", fontFamily: "RobotoMedium" },
  discountText1: {
    fontSize: 13,
    color: "#fff",
fontFamily: "RobotoMedium",
    marginTop: -2,
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
  addIcon1: {
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  plusBg: { padding: 5 },
  plusBg1: { padding: 8 },
  image: { width: "100%", height: 170, marginBottom: 8 },
  rating: {
    position: "absolute",
    bottom: 12,
    left: 6,
    backgroundColor: "green",
    paddingHorizontal: 6,
    // paddingVertical: 2,
    paddingTop: 2,
    borderRadius: 12,
  },
  ratingText: { color: "#fff", fontSize: 12, fontFamily: "PoppinsRegular" },
  title: { fontSize: 14, fontFamily: "PoppinsRegular" },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  price: { fontSize: 16, fontFamily: "OpenSansSemiBold" },
  originalPrice: {
    fontSize: 12,
    fontFamily: "OpenSansRegular",
    textDecorationLine: "line-through",
    color: "#888",
  },
  taxNote: {
    fontSize: 9,
    color: "#666",
    marginTop: 2,
    paddingBottom: 15,
    fontFamily: "LatoRegular",
  },
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
