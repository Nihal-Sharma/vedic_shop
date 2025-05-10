import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// Product data at the top
const product = {
  title: "Dhyana Mudra Adiyogi",
  image: {
    uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/core.png",
  }, // Make sure you have this image in the assets folder
  price: 599,
  originalPrice: 999,
  discount: "10% ",
  rating: 4.3,
};


const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked); // toggles between true and false
  };

const EcommCard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}</Text>
            <Text style={styles.discountText}>OFF</Text>
          </View>

          <TouchableOpacity style={styles.addIcon}>
            {/* <AntDesign name="pluscircleo" size={24} color="#ff6600" /> */}
            <LinearGradient
              colors={["#FFFFFF", "#FFD7B9"]}
              style={{ padding: 5 }}
            >
              <Entypo name="plus" size={28} color="#FF6B00" />
            </LinearGradient>
          </TouchableOpacity>

          <View style={{ position: "relative" }}>
            <Image
              source={product.image}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.rating}>
              <Text style={styles.ratingText}>{product.rating} ★</Text>
            </View>
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.title}>{product.title}</Text>

            <View style={styles.priceRow}>
              <Text style={styles.price}>₹{product.price}</Text>
              <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            </View>
            <Text style={styles.taxNote}>Inclusive of all Taxes.</Text>
          </View>

          <TouchableOpacity style={styles.heartIcon}>
            <AntDesign name="hearto" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleLike}
            style={{ position: "absolute", top: 8, right: 8, zIndex: 10 }}
          >
            {/* <EvilIcons name="heart" size={24} color="red" /> */}
            <AntDesign
              name="hearto"
              size={24}
              color={liked ? "red" : "white"} // red if liked, otherwise white
            />
          </TouchableOpacity>
        </View>
        {/* <View><Text>hello</Text></View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  scroll: {
    padding: 20,
    alignItems: "center",
  },
  card: {
    width: 192,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    // padding: 10,
    backgroundColor: "white",
    position: "relative",
  },
  discountBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#f60",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderTopLeftRadius: 5,
    // borderBottomRightRadius: 5,
    zIndex: 10,
  },
  discountText: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
  },
  addIcon: {
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 10,
    borderWidth: 2,
    borderColor: "#FF6B00",
    borderRadius:10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 170,
    // borderRadius: 8,
    marginBottom: 8,
  },
  rating: {
    position: "absolute",
    bottom: 12,
    left: 6,
    backgroundColor: "green",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  ratingText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  title: {
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  originalPrice: {
    fontSize: 13,
    textDecorationLine: "line-through",
    color: "#888",
  },
  taxNote: {
    fontSize: 10,
    color: "#666",
    marginTop: 2,
    paddingBottom: 15,
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

export default EcommCard;
