import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { getAppointments } from "@/utils/storage";
import AppointmentCard from "@/components/AppointmentCard";

export default function AppointmentsScreen() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [filter, setFilter] = useState("upcoming");

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [])
  );

  const loadAppointments = async () => {
    const data = await getAppointments();
    setAppointments(data || []);
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "upcoming") {
      return apt.status === "confirmed" || apt.status === "pending";
    } else if (filter === "completed") {
      return apt.status === "completed";
    } else {
      return apt.status === "cancelled";
    }
  });

  const getStatusCount = (status: string) => {
    if (status === "upcoming") {
      return appointments.filter(
        (apt) => apt.status === "confirmed" || apt.status === "pending"
      ).length;
    } else if (status === "completed") {
      return appointments.filter((apt) => apt.status === "completed").length;
    } else {
      return appointments.filter((apt) => apt.status === "cancelled").length;
    }
  };

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
          <Text className="text-3xl font-bold text-white">Appointments</Text>
          <TouchableOpacity
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            activeOpacity={0.8}
          >
            <Ionicons name="calendar" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text className="text-white text-sm opacity-90">
          Manage your upcoming and past appointments
        </Text>
      </LinearGradient>

      {/* Filter Tabs - Modern Design */}
      <View className="px-4 py-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            className="mr-3 rounded-full overflow-hidden"
            style={{
              shadowColor: filter === "upcoming" ? COLORS.primary : "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: filter === "upcoming" ? 0.3 : 0.08,
              shadowRadius: 4,
              elevation: filter === "upcoming" ? 4 : 2,
            }}
            onPress={() => setFilter("upcoming")}
            activeOpacity={0.8}
          >
            {filter === "upcoming" ? (
              <LinearGradient
                colors={["#4A90E2", "#357ABD"]}
                className="px-5 py-3 flex-row items-center"
              >
                <Ionicons name="time" size={18} color="#FFFFFF" />
                <Text className="text-sm font-bold text-white ml-2">
                  Upcoming
                </Text>
                {getStatusCount("upcoming") > 0 && (
                  <View
                    className="ml-2 px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
                  >
                    <Text className="text-xs font-bold text-white">
                      {getStatusCount("upcoming")}
                    </Text>
                  </View>
                )}
              </LinearGradient>
            ) : (
              <View
                className="px-5 py-3 flex-row items-center"
                style={{ backgroundColor: COLORS.white }}
              >
                <Ionicons
                  name="time-outline"
                  size={18}
                  color={COLORS.textSecondary}
                />
                <Text
                  className="text-sm font-semibold ml-2"
                  style={{ color: COLORS.textSecondary }}
                >
                  Upcoming
                </Text>
                {getStatusCount("upcoming") > 0 && (
                  <View
                    className="ml-2 px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: COLORS.grayLight }}
                  >
                    <Text
                      className="text-xs font-bold"
                      style={{ color: COLORS.textSecondary }}
                    >
                      {getStatusCount("upcoming")}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="mr-3 rounded-full overflow-hidden"
            style={{
              shadowColor: filter === "completed" ? COLORS.secondary : "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: filter === "completed" ? 0.3 : 0.08,
              shadowRadius: 4,
              elevation: filter === "completed" ? 4 : 2,
            }}
            onPress={() => setFilter("completed")}
            activeOpacity={0.8}
          >
            {filter === "completed" ? (
              <LinearGradient
                colors={["#50C878", "#3EA662"]}
                className="px-5 py-3 flex-row items-center"
              >
                <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                <Text className="text-sm font-bold text-white ml-2">
                  Completed
                </Text>
                {getStatusCount("completed") > 0 && (
                  <View
                    className="ml-2 px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
                  >
                    <Text className="text-xs font-bold text-white">
                      {getStatusCount("completed")}
                    </Text>
                  </View>
                )}
              </LinearGradient>
            ) : (
              <View
                className="px-5 py-3 flex-row items-center"
                style={{ backgroundColor: COLORS.white }}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={18}
                  color={COLORS.textSecondary}
                />
                <Text
                  className="text-sm font-semibold ml-2"
                  style={{ color: COLORS.textSecondary }}
                >
                  Completed
                </Text>
                {getStatusCount("completed") > 0 && (
                  <View
                    className="ml-2 px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: COLORS.grayLight }}
                  >
                    <Text
                      className="text-xs font-bold"
                      style={{ color: COLORS.textSecondary }}
                    >
                      {getStatusCount("completed")}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-full overflow-hidden"
            style={{
              shadowColor: filter === "cancelled" ? COLORS.error : "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: filter === "cancelled" ? 0.3 : 0.08,
              shadowRadius: 4,
              elevation: filter === "cancelled" ? 4 : 2,
            }}
            onPress={() => setFilter("cancelled")}
            activeOpacity={0.8}
          >
            {filter === "cancelled" ? (
              <LinearGradient
                colors={["#F44336", "#D32F2F"]}
                className="px-5 py-3 flex-row items-center"
              >
                <Ionicons name="close-circle" size={18} color="#FFFFFF" />
                <Text className="text-sm font-bold text-white ml-2">
                  Cancelled
                </Text>
                {getStatusCount("cancelled") > 0 && (
                  <View
                    className="ml-2 px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
                  >
                    <Text className="text-xs font-bold text-white">
                      {getStatusCount("cancelled")}
                    </Text>
                  </View>
                )}
              </LinearGradient>
            ) : (
              <View
                className="px-5 py-3 flex-row items-center"
                style={{ backgroundColor: COLORS.white }}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={18}
                  color={COLORS.textSecondary}
                />
                <Text
                  className="text-sm font-semibold ml-2"
                  style={{ color: COLORS.textSecondary }}
                >
                  Cancelled
                </Text>
                {getStatusCount("cancelled") > 0 && (
                  <View
                    className="ml-2 px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: COLORS.grayLight }}
                  >
                    <Text
                      className="text-xs font-bold"
                      style={{ color: COLORS.textSecondary }}
                    >
                      {getStatusCount("cancelled")}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Appointments List */}
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {filteredAppointments.length > 0 ? (
          <>
            <View className="flex-row items-center justify-between mb-3">
              <Text
                className="text-sm font-semibold"
                style={{ color: COLORS.textSecondary }}
              >
                {filteredAppointments.length}{" "}
                {filteredAppointments.length === 1
                  ? "appointment"
                  : "appointments"}
              </Text>
            </View>
            {filteredAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </>
        ) : (
          <View className="items-center justify-center py-20 px-6">
            <View
              className="w-24 h-24 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: COLORS.primaryLight }}
            >
              <Ionicons
                name={
                  filter === "upcoming"
                    ? "calendar-outline"
                    : filter === "completed"
                      ? "checkmark-done-circle-outline"
                      : "close-circle-outline"
                }
                size={48}
                color={COLORS.primary}
              />
            </View>
            <Text
              className="text-lg font-bold mb-2 text-center"
              style={{ color: COLORS.textPrimary }}
            >
              No {filter} appointments
            </Text>
            <Text
              className="text-sm text-center mb-6"
              style={{ color: COLORS.textSecondary }}
            >
              {filter === "upcoming"
                ? "You don't have any upcoming appointments. Book your first appointment now!"
                : filter === "completed"
                  ? "Your completed appointments will appear here."
                  : "You don't have any cancelled appointments."}
            </Text>
            {filter === "upcoming" && (
              <TouchableOpacity
                className="rounded-full px-6 py-3"
                style={{
                  backgroundColor: COLORS.primary,
                  shadowColor: COLORS.primary,
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  elevation: 4,
                }}
                onPress={() =>
                  router.push({
                    pathname: "/doctor/specialties",
                    params: { consultationType: "physical" },
                  })
                }
                activeOpacity={0.8}
              >
                <View className="flex-row items-center">
                  <Ionicons name="add-circle" size={20} color="#FFFFFF" />
                  <Text className="text-white text-sm font-bold ml-2">
                    Book Appointment
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
