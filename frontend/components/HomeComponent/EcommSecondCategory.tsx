import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";

const categories = [
  {
    title: "Wealth",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/wealth.png",
  },
  {
    title: "Health",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/health.png",
  },
  {
    title: "Love",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/love.png",
  },
  {
    title: "Spiritual",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/spritual.png",
  },
];

const EcommSecondCategory = () => {
  const handlePress = (category: string) => {
    console.log("Pressed:", category);
  };

  return (
    <View>
      <ImageBackground
        source={{
          uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/net.png",
        }}
        style={{
          width: "100%",
          height: 250,
          //   borderRadius: 12,
          //   padding: 10,
          //   justifyContent: "center",
          //   alignItems: "center",
        }}
      >
        <View style={{ paddingHorizontal: 15 }}>
          <View
            style={{
              padding: 10,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#ccc",
              marginBottom: 12,
              width: 190,
              //   flex: 1,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              SHOP BY PURPOSE
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {categories.map((item) => (
              <TouchableOpacity
                key={item.title}
                onPress={() => handlePress(item.title)}
                style={{ alignItems: "center", flex: 1, marginHorizontal: 4 }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 90,
                    height: 87,
                    borderRadius: 12,
                    marginBottom: 6,
                  }}
                  resizeMode="cover"
                />
                <Text style={{ fontSize: 14, fontWeight: "500" }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default EcommSecondCategory;
