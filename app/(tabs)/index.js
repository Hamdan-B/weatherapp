import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getWeather } from "../../src/services/weatherApi";
import WeatherCard from "../../src/components/WeatherCard";
import { colors } from "../../src/theme/colors";
import { useThemeToggle } from "@/hooks/use-theme";

export default function HomeScreen() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const colorScheme = useColorScheme();
  // still respect system until user toggles; the provider keeps this in sync
  const isSystemDark = colorScheme === "dark";
  const { isDark, toggleTheme } = useThemeToggle();
  const isDarkMode = typeof isDark === "boolean" ? isDark : isSystemDark;

  const fetchWeather = async () => {
    if (!city || !city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const backgroundColor = isDarkMode
    ? colors.darkBackground
    : colors.background;
  const textColor = isDarkMode ? colors.textLight : colors.textDark;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View
        style={[
          styles.header,
          { borderBottomColor: isDarkMode ? "#222" : "#eee" },
        ]}
      >
        <Text style={[styles.title, { color: textColor }]}>Weather</Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
          <Text style={[styles.toggleText, { color: textColor }]}>
            {isDarkMode ? "Light" : "Dark"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode
                ? colors.darkSecondary
                : colors.tertiary,
              color: textColor,
            },
          ]}
          placeholder="Enter city name"
          placeholderTextColor={isDarkMode ? colors.textLight : colors.textDark}
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isDarkMode ? colors.darkPrimary : colors.primary,
            },
          ]}
          onPress={fetchWeather}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator
          size="large"
          color={isDarkMode ? colors.darkPrimary : colors.primary}
          style={styles.loader}
        />
      )}
      {error && (
        <Text style={[styles.error, { color: textColor }]}>{error}</Text>
      )}

      {weather && !loading && (
        <View style={styles.content}>
          <WeatherCard weather={weather} isDarkMode={isDarkMode} />

          <View style={styles.extraRow}>
            <View
              style={[
                styles.statBox,
                { backgroundColor: isDarkMode ? "#2a2a3a" : "#fff" },
              ]}
            >
              <Text style={[styles.statLabel, { color: textColor }]}>
                Feels like
              </Text>
              <Text style={[styles.statValue, { color: textColor }]}>
                {Math.round(weather.current.feelslike_c)}°C
              </Text>
            </View>
            <View
              style={[
                styles.statBox,
                { backgroundColor: isDarkMode ? "#2a2a3a" : "#fff" },
              ]}
            >
              <Text style={[styles.statLabel, { color: textColor }]}>
                Humidity
              </Text>
              <Text style={[styles.statValue, { color: textColor }]}>
                {weather.current.humidity}%
              </Text>
            </View>
            <View
              style={[
                styles.statBox,
                { backgroundColor: isDarkMode ? "#2a2a3a" : "#fff" },
              ]}
            >
              <Text style={[styles.statLabel, { color: textColor }]}>Wind</Text>
              <Text style={[styles.statValue, { color: textColor }]}>
                {weather.current.wind_kph} km/h
              </Text>
            </View>
          </View>

          <View style={styles.bottomInfo}>
            <Text style={[styles.localTime, { color: textColor }]}>
              Local time: {weather.location.localtime}
            </Text>
            <Text style={[styles.country, { color: textColor }]}>
              {weather.location.name}, {weather.location.country}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  searchContainer: { padding: 20 },
  title: {
    fontSize: 24,
    fontFamily: "Lexend_600SemiBold",
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  toggleText: {
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
  },
  input: {
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Roboto_400Regular",
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto_700Bold",
  },
  loader: { marginTop: 20 },
  error: { textAlign: "center", marginTop: 20, fontSize: 16 },
  content: { paddingHorizontal: 10 },
  extraRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 8,
  },
  statBox: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 6,
    alignItems: "center",
  },
  statLabel: { fontSize: 13, fontFamily: "Lexend_400Regular", marginBottom: 6 },
  statValue: { fontSize: 16, fontFamily: "Roboto_700Bold" },
  bottomInfo: { padding: 20, alignItems: "center" },
  localTime: { fontSize: 14, fontFamily: "Roboto_400Regular" },
  country: { fontSize: 16, fontFamily: "Lexend_400Regular", marginTop: 6 },
});
