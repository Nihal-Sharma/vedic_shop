// ./Detail/[id].tsx

import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import useMainStore from "../../store/mainStore";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import useWishlist from "@/store/wishList";
import useCart from "@/store/cart";

const { width: screenWidth } = Dimensions.get("window");

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
  productReview: string;
  reviewCount: number;
  __v: number;
  productBasePrice: number;
  reviews: {
    _id: string;
    reviewDescription: string;
    reviewRating: number;
    reviewerName: string;
    reviewImages: string[];
  }[];
}

const ProductDetail: React.FC = () => {
  
  // ─── all hooks at the top ───────────────────────────────────────────────────
  const { id } = useLocalSearchParams<{ id: string }>();
  const baseURL = useMainStore((s) => s.baseURL);

  const [product, setProduct] = useState<EcomProductProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const [pincode, setPincode] = useState("");
  const [expanded, setExpanded] = useState(false);

  const [shippingExpanded, setShippingExpanded] = useState(false);

  const cart = useCart((state)=>state.cartProducts)
  const incCartQuantity = useCart((state)=>state.incGlobalQuantity)
  //CART *******************
  const inCart = useMemo(() => {
  return product ? cart.some(item => item._id === product._id) : false;
}, [cart, product]);

  const [addedToCart, setAddedToCart] = useState(false);

 useEffect(() => {
  setAddedToCart(inCart);
  }, [inCart]);


  const addToCart = useCart((state)=>state.addToCart)
  const [estimatedDays, setEstimatedDays] = useState<number | null>(null);

  const [checkingDelivery, setCheckingDelivery] = useState(false);

  // ***WishList logic*******
  const wishList = useWishlist((state)=>state.wishlist);
  const exists = product 
  ? wishList.some(item => item._id === product._id) 
  : false;
  const liked = exists;
  const addToWishlist = useWishlist((state)=> state.addToWishlist);
  const removeFromWhishlist = useWishlist((state)=>state.removeFromWishlist);
  const handleLike = ()=>{
    if(liked) {
      if (product) {
         removeFromWhishlist(product._id);
}
    }
    else{
      if(product){
        addToWishlist(product);
      }
      
    }
  }




  const [highlightsOpen, setHighlightsOpen] = useState(false);
   const HEADER_H      = 40;   // height of Key‑Highlight header row
   const dimensionCount =
     (product?.dimensions.weight.value != null ? 1 : 0) +
     (product?.dimensions.length.value != null ? 1 : 0) +
     (product?.dimensions.width.value != null ? 1 : 0) +
     (product?.dimensions.height.value != null ? 1 : 0);

   const BODY_H =
     dimensionCount === 4
       ? 200
       : dimensionCount === 3
       ? 160
       : dimensionCount === 2
       ? 100
       : dimensionCount === 1
       ? 60
       : 0;
  // how tall you want the body
 const highlightHeight = useRef(new Animated.Value(HEADER_H)).current;

  // CART LOGIC
  const handlePress = () => {
    if (addedToCart) {
      router.push("/(tabs)/Cart"); // Navigate to cart page
    } else {
      // Simulate adding to cart
      if(product){
        addToCart(product);
        incCartQuantity()
        setAddedToCart(true);
      }
      
    }
  };

  const toggleHighlights = () => {
    const toValue = highlightsOpen ? HEADER_H : HEADER_H + BODY_H;
    Animated.timing(highlightHeight, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
    setHighlightsOpen((prev) => !prev);
  };

  
  const discount =
    product && product.originalPrice > product.discountedPrice
      ? Math.round(
          ((product.originalPrice - product.discountedPrice) /
            product.originalPrice) *
            100
        )
      : 0;

  

  // Enable LayoutAnimation on Android once
  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
  const handleCheck = async () => {
    if (pincode.length === 6) {
      try {
        setCheckingDelivery(true); // start loading
        const response = await axios.get(
          `https://vedicvaibhav.com/api/ecom/serviceability/check?shopId=66f66310c69f3a5db919d17a&deliveryPin=${pincode}`
        );
        setEstimatedDays(response.data.cheapestCourier.estimated_delivery_days);
      } catch (err) {
        alert("Error checking pincode");
      } finally {
        setCheckingDelivery(false); // stop loading
      }
    } else {
      alert("Please enter a valid 6-digit pincode.");
    }
  };
  
  

  // Fetch product data
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseURL}/fetch-product-by-id/${id}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json = await res.json();
        setProduct(json.Product as EcomProductProps);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, baseURL]);

  // Auto-scroll carousel
  useEffect(() => {
    if (!product?.productImages.length) return;
    const total = product.productImages.length;
    const iv = setInterval(() => {
      const next = (currentIndex + 1) % total;
      setCurrentIndex(next);
      scrollRef.current?.scrollTo({ x: next * screenWidth, animated: true });
    }, 4000);
    return () => clearInterval(iv);
  }, [currentIndex, product]);

  // ─── early returns ──────────────────────────────────────────────────────────
  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  if (!product)
    return (
      <View style={styles.center}>
        <Text>No product found.</Text>
      </View>
    );

  // ─── handlers ───────────────────────────────────────────────────────────────
  const handleInputChange = (text: string) => {
    const num = text.replace(/[^0-9]/g, "");
    if (num.length <= 6) setPincode(num);
  };
  // const handleCheck = () => {
  //   if (pincode.length === 6) {
  //     console.log("Valid Pincode:", pincode);
  //   } else {
  //     alert("Please enter a valid 6-digit pincode.");
  //   }
  // };
  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };
  const toggleShipping = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShippingExpanded((prev) => !prev);
  };

  

  // ─── render ─────────────────────────────────────────────────────────────────
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={{ position: "relative" }}>
          <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <AntDesign name="arrowleft" size={24} color="black" />
              <Ionicons name="bag-handle-outline" size={24} color="black" />
            </View>

            {/* Image Carousel */}
            <View style={styles.carouselContainer}>
              <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
              >
                {product.productImages.map((uri, idx) => (
                  <Image
                    key={idx}
                    source={{ uri }}
                    style={[styles.image, { width: screenWidth }]}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>

              {/* 🔹  Key‑Highlight overlay */}
              <Animated.View
                style={[
                  styles.highlightBox,
                  { height: highlightHeight }, // animates open / close
                ]}
              >
                {/* header (always visible) */}
                <TouchableOpacity
                  style={styles.highlightHeader}
                  onPress={toggleHighlights}
                >
                  <Text style={styles.highlightTitle}>Key Highlight</Text>
                  <MaterialIcons
                    name={
                      highlightsOpen
                        ? "keyboard-arrow-down"
                        : "keyboard-arrow-up"
                    }
                    size={20}
                    color="#FFF"
                  />
                </TouchableOpacity>

                {/* body (only rendered when open for perf) */}
                {highlightsOpen && (
                  <View style={styles.highlightBody}>
                    {/* use whatever fields you like; example below */}
                    {/* <View style={styles.hlRow}>
                      <Text style={styles.hlLabel}>Material</Text>
                      <Text style={styles.hlValue}>
                        {product.descriptionMaterial ?? "—"}
                      </Text>
                    </View> */}
                    {product.dimensions.weight.value !== null && (
                      <View style={styles.hlRow}>
                        <Text style={styles.hlLabel}>Weight</Text>
                        <Text style={styles.hlValue}>
                          {product.dimensions.weight.value}{" "}
                          {product.dimensions.weight.unit}
                        </Text>
                      </View>
                    )}

                    {product.dimensions.length.value !== null && (
                      <View style={styles.hlRow}>
                        <Text style={styles.hlLabel}>Length</Text>
                        <Text style={styles.hlValue}>
                          {product.dimensions.length.value}{" "}
                          {product.dimensions.length.unit}
                        </Text>
                      </View>
                    )}

                    {product.dimensions.width.value !== null && (
                      <View style={styles.hlRow}>
                        <Text style={styles.hlLabel}>Width</Text>
                        <Text style={styles.hlValue}>
                          {product.dimensions.width.value}{" "}
                          {product.dimensions.width.unit}
                        </Text>
                      </View>
                    )}

                    {product.dimensions.height.value !== null && (
                      <View style={styles.hlRow}>
                        <Text style={styles.hlLabel}>Height</Text>
                        <Text style={styles.hlValue}>
                          {product.dimensions.height.value}{" "}
                          {product.dimensions.height.unit}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </Animated.View>
            </View>
            {/* dots */}
            <View style={styles.dotsContainer}>
              {product.productImages.map((_, idx) => (
                <View
                  key={idx}
                  style={[styles.dot, currentIndex === idx && styles.activeDot]}
                />
              ))}
            </View>

            {/* Product Info */}
            <View
              style={{
                backgroundColor: "#fff",
                paddingBottom: 16,
                borderRadius: 15,
                marginHorizontal: 15,
                marginTop: 19,
              }}
            >
              <Text style={styles.title}>{product.productName}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>
                  ₹{Math.floor(product.discountedPrice)}
                </Text>
                <Text style={styles.originalPrice}>
                  ₹{Math.floor(product.originalPrice)}
                </Text>
                {discount > 0 && (
                  <View
                    style={{
                      backgroundColor: "rgba(79,79,201,0.15)",
                      borderRadius: 6,
                      marginLeft: 12,
                    }}
                  >
                    <Text style={styles.discount}>{discount}% OFF</Text>
                  </View>
                )}
              </View>
              <Text style={styles.taxText}>Inclusive of all Taxes.</Text>
              <Text style={styles.taxText}>
                GST included. FREE delivery over ₹499
              </Text>
              <View style={styles.pincodeRow}>
                <TextInput
                  style={styles.pincodeInput}
                  placeholder="Enter Pincode"
                  keyboardType="numeric"
                  value={pincode}
                  onChangeText={handleInputChange}
                  maxLength={6}
                />
                <TouchableOpacity onPress={handleCheck}>
                  <Text style={styles.pincodeButton}>Check</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.deliveryRow}>
                <LinearGradient
                  colors={["#FFFFFF", "rgba(45,127,45,0.27)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.deliveryBadge}
                >
                  <MaterialCommunityIcons
                    name="lightning-bolt"
                    size={24}
                    color="#008000"
                  />
                  {checkingDelivery ? (
                    <ActivityIndicator
                      size="small"
                      color="#008000"
                      style={{ marginLeft: 8 }}
                    />
                  ) : (
                    <Text style={styles.deliveryText}>
                      {estimatedDays
                        ? `Estimated Delivery: ${estimatedDays} Day${
                            estimatedDays > 1 ? "s" : ""
                          }`
                        : "Enter pincode to check delivery time"}
                    </Text>
                  )}
                </LinearGradient>
              </View>
            </View>

            {/* COD / Returns */}
            <View style={styles.rowCards}>
              <View style={styles.card}>
                <Image
                  source={{
                    uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/money.png",
                  }}
                  style={styles.cardIcon}
                />
                <Text style={styles.cardText}>Cash On Delivery Available</Text>
              </View>
              <View style={styles.card}>
                <Image
                  source={{
                    uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/return.png",
                  }}
                  style={styles.cardIcon}
                />
                <Text style={styles.cardText}>14 Days Return & Exchange</Text>
              </View>
            </View>

            {/* Accordion */}
            <TouchableOpacity onPress={toggle} style={styles.accordionHeader}>
              <Text style={styles.headerText}>Product Description</Text>
              <MaterialIcons
                name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={24}
              />
            </TouchableOpacity>
            {expanded && (
              <View style={styles.accordionBody}>
                <Text style={styles.bodyText}>
                  {product.description.replace(/<[^>]+>/g, "")}
                </Text>
              </View>
            )}
            {/* Shipping Accordion */}
            <TouchableOpacity
              onPress={toggleShipping}
              style={styles.accordionHeader}
            >
              <Text style={styles.headerText}>Shipping</Text>
              <MaterialIcons
                name={
                  shippingExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"
                }
                size={24}
              />
            </TouchableOpacity>
            {shippingExpanded && (
              <View style={styles.accordionBody}>
                <Text style={styles.bodyText}>
                  Free Shipping{"\n"}
                  We offer free shipping across India.{"\n\n"}
                  1–2 Days Dispatch{"\n"}
                  We dispatch orders within 1–2 days.{"\n\n"}
                  2–5 Days Delivery{"\n"}
                  We usually take 2–5 working days depending on your location.
                  {"\n\n"}• Metros 2–3 days{"\n"}• Rest of India 3–5 days
                </Text>
              </View>
            )}

            {/* <Text style={styles.sectionHeader}>Shop</Text>
      <Text style={styles.text}>{product.shop.name}</Text> */}

            {/* <Text style={styles.sectionHeader}>Flags</Text>
      <Text style={styles.text}>Active: {product.isActive ? "Yes" : "No"}</Text>
      <Text style={styles.text}>
        Featured: {product.isFeatured ? "Yes" : "No"}
      </Text>
      <Text style={styles.text}>
        Approved: {product.isApproved ? "Yes" : "No"}
      </Text> */}

            {/* <Text style={styles.sectionHeader}>Added On</Text>
      <Text style={styles.text}>
        {new Date(product.addedOn).toLocaleDateString()}
      </Text> */}
            <Text style={styles.sectionHeader}>Reviews</Text>

            {!product.reviews || product.reviews.length === 0 ? (
              <Text style={styles.noReviews}>No reviews available.</Text>
            ) : (
              product.reviews.map((r) => (
                <View key={r._id} style={styles.reviewCard}>
                  {/* Rating bubble */}
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>
                      {Math.round(r.reviewRating)}
                    </Text>
                    <MaterialIcons name="star" size={16} color="#FFF" />
                  </View>

                  {/* Review images, if any */}
                  {r.reviewImages.length > 0 && (
                    <View style={styles.reviewImagesRow}>
                      {r.reviewImages.map((uri, i) => (
                        <Image
                          key={i}
                          source={{ uri }}
                          style={styles.reviewImage}
                          resizeMode="cover"
                        />
                      ))}
                    </View>
                  )}

                  {/* Text & reviewer */}
                  <Text style={styles.reviewDescription}>
                    {r.reviewDescription}
                  </Text>
                  <Text style={styles.reviewerName}>{r.reviewerName}</Text>

                  {/* Helpful buttons */}
                  <View style={styles.helpfulRow}>
                    <Text>Helpful?</Text>
                    <TouchableOpacity style={styles.helpfulButton}>
                      <MaterialIcons name="thumb-up-off-alt" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.helpfulButton}>
                      <MaterialIcons name="thumb-down-off-alt" size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}

            {/* Footer */}
            <View style={{ height: 100 }} />
          </ScrollView>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              backgroundColor: "white",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "10%",
              }}
              onPress={handleLike}
              activeOpacity={0.7}
            >
              <AntDesign
                name={liked ? "heart" : "hearto"}
                size={24}
                color="#FF6B00"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePress}
              style={{
                borderWidth: 1,
                borderColor: "#FF6B00",
                padding: 10,
                alignItems: "center",
                borderRadius: 12,
                justifyContent: "center",
                width: "40%",
              }}
            >
              <Text style={{ color: "#FF6B00", fontSize: 14 }}>
                {addedToCart ? "Go to Cart" : "Add to Cart"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#FF6B00",
                padding: 10,
                alignItems: "center",
                borderRadius: 12,
                justifyContent: "center",
                width: "40%",
              }}
            >
              <Text style={{ color: "white", fontSize: 14 }}>Buy Now</Text>
            </TouchableOpacity>
            <TouchableOpacity></TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default React.memo(ProductDetail);

const styles = StyleSheet.create({
  container: { backgroundColor: "#F0F0F0", paddingBottom: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  carouselContainer: {
    overflow: "hidden",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  image: { height: 300 },
  dotsContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#000",
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 15,
    paddingBottom: 16,
    marginTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    paddingHorizontal: 16,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  price: { fontSize: 20, fontWeight: "bold", color: "#FF7816" },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "#888",
    marginLeft: 8,
  },
  taxText: { paddingHorizontal: 16, marginTop: 4 },
  pincodeRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    margin: 16,
    paddingHorizontal: 12,
  },
  pincodeInput: { flex: 1, fontSize: 16 },
  pincodeButton: { color: "orange", fontWeight: "bold" },
  deliveryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  deliveryBadge: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
  },
  deliveryText: { marginLeft: 8, color: "#008000" },
  rowCards: {
    margin: 10,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 13,
  },
  card: {
    backgroundColor: "#F7F7F7",
    width: "48%",
    alignItems: "center",
    borderRadius: 20,
    padding: 15,
  },
  cardIcon: { width: 50, height: 50 },
  cardText: { textAlign: "center", marginTop: 5 },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#F7F7F7",
    marginTop: 12,
  },
  headerText: { fontSize: 16, fontWeight: "600" },
  accordionBody: { padding: 16, backgroundColor: "#FFF" },
  bodyText: { fontSize: 14, lineHeight: 20 },
  sectionHeader: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 16,
  },
  text: { paddingHorizontal: 16, marginTop: 4 },
  errorText: { color: "red" },

  noReviews: {
    paddingHorizontal: 16,
    fontStyle: "italic",
    color: "#666",
    marginTop: 8,
  },
  reviewCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  ratingText: {
    color: "#FFF",
    fontWeight: "bold",
    marginRight: 4,
  },
  reviewImagesRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  reviewDescription: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 22,
  },
  reviewerName: {
    marginTop: 6,
    color: "#666",
    fontStyle: "italic",
  },
  helpfulRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  helpfulButton: {
    marginLeft: 12,
  },
  highlightBox: {
    position: "absolute",
    bottom: 0, // distance from bottom of carousel
    left: 0,
    width: "50%",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    overflow: "hidden",
    zIndex: 10, // above dots
  },
  highlightHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  highlightTitle: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  highlightBody: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  hlRow: { marginTop: 10 },
  hlLabel: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  hlValue: { color: "#FFF", fontSize: 14, marginTop: 2 },
  discount: {
    // marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: "#4F4FC9",
    fontWeight: "bold",
    fontSize: 14,
  },
});
