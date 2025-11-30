import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { getHealthRecords, saveHealthRecord } from "@/utils/storage";
import HealthRecordCard from "@/components/HealthRecordCard";

export default function HealthRecordsScreen() {
  const router = useRouter();
  const [records, setRecords] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useFocusEffect(
    useCallback(() => {
      loadRecords();
    }, [])
  );

  const loadRecords = async () => {
    const data = await getHealthRecords();
    setRecords(data || []);
  };

  const getCategoryCount = (category: string) => {
    return records.filter((r) => r.category === category).length;
  };

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please grant camera roll permissions to upload records"
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      showCategorySelection(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Please grant camera permissions");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      showCategorySelection(result.assets[0].uri);
    }
  };

  const showCategorySelection = (imageUri: string) => {
    Alert.alert("Select Category", "Choose the type of health record", [
      {
        text: "Lab Report",
        onPress: () => saveRecord(imageUri, "Lab Report"),
      },
      {
        text: "Prescription",
        onPress: () => saveRecord(imageUri, "Prescription"),
      },
      {
        text: "Medical Imaging",
        onPress: () => saveRecord(imageUri, "Medical Imaging"),
      },
      {
        text: "Vaccination",
        onPress: () => saveRecord(imageUri, "Vaccination"),
      },
      {
        text: "Medical Bill",
        onPress: () => saveRecord(imageUri, "Medical Bill"),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const saveRecord = async (imageUri: string, category: string) => {
    const newRecord = {
      id: Date.now().toString(),
      title: `${category} - ${new Date().toLocaleDateString()}`,
      category: category,
      imageUri: imageUri,
      date: new Date().toLocaleDateString(),
      description: "",
      uploadedAt: new Date().toISOString(),
    };

    await saveHealthRecord(newRecord);
    loadRecords();
    Alert.alert("Success", "Health record uploaded successfully!");
  };

  const showUploadOptions = () => {
    Alert.alert("Upload Record", "Choose upload method", [
      {
        text: "Take Photo",
        onPress: takePhoto,
      },
      {
        text: "Choose from Gallery",
        onPress: pickImage,
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const categoryItems = [
    {
      name: "Lab Reports",
      icon: "flask",
      iconSet: "ionicons",
      color: "#2196F3",
      bgColor: "#E3F2FD",
    },
    {
      name: "Prescription",
      icon: "medical",
      iconSet: "ionicons",
      color: "#FF9800",
      bgColor: "#FFF3E0",
    },
    {
      name: "Doctor Notes",
      icon: "document-text",
      iconSet: "ionicons",
      color: "#FFC107",
      bgColor: "#FFF9C4",
    },
    {
      name: "Medical Imaging",
      icon: "scan",
      iconSet: "ionicons",
      color: "#00BCD4",
      bgColor: "#E0F7FA",
    },
    {
      name: "Vaccination",
      icon: "needle",
      iconSet: "materialcommunity",
      color: "#9C27B0",
      bgColor: "#F3E5F5",
    },
    {
      name: "Medical Bill",
      icon: "receipt",
      iconSet: "ionicons",
      color: "#E91E63",
      bgColor: "#FCE4EC",
    },
  ];

  const filteredRecords =
    selectedCategory === "All"
      ? records
      : records.filter((r) => r.category === selectedCategory);

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
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-3xl font-bold text-white">Records</Text>
          <TouchableOpacity
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            activeOpacity={0.8}
          >
            <Ionicons name="search" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text className="text-white text-sm opacity-90">
          All your health documents, neatly organized and easily accessible.
        </Text>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Category Grid */}
        <View className="px-4 mt-4">
          <View className="flex-row flex-wrap justify-between">
            {categoryItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="w-[48%] mb-3 rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: COLORS.white,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 6,
                  elevation: 3,
                }}
                onPress={() => setSelectedCategory(item.name)}
                activeOpacity={0.8}
              >
                <View className="p-4">
                  <View className="flex-row items-start justify-between mb-3">
                    <View
                      className="w-12 h-12 rounded-full items-center justify-center"
                      style={{ backgroundColor: item.bgColor }}
                    >
                      {item.iconSet === "ionicons" ? (
                        <Ionicons
                          name={item.icon as any}
                          size={24}
                          color={item.color}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name={item.icon as any}
                          size={24}
                          color={item.color}
                        />
                      )}
                    </View>
                    <View
                      className="px-3 py-1 rounded-full"
                      style={{ backgroundColor: item.bgColor }}
                    >
                      <Text
                        className="text-2xl font-bold"
                        style={{ color: item.color }}
                      >
                        {getCategoryCount(item.name)}
                      </Text>
                    </View>
                  </View>
                  <Text
                    className="text-sm font-bold"
                    style={{ color: COLORS.textPrimary }}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add New Record Button */}
        <View className="px-4 mt-2">
          <TouchableOpacity
            className="rounded-2xl p-5 flex-row items-center justify-center"
            style={{
              backgroundColor: COLORS.primary,
              shadowColor: COLORS.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
            onPress={showUploadOptions}
            activeOpacity={0.9}
          >
            <Ionicons name="add-circle" size={24} color="#FFFFFF" />
            <Text className="text-white text-lg font-bold ml-2">
              Add New Record
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Access Cards */}
        <View className="px-4 mt-4">
          <View className="flex-row justify-between">
            {/* Patient Health History */}
            <TouchableOpacity
              className="flex-1 mr-2 rounded-2xl p-4"
              style={{
                backgroundColor: "#F3E5F5",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 3,
              }}
              activeOpacity={0.8}
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-3"
                style={{ backgroundColor: "#E1BEE7" }}
              >
                <Ionicons name="time" size={24} color="#9C27B0" />
              </View>
              <Text
                className="text-sm font-bold mb-1"
                style={{ color: "#9C27B0" }}
              >
                Patient Health
              </Text>
              <Text className="text-sm font-bold" style={{ color: "#9C27B0" }}>
                History →
              </Text>
            </TouchableOpacity>

            {/* Emergency Health Records */}
            <TouchableOpacity
              className="flex-1 ml-2 rounded-2xl p-4"
              style={{
                backgroundColor: "#E0F7FA",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 3,
              }}
              activeOpacity={0.8}
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-3"
                style={{ backgroundColor: "#B2EBF2" }}
              >
                <Ionicons name="alert-circle" size={24} color="#00BCD4" />
              </View>
              <Text
                className="text-sm font-bold mb-1"
                style={{ color: "#00BCD4" }}
              >
                Emergency Health
              </Text>
              <Text className="text-sm font-bold" style={{ color: "#00BCD4" }}>
                Records...
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Records Section */}
        {records.length > 0 && (
          <View className="px-4 mt-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text
                className="text-lg font-bold"
                style={{ color: COLORS.textPrimary }}
              >
                Recent Records
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-sm font-semibold"
                  style={{ color: COLORS.primary }}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {filteredRecords.slice(0, 3).map((record) => (
              <HealthRecordCard
                key={record.id}
                record={record}
                onPress={() => Alert.alert("Record", record.title)}
              />
            ))}
          </View>
        )}

        {/* Empty State */}
        {records.length === 0 && (
          <View className="items-center justify-center py-16 px-6">
            <View
              className="w-24 h-24 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: COLORS.primaryLight }}
            >
              <Ionicons name="document-text" size={48} color={COLORS.primary} />
            </View>
            <Text
              className="text-lg font-bold mb-2 text-center"
              style={{ color: COLORS.textPrimary }}
            >
              No record found
            </Text>
            <Text
              className="text-sm text-center mb-6"
              style={{ color: COLORS.textSecondary }}
            >
              Upload your medical reports, prescriptions, and other health
              documents
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
