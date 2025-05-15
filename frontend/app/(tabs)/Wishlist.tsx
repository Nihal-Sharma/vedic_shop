import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import useWishlist from "@/store/wishList";
import useCart from "@/store/cart";
import { EcomProductProps } from "../../components/HomeComponent/EcommProduct";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 16 * 2 - 8) /* row gaps */ / 2;

const WishlistHeader = () => {
  const cartCount = useCart((s) => s.globalQuantity);
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Wishlist</Text>
      <TouchableOpacity style={styles.cartButton}>
        <Feather name="shopping-cart" size={24} color="black" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const WishlistCard: React.FC<{ item: EcomProductProps }> = ({ item }) => {
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
  const addToCart = useCart((s) => s.addToCart);
  const incCart = useCart((s) => s.incGlobalQuantity);
  const removeFromWishlist = useWishlist((s) => s.removeFromWishlist);

  const handleMoveToCart = () => {
    addToCart(item);
    incCart();
    removeFromWishlist(item._id);
  };

  const handleCross = () => {
    removeFromWishlist(item._id);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>10% OFF</Text>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={handleCross}>
        <AntDesign name="close" size={16} color="#666" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              item.productImages && item.productImages.length > 0
                ? item.productImages[0]
                : "https://via.placeholder.com/150",
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>
            {(Number(item.productRating) || 0).toFixed(1)} ★
          </Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          {typeof item.productName === "string"
            ? item.productName.split("Idol")[0] + "Idol"
            : "Product"}
        </Text>
        <View style={styles.priceContainer}>
          {typeof item.discountedPrice === "number" ? (
            <Text style={[styles.price, dynamicStyles.price]}>
              ₹{item.discountedPrice.toFixed(2).split(".")[0]}
              {/* <Text>.{discountedPrice.toFixed(2).split(".")[1]}</Text> */}
            </Text>
          ) : (
            <Text style={[styles.price, dynamicStyles.price]}>
              Price Unavailable
            </Text>
          )}
          {typeof item.originalPrice === "number" &&
            typeof item.discountedPrice === "number" &&
            item.originalPrice > item.discountedPrice && (
              <Text style={[styles.originalPrice, dynamicStyles.originalPrice]}>
                ₹{item.originalPrice.toFixed(2).split(".")[0]}
              </Text>
            )}
        </View>
        <Text style={styles.taxInfo}>Inclusive of all Taxes.</Text>
      </View>
      <TouchableOpacity
        style={styles.moveToCartButton}
        onPress={handleMoveToCart}
      >
        <Text style={styles.moveToCartText}>MOVE TO CART</Text>
      </TouchableOpacity>
    </View>
  );
};

const EmptyWishlist = () => (
  <View style={emptyStyles.container}>
    <Image
      source={require("../../assets/images/Empty_wish.png")}
      style={emptyStyles.icon}
      resizeMode="contain"
    />
    <Text style={emptyStyles.title}>Your wishlist is empty</Text>
    <Text style={emptyStyles.description}>
      Save items that you like in your wishlist.
      {"\n"}Review them anytime and easily move them to the Cart
    </Text>
    <TouchableOpacity style={emptyStyles.shopNowButton}>
      <Text style={emptyStyles.shopNowText}>SHOP NOW</Text>
    </TouchableOpacity>
  </View>
);

const Wishlist = () => {
  const wishList = useWishlist((s) => s.wishlist);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <WishlistHeader />
      {wishList.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <FlatList
          data={wishList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <WishlistCard item={item} />}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    marginTop: 35,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#000" },
  cartButton: { width: 40, height: 40, justifyContent: "center" },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "white", fontSize: 10, fontWeight: "bold" },
  price: { fontSize: 16, fontFamily: "OpenSans-SemiBold" },
  list: {
    padding: 16,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },

  cardContainer: {
    width: CARD_WIDTH,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 4,
    overflow: "hidden",
    elevation: 3,
  },
  discountBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#FF6600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 1,
  },
  discountText: { color: "white", fontWeight: "bold", fontSize: 12 },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "white",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  imageContainer: {
    backgroundColor: "#345163",
    justifyContent: "center",
    alignItems: "center",
    height: 140,
  },
  image: { width: "100%", height: "100%" },
  ratingBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "#24903C",
    paddingHorizontal: 6,
    paddingTop: 2,
    alignItems: "center",
    borderRadius: 14,
  },
  ratingText: { color: "white", fontSize: 12, fontFamily: "Poppins-Regular" },

  detailsContainer: { paddingTop: 10, paddingLeft: 10 },
  productName: { fontSize: 14, fontFamily: "Poppins-Regular", color: "#333" },
  priceContainer: { flexDirection: "row", alignItems: "center", },
  currentPrice: { fontSize: 16, fontWeight: "bold", color: "#000" },
  originalPrice: {
    fontSize: 14,
    color: "#888",
    textDecorationLine: "line-through",
    marginLeft: 8,
  },
  taxInfo: { fontSize: 9, color: "#888", marginTop: 4 ,marginBottom: 12},

  moveToCartButton: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingVertical: 12,
    alignItems: "center",
  },
  moveToCartText: {
    color: "#FF6600",
    // fontWeight: "bold",
    fontFamily: "OpenSans-SemiBold",
    fontSize: 14,
  },
});

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  icon: { width: 110, height: 110, marginBottom: 20, tintColor: "#FF8C00" },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#333333",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    color: "#666666",
    lineHeight: 20,
  },
  shopNowButton: {
    borderWidth: 1,
    borderColor: "#FF6B00",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  shopNowText: {
    color: "#FF6B00",
    fontWeight: "600",
    fontSize: 16,
  },
});
