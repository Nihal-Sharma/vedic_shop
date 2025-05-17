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
import { useFonts } from "expo-font";

/* ───────── unified product interface ───────── */
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
  productReview: string; // raw text from backend (“1 234 reviews”)
  reviewCount: number; // numeric count (always present)
  __v: number;
  productBasePrice: number;
  reviews : any[];
  productVideoURLs :any[];
  isCodAvailable :boolean

}

/* ─────────── Best‑Seller Card ─────────── */
const EcommBestSellerCard: React.FC<EcomProductProps> = (props) => {
  
 
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


  const { width } = useWindowDimensions();
  const isSmallScreen = width < 392;

  const dynamicStyles = StyleSheet.create({
    card: {
      width: isSmallScreen ? 165 : 185,
    },
    image: {
      height: isSmallScreen ? 150 : 170,
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
  });



  /* cart (Zustand) */
  const productQuantity = useCart(
    (s) => s.cartProducts.find((p) => p._id === _id)?.quantity ?? 0
  );
  const incGlobalQuantity = useCart((s) => s.incGlobalQuantity);
  const addToCart = useCart((s) => s.addToCart);

  

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

  const handleAddToCart = () => {
    if (stock <= 0) {
      Alert.alert("Out of Stock", "This product is out of stock.");
      return;
    }
    addToCart(props);
    incGlobalQuantity();
    Alert.alert("Added to Cart", `${productName} has been added to your cart.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            // push to /Detail/<productId>
            router.push({
              pathname: "/Detail/[id]",
              params: { id: _id },
            })
          }
        >
          <View style={[styles.card, dynamicStyles.card]}>
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
              <Image
                source={defaultImage}
                style={[styles.image, dynamicStyles.image]}
              />
              <View style={styles.rating}>
                <Text style={styles.ratingText}>
                  {typeof productRating === "number"
                    ? productRating.toFixed(1) + " ★"
                    : "★"}
                </Text>
              </View>
            </View>

            {/* details */}
            <View style={{ paddingLeft: 10 }}>
              <Text
                style={[styles.title, dynamicStyles.title]}
                numberOfLines={1}
              >
                {(productName ?? "Product").split("Idol")[0] + "Idol"}
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
      
    </SafeAreaView>
  );
};

export default EcommBestSellerCard;

/* ───────── styles (unchanged) ───────── */
const styles = StyleSheet.create({
  container: { backgroundColor: "white", alignItems: "center" },
  scroll: { alignItems: "center", paddingRight: 10 },
  card: {
    width: 185,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    overflow: "hidden",
    position: "relative",
    marginRight: 8,
  },
  discountBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#f60",
    paddingHorizontal: 7,
    paddingVertical: 3,
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
    fontSize: 13,
    textDecorationLine: "line-through",
    fontFamily: "OpenSansRegular",
    color: "#888",
  },
  taxNote: {
    fontSize: 10,
    color: "#666",
    marginTop: 2,
    paddingBottom: 20,
    fontFamily: " LatoRegular",
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
