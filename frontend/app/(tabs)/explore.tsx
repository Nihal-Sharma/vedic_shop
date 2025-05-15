import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFetchCategories } from "../../components/api/FetchProduct";

// Constants for grid sizing
const { width } = Dimensions.get("window");
const SIDE_PADDING = 15 * 2;
const GAP_TOTAL = 16 * 3;
const ITEM_SIZE = (width - SIDE_PADDING - GAP_TOTAL) / 4;

// ---- Static data for custom grids ----
const purposeList = [
  {
    label: "Wealth",
    image: {
      uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/wealth.png",
    },
  },
  {
    label: "Health",
    image: {
      uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/holi.webp",
    },
  },
  {
    label: "Love",
    image: {
      uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/love.png",
    },
  },
  {
    label: "Spiritual",
    image: {
      uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/spritual.png",
    },
  },
];

const festivalList = [
  {
    label: "Holi",
    image: {
      uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/holi.webp",
    },
  },
  {
    label: "Diwali",
    image: {
      uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/divali.webp",
    },
  },
  {
    label: "Navratri",
    image: {
      uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/navratri.webp",
    },
  },
];

const occasionList = [
  {
    label: "Birthday",
    image: {
      uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/birthday.webp",
    },
  },
  {
    label: "Anniversary",
    image: {
      uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/anniversery.webp",
    },
  },
  {
    label: "Marriage",
    image: {
      uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/marriage.webp",
    },
  },
  {
    label: "Grah Pravesh",
    image: {
      uri: "https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/ShopApp/grah2.webp",
    },
  },
];

type SectionGridProps = {
  title: string;
  data: { label: string; image: { uri: string } }[];
  onPress: (label: string) => void;
};





// ---- Section Grid Component (for static grids) ----
function SectionGrid({ title, data, onPress }: SectionGridProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeader}>{title}</Text>
        <View style={styles.sectionHeaderLine} />
      </View>
      <FlatList
        data={data}
        numColumns={4}
        keyExtractor={(_, idx) => idx.toString()}
        contentContainerStyle={styles.sectionListContainer}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
        renderItem={({ item }) =>
          item.image ? (
            <TouchableOpacity
              style={styles.card}
              onPress={() => onPress(item.label)}
            >
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.label} numberOfLines={2}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.card} />
          )
        }
      />
    </View>
  );
}

export default function ExploreScreen() {
  const router = useRouter();
  const { cats, loading, error } = useFetchCategories();

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      {/* — Header — */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Category</Text>
        <TouchableOpacity>
          <EvilIcons name="search" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* — Sub‐header: “SHOP ALL” with underline — */}
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>SHOP ALL</Text>
        <View style={styles.subHeaderLine} />
      </View>

      {/* — Dynamic grid of categories from API — */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 24 }} />
      ) : error ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : (
        <FlatList
          data={cats}
          keyExtractor={(item) => item._id}
          numColumns={4}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "../Pages/CategoryScreen",
                  params: { id: item._id, name: item.categoryName },
                })
              }
            >
              {item.productCategoryImage?.[0] ? (
                <Image
                  source={{ uri: item.productCategoryImage[0] }}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <View style={[styles.image, styles.imagePlaceholder]}>
                  <Text style={styles.imagePlaceholderText}>No Image</Text>
                </View>
              )}
              <Text style={styles.label} numberOfLines={2}>
                {item.categoryName}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* ---- Static Grids below ---- */}
      <SectionGrid
        title="SHOP BY PURPOSE"
        data={purposeList}
        onPress={(label) =>
          router.push({
            pathname: "../Pages/CategoryScreen",
            params: { id: label, name: label },
          })
        }
      />
      <SectionGrid
        title="SHOP BY FESTIVAL"
        data={festivalList}
        onPress={(label) =>
          router.push({
            pathname: "../Pages/CategoryScreen",
            params: { id: label, name: label },
          })
        }
      />
      <SectionGrid
        title="SHOP BY OCCASSION"
        data={occasionList}
        onPress={(label) =>
          router.push({
            pathname: "../Pages/CategoryScreen",
            params: { id: label, name: label },
          })
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  subHeaderText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
    letterSpacing: 1,
  },
  subHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB",
    marginLeft: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: ITEM_SIZE,
    alignItems: "center",
  },
  image: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  label: {
    marginTop: 8,
    fontSize: 13,
    textAlign: "center",
    color: "#111827",
  },
  error: {
    color: "red",
    padding: 16,
    textAlign: "center",
  },
  // ---- Section grid styles below ----
  section: {
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 6,
  },
  sectionHeader: {
    fontSize: 14,
    color: "#999",
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 2,
    marginRight: 10,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  sectionListContainer: {
    paddingBottom: 4,
  },
});
