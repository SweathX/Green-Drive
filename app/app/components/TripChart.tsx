"use client"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { BarChart } from "react-native-chart-kit"
import { useLanguage } from "../context/LanguageContext"

interface Trip {
  id: string
  date: string
  score: number
  distance: number
}

interface TripChartProps {
  data: Trip[]
}

const TripChart = ({ data }: TripChartProps) => {
  const { t, language } = useLanguage()

  // Traduire les jours de la semaine si nécessaire
  const translateDays = (day: string) => {
    if (language === "en") {
      // Convertir les jours français en anglais
      const dayMap: Record<string, string> = {
        Lun: "Mon",
        Mar: "Tue",
        Mer: "Wed",
        Jeu: "Thu",
        Ven: "Fri",
        Sam: "Sat",
        Dim: "Sun",
      }
      return dayMap[day] || day
    }
    return day
  }

  // Préparer les données pour le graphique
  const chartData = {
    labels: data.map((trip) => translateDays(trip.date)),
    datasets: [
      {
        data: data.map((trip) => trip.score),
      },
    ],
  }

  return (
    <View style={styles.container}>
      <BarChart
        data={chartData}
        width={Dimensions.get("window").width - 40}
        height={180}
        yAxisSuffix=""
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#FFFFFF",
          backgroundGradientFrom: "#FFFFFF",
          backgroundGradientTo: "#FFFFFF",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(52, 199, 89, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(142, 142, 147, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          barPercentage: 0.6,
        }}
        style={styles.chart}
        showValuesOnTopOfBars={true}
        fromZero={true}
        withInnerLines={false}
      />
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#34C759" }]} />
          <Text style={styles.legendText}>{language === "fr" ? "Score d'éco-conduite" : "Eco-driving score"}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 8,
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: "#8E8E93",
  },
})

export default TripChart

