import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Switch } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";


export default function Profile() {
  const router = useRouter();
  const [notifyEnabled, setNotifyEnabled] = useState(false);

  const menuOptions = [
    { title: "Profile", route: "/Profile/EditProfile" },
    { title: "My Order", route: "/Profile/MyOrder" },
    { title: "Address Book", route: "/Profile/AddressBook" },
  ] as const;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fffaf5", // bg-[#fffaf5]
        paddingHorizontal: 16, // px‑4
        paddingTop: 40, // pt‑10 (Tailwind 10 = 2.5 rem → 40 px)
      }}
    >
      {/* ───── Header ───── */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16, // mb‑4
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: 16 /* mr‑4 */ }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18 /* text‑lg */,
            fontWeight: "600" /* semibold */,
          }}
        >
          Profile
        </Text>
      </View>

      {/* ───── Profile info ───── */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16, // Tailwind space‑x‑4
          padding: 16, // p‑4
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb", // gray‑200
        }}
      >
        <Image
          source={{
            uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/logo.png",
          }}
          style={{ width: 40, height: 40 }} // w‑10 h‑10
        />
        <Text
          style={{
            color: "#ea580c", // orange‑600
            fontWeight: "700", // bold
            fontSize: 18, // text‑lg
          }}
        >
          USER
        </Text>
      </View>

      {/* ───── Main menu ───── */}
      <View
        style={{
          marginTop: 16, // mt‑4
          backgroundColor: "#ffffff", // bg‑white
          borderRadius: 8, // rounded‑lg
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05, // Tailwind shadow‑sm ≈ 0.05
          shadowRadius: 1,
          elevation: 1,
        }}
      >
        {menuOptions.map((item) => (
          <TouchableOpacity
            key={item.route}
            onPress={() => router.push(item.route)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16, // p‑4
              borderBottomWidth: 1,
              borderBottomColor: "#f3f4f6", // gray‑100
            }}
          >
            <Text style={{ color: "#1f2937", fontSize: 16 /* text‑base */ }}>
              {item.title}
            </Text>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        ))}
        {/* Notification Toggle */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <Text style={{ color: "#1f2937", fontSize: 16 }}>Notification</Text>
          <Switch
            value={notifyEnabled}
            onValueChange={setNotifyEnabled}
            trackColor={{ false: "#ccc", true: "#4ade80" }}
            thumbColor={notifyEnabled ? "#16a34a" : "#f4f3f4"}
          />
        </View>
      </View>
      {/* </View> */}

      {/* ───── Info links ───── */}
      <View
        style={{
          marginTop: 16,
          backgroundColor: "#ffffff",
          borderRadius: 8,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 1,
          elevation: 1,
        }}
      >
        {["FAQ", "About Us", "Terms of Use", "Privacy Policy"].map(
          (label, idx) => (
            <TouchableOpacity
              key={label}
              onPress={() => console.log(`${label} clicked`)}
              style={{
                padding: 16, // p‑4
                borderBottomWidth: idx === 3 ? 0 : 1,
                borderBottomColor: "#f3f4f6",
              }}
            >
              <Text style={{ color: "#374151" /* gray‑700 */ }}>{label}</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* ───── Help & Share Row ───── */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start", // align left
          marginTop: 16, // mt-4
        }}
      >
        {/* Help Centre Button */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#d1d5db", // gray-300
            paddingVertical: 8, // py-2
            paddingHorizontal: 12, // px-3
            borderRadius: 6, // rounded-md
            marginRight: 12, // space between
          }}
          onPress={() => router.push("/Profile/CustomerCare")}
        >
          <Feather name="headphones" size={20} color="grey" />
          <Text
            style={{ fontWeight: "500", paddingLeft: 10 /* font-medium */ }}
          >
            Help Centre
          </Text>
          <AntDesign
            name="right"
            size={16}
            color="gray"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>

        {/* Share the App Button */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#d1d5db", // gray-300
            paddingVertical: 8, // py-2
            // paddingHorizontal: 12, // px-3
            borderRadius: 6, // rounded-md
          }}
          onPress={() => console.log("Share the App")}
        >
          <FontAwesome
            name="share"
            size={16}
            color="gray"
            style={{ marginLeft: 8 }}
          />
          <Text
            style={{ fontWeight: "500", paddingLeft: 10 /* font-medium */ }}
          >
            Share the App
          </Text>
          <AntDesign
            name="right"
            size={16}
            color="gray"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>

      {/* ───── Logout ───── */}
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "#ef4444", // red‑500
          marginTop: 24, // mt‑6
          paddingVertical: 12, // py‑3
          borderRadius: 6, // rounded‑md
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#dc2626", fontWeight: "700" /* bold */ }}>
          LOG OUT
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
