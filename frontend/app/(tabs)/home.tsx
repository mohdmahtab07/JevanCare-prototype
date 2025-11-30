import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { getUserLocation } from "@/utils/storage";
import { SPECIALTIES } from "@/utils/dummyData";

export default function HomeScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    const userLocation = await getUserLocation();
    setLocation(userLocation);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background }}>
      {/* Modern Header with Gradient & Rounded Bottom */}
      <LinearGradient
        colors={["#4A90E2", "#357ABD", "#2868A8"]}
        style={{
          paddingHorizontal: 16,
          paddingTop: 48,
          paddingBottom: 24,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        {/* Top Bar */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity
              className="w-12 h-12 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
              activeOpacity={0.8}
            >
              <Ionicons name="person" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <View>
              <Text className="text-white text-xs opacity-90 font-medium">
                Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 17 ? "Afternoon" : "Evening"}
              </Text>
              <TouchableOpacity className="flex-row items-center" activeOpacity={0.7}>
                <Ionicons name="location" size={16} color="#FFFFFF" />
                <Text className="text-white text-base font-bold ml-1 mr-1">
                  {location?.city || "Nabha"}
                </Text>
                <Ionicons name="chevron-down" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            className="w-11 h-11 rounded-full items-center justify-center relative"
            style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            activeOpacity={0.8}
          >
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
            {/* Notification Badge */}
            <View
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: "#FF5252" }}
            />
          </TouchableOpacity>
        </View>

        {/* Modern Search Bar */}
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 16,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.12,
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          <Feather name="search" size={20} color={COLORS.textSecondary} />
          <TextInput
            className="flex-1 text-sm ml-3"
            placeholder="Search doctors, hospitals, medicines..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ color: COLORS.textPrimary }}
            placeholderTextColor={COLORS.textSecondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Main Consultation Cards - Elevated */}
        <View className="px-4" style={{ marginTop: 14 }}>
          <View className="flex-row justify-between mb-4">
            {/* Physical Appointment Card */}
            <TouchableOpacity
              className="flex-1 mr-2 rounded-3xl overflow-hidden"
              style={{
                backgroundColor: COLORS.white,
                shadowColor: "#4A90E2",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
                elevation: 8,
              }}
              onPress={() =>
                router.push({
                  pathname: "/doctor/specialties",
                  params: { consultationType: "physical" },
                })
              }
              activeOpacity={0.9}
            >
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=250&fit=crop",
                }}
                style={{ width: "100%", height: 150 }}
                imageStyle={{ borderRadius: 24 }}
              >
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={{ flex: 1, justifyContent: "flex-end", padding: 14 }}
                >
                  <View className="flex-row items-center mb-1">
                    <Ionicons name="medkit" size={18} color="#FFFFFF" />
                    <Text className="text-white text-xs ml-1 opacity-90">
                      In-Person
                    </Text>
                  </View>
                  <Text className="text-white text-base font-bold">
                    Physical
                  </Text>
                  <Text className="text-white text-base font-bold">
                    Appointment
                  </Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>

            {/* Video Consultation Card */}
            <TouchableOpacity
              className="flex-1 ml-2 rounded-3xl overflow-hidden"
              style={{
                backgroundColor: COLORS.white,
                shadowColor: "#50C878",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
                elevation: 8,
              }}
              onPress={() =>
                router.push({
                  pathname: "/doctor/specialties",
                  params: { consultationType: "video" },
                })
              }
              activeOpacity={0.9}
            >
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
                }}
                style={{ width: "100%", height: 150 }}
                imageStyle={{ borderRadius: 24 }}
              >
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={{ flex: 1, justifyContent: "flex-end", padding: 14 }}
                >
                  <View className="flex-row items-center mb-1">
                    <Ionicons name="videocam" size={18} color="#FFFFFF" />
                    <Text className="text-white text-xs ml-1 opacity-90">
                      Online
                    </Text>
                  </View>
                  <Text className="text-white text-base font-bold">Video</Text>
                  <Text className="text-white text-base font-bold">
                    Consultation
                  </Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>

        {/* Services Grid - Premium Cards */}
        <View className="px-4 mt-2">
          <View className="flex-row items-center justify-between mb-3">
            <Text
              className="text-lg font-bold"
              style={{ color: COLORS.textPrimary }}
            >
              Our Services
            </Text>
            <TouchableOpacity>
              <Text className="text-sm font-semibold" style={{ color: COLORS.primary }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {/* Health Records */}
            <TouchableOpacity
              className="w-[48%] mb-3 rounded-2xl overflow-hidden"
              style={{
                backgroundColor: COLORS.white,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
              onPress={() => router.push("/(tabs)/records")}
              activeOpacity={0.9}
            >
              <View
                className="w-full h-28 items-center justify-center relative"
                style={{ backgroundColor: "#E3F2FD" }}
              >
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=200&h=150&fit=crop",
                  }}
                  className="w-full h-full absolute"
                  style={{ opacity: 0.6 }}
                />
                <View
                  className="w-14 h-14 rounded-full items-center justify-center"
                  style={{ backgroundColor: "rgba(74, 144, 226, 0.9)" }}
                >
                  <Ionicons name="document-text" size={28} color="#FFFFFF" />
                </View>
              </View>
              <View className="p-3">
                <Text
                  className="text-sm font-bold mb-1"
                  style={{ color: COLORS.textPrimary }}
                >
                  Health Records
                </Text>
                <Text
                  className="text-xs"
                  style={{ color: COLORS.textSecondary }}
                >
                  Store & manage docs
                </Text>
              </View>
            </TouchableOpacity>

            {/* AI Health Assistant */}
            <TouchableOpacity
              className="w-[48%] mb-3 rounded-2xl overflow-hidden"
              style={{
                backgroundColor: COLORS.white,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
              onPress={() => router.push("/(tabs)/ai-chat")}
              activeOpacity={0.9}
            >
              <View
                className="w-full h-28 items-center justify-center relative"
                style={{ backgroundColor: "#F3E5F5" }}
              >
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=150&fit=crop",
                  }}
                  className="w-full h-full absolute"
                  style={{ opacity: 0.6 }}
                />
                <View
                  className="w-14 h-14 rounded-full items-center justify-center"
                  style={{ backgroundColor: "rgba(123, 31, 162, 0.9)" }}
                >
                  <Ionicons name="chatbubbles" size={26} color="#FFFFFF" />
                </View>
              </View>
              <View className="p-3">
                <Text
                  className="text-sm font-bold mb-1"
                  style={{ color: COLORS.textPrimary }}
                >
                  AI Assistant
                </Text>
                <Text
                  className="text-xs"
                  style={{ color: COLORS.textSecondary }}
                >
                  24/7 health support
                </Text>
              </View>
            </TouchableOpacity>

            {/* Medicines */}
            <TouchableOpacity
              className="w-[48%] mb-3 rounded-2xl overflow-hidden"
              style={{
                backgroundColor: COLORS.white,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
              activeOpacity={0.9}
            >
              <View
                className="w-full h-28 items-center justify-center relative"
                style={{ backgroundColor: "#FFF3E0" }}
              >
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=200&h=150&fit=crop",
                  }}
                  className="w-full h-full absolute"
                  style={{ opacity: 0.6 }}
                />
                <View
                  className="w-14 h-14 rounded-full items-center justify-center"
                  style={{ backgroundColor: "rgba(255, 152, 0, 0.9)" }}
                >
                  <Ionicons name="medical" size={28} color="#FFFFFF" />
                </View>
              </View>
              <View className="p-3">
                <Text
                  className="text-sm font-bold mb-1"
                  style={{ color: COLORS.textPrimary }}
                >
                  Medicines
                </Text>
                <Text
                  className="text-xs"
                  style={{ color: COLORS.textSecondary }}
                >
                  Order & delivery
                </Text>
              </View>
            </TouchableOpacity>

            {/* Lab Tests */}
            <TouchableOpacity
              className="w-[48%] mb-3 rounded-2xl overflow-hidden"
              style={{
                backgroundColor: COLORS.white,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
              activeOpacity={0.9}
            >
              <View
                className="w-full h-28 items-center justify-center relative"
                style={{ backgroundColor: "#E8F5E9" }}
              >
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=200&h=150&fit=crop",
                  }}
                  className="w-full h-full absolute"
                  style={{ opacity: 0.6 }}
                />
                <View
                  className="w-14 h-14 rounded-full items-center justify-center"
                  style={{ backgroundColor: "rgba(76, 175, 80, 0.9)" }}
                >
                  <Ionicons name="flask" size={26} color="#FFFFFF" />
                </View>
              </View>
              <View className="p-3">
                <Text
                  className="text-sm font-bold mb-1"
                  style={{ color: COLORS.textPrimary }}
                >
                  Lab Tests
                </Text>
                <Text
                  className="text-xs"
                  style={{ color: COLORS.textSecondary }}
                >
                  Home collection
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mission Banner - Redesigned */}
        <View className="px-4 mt-6">
          <View
            className="rounded-3xl overflow-hidden"
            style={{
              shadowColor: "#6B46C1",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.25,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <LinearGradient
              colors={["#6B46C1", "#553C9A", "#4A2C8A"]}
              style={{ padding: 20 }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="heart" size={20} color="#FFFFFF" />
                    <Text className="text-white text-base font-bold ml-2">
                      Our Mission
                    </Text>
                  </View>
                  <Text className="text-white text-sm opacity-95 mb-4 leading-5">
                    Connecting 173 villages across Punjab with quality
                    healthcare services
                  </Text>
                  <TouchableOpacity
                    className="self-start px-5 py-2 rounded-full flex-row items-center"
                    style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
                    activeOpacity={0.8}
                  >
                    <Text className="text-white text-xs font-bold mr-1">
                      Learn More
                    </Text>
                    <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                <View
                  className="w-20 h-20 rounded-full items-center justify-center ml-3"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  <Ionicons name="medical" size={40} color="#FFFFFF" />
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
