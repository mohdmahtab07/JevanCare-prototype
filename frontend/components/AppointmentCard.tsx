import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/colors";

interface AppointmentCardProps {
  appointment: any;
  onPress?: () => void;
}

export default function AppointmentCard({
  appointment,
  onPress,
}: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return COLORS.success;
      case "pending":
        return COLORS.warning;
      case "completed":
        return COLORS.primary;
      case "cancelled":
        return COLORS.error;
      default:
        return COLORS.gray;
    }
  };

  return (
    <TouchableOpacity
      className="mb-3 rounded-xl p-4"
      style={{ backgroundColor: COLORS.white }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text
            className="text-base font-bold mb-1"
            style={{ color: COLORS.textPrimary }}
          >
            {appointment.doctorName}
          </Text>
          <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
            {appointment.specialty}
          </Text>
        </View>
        <View
          className="px-3 py-1 rounded-full"
          style={{ backgroundColor: getStatusColor(appointment.status) + "20" }}
        >
          <Text
            className="text-xs font-semibold capitalize"
            style={{ color: getStatusColor(appointment.status) }}
          >
            {appointment.status}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center mb-2">
        <Text className="text-sm mr-2">📅</Text>
        <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
          {appointment.date}
        </Text>
        <Text className="text-sm mx-2">•</Text>
        <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
          {appointment.time}
        </Text>
      </View>

      <View className="flex-row items-center">
        <Text className="text-sm mr-2">📍</Text>
        <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
          {appointment.hospital}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
