import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { getLoginStatus } from "@/utils/storage";
import { COLORS } from "@/constants/colors";
import { APP_CONFIG } from "@/constants/config";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    // Small delay to show splash
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const isLoggedIn = await getLoginStatus();

    if (isLoggedIn) {
      // User is logged in, go to home
      router.replace("/(tabs)/home");
    } else {
      // User not logged in, go to splash
      router.replace("/(auth)/splash");
    }
  };

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: COLORS.primary }}
    >
      {/* Logo */}
      <View
        className="w-32 h-32 rounded-full items-center justify-center mb-4"
        style={{ backgroundColor: COLORS.white }}
      >
        <Text className="text-6xl">🏥</Text>
      </View>

      <Text className="text-3xl font-bold text-white mb-2">
        {APP_CONFIG.appName}
      </Text>

      <Text className="text-sm text-white mb-8 opacity-80">
        Healthcare for Rural India
      </Text>

      <ActivityIndicator size="large" color={COLORS.white} />
    </View>
  );
}
