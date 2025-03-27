"use client"
import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import { useLanguage } from "../context/LanguageContext"

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr")
  }

  return (
    <TouchableOpacity style={styles.container} onPress={toggleLanguage} activeOpacity={0.7}>
      <View style={styles.switcherContainer}>
        <View style={[styles.languageOption, language === "fr" && styles.activeLanguage]}>
          <Text style={[styles.languageText, language === "fr" && styles.activeLanguageText]}>FR</Text>
        </View>
        <View style={[styles.languageOption, language === "en" && styles.activeLanguage]}>
          <Text style={[styles.languageText, language === "en" && styles.activeLanguageText]}>EN</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  switcherContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F7",
    borderRadius: 16,
    padding: 2,
    height: 32,
  },
  languageOption: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  activeLanguage: {
    backgroundColor: "#34C759",
  },
  languageText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8E8E93",
  },
  activeLanguageText: {
    color: "#FFFFFF",
  },
})

export default LanguageSwitcher

