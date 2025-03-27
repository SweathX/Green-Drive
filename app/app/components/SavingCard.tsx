import { View, Text, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"

interface SavingsCardProps {
  title: string
  value: number
  unit: string
  money?: number
  icon: "fuel" | "leaf" 
}

const SavingsCard = ({ title, value, unit, money, icon }: SavingsCardProps) => {
  const iconName = icon === "fuel" ? "droplet" : "sun"

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name={iconName} size={18} color="#34C759" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value.toFixed(1)}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
      {money && <Text style={styles.money}>{money.toFixed(2)} €</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: "flex-start",
  },
  iconContainer: {
    backgroundColor: "rgba(52, 199, 89, 0.1)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 8,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1C1E",
  },
  unit: {
    fontSize: 14,
    color: "#8E8E93",
    marginLeft: 2,
    marginBottom: 3,
  },
  money: {
    fontSize: 14,
    color: "#34C759",
    fontWeight: "600",
    marginTop: 4,
  },
})

export default SavingsCard

