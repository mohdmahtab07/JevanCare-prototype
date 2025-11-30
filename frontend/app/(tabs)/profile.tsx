import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { APP_CONFIG } from "@/constants/config";
import { getUserData, getUserLocation, saveLoginStatus } from "@/utils/storage";

export default function ProfileScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const user = await getUserData();
    const loc = await getUserLocation();
    setUserData(user);
    setLocation(loc);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await saveLoginStatus(false);
          router.replace("/(auth)/splash");
        },
      },
    ]);
  };

  const menuSections = [
    {
      title: "Account",
      items: [
        {
          icon: "person-outline",
          iconSet: "ionicons",
          title: "Edit Profile",
          subtitle: "Update your personal information",
          color: "#4A90E2",
          action: () =>
            Alert.alert("Coming Soon", "This feature will be available soon"),
        },
        {
          icon: "people-outline",
          iconSet: "ionicons",
          title: "Family Members",
          subtitle: "Manage family health profiles",
          color: "#50C878",
          action: () => Alert.alert("Coming Soon", "Add family members"),
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          icon: "card-outline",
          iconSet: "ionicons",
          title: "Payment Methods",
          subtitle: "Manage your payment options",
          color: "#FF9800",
          action: () => Alert.alert("Coming Soon", "Payment methods"),
        },
        {
          icon: "notifications-outline",
          iconSet: "ionicons",
          title: "Notifications",
          subtitle: "Manage notification preferences",
          color: "#9C27B0",
          action: () => Alert.alert("Coming Soon", "Notification settings"),
        },
        {
          icon: "globe-outline",
          iconSet: "ionicons",
          title: "Language",
          subtitle: "English, हिंदी, ਪੰਜਾਬੀ",
          color: "#2196F3",
          action: () => Alert.alert("Coming Soon", "Language selection"),
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: "help-circle-outline",
          iconSet: "ionicons",
          title: "Help & Support",
          subtitle: "Get help and contact support",
          color: "#00BCD4",
          action: () =>
            Alert.alert("Support", "Contact: support@jevancare.com"),
        },
        {
          icon: "shield-checkmark-outline",
          iconSet: "ionicons",
          title: "Terms & Privacy",
          subtitle: "Read our terms and privacy policy",
          color: "#607D8B",
          action: () => Alert.alert("Coming Soon", "Terms and Privacy"),
        },
        {
          icon: "information-circle-outline",
          iconSet: "ionicons",
          title: "About",
          subtitle: `Version ${APP_CONFIG.version}`,
          color: "#9E9E9E",
          action: () =>
            Alert.alert(
              "About JeevanCare",
              "JeevanCare is a healthcare platform connecting rural patients with quality medical services.\n\nServing 173 villages in Punjab."
            ),
        },
      ],
    },
  ];

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background }}>
      {/* Modern Header with Gradient & Rounded Bottom */}
      <LinearGradient
        colors={["#4A90E2", "#357ABD", "#2868A8"]}
        style={{
          paddingHorizontal: 16,
          paddingTop: 48,
          paddingBottom: 24,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Text className="text-2xl font-bold text-white mb-6">Profile</Text>

        {/* User Info Card - Elevated */}
        <View
          className="rounded-2xl p-4"
          style={{
            backgroundColor: COLORS.white,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <View className="flex-row items-center">
            {/* Profile Picture */}
            <View
              className="w-20 h-20 rounded-full items-center justify-center mr-4"
              style={{
                backgroundColor: COLORS.primaryLight,
                borderWidth: 3,
                borderColor: COLORS.primary,
              }}
            >
              <Ionicons name="person" size={36} color={COLORS.primary} />
            </View>

            <View className="flex-1">
              <Text
                className="text-lg font-bold mb-1"
                style={{ color: COLORS.textPrimary }}
              >
                {userData?.name || "User"}
              </Text>
              <View className="flex-row items-center mb-1">
                <Ionicons name="call" size={14} color={COLORS.textSecondary} />
                <Text
                  className="text-sm ml-1"
                  style={{ color: COLORS.textSecondary }}
                >
                  +91 {userData?.phoneNumber}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons
                  name="location"
                  size={14}
                  color={COLORS.textSecondary}
                />
                <Text
                  className="text-sm ml-1"
                  style={{ color: COLORS.textSecondary }}
                >
                  {location?.city || "Nabha"}, {location?.state || "Punjab"}
                </Text>
              </View>
            </View>

            {/* Edit Button */}
            <TouchableOpacity
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: COLORS.primaryLight }}
              activeOpacity={0.7}
            >
              <Ionicons name="pencil" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Menu Sections */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ marginTop: 12 }}
      >
        <View className="px-4">
          {menuSections.map((section, sectionIndex) => (
            <View key={sectionIndex} className="mb-4">
              {/* Section Title */}
              <Text
                className="text-sm font-bold mb-2 ml-1"
                style={{ color: COLORS.textSecondary }}
              >
                {section.title}
              </Text>

              {/* Section Items */}
              <View
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: COLORS.white,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 6,
                  elevation: 3,
                }}
              >
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    className="p-4 flex-row items-center"
                    style={{
                      borderBottomWidth:
                        itemIndex < section.items.length - 1 ? 1 : 0,
                      borderBottomColor: COLORS.grayLight,
                    }}
                    onPress={item.action}
                    activeOpacity={0.7}
                  >
                    {/* Icon */}
                    <View
                      className="w-11 h-11 rounded-full items-center justify-center mr-3"
                      style={{ backgroundColor: item.color + "15" }}
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={22}
                        color={item.color}
                      />
                    </View>

                    {/* Text */}
                    <View className="flex-1">
                      <Text
                        className="text-base font-semibold mb-1"
                        style={{ color: COLORS.textPrimary }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        className="text-xs"
                        style={{ color: COLORS.textSecondary }}
                      >
                        {item.subtitle}
                      </Text>
                    </View>

                    {/* Arrow */}
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={COLORS.textSecondary}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            className="rounded-2xl p-4 flex-row items-center justify-center mb-6"
            style={{
              backgroundColor: COLORS.white,
              borderColor: COLORS.error,
              borderWidth: 2,
              shadowColor: COLORS.error,
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 3,
            }}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
            <Text
              className="text-base font-bold ml-2"
              style={{ color: COLORS.error }}
            >
              Logout
            </Text>
          </TouchableOpacity>

          {/* Footer with Mission */}
          <View
            className="rounded-2xl p-5 mb-4"
            style={{
              backgroundColor: COLORS.white,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            <View className="items-center">
              {/* Logo */}
              <View
                className="w-16 h-16 rounded-full items-center justify-center mb-3"
                style={{ backgroundColor: COLORS.primaryLight }}
              >
                <Ionicons name="medical" size={32} color={COLORS.primary} />
              </View>

              <Text
                className="text-xl font-bold mb-2"
                style={{ color: COLORS.primary }}
              >
                {APP_CONFIG.appName}
              </Text>

              <Text
                className="text-sm text-center mb-3"
                style={{ color: COLORS.textSecondary }}
              >
                Connecting rural communities with quality healthcare
              </Text>

              {/* Stats */}
              <View className="flex-row items-center justify-center space-x-4">
                <View className="items-center px-4">
                  <Text
                    className="text-2xl font-bold"
                    style={{ color: COLORS.primary }}
                  >
                    173
                  </Text>
                  <Text
                    className="text-xs"
                    style={{ color: COLORS.textSecondary }}
                  >
                    Villages
                  </Text>
                </View>
                <View
                  style={{
                    width: 1,
                    height: 30,
                    backgroundColor: COLORS.grayLight,
                  }}
                />
                <View className="items-center px-4">
                  <Text
                    className="text-2xl font-bold"
                    style={{ color: COLORS.secondary }}
                  >
                    24/7
                  </Text>
                  <Text
                    className="text-xs"
                    style={{ color: COLORS.textSecondary }}
                  >
                    Support
                  </Text>
                </View>
              </View>

              <Text
                className="text-xs mt-4"
                style={{ color: COLORS.textSecondary }}
              >
                Version {APP_CONFIG.version} • Made with ❤️ in India
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
