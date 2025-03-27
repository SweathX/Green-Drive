"use client"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import ScoreCard from "../components/ScoreCard"
import SavingsCard from "../components/SavingsCard"
import TripChart from "../components/TripChart"
import StartTripButton from "../components/StartTripButton"
import LanguageSwitcher from "../components/LanguageSwitcher"
import { tripData } from "../data/mockData"
import { useLanguage } from "../context/LanguageContext"

const Dashboard = () => {
  const { t } = useLanguage()

  // Données fictives pour la démo
  const ecoScore = 82
  const fuelSaved = 12.5 // en litres
  const moneySaved = 22.75 // en euros
  const co2Avoided = 28.75 // en kg

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{t("dashboard.title")}</Text>
          <Text style={styles.subtitle}>{t("dashboard.subtitle")}</Text>
        </View>
        <LanguageSwitcher />
      </View>

      <ScoreCard score={ecoScore} />

      <View style={styles.savingsContainer}>
        <SavingsCard title={t("dashboard.fuelSaved")} value={fuelSaved} unit="L" money={moneySaved} icon="fuel" />
        <SavingsCard title={t("dashboard.co2Avoided")} value={co2Avoided} unit="kg" icon="leaf" />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>{t("dashboard.recentTrips")}</Text>
        <TripChart data={tripData} />
      </View>

      <StartTripButton />

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
  savingsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 16,
  },
  chartContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 12,
  },
  footer: {
    height: 20,
  },
})

export default Dashboard

