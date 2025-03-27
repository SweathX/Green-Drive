"use client"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useLanguage } from "../context/LanguageContext"

interface NavbarProps {
  activeScreen: string
  onChangeScreen: (screen: string) => void
}

const Navbar = ({ activeScreen, onChangeScreen }: NavbarProps) => {
  const { t } = useLanguage()

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.navItem, activeScreen === "home" && styles.activeNavItem]}
        onPress={() => onChangeScreen("home")}
      >
        <Feather name="home" size={22} color={activeScreen === "home" ? "#34C759" : "#8E8E93"} />
        <Text style={[styles.navText, activeScreen === "home" && styles.activeNavText]}>{t("common.home")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, activeScreen === "dashboard" && styles.activeNavItem]}
        onPress={() => onChangeScreen("dashboard")}
      >
        <Feather name="bar-chart-2" size={22} color={activeScreen === "dashboard" ? "#34C759" : "#8E8E93"} />
        <Text style={[styles.navText, activeScreen === "dashboard" && styles.activeNavText]}>
          {t("common.dashboard")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, activeScreen === "profile" && styles.activeNavItem]}
        onPress={() => onChangeScreen("profile")}
      >
        <Feather name="user" size={22} color={activeScreen === "profile" ? "#34C759" : "#8E8E93"} />
        <Text style={[styles.navText, activeScreen === "profile" && styles.activeNavText]}>{t("common.profile")}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 5, // Pour tenir compte de la zone de sécurité sur iOS
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  activeNavItem: {
    borderTopWidth: 2,
    borderTopColor: "#34C759",
    paddingTop: 6, // Compenser la bordure
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
    color: "#8E8E93",
  },
  activeNavText: {
    color: "#34C759",
    fontWeight: "500",
  },
})

export default Navbar

