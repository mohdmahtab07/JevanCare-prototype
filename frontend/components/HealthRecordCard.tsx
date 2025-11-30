import { View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS } from "@/constants/colors";

interface HealthRecordCardProps {
  record: any;
  onPress?: () => void;
}

export default function HealthRecordCard({
  record,
  onPress,
}: HealthRecordCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: any = {
      "Lab Report": COLORS.info,
      Prescription: COLORS.success,
      "Medical Imaging": COLORS.error,
      Vaccination: COLORS.warning,
      "Medical Bill": COLORS.primary,
    };
    return colors[category] || COLORS.gray;
  };

  const getCategoryIcon = (category: string) => {
    const icons: any = {
      "Lab Report": "🔬",
      Prescription: "💊",
      "Medical Imaging": "📊",
      Vaccination: "💉",
      "Medical Bill": "💰",
    };
    return icons[category] || "📄";
  };

  return (
    <TouchableOpacity
      className="mb-3 rounded-xl p-4"
      style={{ backgroundColor: COLORS.white }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-start">
        {/* Image Preview */}
        {record.imageUri && (
          <Image
            source={{ uri: record.imageUri }}
            className="w-16 h-16 rounded-lg mr-3"
            style={{ backgroundColor: COLORS.grayLight }}
          />
        )}

        {/* Record Info */}
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <Text className="text-2xl mr-2">
              {getCategoryIcon(record.category)}
            </Text>
            <View
              className="px-2 py-1 rounded"
              style={{ backgroundColor: getCategoryColor(record.category) + "20" }}
            >
              <Text
                className="text-xs font-semibold"
                style={{ color: getCategoryColor(record.category) }}
              >
                {record.category}
              </Text>
            </View>
          </View>

          <Text
            className="text-base font-bold mb-1"
            style={{ color: COLORS.textPrimary }}
          >
            {record.title}
          </Text>

          {record.description && (
            <Text
              className="text-sm mb-2"
              style={{ color: COLORS.textSecondary }}
              numberOfLines={2}
            >
              {record.description}
            </Text>
          )}

          <View className="flex-row items-center">
            <Text className="text-xs mr-2" style={{ color: COLORS.textSecondary }}>
              📅 {record.date}
            </Text>
            {record.doctorName && (
              <>
                <Text className="text-xs mr-2" style={{ color: COLORS.textSecondary }}>
                  •
                </Text>
                <Text className="text-xs" style={{ color: COLORS.textSecondary }}>
                  👨‍⚕️ {record.doctorName}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
