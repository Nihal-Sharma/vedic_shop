import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import useCart from '@/store/cart';




const Bill = () => {
    const cartProducts = useCart((state)=>state.cartProducts)
    const totalQuantity  = useCart((state)=> state.globalQuantity)

 const { totalOriginal, totalDiscounted } = useMemo(() => {
     return cartProducts.reduce(
    (acc, item) => {
      acc.totalOriginal = acc.totalOriginal + (item.originalPrice * item.quantity );
      acc.totalDiscounted += (item.discountedPrice * item.quantity );
      return acc;
    },
    { totalOriginal: 0, totalDiscounted: 0 }
  );
}, [cartProducts]);

const DeliveryCharge = 0;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bill details</Text>
      
      <View style={styles.row}>
        <View style={styles.leftContainer}>
          <Text style={styles.itemText}>Item total x <Text style = {{fontWeight :'bold'}}>{totalQuantity}</Text> </Text>
        </View>
        <Text style={styles.priceText}> ₹ {totalOriginal}.0</Text>
      </View>
      
      <View style={styles.row}>
        <View style={styles.leftContainer}>
          <Text style={styles.itemText}>Discount Price</Text>
        </View>
        <Text style={styles.discountText}>- ₹ {totalOriginal - totalDiscounted} </Text>
      </View>
      
      <View style={styles.row}>
        <View style={styles.leftContainer}>
          <Text style={styles.itemText}>Delivery Charge</Text>
        </View>
        <Text style={styles.freeText}>{DeliveryCharge > 0 ? `₹${DeliveryCharge}` : "FREE"}</Text>
      </View>
      
      {/* <View style={styles.divider} /> */}
      
      
      <View style={styles.separator} />
      
      <View style={styles.row}>
        <Text style={styles.totalText}>Total Amount</Text>
        <Text style={styles.totalAmountText}> ₹ {totalDiscounted}.0</Text>
      </View>
    </View>
  )
}

export default Bill

const styles = StyleSheet.create({
    container: {
    borderWidth: 1,
    borderColor: '#D0CECC',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop :10
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '500',
  },
  discountText: {
    fontSize: 14,
    color: '#1AA11F',
    fontWeight: '500',
  },
  freeText: {
    fontSize: 14,
    color: '#1AA11F',
    fontWeight: '500',
  },
  divider: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 8,
  },
  subTotalRow: {
    marginVertical: 8,
  },
  subTotalText: {
    fontSize: 16,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff7518',
  },
})