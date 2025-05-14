import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, StatusBar } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useWishlist from '@/store/wishList';
import {EcomProductProps} from '../../components/HomeComponent/EcommProduct'
import useCart from '@/store/cart';


const WishlistHeader = () => {
  const cartCount = useCart((state)=>state.globalQuantity)
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Wishlist</Text>
      
      <TouchableOpacity style={styles.cartButton}>
        <Feather name="shopping-cart" size={24} color="black" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const WishlistCard   = (item : EcomProductProps) => {
  const addToCart = useCart((state)=>state.addToCart)
  const incCart = useCart((state)=>state.incGlobalQuantity)
  const removeFromWishlist = useWishlist((state)=>state.removeFromWishlist)
  const handleMoveToCart = () =>{
    addToCart(item);
    incCart();
    removeFromWishlist(item._id)
   }
  const handleCross = () =>{
    removeFromWishlist(item._id)
  }
  return (
    <View style={styles['card-container']}>
      {/* Discount badge */}
      <View style={styles['card-discountBadge']}>
        <Text style={styles['card-discountText']}>10% OFF</Text>
      </View>
      
      {/* Close button */}
      <TouchableOpacity style={styles['card-closeButton']} onPress={handleCross}>
        <AntDesign name="close" size={16} color="#666" />
      </TouchableOpacity>
      
      {/* Product image */}
      <View style={styles['card-imageContainer']}>
        <Image 
          source={{ uri: item.productImages[0] }} 
          style={styles['card-image']}
          resizeMode="contain"
        />
        {/* Rating badge */}
        <View style={styles['card-ratingBadge']}>
          <Text style={styles['card-ratingText']}>{item.productRating} ★</Text>
        </View>
      </View>
      
      {/* Product details */}
      <View style={styles['card-detailsContainer']}>
        <Text style={styles['card-productName']}>{item.productName}</Text>
        <View style={styles['card-priceContainer']}>
          <Text style={styles['card-currentPrice']}>₹{item.discountedPrice}</Text>
          <Text style={styles['card-originalPrice']}>₹{item.originalPrice}</Text>
        </View>
        <Text style={styles['card-taxInfo']}>Inclusive of all Taxes.</Text>
      </View>
      
      {/* Button */}
      <TouchableOpacity style={styles['card-moveToCartButton']} onPress={ handleMoveToCart}>
        <Text style={styles['card-moveToCartText']}>MOVE TO CART</Text>
      </TouchableOpacity>
    </View>
  );
};

const EmptyWishlist = () =>{return (  <View style={empty_styles.container}>
      <View style={empty_styles.iconContainer}>
        {/* Placeholder for the shopping bag with heart icon */}
        <Image 
         source={require('../../assets/images/Empty_wish.png')}
          style={empty_styles.icon}
          resizeMode="contain"
        />
      </View>
      
      <Text style={empty_styles.title}>Your wishlist is empty</Text>
      
      <Text style={empty_styles.description}>
        Save items that you like in your wishlist.
        {'\n'}Review them anytime and easily move them to the Cart
      </Text>
      
      <TouchableOpacity 
        style={empty_styles.shopNowButton} 
         
      >
        <Text style={empty_styles.shopNowText}>SHOP NOW</Text>
      </TouchableOpacity>
    </View>)}

const Wishlist = () => {
 
  const wishList = useWishlist((state)=>state.wishlist)
  return (
    <SafeAreaProvider>
     <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <WishlistHeader />
      {wishList.length ==0 ? <EmptyWishlist/> : <FlatList
        data={wishList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <WishlistCard {...item} />}
        contentContainerStyle={styles.listContainer}
         
      />}
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Wishlist
const empty_styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 110,
    height: 110,
    tintColor: '#FF8C00', // Orange color similar to the image
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333333',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666666',
    lineHeight: 20,
  },
  shopNowButton: {
    borderWidth: 1,
    borderColor: '#FF6B00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  shopNowText: {
    color: '#FF6B00',
    fontWeight: '600',
    fontSize: 16,
  },
});
const styles = StyleSheet.create({
    screenContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  cartButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  // Card styles
  listContainer: {
    padding: 16,
  },
  'card-container': {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    position: 'relative',
  },
  'card-discountBadge': {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FF6600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  'card-discountText': {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  'card-closeButton': {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  'card-imageContainer': {
    position: 'relative',
    height: 160,
    backgroundColor: '#345163', // Dark blue background as in the image
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  'card-image': {
    width: '80%',
    height: '80%',
  },
  'card-ratingBadge': {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#4CAF50', // Green color for rating
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  'card-ratingText': {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  'card-detailsContainer': {
    padding: 12,
  },
  'card-productName': {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  'card-priceContainer': {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  'card-currentPrice': {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
  },
  'card-originalPrice': {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  'card-taxInfo': {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  'card-moveToCartButton': {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 12,
    alignItems: 'center',
  },
  'card-moveToCartText': {
    color: '#FF6600',
    fontWeight: 'bold',
    fontSize: 14,
  },
})