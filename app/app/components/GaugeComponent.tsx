"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, Easing } from "react-native"
import Svg, { Path, Circle, G } from "react-native-svg"

interface GaugeComponentProps {
  value: number
  maxValue: number
  minValue: number
  title: string
  unit: string
  size: number
  thickness: number
  colors: {
    low: string
    medium: string
    high: string
  }
  thresholds: {
    low: number
    high: number
  }
  icon?: React.ReactNode
}

const GaugeComponent = ({
  value,
  maxValue,
  minValue,
  title,
  unit,
  size = 150,
  thickness = 10,
  colors,
  thresholds,
  icon,
}: GaugeComponentProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current
  const radius = size / 2 - thickness
  const circumference = 2 * Math.PI * radius
  const angleOffset = 135 // Angle de départ (en degrés)
  const angleRange = 270 // Plage d'angle pour l'arc (en degrés)

  // Calculer la couleur en fonction de la valeur
  const getColor = (value: number) => {
    const percentage = ((value - minValue) / (maxValue - minValue)) * 100
    if (percentage <= thresholds.low) return colors.low
    if (percentage >= thresholds.high) return colors.high
    return colors.medium
  }

  // Animer la valeur
  useEffect(() => {
    const percentage = ((value - minValue) / (maxValue - minValue)) * 100
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start()
  }, [value, minValue, maxValue])

  // Convertir les coordonnées polaires en coordonnées cartésiennes
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    }
  }

  // Générer le chemin SVG pour l'arc
  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle)
    const end = polarToCartesian(x, y, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1

    return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ")
  }

  // Calculer les positions des graduations
  const ticks = []
  const numTicks = 6 // Nombre de graduations
  const centerX = size / 2
  const centerY = size / 2

  for (let i = 0; i <= numTicks; i++) {
    const tickValue = minValue + ((maxValue - minValue) / numTicks) * i
    const tickAngle = angleOffset + (angleRange / numTicks) * i
    const outerPosition = polarToCartesian(centerX, centerY, radius + 5, tickAngle)
    const innerPosition = polarToCartesian(centerX, centerY, radius - 5, tickAngle)
    const textPosition = polarToCartesian(centerX, centerY, radius + 20, tickAngle)

    ticks.push({
      value: tickValue,
      outerPosition,
      innerPosition,
      textPosition,
    })
  }

  // Calculer le pourcentage de progression pour l'animation
  const progressValue = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, angleRange],
  })

  // Créer un arc animé
  const AnimatedPath = Animated.createAnimatedComponent(Path)

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Arc de fond */}
        <Path
          d={describeArc(centerX, centerY, radius, angleOffset, angleOffset + angleRange)}
          stroke="#E0E0E0"
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
        />

        {/* Arc de progression */}
        <AnimatedPath
          d={describeArc(centerX, centerY, radius, angleOffset, angleOffset + angleRange)}
          stroke={getColor(value)}
          strokeWidth={thickness}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progressValue.interpolate({
            inputRange: [0, angleRange],
            outputRange: [circumference, circumference - (circumference * angleRange) / 360],
          })}
          strokeLinecap="round"
        />

        {/* Graduations */}
        {ticks.map((tick, index) => (
          <G key={index}>
            <Circle cx={tick.outerPosition.x} cy={tick.outerPosition.y} r={2} fill="#8E8E93" />
          </G>
        ))}
      </Svg>

      {/* Valeur et titre */}
      <View style={styles.valueContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.value, { color: getColor(value) }]}>
          {Math.round(value)}
          <Text style={styles.unit}> {unit}</Text>
        </Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Graduations textuelles */}
      {ticks.map((tick, index) => (
        <View
          key={`text-${index}`}
          style={[
            styles.tickTextContainer,
            {
              position: "absolute",
              left: tick.textPosition.x - 15,
              top: tick.textPosition.y - 10,
            },
          ]}
        >
          <Text style={styles.tickText}>{Math.round(tick.value)}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  valueContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
  },
  unit: {
    fontSize: 12,
    fontWeight: "normal",
  },
  title: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 4,
  },
  iconContainer: {
    marginBottom: 5,
  },
  tickTextContainer: {
    width: 30,
    alignItems: "center",
  },
  tickText: {
    fontSize: 10,
    color: "#8E8E93",
  },
})

export default GaugeComponent

