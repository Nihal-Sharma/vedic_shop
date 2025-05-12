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
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import useMainStore from "../../store/mainStore";
import { AntDesign, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
  const { id } = useLocalSearchParams<{ id: string }>();
  const baseURL = useMainStore((state) => state.baseURL);

  const [product, setProduct] = useState<EcomProductProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pincode, setPincode] = useState("");

  const handleInputChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 6) {
      setPincode(numericText);
    }
  };

  const handleCheck = () => {
    if (pincode.length === 6) {
      // Proceed with check
      console.log("Valid Pincode:", pincode);
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
        const response = await fetch(`${baseURL}/fetch-product-by-id/${id}`);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const json = await response.json();
        const data: EcomProductProps = json.Product;
        setProduct(data);
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
    const interval = setInterval(() => {
      const next = (currentIndex + 1) % total;
      setCurrentIndex(next);
      scrollRef.current?.scrollTo({ x: next * screenWidth, animated: true });
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, product]);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Ionicons name="bag-handle-outline" size={24} color="black" />
      </View>

      {/* Carousel */}
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

      {/* Product Info */}
      <View
        style={{
          backgroundColor: "#fff",
          paddingBottom: 16,
          borderRadius: 15,
          marginHorizontal: 15,
        }}
      >
        <Text style={styles.title}>{product.productName}</Text>
        {/* <Text style={styles.subtitle}>{product.productCategory.name}</Text> */}

        <View style={styles.priceRow}>
          <Text style={styles.price}>
            ₹{Math.floor(product.discountedPrice)}
          </Text>
          <Text style={styles.originalPrice}>
            ₹{Math.floor(product.originalPrice)}
          </Text>
        </View>

        {/* <Text style={styles.basePrice}>
        Base Price: ₹{product.productBasePrice.toFixed(2)}
      </Text> */}

        {/* <View style={styles.row}>
        <Text>Rating: {product.productRating} </Text>
        <Text>({product.reviewCount} reviews)</Text>
      </View> */}
        {/* <Text>
        Stock:{" "}
        {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
      </Text> */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text>Inclusive of all Taxes.</Text>
          <Text>GST included. FREE delivery over ₹ 499</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 2,
              marginTop: 16,
            }}
          >
            <TextInput
              style={{ flex: 1, fontSize: 16 }}
              placeholder="Enter Pincode"
              keyboardType="numeric"
              value={pincode}
              onChangeText={handleInputChange}
              maxLength={6} // Optional: UI limit
            />
            <TouchableOpacity onPress={handleCheck}>
              <Text style={{ color: "orange", fontWeight: "bold" }}>Check</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
          >
            <LinearGradient
              colors={["#FFFFFF", "rgba(45, 127, 45, 0.27)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                borderRadius: 12,
              }}
            >
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={24}
                color="#008000"
              />
              <Text style={{ color: "#008000" }}>
                Estimated Delivery Time: 4-5 Days
              </Text>
            </LinearGradient>
          </View>
        </View>
      </View>
      <View
        style={{
          marginBlock: 10,
          marginHorizontal: 15,
          backgroundColor: "#fff",
          borderRadius: 15,
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 13,
        }}
      >
        <View
          style={{
            backgroundColor: "#F7F7F7",
            width: "48%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            paddingTop: 15,
            paddingBottom: 15,
            paddingHorizontal: 10,
          }}
        >
          <Image
            source={{
              uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/money.png",
            }}
            style={{ width: 50, height: 50 }}
          />
          <Text style={{ textAlign: "center",paddingTop: 5 }}>
            Cash On Delivery Available
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#F7F7F7",
            width: "48%",
            alignItems: "center",
            borderRadius: 20,
            paddingTop: 15,
            paddingBottom: 15,
            paddingHorizontal: 10,
          }}
        >
          <Image
            source={{
              uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/return.png",
            }}
            style={{ width: 50, height: 50 }}
          />
          <Text style={{ textAlign: "center",paddingTop:5 }}>14 Days Return & Exchange</Text>
        </View>
      </View>
      <Text style={styles.sectionHeader}>Description</Text>
      <Text style={styles.text}>
        {product.description.replace(/<[^>]+>/g, "")}
      </Text>

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
  container: { backgroundColor: "#F0F0F0" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  carouselContainer: {
    overflow: "hidden",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  image: {
    height: 300,
  },
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
  activeDot: {
    backgroundColor: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#888",
    marginLeft: 12,
  },
  basePrice: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  sectionHeader: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 16,
  },
  text: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  errorText: { color: "red" },
});
