"use client"

import { useState, useEffect, useRef } from "react"
import { View, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"
import GaugeComponent from "./GaugeComponent"
import { useLanguage } from "../context/LanguageContext"

interface DrivingMetersProps {
  isActive?: boolean
}

const DrivingMeters = ({ isActive = true }: DrivingMetersProps) => {
  const { t } = useLanguage()
  const [rpm, setRpm] = useState(0)
  const [fuelConsumption, setFuelConsumption] = useState(0)

  // Références pour les animations fluides
  const targetRpm = useRef(0)
  const targetFuel = useRef(0)
  const animationRef = useRef<NodeJS.Timeout | null>(null)

  // Fonction pour animer les valeurs de manière fluide
  const animateValues = () => {
    // Animer RPM
    if (rpm !== targetRpm.current) {
      const diff = targetRpm.current - rpm
      const step = diff * 0.1 // Prendre 10% de la différence pour une animation fluide
      setRpm((prev) => (Math.abs(prev + step - targetRpm.current) < 10 ? targetRpm.current : prev + step))
    }

    // Animer consommation de carburant
    if (fuelConsumption !== targetFuel.current) {
      const diff = targetFuel.current - fuelConsumption
      const step = diff * 0.1 // Prendre 10% de la différence pour une animation fluide
      setFuelConsumption((prev) =>
        Math.abs(prev + step - targetFuel.current) < 0.1 ? targetFuel.current : prev + step,
      )
    }

    // Continuer l'animation
    animationRef.current = setTimeout(animateValues, 16) // ~60fps
  }

  // Simuler des changements de valeurs pour la démo
  useEffect(() => {
    if (!isActive) {
      targetRpm.current = 0
      targetFuel.current = 0
      return
    }

    // Démarrer l'animation
    if (!animationRef.current) {
      animationRef.current = setTimeout(animateValues, 16)
    }

    // Simuler des fluctuations de RPM
    const rpmInterval = setInterval(() => {
      if (isActive) {
        const baseRpm = 1500
        const fluctuation = Math.random() * 1000 - 500 // Fluctuation entre -500 et +500
        targetRpm.current = Math.max(800, Math.min(6000, baseRpm + fluctuation))
      } else {
        targetRpm.current = 0
      }
    }, 2000)

    // Simuler des fluctuations de consommation de carburant
    const fuelInterval = setInterval(() => {
      if (isActive) {
        const baseFuel = 6.5
        const fluctuation = Math.random() * 3 - 1.5 // Fluctuation entre -1.5 et +1.5
        targetFuel.current = Math.max(3, Math.min(12, baseFuel + fluctuation))
      } else {
        targetFuel.current = 0
      }
    }, 3000)

    return () => {
      clearInterval(rpmInterval)
      clearInterval(fuelInterval)
      if (animationRef.current) {
        clearTimeout(animationRef.current)
        animationRef.current = null
      }
    }
  }, [isActive])

  return (
    <View style={styles.container}>
      <View style={styles.gaugeContainer}>
        <GaugeComponent
          value={rpm}
          minValue={0}
          maxValue={6000}
          title={t("gauges.rpm")}
          unit={t("gauges.rpmUnit")}
          size={160}
          thickness={12}
          colors={{
            low: "#34C759",
            medium: "#FFCC00",
            high: "#FF3B30",
          }}
          thresholds={{
            low: 30,
            high: 70,
          }}
          icon={<Feather name="activity" size={18} color="#8E8E93" />}
        />
      </View>

      <View style={styles.gaugeContainer}>
        <GaugeComponent
          value={fuelConsumption}
          minValue={0}
          maxValue={15}
          title={t("gauges.consumption")}
          unit={t("gauges.consumptionUnit")}
          size={160}
          thickness={12}
          colors={{
            low: "#34C759",
            medium: "#FFCC00",
            high: "#FF3B30",
          }}
          thresholds={{
            low: 30,
            high: 70,
          }}
          icon={<Feather name="droplet" size={18} color="#8E8E93" />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  gaugeContainer: {
    flex: 1,
    alignItems: "center",
  },
})

export default DrivingMeters

