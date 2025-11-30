import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

interface DoctorCardProps {
  doctor: any;
  onPress: () => void;
}

export default function DoctorCard({ doctor, onPress }: DoctorCardProps) {
  return (
    <TouchableOpacity
      className="mb-3 rounded-2xl p-4"
      style={{
        backgroundColor: COLORS.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="flex-row">
        {/* Doctor Image */}
        <View className="mr-4">
          <Image
            source={{ uri: doctor.image }}
            className="w-20 h-20 rounded-full"
            style={{
              backgroundColor: COLORS.primaryLight,
              borderWidth: 2,
              borderColor: COLORS.primaryLight,
            }}
          />
          {/* Verified Badge */}
          <View
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full items-center justify-center"
            style={{
              backgroundColor: COLORS.secondary,
              borderWidth: 2,
              borderColor: COLORS.white,
            }}
          >
            <Ionicons name="checkmark" size={12} color="#FFFFFF" />
          </View>
        </View>

        {/* Doctor Info */}
        <View className="flex-1">
          <Text
            className="text-base font-bold mb-1"
            style={{ color: COLORS.textPrimary }}
            numberOfLines={1}
          >
            {doctor.name}
          </Text>

          <Text
            className="text-sm mb-1"
            style={{ color: COLORS.primary }}
            numberOfLines={1}
          >
            {doctor.specialty}
          </Text>

          <Text
            className="text-xs mb-2"
            style={{ color: COLORS.textSecondary }}
            numberOfLines={1}
          >
            {doctor.qualification} • {doctor.experience} yrs exp
          </Text>

          <View className="flex-row items-center mb-2">
            <View
              className="flex-row items-center px-2 py-1 rounded"
              style={{ backgroundColor: "#FFF9C4" }}
            >
              <Ionicons name="star" size={12} color="#FFA000" />
              <Text
                className="text-xs font-bold ml-1"
                style={{ color: "#F57C00" }}
              >
                {doctor.rating}
              </Text>
            </View>
            <Text
              className="text-xs ml-2"
              style={{ color: COLORS.textSecondary }}
            >
              ({doctor.reviews} reviews)
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="location" size={12} color={COLORS.textSecondary} />
            <Text
              className="text-xs ml-1 flex-1"
              style={{ color: COLORS.textSecondary }}
              numberOfLines={1}
            >
              {doctor.hospital}, {doctor.city}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View
        className="flex-row justify-between items-center mt-3 pt-3 border-t"
        style={{ borderTopColor: COLORS.grayLight }}
      >
        <View className="flex-row items-center">
          <Ionicons name="cash-outline" size={16} color={COLORS.primary} />
          <Text
            className="text-base font-bold ml-1"
            style={{ color: COLORS.primary }}
          >
            ₹{doctor.consultationFee}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={14} color={COLORS.secondary} />
          <Text
            className="text-xs font-semibold ml-1"
            style={{ color: COLORS.secondary }}
          >
            {doctor.nextAvailable}
          </Text>
        </View>

        <TouchableOpacity
          className="px-4 py-2 rounded-full"
          style={{ backgroundColor: COLORS.primaryLight }}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text className="text-xs font-bold" style={{ color: COLORS.primary }}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
