import { ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
const GiftnCoupon = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/gift.webp')} // Path to your image
        style={styles.giftContainer}
        resizeMode="cover" // or 'stretch', 'contain', 'repeat', 'center'
    >
    <View style = {styles.left}>
        <AntDesign name="gift" size={30} color="#C90338" />
        <View style ={styles.text}>
            <Text style ={{fontSize :14, fontWeight :"regular" , color :'#CD073A'}}>Make this as a Gift!</Text>
            <Text style ={{fontSize :14, fontWeight :"bold" , color :'#CD073A'}}>₹ 29/-</Text>
        </View>
    </View>

    <TouchableOpacity style={styles.right}>
        <Text style = {{color :'#CD073A' ,fontWeight :400, fontSize :12 }}>Select</Text>
    </TouchableOpacity>

    </ImageBackground>

    <TouchableOpacity style = {styles.applyCoupon}>
        <View style = {styles.CouponLeft}>
            <Text style ={{fontSize : 14, fontWeight :'bold' , color :'#282828'}}>Apply Coupon</Text>
            <Text style ={{fontSize : 13, fontWeight :'regular' , color :'#666666'}}>Save more with coupons available for you</Text>
        </View>
        <View style = {styles.CouponRight}>
            <EvilIcons name="arrow-right" size={30} color="#666666" />
        </View>
    </TouchableOpacity>
    </View>
  )
}

export default GiftnCoupon

const styles = StyleSheet.create({
    container: {
        width : '100%',
        
        paddingHorizontal :14,
       
    },
    giftContainer:{
      display :'flex',
      flexDirection :'row',
      justifyContent :'space-between',
      paddingHorizontal :20,
      alignItems :'center' ,
      paddingVertical : 14,
      
      borderWidth :1, 
      borderColor :"white",
      borderRadius :50,
    },
    left:{
        display :'flex',
        flexDirection :'row',
        alignItems :'center',
    },
    right :{
       paddingHorizontal:13,
       paddingVertical : 8,
       borderRadius : 9,
       borderColor :'#F02F61',
       borderWidth :1,
       backgroundColor :"white"
    },
    text:{
        marginLeft :10
    },
    applyCoupon:{
        
        borderWidth :0.6,
        borderColor :"#D0CECC",
        borderRadius :12,
        marginTop :11,
        display :'flex',
        flexDirection :'row',
        justifyContent :'space-between',
        padding :17,
        backgroundColor :'white'
    },
    CouponLeft:{},
    CouponRight :{}
    
})