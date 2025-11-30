import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { COLORS } from "@/constants/colors";

export default function LoginScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSendOTP = () => {
    // Validate phone number
    if (phoneNumber.length !== 10) {
      Alert.alert(
        "Invalid Number",
        "Please enter a valid 10-digit mobile number"
      );
      return;
    }

    // Navigate to OTP screen
    router.push({
      pathname: "/(auth)/otp",
      params: { phoneNumber },
    });
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="pt-16 px-6 mb-8">
        <TouchableOpacity onPress={() => router.back()} className="mb-6">
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>

        <Text
          className="text-2xl font-bold mb-2"
          style={{ color: COLORS.textPrimary }}
        >
          Let's get started!
        </Text>
        <Text className="text-base" style={{ color: COLORS.textSecondary }}>
          Enter your mobile number
        </Text>
      </View>

      {/* Phone Input */}
      <View className="px-6">
        <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3 mb-6">
          <Text
            className="text-base mr-2"
            style={{ color: COLORS.textPrimary }}
          >
            +91
          </Text>
          <Text
            className="text-base mr-3"
            style={{ color: COLORS.textSecondary }}
          >
            |
          </Text>
          <TextInput
            className="flex-1 text-base"
            placeholder="Mobile number"
            keyboardType="phone-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={{ color: COLORS.textPrimary }}
          />
        </View>

        <TouchableOpacity
          className="w-full py-4 rounded-lg items-center"
          style={{
            backgroundColor:
              phoneNumber.length === 10 ? COLORS.primary : COLORS.grayLight,
          }}
          onPress={handleSendOTP}
          disabled={phoneNumber.length !== 10}
          activeOpacity={0.8}
        >
          <Text
            className="text-lg font-semibold"
            style={{
              color:
                phoneNumber.length === 10 ? COLORS.white : COLORS.textLight,
            }}
          >
            Send OTP
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-4">
          <Text
            className="text-center text-sm"
            style={{ color: COLORS.primary }}
          >
            Trouble signing in?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View className="px-6 mt-auto mb-10">
        <Text
          className="text-xs text-center"
          style={{ color: COLORS.textSecondary }}
        >
          By continuing, you agree to our{" "}
          <Text style={{ color: COLORS.primary }}>Terms of Service</Text> and{" "}
          <Text style={{ color: COLORS.primary }}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}
