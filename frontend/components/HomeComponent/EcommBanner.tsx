import { View, Text, Image } from 'react-native'
import React from 'react'

const EcommBanner = () => {
  return (
    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
      <Image
        source={{
          uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/banner-min.webp",
        }}
        style={{
          width: "100%",
          height: 210,
          borderRadius: 10,
          backgroundColor: "#f0f0f0",
        }}
      />
    </View>
  );
}

export default EcommBanner