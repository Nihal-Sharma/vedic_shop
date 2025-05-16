import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";


/* -----------------------------------------
   Replace the image URLs when you have them
------------------------------------------*/


const CARD_SIZE = 120; // width & height of the picture
const GAP =6; // space between cards
const SCREEN_WIDTH = Dimensions.get("window").width;

const EcommSacred = () => {
  const CARD_DATA = [
  {
    title: "Car Dash",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/car-min.webp",
  },
  {
    title: "Study Table",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/study-min.webp",
  },
  {
    title: "Home",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/homeCat-min.webp",
  },
  {
    title: "Shop",
    image:
      "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/store-min.webp",
  },
];
  const [fontsLoaded] = useFonts({
                "SAMARN__": require("../../assets/fonts/SAMARN__.ttf"),
                "Alkatra-Medium": require("../../assets/fonts/Alkatra-Medium.ttf"),
                "Inter_18pt-Medium": require("../../assets/fonts/Inter_18pt-Medium.ttf"),
                "OpenSans-Regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
                "OpenSans-Bold": require("../../assets/fonts/OpenSans-Bold.ttf"),
                "OpenSans-SemiBold": require("../../assets/fonts/OpenSans-SemiBold.ttf"),
                "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
                "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
                "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
              });
  const handlePress = (title: string) => {
    console.log("Pressed:", title); // hook into navigation / filters
  };

  const renderItem = ({ item }: { item: (typeof CARD_DATA)[0] }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handlePress(item.title)}
      style={{ width: CARD_SIZE }}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.caption}>{item.title}</Text>
    </TouchableOpacity>
  );
  if (!fontsLoaded) return <ActivityIndicator style={{ marginTop: 20 }} />;
  return (
    <LinearGradient
      colors={["rgba(229,130,13,0.8)", "rgba(242,239,19,0.0624)"]} // subtle yellow–peach, tweak as desired
      style={styles.wrapper}
    >
      <Image
        source={{
          uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/bar55.png",
          
        }}
        style={{
          height:5,width: SCREEN_WIDTH, position: "absolute", top: 0,}}
      />
      <Text style={styles.header}>Sacred Spaces .</Text>

      <FlatList
        data={CARD_DATA}
        horizontal
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: GAP }}
        ItemSeparatorComponent={() => <View style={{ width: 1 }} />}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={CARD_SIZE + GAP} // optional: “pew pew” snapping
      />
    </LinearGradient>
  );
};

/* ------------------------------ styles ------------------------------ */
const styles = StyleSheet.create({
  wrapper: {
    width: SCREEN_WIDTH,
    paddingVertical: 20,
    paddingLeft: 15,
    marginTop: -25,
    position: "relative",
  },
  header: {
    fontSize: 18,
    // fontWeight: "700",
    fontFamily: "Alkatra-Medium",
    marginLeft: GAP,
    color: "white",
    marginBottom: 14,
  },
  image: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 18,
  },
  caption: {
    marginTop: 4,
    textAlign: "center",
    // fontWeight: "600",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
});

export default EcommSacred;
