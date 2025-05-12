import { View, Text, Image } from 'react-native'
import React from 'react'

const EcommBanner2 = () => {
  return (
    <View>
      <Image
        source={{
          uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/bann-min.webp",
        }}
        style={{
          width: "100%",height: 850,}}
      />
    </View>
  );
}

export default EcommBanner2