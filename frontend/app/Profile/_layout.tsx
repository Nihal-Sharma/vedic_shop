import { Stack } from "expo-router";

export default function SplashLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" />
      <Stack.Screen name="EditProfile" />
      <Stack.Screen name="MyOrder" />
      <Stack.Screen name="AddressBook"  />
      <Stack.Screen name="CustomerCare"  />
      <Stack.Screen name="ChatBot"  />
    </Stack>
  );
}
