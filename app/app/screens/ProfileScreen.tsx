"use client"
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native"
import { Feather } from "@expo/vector-icons"
import LanguageSwitcher from "../components/LanguageSwitcher"
import { useLanguage } from "../context/LanguageContext"

const ProfileScreen = () => {
  const { t } = useLanguage()

  // Données fictives pour la démo
  const user = {
    name: "Thomas Dubois",
    email: "thomas.dubois@example.com",
    joinDate: t("profile.memberSince") + " Juin 2023",
    vehicle: "Renault Clio E-Tech",
    totalTrips: 87,
    totalDistance: 1243,
    averageScore: 79,
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("profile.title")}</Text>
        <View style={styles.headerRight}>
          <LanguageSwitcher />
          <TouchableOpacity style={styles.settingsButton}>
            <Feather name="settings" size={22} color="#1C1C1E" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileSection}>
        <Image source={{ uri: "https://via.placeholder.com/100/CCCCCC/FFFFFF?text=TD" }} style={styles.profileImage} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.joinDate}>{user.joinDate}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Feather name="truck" size={20} color="#34C759" style={styles.infoIcon} />
          <View>
            <Text style={styles.infoLabel}>{t("profile.vehicle")}</Text>
            <Text style={styles.infoValue}>{user.vehicle}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.totalTrips}</Text>
            <Text style={styles.statLabel}>{t("profile.trips")}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.totalDistance} km</Text>
            <Text style={styles.statLabel}>{t("profile.distance")}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.averageScore}</Text>
            <Text style={styles.statLabel}>{t("profile.averageScore")}</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Feather name="award" size={20} color="#34C759" style={styles.menuIcon} />
          <Text style={styles.menuText}>{t("profile.badges")}</Text>
          <Feather name="chevron-right" size={20} color="#8E8E93" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="clock" size={20} color="#34C759" style={styles.menuIcon} />
          <Text style={styles.menuText}>{t("profile.tripHistory")}</Text>
          <Feather name="chevron-right" size={20} color="#8E8E93" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="help-circle" size={20} color="#34C759" style={styles.menuIcon} />
          <Text style={styles.menuText}>{t("profile.helpSupport")}</Text>
          <Feather name="chevron-right" size={20} color="#8E8E93" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="log-out" size={20} color="#FF3B30" style={styles.menuIcon} />
          <Text style={[styles.menuText, { color: "#FF3B30" }]}>{t("profile.logout")}</Text>
          <Feather name="chevron-right" size={20} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer} />
    </ScrollView>
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
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1C1C1E",
  },
  settingsButton: {
    padding: 8,
    marginLeft: 8,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#8E8E93",
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    color: "#8E8E93",
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F7",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#8E8E93",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1E",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F7",
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  statLabel: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 4,
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#1C1C1E",
  },
  footer: {
    height: 30,
  },
})

export default ProfileScreen

