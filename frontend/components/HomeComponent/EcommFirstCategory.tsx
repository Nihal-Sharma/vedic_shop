import { View, Text, Image, TouchableOpacity, Dimensions, useWindowDimensions, ActivityIndicator } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useFonts } from "expo-font";





const EcommFirstCategory = () => {
  const [fontsLoaded] = useFonts({
      "SAMARN__": require("../../assets/fonts/SAMARN__.ttf"),
      "Inter_18pt-Medium": require("../../assets/fonts/Inter_18pt-Medium.ttf"),
      "OpenSans-Regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
      "OpenSans-Bold": require("../../assets/fonts/OpenSans-Bold.ttf"),
      "OpenSans-SemiBold": require("../../assets/fonts/OpenSans-SemiBold.ttf"),
      "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    });

  const { width } = useWindowDimensions();
    const categories = [
  {
    title: "New Launch",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/category1.png",
  },
  {
    title: "Bracelet",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/category2.png",
  },
  {
    title: "Silver Idol",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/trishul.png",
  },
  {
    title: "Temple",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/category4.png",
  },
];
  // Responsive size for small screens
  const isSmallScreen = width < 392;
  const itemSize = isSmallScreen ? 55 : 69;
  const itemHeight = isSmallScreen ? 53 : 67;
  const fontSize = isSmallScreen ? 10 : 12;

  if (!fontsLoaded) return <ActivityIndicator style={{ marginTop: 20 }} />;
  return (
    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap", // optional, in case screen is small
        }}
      >
        {categories.map((item, index) => (
          <View key={index} style={{ alignItems: "center" }}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: itemSize,
                height: itemHeight,
                borderRadius: 10,
                backgroundColor: "#f0f0f0",
              }}
              resizeMode="cover"
            />
            <Text
              style={{
                marginTop: 5,
                fontSize: fontSize,
                
              }}
            >
              {item.title}
            </Text>
          </View>
        ))}

        {/* See All Button */}
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/categorySeeAll.png",
            }}
            style={{
              width: itemSize,
              height: itemHeight,
              borderRadius: 10,
              backgroundColor: "#f0f0f0",
            }}
            resizeMode="cover"
          />
          <Text
            style={{
              color: "#ff6600",
               
              fontSize: fontSize,
              marginTop: 5,
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EcommFirstCategory;
