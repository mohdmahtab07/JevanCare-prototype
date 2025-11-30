import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { COLORS } from "@/constants/colors";
import { DUMMY_DOCTORS } from "@/utils/dummyData";
import { saveAppointment } from "@/utils/storage";
import CustomButton from "@/components/CustomButton";

export default function ConfirmAppointmentScreen() {
  const router = useRouter();
  const { doctorId, date, time, type } = useLocalSearchParams();
  const doctor = DUMMY_DOCTORS.find((d) => d.id === doctorId);

  useEffect(() => {
    // Save appointment
    if (doctor) {
      saveAppointment({
        id: Date.now().toString(),
        doctorName: doctor.name,
        specialty: doctor.specialty,
        hospital: doctor.hospital,
        date: date,
        time: time,
        type: type,
        status: "confirmed",
        bookedAt: new Date().toISOString(),
      });
    }
  }, []);

  return (
    <View
      className="flex-1 items-center justify-center px-6"
      style={{ backgroundColor: COLORS.background }}
    >
      {/* Success Icon */}
      <View
        className="w-32 h-32 rounded-full items-center justify-center mb-6"
        style={{ backgroundColor: COLORS.secondaryLight }}
      >
        <Text className="text-6xl">✅</Text>
      </View>

      <Text
        className="text-2xl font-bold text-center mb-2"
        style={{ color: COLORS.textPrimary }}
      >
        Appointment Confirmed!
      </Text>

      <Text
        className="text-base text-center mb-8"
        style={{ color: COLORS.textSecondary }}
      >
        Your appointment has been successfully booked
      </Text>

      {/* Appointment Details */}
      <View
        className="w-full rounded-xl p-4 mb-8"
        style={{ backgroundColor: COLORS.white }}
      >
        <Text
          className="text-base font-bold mb-3"
          style={{ color: COLORS.textPrimary }}
        >
          Appointment Details
        </Text>

        <View className="mb-2">
          <Text className="text-xs" style={{ color: COLORS.textSecondary }}>
            Doctor
          </Text>
          <Text
            className="text-sm font-semibold"
            style={{ color: COLORS.textPrimary }}
          >
            {doctor?.name}
          </Text>
        </View>

        <View className="mb-2">
          <Text className="text-xs" style={{ color: COLORS.textSecondary }}>
            Date & Time
          </Text>
          <Text
            className="text-sm font-semibold"
            style={{ color: COLORS.textPrimary }}
          >
            {date} at {time}
          </Text>
        </View>

        <View className="mb-2">
          <Text className="text-xs" style={{ color: COLORS.textSecondary }}>
            Type
          </Text>
          <Text
            className="text-sm font-semibold capitalize"
            style={{ color: COLORS.textPrimary }}
          >
            {type === "clinic" ? "🏥 Clinic Visit" : "📹 Video Consultation"}
          </Text>
        </View>

        <View>
          <Text className="text-xs" style={{ color: COLORS.textSecondary }}>
            Location
          </Text>
          <Text
            className="text-sm font-semibold"
            style={{ color: COLORS.textPrimary }}
          >
            {doctor?.hospital}
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View className="w-full">
        <CustomButton
          title="View Appointments"
          onPress={() => router.push("/(tabs)/appointments")}
          icon="📅"
        />
        <TouchableOpacity
          className="mt-3"
          onPress={() => router.push("/(tabs)/home")}
        >
          <Text
            className="text-center text-base font-semibold"
            style={{ color: COLORS.primary }}
          >
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
