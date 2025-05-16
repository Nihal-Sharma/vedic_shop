import { View, Text,ScrollView, FlatList, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import EcommRecomended from '@/components/HomeComponent/EcommRecomended'
import EcommCard from '@/components/HomeComponent/EcommCard'
import EcomNavBar from '@/components/HomeComponent/EcomNavBar'
import EcommFirstCategory from '@/components/HomeComponent/EcommFirstCategory'
import EcommBanner from '@/components/HomeComponent/EcommBanner'
import EcommBestSeller from '@/components/HomeComponent/EcommBestSeller'
import EcommSilver from '@/components/HomeComponent/EcommSilver'
import EcommSecondCategory from '@/components/HomeComponent/EcommSecondCategory'
import EcommBrass from '@/components/HomeComponent/EcommBrass'
import EcommCombo from '@/components/HomeComponent/EcommCombo'
import EcommGrid from '@/components/HomeComponent/EcommGrid'
import EcommSacred from '@/components/HomeComponent/EcommSacred'
import EcommBanner2 from '@/components/HomeComponent/EcommBanner2'
import EcommOccasion from '@/components/HomeComponent/EcommOcassion'
import EcommFestival from '@/components/HomeComponent/EcommFestivel'
import { router } from 'expo-router'
import { Feather } from "@expo/vector-icons";
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'

const HomeScreen = () => {
  const sections = [ "1" , "2" , "3", "4", "5", "6", "7", "8", "9", "10" , "11","12"];
  const [text, setText] = useState('');
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={{ position: "relative" , backgroundColor :'white'}}>
        <EcomNavBar />
        {/* Search BAr */}
        <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#B2B2B2",
          borderRadius: 10,
          marginHorizontal: 10,
          paddingHorizontal: 15,
          marginTop: 1,
          marginBottom :10,
          elevation :2
        }}
      >
        <TextInput
          placeholder="Search “Om Bracelet”"
          placeholderTextColor="#999"
          style={{ flex: 1, height: 40 }}
          onChangeText={newText => setText(newText)}
        />
        <Feather name="search" size={20} color="#444" />
         </View>
        {text !== '' && (
       <View style={{
        position: 'absolute',
        top: 150, // adjust this based on EcomNavBar height
        left: 11,
        right: 11,
        backgroundColor: '#FFF0E7',

        zIndex: 10,
        padding: 10,
        borderRadius : 10,

        
      }}>
        <Text>{text}</Text>
      </View>
    )}

        <FlatList
          data={sections} // an array like ['firstCategory', 'banner', 'bestSeller', ...]
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            switch (item) {
              case "1":
                return <EcommFirstCategory />;
              case "2":
                return <EcommBanner />;
              case "3":
                return <EcommBestSeller />;
              case "4":
                return <EcommSilver />;
              case "5":
                return <EcommSecondCategory />;
              case "6":
                return <EcommSacred />;
               case "7":
                return <EcommOccasion />;
              case "8":
                return <EcommFestival />;
              case "9":
                return <EcommBrass />;
              case "10":
                return <EcommCombo />;
              case "11":
                return <EcommBanner2 />;
              case "12":
                return <EcommGrid />;

              // ... other cases
              default:
                return null;
            }
          }}
          contentContainerStyle={{ backgroundColor: "white" }}
          initialNumToRender={3}
          maxToRenderPerBatch={1}
          windowSize={9}
        />
        <TouchableOpacity onPress={()=>{router.push('/Profile/ChatBot')}} style={{position:"absolute",bottom:200,right:20,backgroundColor:"black",borderRadius:50,paddingHorizontal:15,paddingVertical:14}}>
          <Image
            source={{
              uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/robote.png",
            }}
            style={{width:27,height:30}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default HomeScreen