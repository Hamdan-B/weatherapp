import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "./src/theme/colors";
import { getWeather } from "./src/services/weatherApi";
import WeatherCard from "./src/components/WeatherCard";

export default function App() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const fetchWeather = async () => {
    if (!city.trim()) return;

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
        <WeatherCard weather={weather} isDarkMode={isDarkMode} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 20,
  },
  input: {
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 10,
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
  },
  loader: {
    marginTop: 20,
  },
  error: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
