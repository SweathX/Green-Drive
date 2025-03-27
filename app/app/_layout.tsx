"use client"

import { useState } from "react"
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native"
import Dashboard from "./screens/DashBoard"
import HomeScreen from "./screens/HomeScreen"
import ProfileScreen from "./screens/ProfileScreen"
import Navbar from "./components/Navbar"
import { LanguageProvider } from "./context/LanguageContext"

const App = () => {
  const [activeScreen, setActiveScreen] = useState("home")

  // Fonction pour rendre l'écran actif
  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return <HomeScreen />
      case "dashboard":
        return <Dashboard />
      case "profile":
        return <ProfileScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <LanguageProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.content}>{renderScreen()}</View>
        <Navbar activeScreen={activeScreen} onChangeScreen={setActiveScreen} />
      </SafeAreaView>
    </LanguageProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
})

export default App

