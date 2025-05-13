import { Stack } from "expo-router";

export default function SplashLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notification" />
      <Stack.Screen name="Thankyou" />
      {/* <Stack.Screen name="Heloo" /> */}
      {/* <Stack.Screen name="ProductDetail" /> */}
    </Stack>
  );
}
