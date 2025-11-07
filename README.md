# WeatherApp

A beautiful, modern weather application built with React Native and Expo. WeatherApp provides real-time weather data, supports both light and dark modes, and features a clean, responsive UI with custom fonts and a unique color palette.

---

## 🌦️ Features

- Real-time weather data for any city (powered by [WeatherAPI.com](https://www.weatherapi.com/))
- Light and dark mode toggle
- Minimalist yet visually appealing design
- Custom color palette and Google Fonts (Roboto & Lexend)
- Detailed weather info: temperature, feels like, humidity, wind, pressure, local time, and more
- Responsive layout for all devices

---

## 📦 Dependencies

- **React Native** (via Expo)
- **Expo** (CLI, Go app, and managed workflow)
- **expo-router** (file-based navigation)
- **@expo-google-fonts/roboto** & **@expo-google-fonts/lexend** (custom fonts)
- **axios** (API requests)
- **react-native-safe-area-context** & **react-native-screens** (UI & navigation)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hamdan-b/weatherapp.git
cd weatherapp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your WeatherAPI key

- Go to `src/services/weatherApi.js`
- Replace the API key with your own from [WeatherAPI.com](https://www.weatherapi.com/)

### 4. Run the app

```bash
npx expo start
```

- Scan the QR code with Expo Go (Android/iOS)
- Or press 'a' for Android emulator, 'w' for web

---

## 🖼️ Screenshots


| Light Mode                             | Dark Mode                            |
| -------------------------------------- | ------------------------------------ |
| ![Light](./screenshots/light-mode.png) | ![Dark](./screenshots/dark-mode.png) |

---

## 🎨 Color Palette

- Primary: `#473472`
- Secondary: `#53629E`
- Tertiary: `#87BAC3`
- Background: `#D6F4ED`

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

- Weather data from [WeatherAPI.com](https://www.weatherapi.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/)
