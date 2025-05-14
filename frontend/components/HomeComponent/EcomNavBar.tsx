import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo, FontAwesome5, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFonts } from "expo-font";

const EcomNavBar = () => {
  const [fontsLoaded] = useFonts({
    "SAMARN__": require("../../assets/fonts/SAMARN__.ttf"),
    "OpenSans-Regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("../../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-SemiBold": require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingTop: 35,
        paddingBottom: 10,
        elevation: 2,
      }}
    >
      {/* Nav Bar */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          backgroundColor: "#fff",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={{
              uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/logo.png",
            }}
            resizeMode="contain"
            style={{ width: 46, height: 47 }}
          />
          <Text
            style={{ fontSize: 18, fontFamily: "SAMARN__", color: "#E2660C" }}
          >
            Vedic Shop
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <TouchableOpacity onPress={() => router.push("/Pages/Notification")}>
            <FontAwesome5 name="bell" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/Profile/profile")}>
            <FontAwesome5 name="user-circle" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
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
        }}
      >
        <TextInput
          placeholder="Search “Om Bracelet”"
          placeholderTextColor="#999"
          style={{ flex: 1, height: 40 }}
        />
        <Feather name="search" size={20} color="#444" />
      </View>
    </View>
  );
};

export default EcomNavBar;
