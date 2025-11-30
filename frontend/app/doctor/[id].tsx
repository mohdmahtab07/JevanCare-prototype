import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLORS } from "@/constants/colors";
import { DUMMY_DOCTORS } from "@/utils/dummyData";
import CustomButton from "@/components/CustomButton";

export default function DoctorDetailScreen() {
  const router = useRouter();
  const { id, consultationType } = useLocalSearchParams(); // Added consultationType here

  const doctor = DUMMY_DOCTORS.find((d) => d.id === id);

  if (!doctor) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Doctor not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background }}>
      {/* Header */}
      <View
        className="px-4 pt-12 pb-4"
        style={{ backgroundColor: COLORS.white }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Doctor Profile */}
        <View className="px-4 py-6" style={{ backgroundColor: COLORS.white }}>
          <View className="flex-row">
            <View
              className="w-24 h-24 rounded-full items-center justify-center mr-4"
              style={{ backgroundColor: COLORS.primaryLight }}
            >
              <Text className="text-5xl">👨‍⚕️</Text>
            </View>

            <View className="flex-1">
              <Text
                className="text-xl font-bold mb-1"
                style={{ color: COLORS.textPrimary }}
              >
                {doctor.name}
              </Text>
              <Text
                className="text-sm mb-1"
                style={{ color: COLORS.textSecondary }}
              >
                {doctor.specialty}
              </Text>
              <Text
                className="text-xs mb-2"
                style={{ color: COLORS.textSecondary }}
              >
                {doctor.qualification}
              </Text>
              <View className="flex-row items-center">
                <Text className="text-sm mr-1">⭐</Text>
                <Text
                  className="text-sm font-semibold"
                  style={{ color: COLORS.textPrimary }}
                >
                  {doctor.rating} ({doctor.reviews} reviews)
                </Text>
              </View>
            </View>
          </View>

          {/* Consultation Type Badge */}
          {consultationType && (
            <View className="mt-4">
              <View
                className="self-start px-4 py-2 rounded-full"
                style={{
                  backgroundColor:
                    consultationType === "video"
                      ? COLORS.secondaryLight
                      : COLORS.primaryLight,
                }}
              >
                <Text
                  className="text-sm font-semibold"
                  style={{
                    color:
                      consultationType === "video"
                        ? COLORS.secondary
                        : COLORS.primary,
                  }}
                >
                  {consultationType === "video"
                    ? "📹 Video Consultation Available"
                    : "🏥 Clinic Visit"}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Info Cards */}
        <View className="px-4 py-3">
          <View className="flex-row justify-between mb-3">
            <View
              className="flex-1 mr-2 rounded-xl p-4"
              style={{ backgroundColor: COLORS.white }}
            >
              <Text className="text-2xl mb-1">💼</Text>
              <Text className="text-xs" style={{ color: COLORS.textSecondary }}>
                Experience
              </Text>
              <Text
                className="text-base font-bold"
                style={{ color: COLORS.textPrimary }}
              >
                {doctor.experience} Years
              </Text>
            </View>

            <View
              className="flex-1 ml-2 rounded-xl p-4"
              style={{ backgroundColor: COLORS.white }}
            >
              <Text className="text-2xl mb-1">💰</Text>
              <Text className="text-xs" style={{ color: COLORS.textSecondary }}>
                Consultation Fee
              </Text>
              <Text
                className="text-base font-bold"
                style={{ color: COLORS.textPrimary }}
              >
                ₹{doctor.consultationFee}
              </Text>
            </View>
          </View>
        </View>

        {/* About */}
        <View className="px-4 py-3">
          <View
            className="rounded-xl p-4"
            style={{ backgroundColor: COLORS.white }}
          >
            <Text
              className="text-base font-bold mb-2"
              style={{ color: COLORS.textPrimary }}
            >
              About
            </Text>
            <Text
              className="text-sm mb-3"
              style={{ color: COLORS.textSecondary }}
            >
              {doctor.name} is a highly experienced {doctor.specialty} with{" "}
              {doctor.experience} years of practice. Currently practicing at{" "}
              {doctor.hospital}, {doctor.city}.
            </Text>

            <Text
              className="text-sm font-semibold mb-1"
              style={{ color: COLORS.textPrimary }}
            >
              Languages:
            </Text>
            <Text
              className="text-sm mb-3"
              style={{ color: COLORS.textSecondary }}
            >
              {doctor.languages.join(", ")}
            </Text>

            <Text
              className="text-sm font-semibold mb-1"
              style={{ color: COLORS.textPrimary }}
            >
              Hospital:
            </Text>
            <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
              📍 {doctor.hospital}, {doctor.city}
            </Text>
          </View>
        </View>

        {/* Available Slots */}
        <View className="px-4 py-3 mb-20">
          <View
            className="rounded-xl p-4"
            style={{ backgroundColor: COLORS.white }}
          >
            <Text
              className="text-base font-bold mb-3"
              style={{ color: COLORS.textPrimary }}
            >
              Available Slots - {doctor.nextAvailable}
            </Text>
            <View className="flex-row flex-wrap">
              {doctor.availableSlots.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  className="mr-2 mb-2 px-4 py-2 rounded-lg border"
                  style={{ borderColor: COLORS.primary }}
                  activeOpacity={0.7}
                >
                  <Text className="text-sm" style={{ color: COLORS.primary }}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Book Button */}
      <View className="px-4 py-3" style={{ backgroundColor: COLORS.white }}>
        <CustomButton
          title="Book Appointment"
          onPress={() =>
            router.push({
              pathname: "/appointment/book",
              params: {
                doctorId: doctor.id,
                consultationType: consultationType || "clinic",
              },
            })
          }
          icon="📅"
        />
      </View>
    </View>
  );
}
