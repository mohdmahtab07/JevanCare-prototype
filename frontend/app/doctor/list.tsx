import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLORS } from "@/constants/colors";
import { DUMMY_DOCTORS } from "@/utils/dummyData";
import DoctorCard from "@/components/DoctorCard";

export default function DoctorListScreen() {
  const router = useRouter();
  const { specialty, consultationType } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter doctors by specialty if provided
  const filteredDoctors = DUMMY_DOCTORS.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty = specialty
      ? doctor.specialty.toLowerCase() === (specialty as string).toLowerCase()
      : true;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background }}>
      {/* Header */}
      <View
        className="px-4 pt-12 pb-4"
        style={{ backgroundColor: COLORS.white }}
      >
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Text className="text-2xl">←</Text>
          </TouchableOpacity>
          <View className="flex-1">
            <Text
              className="text-xl font-bold"
              style={{ color: COLORS.textPrimary }}
            >
              {specialty || "All Doctors"}
            </Text>
            {consultationType && (
              <Text className="text-xs" style={{ color: COLORS.textSecondary }}>
                {consultationType === "video"
                  ? "Video Consultation"
                  : "Physical Appointment"}
              </Text>
            )}
          </View>
        </View>

        {/* Search */}
        <View
          className="flex-row items-center border rounded-lg px-4 py-3"
          style={{ borderColor: COLORS.grayLight }}
        >
          <Text className="text-xl mr-2">🔍</Text>
          <TextInput
            className="flex-1 text-base"
            placeholder="Search doctors..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ color: COLORS.textPrimary }}
          />
        </View>
      </View>

      {/* Results Info */}
      <View className="px-4 py-3 flex-row items-center justify-between">
        <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
          {filteredDoctors.length} doctors available
        </Text>

        {consultationType === "video" && (
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: COLORS.secondaryLight }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: COLORS.secondary }}
            >
              📹 Video Available
            </Text>
          </View>
        )}
      </View>

      {/* Doctor List */}
      {/* Doctor List */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onPress={() =>
                router.push({
                  pathname: "/doctor/[id]",
                  params: {
                    id: doctor.id,
                    consultationType: consultationType || "",
                  },
                })
              }
            />
          ))
        ) : (
          <View className="items-center justify-center py-20">
            <Text className="text-6xl mb-4">👨‍⚕️</Text>
            <Text
              className="text-base font-semibold mb-2"
              style={{ color: COLORS.textPrimary }}
            >
              No doctors found
            </Text>
            <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
              Try searching with different terms
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
