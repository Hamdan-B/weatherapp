import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { colors } from "../theme/colors";

const WeatherCard = ({ weather, isDarkMode }) => {
  const iconUrl = weather.current.condition.icon.startsWith("//")
    ? `https:${weather.current.condition.icon}`
    : weather.current.condition.icon;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDarkMode ? colors.darkSecondary : colors.secondary,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View>
          <Text
            style={[
              styles.temperature,
              { color: isDarkMode ? colors.textLight : colors.textDark },
            ]}
          >
            {Math.round(weather.current.temp_c)}°C
          </Text>
          <Text
            style={[
              styles.condition,
              { color: isDarkMode ? colors.textLight : colors.textDark },
            ]}
          >
            {weather.current.condition.text}
          </Text>
        </View>

        <Image
          source={{ uri: iconUrl }}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text
            style={[
              styles.detailsLabel,
              { color: isDarkMode ? colors.textLight : colors.textDark },
            ]}
          >
            Humidity
          </Text>
          <Text
            style={[
              styles.detailsValue,
              { color: isDarkMode ? colors.textLight : colors.textDark },
            ]}
          >
            {weather.current.humidity}%
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={[
              styles.detailsLabel,
              { color: isDarkMode ? colors.textLight : colors.textDark },
            ]}
          >
            Wind
          </Text>
          <Text
            style={[
              styles.detailsValue,
              { color: isDarkMode ? colors.textLight : colors.textDark },
            ]}
          >
            {weather.current.wind_kph} km/h
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={[
              styles.detailsLabel,
              { color: isDarkMode ? colors.textLight : colors.textDark },
            ]}
          >
            Pressure
          </Text>
          <Text
            style={[
              styles.detailsValue,
              { color: isDarkMode ? colors.textLight : colors.textDark },
            ]}
          >
            {weather.current.pressure_mb} mb
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  temperature: {
    fontSize: 48,
    fontFamily: "Roboto_700Bold",
    textAlign: "center",
  },
  condition: {
    fontSize: 22,
    marginVertical: 6,
    fontFamily: "Lexend_400Regular",
  },
  detailsContainer: {
    marginTop: 15,
  },
  details: {
    fontSize: 16,
    marginVertical: 5,
  },
  detailsLabel: {
    fontSize: 14,
    fontFamily: "Lexend_400Regular",
  },
  detailsValue: {
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  icon: {
    width: 80,
    height: 80,
  },
});

export default WeatherCard;
