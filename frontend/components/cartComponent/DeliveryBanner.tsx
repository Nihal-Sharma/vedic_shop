import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const DeliveryBanner = ({ 
  amountToUnlock = 251, 
  pincode = '160019',
}) => {
  return (
    <View style={styles['banner-container']}>
        
      {/* Free delivery progress section */}
       
      <View style={styles['banner-deliveryContainer']}>
        <View style={styles['banner-truckIconContainer']}>
          <Text style={styles['banner-truckIcon']}>🚚</Text>
        </View>
        <View style={styles['banner-textContainer']}>
          <Text style={styles['banner-deliveryText']}>
            Shop for <Text style={styles['banner-boldText']}>Rs.{amountToUnlock}</Text> more to Unlock{' '}
            <Text style={styles['banner-boldText1']}>FREE DELIVERY</Text>
          </Text>
        </View>
      </View>
      
      {/* Progress bar */}
      <View style={styles['banner-progressBarContainer']}>
        <View style={styles['banner-progressBarBackground']}>
          <View style={styles['banner-progressBarFill']} />
        </View>
      </View>
      
      {/* Location section */}
    </View>
  );
};

const styles = StyleSheet.create({
  'banner-container': {
    width: '100%',
    marginBottom :10
  },
  'banner-deliveryContainer': {
    backgroundColor: '#c1e6c1', // Light green background
    paddingLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent :'flex-start'
    ,paddingTop:14,
    paddingBottom: 10
  },
   background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  'banner-truckIconContainer': {
    marginRight: 10,
  },
  'banner-truckIcon': {
    fontSize: 24,
    color: '#f8b600', // Yellow color for the truck
  },
  'banner-textContainer': {
    
    
  },
  'banner-deliveryText': {
    fontSize: 13,
    color: '#333',
    fontWeight :400
  },
  'banner-boldText': {
    fontWeight: 400,
    color: '#000',
  },
  'banner-boldText1': {
    fontWeight: 600,
    color: '#000',
  },
  'banner-progressBarContainer': {
    paddingBottom: 13,
    backgroundColor: '#c1e6c1',
    paddingLeft :30,
    paddingRight :15
  },
  'banner-progressBarBackground': {
    height: 9,
    backgroundColor: '#fff',
    borderRadius: 11,
    overflow: 'hidden',
  },
  'banner-progressBarFill': {
    height: '100%',
    width: '20%', // This represents progress - adjust as needed
    backgroundColor: '#0a8f0a', // Dark green progress
    borderRadius: 4,
  },
  'banner-locationContainer': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#fff',
    marginTop : 10
  },
  'banner-locationText': {
    fontSize: 14,
    color: 'grey',
  },
  'banner-locationPin': {
    fontSize: 14,
    color: 'black',
  },
  'banner-changeButton': {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#FF3C00',
    borderRadius: 20,
  },
  'banner-changeButtonText': {
    color: '#FF3C00',
    fontWeight: '500',
    fontSize :12
  },
});

export default DeliveryBanner;