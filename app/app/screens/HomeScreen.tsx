"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import StartTripButton from "../components/StartTripButton"
import DrivingMeters from "../components/DrivingMeters"
import LanguageSwitcher from "../components/LanguageSwitcher"
import { Feather } from "@expo/vector-icons"
import { useLanguage } from "../context/LanguageContext"

const HomeScreen = () => {
  const [isDriving, setIsDriving] = useState(false)
  const { t } = useLanguage()

  const toggleDriving = () => {
    setIsDriving(!isDriving)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{t("home.title")}</Text>
          <Text style={styles.subtitle}>{t("home.subtitle")}</Text>
        </View>
        <LanguageSwitcher />
      </View>

      <View style={styles.content}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusIndicator, isDriving ? styles.statusActive : styles.statusInactive]}>
            <Feather name={isDriving ? "zap" : "zap-off"} size={16} color={isDriving ? "#FFFFFF" : "#8E8E93"} />
          </View>
          <Text style={styles.statusText}>
            {isDriving ? t("home.vehicleConnected") : t("home.vehicleNotConnected")}
          </Text>
          <TouchableOpacity style={styles.statusButton} onPress={toggleDriving}>
            <Text style={styles.statusButtonText}>
              {isDriving ? t("home.disconnect") : t("home.simulateConnection")}
            </Text>
          </TouchableOpacity>
        </View>

        <DrivingMeters isActive={isDriving} />

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/300x150/34C759/FFFFFF?text=Green+Drive" }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.welcomeText}>{t("home.readyToStart")}</Text>

        <Text style={styles.descriptionText}>{t("home.description")}</Text>

        <StartTripButton />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1C1C1E",
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F7",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  statusIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  statusActive: {
    backgroundColor: "#34C759",
  },
  statusInactive: {
    backgroundColor: "#F5F5F7",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  statusText: {
    fontSize: 14,
    color: "#1C1C1E",
    flex: 1,
  },
  statusButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  statusButtonText: {
    fontSize: 12,
    color: "#34C759",
    fontWeight: "500",
  },
  imageContainer: {
    width: "100%",
    height: 120,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1C1E",
    textAlign: "center",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
})

export default HomeScreen

