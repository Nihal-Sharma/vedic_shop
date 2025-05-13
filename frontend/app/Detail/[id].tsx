// ./Detail/[id].tsx

import React, { useEffect, useState, useRef } from "react";
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
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import useMainStore from "../../store/mainStore";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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

  // Enable LayoutAnimation on Android once
  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

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
  const handleCheck = () => {
    if (pincode.length === 6) {
      console.log("Valid Pincode:", pincode);
    } else {
      alert("Please enter a valid 6-digit pincode.");
    }
  };
  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };
   const toggleShipping = () => {
       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
       setShippingExpanded(prev => !prev);
     };

  // ─── render ─────────────────────────────────────────────────────────────────
  return (
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
        <View style={styles.dotsContainer}>
          {product.productImages.map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, currentIndex === idx && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      {/* Basic Info */}
      <View style={styles.infoBox}>
        <Text style={styles.title}>{product.productName}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            ₹{Math.floor(product.discountedPrice)}
          </Text>
          <Text style={styles.originalPrice}>
            ₹{Math.floor(product.originalPrice)}
          </Text>
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
            <Text style={styles.deliveryText}>
              Estimated Delivery: 4–5 Days
            </Text>
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
     <TouchableOpacity onPress={toggleShipping} style={styles.accordionHeader}>
       <Text style={styles.headerText}>Shipping</Text>
     <MaterialIcons         name={shippingExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
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
           We usually take 2–5 working days depending on your location.{"\n\n"}
           • Metros 2–3 days{"\n"}
           • Rest of India 3–5 days
         </Text>
      </View>
     )}

      {/* Other Details */}
      <Text style={styles.sectionHeader}>Sub-Categories</Text>
      <Text style={styles.text}>{product.subCategories.join(", ")}</Text>

      <Text style={styles.sectionHeader}>Colors</Text>
      <Text style={styles.text}>
        {product.productColors.join(", ") || "N/A"}
      </Text>

      <Text style={styles.sectionHeader}>Sizes</Text>
      <Text style={styles.text}>
        {product.availableSizes.join(", ") || "N/A"}
      </Text>

      <Text style={styles.sectionHeader}>Dimensions</Text>
      <Text style={styles.text}>
        L: {product.dimensions.length.value}
        {product.dimensions.length.unit} × W: {product.dimensions.width.value}
        {product.dimensions.width.unit} × H: {product.dimensions.height.value}
        {product.dimensions.height.unit}
      </Text>
      <Text style={styles.text}>
        Weight: {product.dimensions.weight.value}
        {product.dimensions.weight.unit}
      </Text>

      <Text style={styles.sectionHeader}>Shop</Text>
      <Text style={styles.text}>{product.shop.name}</Text>

      <Text style={styles.sectionHeader}>Flags</Text>
      <Text style={styles.text}>Active: {product.isActive ? "Yes" : "No"}</Text>
      <Text style={styles.text}>
        Featured: {product.isFeatured ? "Yes" : "No"}
      </Text>
      <Text style={styles.text}>
        Approved: {product.isApproved ? "Yes" : "No"}
      </Text>

      <Text style={styles.sectionHeader}>Added On</Text>
      <Text style={styles.text}>
        {new Date(product.addedOn).toLocaleDateString()}
      </Text>
    </ScrollView>
  );
};

export default ProductDetail;

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
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: { backgroundColor: "#000" },
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
  price: { fontSize: 20, fontWeight: "bold" },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#888",
    marginLeft: 12,
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
});
