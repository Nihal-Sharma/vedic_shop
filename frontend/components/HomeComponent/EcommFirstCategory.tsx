import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

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
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/category3.png",
  },
  {
    title: "Temple",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/category4.png",
  },
];

const EcommFirstCategory = () => {
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
                width: 69,
                height: 67,
                borderRadius: 10,
                backgroundColor: "#f0f0f0",
              }}
              resizeMode="cover"
            />
            <Text style={{ marginTop: 5, fontSize: 12 }}>{item.title}</Text>
          </View>
        ))}

        {/* See All Button */}
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/categorySeeAll.png",
            }}
            style={{
              width: 69,
              height: 67,
              borderRadius: 10,
              backgroundColor: "#f0f0f0",
            }}
            resizeMode="cover"
          />
          <Text style={{ color: "#ff6600", fontWeight: "bold", fontSize: 12 }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EcommFirstCategory;
