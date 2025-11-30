import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLORS } from "@/constants/colors";
import { DUMMY_DOCTORS } from "@/utils/dummyData";
import CustomButton from "@/components/CustomButton";

export default function BookAppointmentScreen() {
  const router = useRouter();
  const { doctorId } = useLocalSearchParams();
  const doctor = DUMMY_DOCTORS.find((d) => d.id === doctorId);

  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [consultationType, setConsultationType] = useState("clinic");

  const dates = ["Today", "Tomorrow", "Dec 3", "Dec 4", "Dec 5"];

  const handleBookAppointment = () => {
    if (!selectedSlot) {
      Alert.alert("Select Time", "Please select an appointment time slot");
      return;
    }

    router.push({
      pathname: "/appointment/confirm",
      params: {
        doctorId: doctor?.id,
        date: selectedDate,
        time: selectedSlot,
        type: consultationType,
      },
    });
  };

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
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Text className="text-2xl">←</Text>
          </TouchableOpacity>
          <Text
            className="text-xl font-bold flex-1"
            style={{ color: COLORS.textPrimary }}
          >
            Book Appointment
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Doctor Info */}
        <View
          className="mt-4 rounded-xl p-4"
          style={{ backgroundColor: COLORS.white }}
        >
          <View className="flex-row">
            <View
              className="w-16 h-16 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: COLORS.primaryLight }}
            >
              <Text className="text-3xl">👨‍⚕️</Text>
            </View>
            <View className="flex-1">
              <Text
                className="text-base font-bold mb-1"
                style={{ color: COLORS.textPrimary }}
              >
                {doctor.name}
              </Text>
              <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
                {doctor.specialty}
              </Text>
              <Text
                className="text-xs mt-1"
                style={{ color: COLORS.textSecondary }}
              >
                {doctor.hospital}
              </Text>
            </View>
          </View>
        </View>

        {/* Consultation Type */}
        <View className="mt-4">
          <Text
            className="text-base font-bold mb-3"
            style={{ color: COLORS.textPrimary }}
          >
            Consultation Type
          </Text>
          <View className="flex-row">
            <TouchableOpacity
              className="flex-1 mr-2 rounded-xl p-4 border-2"
              style={{
                backgroundColor:
                  consultationType === "clinic"
                    ? COLORS.primaryLight
                    : COLORS.white,
                borderColor:
                  consultationType === "clinic"
                    ? COLORS.primary
                    : COLORS.grayLight,
              }}
              onPress={() => setConsultationType("clinic")}
              activeOpacity={0.7}
            >
              <Text className="text-2xl text-center mb-2">🏥</Text>
              <Text
                className="text-sm font-semibold text-center"
                style={{ color: COLORS.textPrimary }}
              >
                Clinic Visit
              </Text>
              <Text
                className="text-xs text-center mt-1"
                style={{ color: COLORS.textSecondary }}
              >
                ₹{doctor.consultationFee}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 ml-2 rounded-xl p-4 border-2"
              style={{
                backgroundColor:
                  consultationType === "video"
                    ? COLORS.primaryLight
                    : COLORS.white,
                borderColor:
                  consultationType === "video"
                    ? COLORS.primary
                    : COLORS.grayLight,
              }}
              onPress={() => setConsultationType("video")}
              activeOpacity={0.7}
            >
              <Text className="text-2xl text-center mb-2">📹</Text>
              <Text
                className="text-sm font-semibold text-center"
                style={{ color: COLORS.textPrimary }}
              >
                Video Call
              </Text>
              <Text
                className="text-xs text-center mt-1"
                style={{ color: COLORS.textSecondary }}
              >
                ₹{doctor.consultationFee - 100}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Select Date */}
        <View className="mt-4">
          <Text
            className="text-base font-bold mb-3"
            style={{ color: COLORS.textPrimary }}
          >
            Select Date
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((date) => (
              <TouchableOpacity
                key={date}
                className="mr-2 px-4 py-3 rounded-xl"
                style={{
                  backgroundColor:
                    selectedDate === date ? COLORS.primary : COLORS.white,
                }}
                onPress={() => setSelectedDate(date)}
                activeOpacity={0.7}
              >
                <Text
                  className="text-sm font-semibold"
                  style={{
                    color:
                      selectedDate === date ? COLORS.white : COLORS.textPrimary,
                  }}
                >
                  {date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Select Time Slot */}
        <View className="mt-4 mb-20">
          <Text
            className="text-base font-bold mb-3"
            style={{ color: COLORS.textPrimary }}
          >
            Select Time Slot
          </Text>
          <View className="flex-row flex-wrap">
            {doctor.availableSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                className="mr-2 mb-2 px-4 py-3 rounded-xl border-2"
                style={{
                  backgroundColor:
                    selectedSlot === slot ? COLORS.primary : COLORS.white,
                  borderColor:
                    selectedSlot === slot ? COLORS.primary : COLORS.grayLight,
                }}
                onPress={() => setSelectedSlot(slot)}
                activeOpacity={0.7}
              >
                <Text
                  className="text-sm font-semibold"
                  style={{
                    color:
                      selectedSlot === slot ? COLORS.white : COLORS.textPrimary,
                  }}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Book Button */}
      <View className="px-4 py-3" style={{ backgroundColor: COLORS.white }}>
        <CustomButton
          title={`Pay ₹${consultationType === "clinic" ? doctor.consultationFee : doctor.consultationFee - 100} & Book`}
          onPress={handleBookAppointment}
          disabled={!selectedSlot}
        />
      </View>
    </View>
  );
}
