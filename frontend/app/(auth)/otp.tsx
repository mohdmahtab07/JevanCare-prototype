import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLORS } from "@/constants/colors";
import { APP_CONFIG } from "@/constants/config";
import { saveLoginStatus, saveUserData } from "@/utils/storage";

export default function OTPScreen() {
  const router = useRouter();
  const { phoneNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<(TextInput | null)[]>([]); // Fixed type

  useEffect(() => {
    // Start countdown timer
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOTPChange = (value: string, index: number) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto verify when all 6 digits entered
    if (index === 5 && value) {
      const otpString = [...newOtp.slice(0, 5), value].join("");
      verifyOTP(otpString);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOTP = async (otpString: string) => {
    // For prototype, accept dummy OTP
    if (otpString === APP_CONFIG.dummyOTP) {
      // Save user data
      await saveUserData({
        phoneNumber,
        name: "User",
        registeredAt: new Date().toISOString(),
      });
      await saveLoginStatus(true);

      // Navigate to location screen
      router.replace("/(auth)/location");
    } else {
      Alert.alert("Invalid OTP", "Please enter correct OTP: 123456");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendOTP = () => {
    setTimer(30);
    Alert.alert("OTP Sent", `New OTP sent to +91${phoneNumber}`);
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
          Enter the 6-digit OTP
        </Text>
        <Text className="text-base" style={{ color: COLORS.textSecondary }}>
          sent to +91{phoneNumber}
        </Text>
        <Text className="text-sm mt-2" style={{ color: COLORS.primary }}>
          (Hint: Use 123456 for prototype)
        </Text>
      </View>

      {/* OTP Input */}
      <View className="px-6">
        <View className="flex-row justify-between mb-6">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              className="w-12 h-14 border-2 rounded-lg text-center text-xl font-semibold"
              style={{
                borderColor: digit ? COLORS.primary : COLORS.grayLight,
                color: COLORS.textPrimary,
              }}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleOTPChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
            Didn't receive the code?
          </Text>
          {timer > 0 ? (
            <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
              00:{timer.toString().padStart(2, "0")}
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendOTP}>
              <Text
                className="text-sm font-semibold"
                style={{ color: COLORS.primary }}
              >
                Resend
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity>
          <Text
            className="text-center text-sm"
            style={{ color: COLORS.primary }}
          >
            Get OTP on call
          </Text>
        </TouchableOpacity>
      </View>

      {/* Help Section */}
      <View className="px-6 mt-auto mb-10">
        <View className="flex-row items-center justify-center">
          <Text className="text-2xl mr-2">❓</Text>
          <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
            Help
          </Text>
        </View>
      </View>
    </View>
  );
}
