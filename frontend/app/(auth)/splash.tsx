import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "@/constants/colors";
import { APP_CONFIG } from "@/constants/config";

export default function SplashScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-white">
      {/* Logo Section */}
      <View className="flex-1 items-center justify-center px-6">
        <View
          className="w-40 h-40 rounded-full items-center justify-center mb-6"
          style={{ backgroundColor: COLORS.primaryLight }}
        >
          <Text className="text-6xl">🏥</Text>
        </View>

        <Text
          className="text-4xl font-bold text-center mb-3"
          style={{ color: COLORS.primary }}
        >
          {APP_CONFIG.appName}
        </Text>

        <Text
          className="text-base text-center mb-8"
          style={{ color: COLORS.textSecondary }}
        >
          India's top doctors to guide you{"\n"}to better health every day
        </Text>

        <View className="w-full px-4 mb-6">
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-3">📱</Text>
            <Text
              className="text-sm flex-1"
              style={{ color: COLORS.textSecondary }}
            >
              Video consultations with specialists
            </Text>
          </View>

          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-3">📋</Text>
            <Text
              className="text-sm flex-1"
              style={{ color: COLORS.textSecondary }}
            >
              Digital health records offline access
            </Text>
          </View>

          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-3">🤖</Text>
            <Text
              className="text-sm flex-1"
              style={{ color: COLORS.textSecondary }}
            >
              AI-powered symptom checker
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom Section */}
      <View className="px-6 pb-10">
        <TouchableOpacity
          className="w-full py-4 rounded-lg items-center"
          style={{ backgroundColor: COLORS.primary }}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-semibold">Get Started</Text>
        </TouchableOpacity>

        <View className="items-center mt-6">
          <View className="flex-row items-center">
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: COLORS.primaryLight }}
            >
              <Text
                className="text-xs font-bold"
                style={{ color: COLORS.primary }}
              >
                ISO
              </Text>
            </View>
            <Text className="text-xs" style={{ color: COLORS.textSecondary }}>
              ISO 27001 certified online{"\n"}healthcare platform
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
