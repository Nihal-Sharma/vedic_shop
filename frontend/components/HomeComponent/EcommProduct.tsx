import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useCart from "../../store/cart";


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
  __v: number;
  productBasePrice: number;
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

  // Access Quantity of the Product in the CART
  const productQuantity = useCart((state) =>
    state.cartProducts.find((p) => p._id === _id)?.quantity ?? 0
  );

  //Function to increase the Global Cart Quantity
  const incGlobalQuantity = useCart((state)=>state.incGlobalQuantity);

  //Function to increase the Global Cart Quantity
  const decGlobalQuantity = useCart((state)=>state.decGlobalQuantity);

  //Function to add a product to Cart
  const addToCart = useCart((state)=> state.addToCart)

  //Function to increase Product Quantity by pressing +
  const incProductQuantity = useCart((state)=> state.incProductQuantity)

  //Function to Decrease Product Quanity by pressing -
  const decProductQuantity = useCart((state)=> state.decProductQuantity)

  //Function to remove a product from Cart
  const removeFromCart = useCart((state)=>state.removeFromCart)


  const discount =
    originalPrice > discountedPrice
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;

  const defaultImage =
    productImages && productImages.length > 0
      ? productImages[0]
      : "https://via.placeholder.com/150";

  const handlePress = () => {
    // router.push(`/product/${_id}`);
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

  const increment = () => {
    if(productQuantity > stock){
      Alert.alert(`Only ${productQuantity} are available`);
      return;
    }
    incProductQuantity(_id);
    incGlobalQuantity();
  };

  const decrement = () => {
   if(productQuantity ==1){
      removeFromCart(_id);
      decGlobalQuantity();
   }
   else{
    decProductQuantity(_id);
    decGlobalQuantity();
   }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: "#fff",
        marginRight: 16,
        borderColor: "#e5e7eb",
        borderWidth: 1,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        width: 176,
        padding: 12,
      }}
      accessible={true}
      accessibilityLabel={`View details for ${productName}`}
    >
      <View style={{ position: "relative" }}>
        {discount > 0 && (
          <View
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "#ef4444",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 9999,
              zIndex: 10,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 12 }}>{discount}% Off</Text>
          </View>
        )}
        <Image
          source={{ uri: defaultImage }}
          style={{ width: "100%", height: 128, borderRadius: 12 }}
          resizeMode="cover"
        />
      </View>
      <Text
        style={{
          marginTop: 8,
          fontWeight: "bold",
          color: "#374151",
        }}
        numberOfLines={1}
      >
        {productName}
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
      >
        <Ionicons name="star" size={14} color="gold" />
        <Text style={{ fontSize: 12, color: "#6b7280", marginLeft: 4 }}>
          {productRating.toFixed(1)}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#111827",
            marginRight: 8,
          }}
        >
          ₹{discountedPrice.toFixed(2)}
        </Text>
        {originalPrice > discountedPrice && (
          <Text
            style={{
              fontSize: 12,
              color: "#9ca3af",
              textDecorationLine: "line-through",
            }}
          >
            ₹{originalPrice.toFixed(2)}
          </Text>
        )}
      </View>
      {productQuantity > 0 ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <TouchableOpacity
            onPress={decrement}
            style={{
              paddingHorizontal: 8,
              paddingVertical: 4,
              backgroundColor: "#3b82f6",
              borderRadius: 6,
            }}
          >
            <Text style={{ fontSize: 18, color: "#fff" }}>-</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 16 }}>{productQuantity}</Text>
          <TouchableOpacity
            onPress={increment}
            style={{
              paddingHorizontal: 8,
              paddingVertical: 4,
              backgroundColor: "#3b82f6",
              borderRadius: 6,
            }}
          >
            <Text style={{ fontSize: 18, color: "#fff" }}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleAddToCart}
          style={{
            marginTop: 8,
            backgroundColor: "#3b82f6",
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 8,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            Add to Cart
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default EcomProduct;
