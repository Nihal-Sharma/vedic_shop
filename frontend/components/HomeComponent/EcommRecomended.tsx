import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import EcomProduct, { EcomProductProps } from "./EcommProduct"; // ⬅️ make sure the file name matches
import { fetchAllProducts } from "../api/FetchProduct"; // ⬅️ adjust the path
import mainStore from "../../store/mainStore";
import { SafeAreaView } from "react-native-safe-area-context";

const EcommRecomended = () => {
  const [products, setProducts] = useState<EcomProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseURL = mainStore((state)=>state.baseURL);
  /* --- fetch once on mount --- */

  const sortAscending = () => {
    const sorted = [...products].sort((a, b) => a.discountedPrice - b.discountedPrice);
    setProducts(sorted);
  };

  const sortDescending = () => {
    const sorted = [...products].sort((a, b) => b.discountedPrice - a.discountedPrice);
    setProducts(sorted);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAllProducts(baseURL); // call your API helper
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Could not load products.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;
  if (error)
    return <Text style={{ color: "red", padding: 16 }}>Error: {error}</Text>;

  return (
    <SafeAreaView>
       <View style={styles.buttonRow}>
        <Button title="Sort Asc" onPress={sortAscending} />
        <Button title="Sort Desc" onPress={sortDescending} />
      </View>
    <View
      style={{
        marginTop: 16, 
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#ffffff",
        borderRadius: 12,
      }}
    >
       
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1f2937" }}>
          Rudraksha
        </Text>
      </View>

      <FlatList
        data={products}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <EcomProduct {...item} />}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ padding: 16 }}>No products found.</Text>
        }
      />
       
    </View></SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop : 20
  },
  item: {
    fontSize: 18,
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});
export default EcommRecomended;
