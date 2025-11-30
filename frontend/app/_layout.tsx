import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { getLoginStatus } from "@/utils/storage";
import "./global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#FAFAFA" },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="doctor" />
      <Stack.Screen name="appointment" />
    </Stack>
  );
}
