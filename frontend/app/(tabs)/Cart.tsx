import DeliveryBanner from '@/components/cartComponent/DeliveryBanner';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useCart, { Eproduct } from '../../store/cart';
const Cart = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const steps = ['Cart', 'Address', 'Payment'];
  const [checked, setChecked] = useState(false);
  // Sample data - you would replace this with your actual data source
  const cartProducts = useCart((state)=>state.cartProducts)
  //Function to increase the Global Cart Quantity
  const incGlobalQuantity = useCart((state)=>state.incGlobalQuantity);

   //Function to increase the Global Cart Quantity
   const decGlobalQuantity = useCart((state)=>state.decGlobalQuantity);

    //Function to increase Product Quantity by pressing +
  const incProductQuantity = useCart((state)=> state.incProductQuantity)

  //Function to Decrease Product Quanity by pressing -
  const decProductQuantity = useCart((state)=> state.decProductQuantity)

  //Function to remove a product from Cart
  const removeFromCart = useCart((state)=>state.removeFromCart)

  const [totalPrice, setTotalPrice] = useState(0);
  
 // Function to increase progress to next step
  const increaseStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Function to decrease progress to previous step
  const decreaseStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate percentage progress for bar width
  const progressPercentage = ((currentStep) / (steps.length - 1)) * 100;
  //Calculate total price whenever cart changes
  useEffect(() => {
    const total = cartProducts.reduce(
      (sum, product) => sum + product.discountedPrice * product.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartProducts]);

  // Increase product quantity
  const increaseQuantity = (_id: string) => {
    incProductQuantity(_id);
    incGlobalQuantity();
  };

  // Decrease product quantity
  const decreaseQuantity = (_id: string) => {
    const productQuantity = cartProducts.find((p) => p._id === _id)?.quantity ?? 0
    if (productQuantity ==1){
      removeFromCart(_id);
      decGlobalQuantity();
    }
   else{
    decProductQuantity(_id);
    decGlobalQuantity(); 
   }
  };

  // Delete product from cart
  const deleteProduct = (_id: string) => {
    removeFromCart(_id)
  };

  // Render item component for FlatList
  const renderItem = ( item : Eproduct ) =>{
    
    return (
    //   <View style={styles.cartItem}>
    //   <Image source={{ uri: item.productImages[0] }} style={styles.productImage} />
    //   <View style={styles.productInfo}>
    //     <Text style={styles.productName}>{item.productName}</Text>
    //     <Text style={styles.productPrice}>₹ {item.discountedPrice}</Text>
    //     <Text style={styles.productRating}>{item.productRating}</Text>
    //   </View>
    //   <View style={styles.quantityContainer}>
    //     <TouchableOpacity
    //       style={styles.quantityButton}
    //       onPress={() => increaseQuantity(item._id)}
    //     >
    //       <Text style={styles.quantityButtonText}>+</Text>
    //     </TouchableOpacity>
    //     <Text style={styles.quantityText}>{item.quantity}</Text>
    //     <TouchableOpacity
    //       style={styles.quantityButton}
    //       onPress={() => decreaseQuantity(item._id)}
    //     >
    //       <Text style={styles.quantityButtonText}>-</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <View style={styles['cart-card-container']}>
      <View style={styles['cart-card-contentContainer']}>
        {/* Checkbox and Image */}
        <View style={styles['cart-card-leftSection']}>
          <View style={styles['cart-card-checkbox']} />
          <Image 
            source={{ uri: item.productImages[0] }}
            style={styles['cart-card-productImage']}
            
          />
        </View>

        {/* Product Details */}
        <View style={styles['cart-card-detailsSection']}>
          <Text style={styles['cart-card-productName']}>{item.productName}</Text>
          
          <View style={styles['cart-card-specRow']}>
            <View style={styles['cart-card-specItem']}>
              <Text style={styles['cart-card-specLabel']}>Size: </Text>
              <Text style={styles['cart-card-specValue']}>{"9"}</Text>
            </View>
            
            <View style={styles['cart-card-specItem']}>
              <Text style={styles['cart-card-specLabel']}>Material: </Text>
              <Text style={styles['cart-card-specValue']}>{"Brass"}</Text>
            </View>
          </View>

          {/* Price Section */}
          <View style={styles['cart-card-priceRow']}>
            <Text style={styles['cart-card-currentPrice']}>₹{item.discountedPrice}</Text>
            <Text style={styles['cart-card-originalPrice']}>₹{item.discountedPrice}</Text>
            <View style={styles['cart-card-discountBadge']}>
              <Text style={styles['cart-card-discountText']}>{"50"}% OFF</Text>
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles['cart-card-quantityRow']}>
            <View style={styles['cart-card-quantitySelector']}>
              <TouchableOpacity 
                style={styles['cart-card-quantityButton']}
                onPress={()=>decreaseQuantity(item._id)}
              >
                <Text style={styles['cart-card-quantityButtonIcon']}>−</Text>
              </TouchableOpacity>
              
              <Text style={styles['cart-card-quantityText']}>{item.quantity}</Text>
              
              <TouchableOpacity 
                style={styles['cart-card-quantityButton']}
                // onPress={increaseQuantity}
                onPress={()=>{increaseQuantity(item._id)}}
              >
                <Text style={styles['cart-card-quantityButtonIcon']}>+</Text>
              </TouchableOpacity>
            </View>
            
            {/* <Text style={styles['cart-card-deliveryText']}>
              Delivery in {"2"} Days
            </Text> */}
          </View>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles['cart-card-buttonsContainer']}>
        <TouchableOpacity 
          style={styles['cart-card-actionButton']}
          onPress={()=>{deleteProduct(item._id)}}
        >
          <Text style={styles['cart-card-actionButtonText']}>Remove</Text>
        </TouchableOpacity>
        
        <View style={styles['cart-card-divider']} />
        
        <TouchableOpacity 
          style={styles['cart-card-actionButton']}
          // onPress={onMoveToWishlist}
        >
          <Text style={styles['cart-card-actionButtonText']}>Move to Wishlist</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
    };

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      
      
      {cartProducts.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>No items in cart</Text>
        </View>
      ) : (
        <>
        <View style={styles.cartTopbar}>
        <TouchableOpacity><AntDesign name="arrowleft" size={26} color="black" /></TouchableOpacity>
        <View style = {styles.topHeader}>
          <Text style ={styles.topHeaderTitle}>Cart</Text>
          <Text style ={styles.topHeaderSubTitle}>2 Item</Text>
        </View>
        <TouchableOpacity><AntDesign name="hearto" size={25} color="black" /></TouchableOpacity>
      </View>


     <View style={styles['bar-container']}>
      {/* Progress bar */}
      <View style={styles['bar-lineContainer']}>
        <View style={styles['bar-backgroundLine']} />
        <View style={[styles['bar-progressLine'], { width: `${progressPercentage}%` }]} />
        
        {/* Step indicators */}
        {steps.map((step, index) => {
          const stepPosition = index / (steps.length - 1) * 100;
          return (
            <View 
              key={step} 
              style={[
                styles['bar-stepIndicatorPosition'],
                { left: `${stepPosition}%` }
              ]}
            >
              <View 
                style={[
                  styles['bar-stepIndicator'],
                  index <= currentStep 
                    ? styles['bar-activeStepIndicator'] 
                    : styles['bar-inactiveStepIndicator']
                ]}
              />
              <Text 
                style={[
                  styles['bar-stepLabel'],
                  index <= currentStep 
                    ? styles['bar-activeStepLabel'] 
                    : styles['bar-inactiveStepLabel']
                ]}
              >
                {step}
              </Text>
            </View>
          );
        })}
      </View>
      
      
      
    </View>

    <DeliveryBanner amountToUnlock={251} pincode="160019"  onChangeLocation={() => {}} />
    
    <View style = {styles.selected}>
      <Pressable style={styles.maincheckBox} onPress={() => setChecked(!checked)}>
           <Text style={styles.checkbox}>
             {checked ? '☐' : '☑'}
                 </Text>
            </Pressable>
      <Text style = {{color :'white' , fontSize :12, marginLeft :9 }}>1/1 ITEM SELECTED {` ( ₹ ${totalPrice} )`}</Text>
    </View>
       
        <FlatList
            data={cartProducts}
            renderItem={({item})=>{return renderItem(item);}}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={styles.cartList}
             style={styles.flatList}
            />
          
          

          {/* <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total Price : ₹ {totalPrice}</Text>
          </View>
          
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>CHECK OUT</Text>
          </TouchableOpacity> */}
           
        </>
      )}
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    height :'100%',
    backgroundColor: '#F0F0F0',
    
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    position: 'relative',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  productRating: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  quantityButton: {
    backgroundColor: '#0097b2',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
 
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
  },
  totalContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#0097b2',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // TOPBAR CSS
  cartTopbar :{
    backgroundColor :'white',
    display :'flex',
    flexDirection :'row',
    justifyContent :'space-between',
    paddingLeft :16,
    paddingRight :25,
    paddingVertical :6,
    
  },
  topHeader:{

  },
  topHeaderTitle:{
    fontSize: 16,
    fontWeight :500
  },
  topHeaderSubTitle:{
    fontSize :12,
    fontWeight :400
  },
  // Progress Bar
  'bar-container': {
    width: '100%',
    paddingRight :60,
    paddingLeft :20,
    paddingTop: 20,
   backgroundColor :'white',
   marginBottom :8
  },
  'bar-lineContainer': {
    height: 40,
    position: 'relative',
    marginBottom: 21,
  },
  'bar-backgroundLine': {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  'bar-progressLine': {
    position: 'absolute',
    top: 10,
    left: 0,
    height: 1,
    backgroundColor: '#186A81',
  },
  'bar-stepIndicatorPosition': {
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    transform: [{ translateX: -10 }], // Center the indicator on its position
  },
  'bar-stepIndicator': {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  'bar-activeStepIndicator': {
    backgroundColor: '#186A81',
    borderColor: '#186A81',
  },
  'bar-inactiveStepIndicator': {
    backgroundColor: '#E0E0E0',
    borderColor: '#E0E0E0',
  },
  'bar-stepLabel': {
    marginTop: 5,
    fontSize: 14,
    
  },
  'bar-activeStepLabel': {
    color: '#186A81',
    fontWeight: 500,
  },
  'bar-inactiveStepLabel': {
    color: '#9E9E9E',
  },
  'bar-controls': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  'bar-button': {
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  'bar-disabledButton': {
    backgroundColor: '#C8E6C9',
  },
  'bar-buttonText': {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  checkbox :{
    fontSize: 22,
    color : 'white'
  },
  selected:{
    backgroundColor :'#186A81',
    flexDirection :'row',
    padding :11,
    alignItems :'center',
    marginTop :10
  },
  maincheckBox :{
   
  },


  // *************CARD***************
  'cart-card-container': {
    width: '97%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
    
  },
  'cart-card-contentContainer': {
    flexDirection: 'row',
    padding: 16,
    
  },
  'cart-card-leftSection': {
    marginRight: 16,
    flexDirection :'row'
  },
  'cart-card-checkbox': {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    marginRight :6
  },
  'cart-card-productImage': {
    width: 130,
    height: 153,
    borderRadius: 8,
    backgroundColor: '#F5F5F5', // Placeholder background
  },
  'cart-card-detailsSection': {
    flex: 1,
    justifyContent: 'space-between',
  },
  'cart-card-productName': {
    fontSize: 16,
    fontWeight: '400',
    color: '#333333',
    marginBottom: 8,
    lineHeight :22,
    
  },
  'cart-card-specRow': {
    flexDirection: 'row',
    marginBottom: 12,
  },
  'cart-card-specItem': {
    flexDirection: 'row',
    marginRight: 16,
  },
  'cart-card-specLabel': {
    fontSize: 12,
    color: '#666666',
  },
  'cart-card-specValue': {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
  },
  'cart-card-priceRow': {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  'cart-card-currentPrice': {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 8,
  },
  'cart-card-originalPrice': {
    fontSize: 12,
    color: '#999999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  'cart-card-discountBadge': {
    backgroundColor: '#FFEEE2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  'cart-card-discountText': {
    color: '#FF6B00',
    fontWeight: '600',
    fontSize: 11,
  },
  'cart-card-quantityRow': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  'cart-card-quantitySelector': {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B00',
    borderRadius: 8,
    overflow: 'hidden',
  },
  'cart-card-quantityButton': {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  'cart-card-quantityButtonIcon': {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  'cart-card-quantityText': {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
    paddingHorizontal: 8,
  },
  'cart-card-deliveryText': {
    fontSize: 14,
    color: '#666666',
  },
  'cart-card-buttonsContainer': {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    
  },
  'cart-card-actionButton': {
    flex: 1,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  'cart-card-actionButtonText': {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  'cart-card-divider': {
    width: 1,
    backgroundColor: '#EEEEEE',
  },
  flatList: {
    width: '100%', // Adjust width as needed
    // Adjust height as needed
  },
});

export default Cart;