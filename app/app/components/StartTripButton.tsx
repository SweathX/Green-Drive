import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"

const StartTripButton = () => {
  const handleStartTrip = () => {
    // Logique pour démarrer un nouveau trajet
    console.log("Démarrer un nouveau trajet")
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handleStartTrip} activeOpacity={0.8}>
      <Feather name="navigation" size={20} color="#FFFFFF" />
      <Text style={styles.buttonText}>Démarrer un trajet</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#34C759",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
    shadowColor: "#34C759",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
})

export default StartTripButton

