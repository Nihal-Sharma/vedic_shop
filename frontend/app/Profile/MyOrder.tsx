import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign, // arrow-left
  Feather, // headphones
  Entypo, // filled star
  EvilIcons, // empty star
  FontAwesome, // share
} from "@expo/vector-icons";

export default function OrderDetailScreen() {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#ffffff", // bg-white
        paddingHorizontal: 16, // px-4
        paddingTop: 40, // pt-4
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16, // mb-4
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 18,
              paddingLeft: 16, // pl-4
              fontWeight: "600" /* text-lg font-semibold */,
            }}
          >
            My Order
          </Text>
        </View>
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name="headphones" size={20} color="grey" />
          <Text style={{paddingLeft:10}}>Help</Text>
        </TouchableOpacity>
      </View>

      {/* Order Card */}
      <View
        style={{
          backgroundColor: "#ffffff", // bg-white
          borderRadius: 8, // rounded-lg
          padding: 16, // p-4
          borderWidth: 1,
          borderColor: "#e5e7eb", // gray-200
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05, // shadow-sm
          shadowRadius: 1,
          elevation: 1,
        }}
      >
        {/* Status */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8, // mb-2
          }}
        >
          <View
            style={{
              width: 24, // w-6
              height: 24, // h-6
              backgroundColor: "black",
              borderRadius: 12, // rounded-full
              marginRight: 8, // mr-2
            }}
          />
          <View>
            <Text
              style={{
                color: "#16a34a",
                fontWeight: "600" /* green-600 font-semibold */,
              }}
            >
              Delivered
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#6b7280" /* text-xs text-gray-500 */,
              }}
            >
              On Fri, 12 May 2025
            </Text>
          </View>
        </View>

        {/* Product Info */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16, // mb-4
          }}
        >
          <Image
            source={{ uri: "https://example.com/bracelet.jpg" }}
            style={{
              width: 80, // w-20
              height: 80, // h-20
              borderRadius: 8, // rounded-lg
              marginRight: 16, // mr-4
            }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600" /* text-base font-semibold */,
              }}
            >
              Om Bracelet
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 4,
                // gap isn't supported pre-0.71; for older RN use marginRight on child
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#4b5563",
                  marginRight: 16 /* gap-4 */,
                }}
              >
                Size: 9cm
              </Text>
              <Text style={{ fontSize: 14, color: "#4b5563" }}>
                Material: Silver
              </Text>
            </View>
          </View>
        </View>

        {/* Exchange Info */}
        <Text
          style={{
            fontSize: 12,
            color: "#6b7280", // text-xs text-gray-500
            marginBottom: 16, // mb-4
          }}
        >
          Exchange / Return window closed on Fri, 24 May 2025
        </Text>

        {/* Star Rating */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16, // mb-4
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setRating(i === rating ? 0 : i)}
            >
              {i <= rating ? (
                <Entypo name="star" size={24} color="#facc15" />
              ) : (
                <EvilIcons name="star" size={24} color="#787878" />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <Text
          style={{
            fontSize: 12,
            color: "#6b7280", // text-xs text-gray-500
            marginBottom: 8, // mb-2
          }}
        >
          Rate & Review
        </Text>

        {/* Review Input */}
        <TextInput
          placeholder="Write your review..."
          value={reviewText}
          onChangeText={setReviewText}
          multiline
          style={{
            borderWidth: 1,
            borderColor: "#d1d5db", // gray-300
            borderRadius: 6, // rounded-md
            padding: 8, // p-2
            fontSize: 14, // text-sm
            marginBottom: 16, // mb-4
          }}
        />

        {/* Buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#16a34a", // bg-green-600
              paddingHorizontal: 16, // px-4
              paddingVertical: 8, // py-2
              borderRadius: 6, // rounded-md
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontWeight: "600" /* text-white font-semibold */,
              }}
            >
              Track Order
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#f97316", // border-orange-500
              paddingHorizontal: 16, // px-4
              paddingVertical: 8, // py-2
              borderRadius: 6, // rounded-md
            }}
          >
            <Text
              style={{
                color: "#f97316",
                fontWeight: "600",
                marginRight: 4 /* mr-1 */,
              }}
            >
              Share this item
            </Text>
            <FontAwesome name="share" size={16} color="#f97316" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
