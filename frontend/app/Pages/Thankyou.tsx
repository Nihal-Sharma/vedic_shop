// app/Thankyou.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Thankyou() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    if (secondsLeft === 0) {
      // time’s up! go home
      router.replace("/"); // or router.push('/') if you want to keep history
      return;
    }
    const id = setTimeout(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearTimeout(id);
  }, [secondsLeft, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thank you!</Text>
      <Text style={styles.countdown}>
        Redirecting in {secondsLeft} second{secondsLeft !== 1 ? "s" : ""}…
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", // or your app background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 12,
  },
  countdown: {
    fontSize: 18,
    color: "#555",
  },
});
