/* app/_layout.tsx */
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Platform,
} from "react-native";
import { Tabs, useRouter } from "expo-router";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import useCart from "@/store/cart";
import useWishlist from "@/store/wishList";

const CIRCLE = 60;

function QuickActionsTab({ accessibilityState, ...rest }: any) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    Animated.timing(anim, {
      toValue: open ? 0 : 1,
      duration: 500,
      easing: Easing.out(Easing.quad),
    //  useNativeDriver: true,
     useNativeDriver: false,    // ← disable native driver so height can animate
    }).start(() => setOpen(!open));
  };


  const astroStyle = {
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -130],
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
          outputRange: [0, -60],
        }),
      },
    ],
    opacity: anim,
  };

  return (
    <View style={styles.anchor}>
      {/* White pill behind the FAB */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.backPlate,
          {
            height: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0 , 200],
            }),
            shadowOpacity: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.15],
            }),
          },
        ]}
      />

      {/* Astro Vaibhav */}
      <Animated.View style={[styles.actionContainer, astroStyle]}>
        <TouchableOpacity
          onPress={() => {
            setOpen(false);
            anim.setValue(0);
            // router.push("/astro");
          }}
          activeOpacity={0.8}
        >
          <View style={[styles.actionCircle]}>
            <Image
              source={{
                uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/astroLogo.png",
              }}
              style={{
                width: 45,
                height: 45,
              }}
            />
          </View>
          <Text style={styles.actionLabel}>Astro Vaibhav</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Vedic Vaibhav */}
      <Animated.View style={[styles.actionContainer, vedicStyle]}>
        <TouchableOpacity
          onPress={() => {
            setOpen(false);
            anim.setValue(0);
            // router.push("/vedic");
          }}
          activeOpacity={0.8}
        >
          <View style={[styles.actionCircle]}>
            <Image
              source={{
                uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/vedicVaibhav.png",
              }}
              style={{
                width: 45,
                height: 45,
              }}
            />
          </View>
          <Text style={[styles.actionLabel, { color: "#FF6B00" }]}>
            Vedic Vaibhav
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Main FAB */}
      <TouchableOpacity
        {...rest}
        activeOpacity={0.9}
        onPress={toggle}
        style={styles.mainFabWrapper}
      >
        <Image
          source={{
            uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/about.png",
          }}
          style={{height:45, width:45, borderRadius: 22.5}}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function TabLayout() {
  const globalCount = useCart((state)=>state.globalQuantity)
  const wishCount = useWishlist((state)=>state.wishlistCount)
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FD4380",
        tabBarButton: HapticTab,
        tabBarBackground: () => <View style={styles.fullBarBackground} />,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Categories",
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons name="category" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color }: { color: string }) => ( <View style={{ position: 'relative' }}>
        <FontAwesome5 name="heart" size={24} color={color} />
        {wishCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{wishCount}</Text>
          </View>
        )}
      </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
        <View style={{ position: 'relative' }}>
        <Ionicons name="bag-handle-outline" size={24} color={color} />
        {globalCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{globalCount}</Text>
          </View>
        )}
      </View>
    ),
        }}
      />
      <Tabs.Screen
        name="quick-actions"
        options={{ tabBarButton: QuickActionsTab }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  fullBarBackground: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  anchor: {
    // width: CIRCLE + 20, 
    alignItems: "center",
    justifyContent: "flex-end",
  },
  backPlate: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    // shadowOffset: { width: 0, height: -3 },
    // shadowRadius: 6,
    // elevation: 8,
  },
  actionContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
  },
  actionCircle: {
    // width: CIRCLE,
    // height: CIRCLE,
    borderRadius: CIRCLE / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  actionLabel: {
    // marginTop: 6,
    fontSize: 7, // ← positive fontSize
    fontWeight: "600",
    color: "#2E0443",
    textAlign: "center",
  },
  mainFabWrapper: {
    // marginTop: 3,
    backgroundColor: "#fff",
    borderRadius: CIRCLE / 2,
  },
  mainFabImage: {
    width: CIRCLE ,
    height: CIRCLE,
    borderRadius: (CIRCLE - 14) / 2,
  }, badge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: 'orange',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
