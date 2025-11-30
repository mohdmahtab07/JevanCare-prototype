import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { SPECIALTIES } from "@/utils/dummyData";

export default function SpecialtiesScreen() {
  const router = useRouter();
  const { consultationType } = useLocalSearchParams(); // "physical" or "video"
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSpecialties = SPECIALTIES.filter((specialty) =>
    specialty.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSpecialtySelect = (specialty: string) => {
    router.push({
      pathname: "/doctor/list",
      params: {
        specialty: specialty,
        consultationType: consultationType,
      },
    });
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
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xl font-bold text-white">
              {consultationType === "video"
                ? "Video Consultations"
                : "Find Doctors"}
            </Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="location" size={14} color="#FFFFFF" />
              <Text className="text-white text-xs ml-1 opacity-90">
                Gulab Garh
              </Text>
              <Ionicons
                name="chevron-down"
                size={12}
                color="#FFFFFF"
                className="ml-1"
              />
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 16,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 4,
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
            placeholder="Search for specialists, symptoms..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ color: COLORS.textPrimary }}
            placeholderTextColor={COLORS.textSecondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {/* Type Badge */}
      <View className="px-4 py-4">
        <View
          className="self-start px-4 py-2 rounded-full flex-row items-center"
          style={{
            backgroundColor:
              consultationType === "video"
                ? COLORS.secondaryLight
                : COLORS.primaryLight,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Ionicons
            name={consultationType === "video" ? "videocam" : "medkit"}
            size={16}
            color={
              consultationType === "video" ? COLORS.secondary : COLORS.primary
            }
          />
          <Text
            className="text-sm font-semibold ml-2"
            style={{
              color:
                consultationType === "video"
                  ? COLORS.secondary
                  : COLORS.primary,
            }}
          >
            {consultationType === "video"
              ? "Video Consultation"
              : "Physical Appointment"}
          </Text>
        </View>
      </View>

      {/* Specialties Title */}
      <View className="px-4 pb-3 flex-row items-center justify-between">
        <Text
          className="text-lg font-bold"
          style={{ color: COLORS.textPrimary }}
        >
          All Specialities
        </Text>
        <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
          {filteredSpecialties.length} available
        </Text>
      </View>

      {/* Specialties List - Clean Cards */}
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {filteredSpecialties.map((specialty, index) => (
          <TouchableOpacity
            key={specialty.id}
            className="mb-3 rounded-2xl p-4 flex-row items-center justify-between"
            style={{
              backgroundColor: COLORS.white,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 3,
            }}
            onPress={() => handleSpecialtySelect(specialty.name)}
            activeOpacity={0.7}
          >
            {/* Left Side - Icon Circle */}
            <View className="flex-row items-center flex-1">
              <View
                className="w-12 h-12 rounded-full items-center justify-center mr-3"
                style={{
                  backgroundColor: getSpecialtyColor(index).bg,
                }}
              >
                <Ionicons
                  name={getSpecialtyIcon(specialty.name)}
                  size={24}
                  color={getSpecialtyColor(index).main}
                />
              </View>

              {/* Specialty Info */}
              <View className="flex-1">
                <Text
                  className="text-base font-semibold mb-1"
                  style={{ color: COLORS.textPrimary }}
                >
                  {specialty.name}
                </Text>
                <Text
                  className="text-xs"
                  style={{ color: COLORS.textSecondary }}
                >
                  Available for consultation
                </Text>
              </View>
            </View>

            {/* Right Side - Arrow */}
            <Ionicons
              name="chevron-forward"
              size={22}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        ))}

        {/* Empty State */}
        {filteredSpecialties.length === 0 && (
          <View className="items-center justify-center py-20">
            <View
              className="w-20 h-20 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: COLORS.primaryLight }}
            >
              <Ionicons name="search" size={36} color={COLORS.primary} />
            </View>
            <Text
              className="text-base font-bold mb-2"
              style={{ color: COLORS.textPrimary }}
            >
              No specialities found
            </Text>
            <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
              Try searching with different keywords
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// Helper function to get specialty-specific icons
function getSpecialtyIcon(specialtyName: string): any {
  const iconMap: { [key: string]: string } = {
    "General Physician": "fitness",
    Pediatrician: "happy",
    Cardiologist: "heart",
    Dermatologist: "sparkles",
    Gynecologist: "woman",
    Orthopedic: "body",
    Dentist: "happy-outline",
    "ENT Specialist": "ear",
    "Skin & Hair": "cut",
    "Women's Health": "flower",
    "Dental care": "fitness",
    "Bones & Joints": "body",
    "Mental Wellness": "bulb",
    "Ear, Nose, Throat": "ear",
    "Sexual Health": "heart-circle",
    "Child Specialist": "ice-cream",
    Homeopathy: "leaf",
    "Digestive Issues": "restaurant",
    "Eye Specialist": "eye",
    Heart: "heart-circle",
    Physiotherapy: "walk",
    "Brain and Nerves": "flash",
    "Lungs and Breathing": "repeat",
    "Kidney Issues": "water",
    "General Surgery": "medical",
    "Diabetes Management": "pulse",
  };
  return iconMap[specialtyName] || "medical";
}

// Helper function to get specialty colors
function getSpecialtyColor(index: number) {
  const colors = [
    { main: "#4A90E2", bg: "#E3F2FD" },
    { main: "#FF9800", bg: "#FFF3E0" },
    { main: "#E91E63", bg: "#FCE4EC" },
    { main: "#9C27B0", bg: "#F3E5F5" },
    { main: "#4CAF50", bg: "#E8F5E9" },
    { main: "#00BCD4", bg: "#E0F7FA" },
    { main: "#FF5722", bg: "#FBE9E7" },
    { main: "#3F51B5", bg: "#E8EAF6" },
  ];
  return colors[index % colors.length];
}
