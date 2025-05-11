/* app/_layout.tsx  (or wherever your Tabs live) */
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Platform,
} from "react-native";
import { Tabs, useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import {
  AntDesign,
  Entypo,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";

/* ─────────────────────────────────────────────────────────── */
/*  Custom expandable‑fab TabBarButton                         */
/* ─────────────────────────────────────────────────────────── */
function QuickActionsTab({ accessibilityState, ...rest }: any) {
  const selected = accessibilityState?.selected;
  const router = useRouter();

  // local open / close state
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current; // 0 ⇒ closed, 1 ⇒ open

  const toggle = () => {
    Animated.timing(anim, {
      toValue: open ? 0 : 1,
      duration: 220,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => setOpen(!open));
  };

  /* translate & fade the two option buttons */
  const astroStyle = {
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -150], // top circle
        }),
      },
    ],
    opacity: anim,
  };
  const vedicStyle = {
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60], // middle circle
        }),
      },
    ],
    opacity: anim,
  };

  return (
    <View style={{ width: 70, alignItems: "center" }}>
      {/* ── ACTION 1 ── */}
      <Animated.View style={[styles.actionContainer, astroStyle]}>
        <TouchableOpacity
          onPress={() => {
            setOpen(false);
            anim.setValue(0);
            // router.push("/astro"); // 🔀 change to your route
          }}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#2E0443", "#2E0443"]}
            style={[styles.actionCircle, { borderWidth: 0 }]}
          >
            <Entypo name="baidu" size={26} color="#fff" />
          </LinearGradient>
          <Text style={styles.actionLabel}>Astro Vaibhav</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* ── ACTION 2 ── */}
      <Animated.View style={[styles.actionContainer, vedicStyle]}>
        <TouchableOpacity
          onPress={() => {
            setOpen(false);
            anim.setValue(0);
            // router.push("/vedic"); // 🔀 change to your route
          }}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#FF6B00", "#FF6B00"]}
            style={styles.actionCircle}
          >
            <Entypo name="lab-flask" size={26} color="#fff" />
          </LinearGradient>
          <Text style={[styles.actionLabel, { color: "#FF6B00" }]}>
            Vedic Vaibhav
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* ── MAIN FAB (the actual tab icon) ── */}
      <TouchableOpacity
        {...rest}
        activeOpacity={0.9}
        onPress={toggle}
        style={styles.mainFabWrapper}
      >
        {/* <LinearGradient
          colors={["#ffffff", "#ffffff"]}
          style={styles.mainFabCircle}
        >
          <AntDesign
            name={open ? "close" : "down"}
            size={26}
            color="#FF6B00"
            style={{ transform: [{ rotate: open ? "180deg" : "0deg" }] }}
          />
        </LinearGradient> */}
      </TouchableOpacity>
    </View>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Tabs Navigator                                             */
/* ─────────────────────────────────────────────────────────── */
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FD4380",
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
      }}
    >
      {/* regular tabs */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Categories",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="category" size={24} color={color} />
          ),
        }}
      />

      {/* continue with the rest of your tabs */}
      <Tabs.Screen
        name="Wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="heart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bag-handle-outline" size={24} color={color} />
          ),
        }}
      />
      {/* ────────────────────────────────────────────── */}
      {/*    ➕  THE NEW EXPANDABLE “QUICK ACTIONS” TAB   */}
      {/* ────────────────────────────────────────────── */}
      <Tabs.Screen
        name="quick-actions" // this file can be empty; we never navigate to it
        options={{
          // href: null, // don't show in the router hierarchy
          title: "Quick",
          tabBarButton: QuickActionsTab, // ← our custom button
        }}
      />
    </Tabs>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Styles                                                     */
/* ─────────────────────────────────────────────────────────── */
const CIRCLE = 60;
const styles = StyleSheet.create({
  /* each popped‑up action lives in its own absolute wrapper
     so touches are handled properly */
  actionContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
  },
  actionCircle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 3,
  },
  actionLabel: {
    // marginTop: 6,
    fontSize: 11,
    fontWeight: "600",
    color: "#2E0443",
  },
  mainFabWrapper: {
    marginTop: 0, // pull it up a bit so it sits on the bar
  },
  mainFabCircle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E5E5E5",
    borderWidth: 2,
    // shadowColor: "#000",
    // shadowOpacity: 0.15,
    // shadowRadius: 5,
    // shadowOffset: { width: 0, height: 3 },
    // elevation: 4,
  },
});
