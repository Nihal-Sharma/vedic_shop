import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const AddressCard = (item :any) =>{
    return (
        <TouchableOpacity style = {styles.CardContainer}>
            <View style = {styles.AddressSelect}><MaterialIcons name="radio-button-unchecked" size={24} color="black" /></View>
            <View style = {styles.detailBox}>
                <View style ={{display :'flex', flexDirection :'row' ,gap :10}}>
                    <View><Text style = {{fontWeight :500, fontSize :14}}> {item.name}</Text></View>
                    <View style = {styles.addBoxx}><Text style = {styles.addressType}> {item.type} </Text></View>
                </View>
                <Text style ={{fontSize :14 , color :'rgba(0, 0, 0, 0.6)', marginTop :8 , maxWidth :'100%' }}>{item.address}</Text>
                <Text style = {{fontSize :14 , color :'rgba(0, 0, 0, 0.6)', marginTop :2}}>Mobile :{item.phone}</Text>
                <View style = {styles.butContainers}>
                    <TouchableOpacity style = {styles.button}>
                        <Text style ={{fontSize :12}}>REMOVE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.button}>
                        <Text style ={{fontSize :12}}>EDIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </TouchableOpacity>
    );
}

const AddressModal = () => {
    const addressData = [
        {
        name :'Ved Shukla',
        address :'1547, Sector 7-C, Chandigarh 160019',
        phone :'+91 7880652040',
        _id : '1',
        type :'Home'
    },{
        name :'Nirmanyu Verma',
        address :'1801, Sector 17, Chandigarh 160019',
        phone :'+91 9888480672',
        _id : '2',
        type :'Office'
    }
    ]
  return (
    <View style={styles.container}>
        <FlatList
            data={addressData}
            renderItem={({item}) =>{return AddressCard(item)}}
            keyExtractor={(item) => item._id.toString()}
        />
        <TouchableOpacity style = {styles.ConfirmBut}>
                <Text style = {{textAlign :'center', color :'white', fontSize :14 , fontWeight :600}}>CONFIRM</Text>
        </TouchableOpacity>
    </View>
  )
}

export default AddressModal

const styles = StyleSheet.create({
    container :{
        paddingHorizontal :15,
        backgroundColor :'white'
    },
    CardContainer:{
        flexDirection :'row',
        borderWidth :0.2,
        borderRadius :10,
        padding :16,
        gap :5,
        marginTop :5,
        
    },
    AddressSelect:{
          
    },detailBox:{

    },
    addressType:{
        // backgroundColor :'rgba(255, 114, 11, 0.14)',
        color :'#FF720B',
    
        fontSize :12,
        // borderRadius :10,
        // borderWidth :1,
        // borderColor :'black'        
    },
    addBoxx:{
       backgroundColor :'rgba(255, 114, 11, 0.14)',
       paddingVertical :4,
       paddingHorizontal :5,
       borderRadius :4,
        borderWidth :0.5,
        borderColor :'#FF720B' 
    },
    butContainers:{
        flexDirection :'row',
        gap :10,
        marginTop :14

    },button:{
        borderWidth :0.5,
        borderColor :'rgba(0, 0, 0, 50)',
        borderRadius : 7,
        paddingHorizontal :12,
        paddingVertical :5
    },
    ConfirmBut:{
        backgroundColor :"#FF6B00",
        borderRadius :12,
        paddingVertical :13,
        marginTop :16
    }
})