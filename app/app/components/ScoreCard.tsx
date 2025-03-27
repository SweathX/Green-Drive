"use client"
import { View, Text, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useLanguage } from "../context/LanguageContext"

interface ScoreCardProps {
  score: number
}

const ScoreCard = ({ score }: ScoreCardProps) => {
  const { t, language } = useLanguage()

  // Déterminer la couleur en fonction du score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#34C759" // Vert
    if (score >= 60) return "#FFCC00" // Jaune
    return "#FF3B30" // Rouge
  }

  // Déterminer le message en fonction du score
  const getScoreMessage = (score: number) => {
    if (score >= 80) return language === "fr" ? "excellente" : "excellent"
    if (score >= 60) return language === "fr" ? "bonne" : "good"
    return language === "fr" ? "à améliorer" : "needs improvement"
  }

  // Déterminer le conseil en fonction du score
  const getTip = (score: number) => {
    if (score >= 80) {
      return language === "fr"
        ? "Continuez à anticiper les freinages pour améliorer votre score"
        : "Keep anticipating braking to improve your score"
    }
    if (score >= 60) {
      return language === "fr"
        ? "Essayez d'accélérer plus doucement pour économiser du carburant"
        : "Try to accelerate more smoothly to save fuel"
    }
    return language === "fr"
      ? "Évitez les accélérations brusques et les freinages tardifs"
      : "Avoid sudden accelerations and late braking"
  }

  const scoreColor = getScoreColor(score)
  const scoreMessage = getScoreMessage(score)
  const tip = getTip(score)

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <View style={[styles.scoreCircle, { borderColor: scoreColor }]}>
          <Text style={[styles.scoreText, { color: scoreColor }]}>{score}</Text>
          <Text style={styles.scoreMax}>/100</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{t("dashboard.ecoScore")}</Text>
        <Text style={styles.description}>
          {language === "fr" ? "Votre conduite est " : "Your driving is "}
          <Text style={{ color: scoreColor, fontWeight: "600" }}>{scoreMessage}</Text>
        </Text>
        <View style={styles.tipContainer}>
          <Feather name="info" size={14} color="#8E8E93" />
          <Text style={styles.tipText}>{tip}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F5F5F7",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 16,
  },
  scoreContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  scoreText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  scoreMax: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: -5,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#1C1C1E",
    marginBottom: 8,
  },
  tipContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tipText: {
    fontSize: 12,
    color: "#8E8E93",
    marginLeft: 4,
    flex: 1,
  },
})

export default ScoreCard

