import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

// fonts
import {
  useFonts as useRoboto,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import {
  useFonts as useLexend,
  Lexend_400Regular,
  Lexend_600SemiBold,
} from "@expo-google-fonts/lexend";

import {
  ThemeProvider as AppThemeProvider,
  useThemeToggle,
} from "@/hooks/use-theme";

export const unstable_settings = {
  anchor: "(tabs)",
};

function InnerLayout() {
  const { isDark } = useThemeToggle();

  const [robotoLoaded] = useRoboto({ Roboto_400Regular, Roboto_700Bold });
  const [lexendLoaded] = useLexend({ Lexend_400Regular, Lexend_600SemiBold });

  if (!robotoLoaded || !lexendLoaded) {
    // fonts still loading — render nothing (leave splash visible)
    return null;
  }

  return (
    <NavigationThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <InnerLayout />
    </AppThemeProvider>
  );
}
