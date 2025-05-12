import { Stack } from "expo-router";

export default function SplashLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductDetail" />
      {/* <Stack.Screen name="Heloo" /> */}
      {/* <Stack.Screen name="ProductDetail" /> */}
    </Stack>
  );
}
