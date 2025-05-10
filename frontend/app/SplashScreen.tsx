import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

const SplashScreen: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/(splash)/login"); // Replace with your actual route
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>----- Welcome To Vedic Shop -----</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SplashScreen;
