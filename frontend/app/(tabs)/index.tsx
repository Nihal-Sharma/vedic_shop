// app/HomeScreen.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// --- Your mock or fetched data source ---
type Product = {
  _id: string;
  productName: string;
  productCategory: { id: string; name: string };
  productImages: string[];
};



// Your existing section components
import EcomNavBar from "@/components/HomeComponent/EcomNavBar";
import EcommFirstCategory from "@/components/HomeComponent/EcommFirstCategory";
import EcommBanner from "@/components/HomeComponent/EcommBanner";
import EcommBestSeller from "@/components/HomeComponent/EcommBestSeller";
import EcommSilver from "@/components/HomeComponent/EcommSilver";
import EcommSecondCategory from "@/components/HomeComponent/EcommSecondCategory";
import EcommSacred from "@/components/HomeComponent/EcommSacred";
import EcommOccasion from "@/components/HomeComponent/EcommOcassion";
import EcommFestival from "@/components/HomeComponent/EcommFestivel";
import EcommBrass from "@/components/HomeComponent/EcommBrass";
import EcommCombo from "@/components/HomeComponent/EcommCombo";
import EcommBanner2 from "@/components/HomeComponent/EcommBanner2";
import EcommGrid from "@/components/HomeComponent/EcommGrid";
import mainStore from "@/store/mainStore";

export default function HomeScreen() {
  const sections = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState<Product[]>([]);
  const products = mainStore((state)=>state.allProducts)
  useEffect(() => {
    if (text.trim() === "") {
      setFiltered([]);
      return;
    }
    // find up to 4 matches
    const matches = products.filter((p) =>
      p.productName.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(matches.slice(0, 4));
  }, [text]);

  const renderSuggestion = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.suggestionRow}
      onPress={() =>
        router.push({
          pathname: "/Detail/[id]",
          params: { id: item._id },
        })
      }
    >
      <Image
        source={{ uri: item.productImages[0] }}
        style={styles.suggestionImage}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.suggestionName}>{item.productName}</Text>
        <Text style={styles.suggestionCat}>{item.productCategory.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <EcomNavBar />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search “Om Bracelet”"
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={text}
            onChangeText={setText}
          />
          <Feather name="search" size={20} color="#444" />
        </View>

        {/* Suggestions Dropdown */}
        {filtered.length > 0 && (
          <View style={styles.dropdown}>
            <FlatList
              data={filtered}
              keyExtractor={(p) => p._id}
              renderItem={renderSuggestion}
            />
          </View>
        )}

        {/* Your existing sections */}
        <FlatList
          data={sections}
          keyExtractor={(_, idx) => idx.toString()}
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
              default:
                return null;
            }
          }}
          contentContainerStyle={{ paddingBottom: 20 }}
          initialNumToRender={3}
          maxToRenderPerBatch={1}
          windowSize={9}
        
        />

        {/* Chatbot FAB */}
        <TouchableOpacity
          onPress={() => router.push("/Profile/ChatBot")}
          style={styles.chatbotButton}
        >
          <Image
            source={{
              uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/robote.png",
            }}
            style={{ width: 27, height: 30 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#B2B2B2",
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 15,
    elevation: 2,
  },
  searchInput: { flex: 1, height: 40 },
  dropdown: {
    position: "absolute",
    top: 160, // adjust to sit right below your search bar
    left: 10,
    right: 10,
    backgroundColor: "#FFF0E7",
    zIndex: 10,
    padding: 8,
    borderRadius: 8,
    elevation: 4,
  },
  suggestionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  suggestionImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  suggestionName: {
    fontSize: 14,
    fontWeight: "500",
  },
  suggestionCat: {
    fontSize: 12,
    color: "#555",
  },
  chatbotButton: {
    position: "absolute",
    bottom: 200,
    right: 20,
    backgroundColor: "black",
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
});
