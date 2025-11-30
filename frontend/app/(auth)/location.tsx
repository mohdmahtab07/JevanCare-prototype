import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { COLORS } from "@/constants/colors";
import { saveUserLocation } from "@/utils/storage";

export default function LocationScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const requestLocationPermission = async () => {
    setLoading(true);
    try {
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        // Get current location
        const location = await Location.getCurrentPositionAsync({});

        // Get address from coordinates
        const address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        // Save location
        await saveUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          city: address[0]?.city || "Nabha",
          state: address[0]?.region || "Punjab",
        });

        // Navigate to home
        router.replace("/(tabs)/home");
      } else {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to find nearby doctors"
        );
      }
    } catch (error) {
      console.error("Location error:", error);
      Alert.alert("Error", "Failed to get location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const skipForNow = async () => {
    // Save default location
    await saveUserLocation({
      latitude: 30.3752,
      longitude: 76.3822,
      city: "Nabha",
      state: "Punjab",
    });

    router.replace("/(tabs)/home");
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        {/* Location Icon */}
        <View
          className="w-32 h-32 rounded-full items-center justify-center mb-8"
          style={{ backgroundColor: COLORS.primaryLight }}
        >
          <Text className="text-6xl">📍</Text>
        </View>

        <Text
          className="text-2xl font-bold text-center mb-4"
          style={{ color: COLORS.textPrimary }}
        >
          Enable Location
        </Text>

        <Text
          className="text-base text-center mb-8"
          style={{ color: COLORS.textSecondary }}
        >
          We need your location to find nearby doctors and hospitals for better
          healthcare access
        </Text>

        {/* Benefits */}
        <View className="w-full mb-8">
          <View className="flex-row items-center mb-3">
            <Text className="text-2xl mr-3">🏥</Text>
            <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
              Find nearby hospitals and clinics
            </Text>
          </View>

          <View className="flex-row items-center mb-3">
            <Text className="text-2xl mr-3">👨‍⚕️</Text>
            <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
              Discover doctors in your area
            </Text>
          </View>

          <View className="flex-row items-center">
            <Text className="text-2xl mr-3">💊</Text>
            <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
              Check medicine availability nearby
            </Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View className="px-6 pb-10">
        <TouchableOpacity
          className="w-full py-4 rounded-lg items-center mb-4"
          style={{ backgroundColor: COLORS.primary }}
          onPress={requestLocationPermission}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-semibold">
            {loading ? "Getting Location..." : "Allow Location Access"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={skipForNow}>
          <Text
            className="text-center text-base"
            style={{ color: COLORS.textSecondary }}
          >
            Skip for now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
