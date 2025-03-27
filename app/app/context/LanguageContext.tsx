import React, { createContext, useContext, useState } from 'react';

type TranslationKey = 
  | 'gauges.rpm' 
  | 'gauges.rpmUnit' 
  | 'gauges.consumption' 
  | 'gauges.consumptionUnit'
  | 'home.startTrip'
  | 'common.home'
  | 'common.dashboard'
  | 'common.profile'
  | 'home.title'
  | 'home.subtitle'
  | 'home.vehicleConnected'
  | 'home.vehicleNotConnected'
  | 'home.disconnect'
  | 'home.simulateConnection'
  | 'home.readyToStart'
  | 'home.description'
  | 'profile.title'
  | 'profile.memberSince'
  | 'profile.vehicle'
  | 'profile.trips'
  | 'profile.distance'
  | 'profile.averageScore'
  | 'profile.badges'
  | 'profile.tripHistory'
  | 'profile.helpSupport'
  | 'profile.logout'
  | 'dashboard.title'
  | 'dashboard.subtitle'
  | 'dashboard.fuelSaved'
  | 'dashboard.co2Avoided'
  | 'dashboard.recentTrips'
  | 'dashboard.ecoScore';
type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const translations: Record<Language, Record<TranslationKey, string>> = {
  fr: {
    'gauges.rpm': 'RPM',
    'gauges.rpmUnit': 'tr/min',
    'gauges.consumption': 'Consommation',
    'gauges.consumptionUnit': 'L/100km',
    'home.startTrip': 'Démarrer un trajet',
    'common.home': 'Accueil',
    'common.dashboard': 'Tableau de bord',
    'common.profile': 'Profil',
    'home.title': 'Green Drive',
    'home.subtitle': 'Conduite écologique',
    'home.vehicleConnected': 'Véhicule connecté',
    'home.vehicleNotConnected': 'Véhicule non connecté',
    'home.disconnect': 'Déconnecter',
    'home.simulateConnection': 'Simuler connexion',
    'home.readyToStart': 'Prêt à partir ?',
    'home.description': 'Connectez votre véhicule pour commencer à suivre votre conduite écologique',
    'profile.title': 'Profil',
    'profile.memberSince': 'Membre depuis',
    'profile.vehicle': 'Véhicule',
    'profile.trips': 'Trajets',
    'profile.distance': 'Distance',
    'profile.averageScore': 'Score moyen',
    'profile.badges': 'Badges',
    'profile.tripHistory': 'Historique des trajets',
    'profile.helpSupport': 'Aide et support',
    'profile.logout': 'Déconnexion',
    'dashboard.title': 'Tableau de bord',
    'dashboard.subtitle': 'Votre conduite écologique',
    'dashboard.fuelSaved': 'Carburant économisé',
    'dashboard.co2Avoided': 'CO2 évité',
    'dashboard.recentTrips': 'Trajets récents',
    'dashboard.ecoScore': 'Score écologique',
  },
  en: {
    'gauges.rpm': 'RPM',
    'gauges.rpmUnit': 'rpm',
    'gauges.consumption': 'Consumption',
    'gauges.consumptionUnit': 'L/100km',
    'home.startTrip': 'Start trip',
    'common.home': 'Home',
    'common.dashboard': 'Dashboard',
    'common.profile': 'Profile',
    'home.title': 'Green Drive',
    'home.subtitle': 'Eco-driving',
    'home.vehicleConnected': 'Vehicle connected',
    'home.vehicleNotConnected': 'Vehicle not connected',
    'home.disconnect': 'Disconnect',
    'home.simulateConnection': 'Simulate connection',
    'home.readyToStart': 'Ready to start?',
    'home.description': 'Connect your vehicle to start tracking your eco-driving',
    'profile.title': 'Profile',
    'profile.memberSince': 'Member since',
    'profile.vehicle': 'Vehicle',
    'profile.trips': 'Trips',
    'profile.distance': 'Distance',
    'profile.averageScore': 'Average score',
    'profile.badges': 'Badges',
    'profile.tripHistory': 'Trip history',
    'profile.helpSupport': 'Help & support',
    'profile.logout': 'Logout',
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Your eco-driving',
    'dashboard.fuelSaved': 'Fuel saved',
    'dashboard.co2Avoided': 'CO2 avoided',
    'dashboard.recentTrips': 'Recent trips',
    'dashboard.ecoScore': 'Eco-score',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
