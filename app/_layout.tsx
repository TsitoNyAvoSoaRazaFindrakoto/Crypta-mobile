import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  /**
   * FICHIER _layout.tsx - MODE D'EMPLOI
   *
   * C'est le "fondateur" de votre app qui régit tous les écrans.
   * Imaginez-le comme une maison : ce fichier est les fondations et les murs communs à toutes les pièces.
   *
   * Ce qu'il fait concrètement :
   *
   * 1. 🎨 GÈRE LE THÈME VISUEL
   *    - Change automatiquement les couleurs si le téléphone passe en mode sombre
   *    - Exemple : Fond noir/textes blancs si mode nuit activé
   *
   * 2. 🗺 ORGANISE LA NAVIGATION
   *    - Définit comment on passe d'un écran à l'autre
   *    - Exemple : Animation de transition quand on ouvre un profil
   *
   * 3. 🏗 APPLIQUE UNE STRUCTURE COMMUNE
   *    - Ce qui est défini ici s'applique à TOUS les écrans
   *    - Exemple : Une barre de navigation en bas présente partout
   *
   * 4. 🚦 CONFIGURE LES ÉCRANS
   *    - Options par défaut pour chaque page
   *    - Exemple : Cache la barre de titre sur l'écran d'accueil
   */

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="home" />
        <Stack.Screen name="+not-found" />
        {/* 
      <Stack.Screen
        name="profile" // ↔️ Doit correspondre à app/profile.tsx
        options={{
          title: 'Mon Profil', // 🏷 Texte dans la barre de titre
          headerStyle: { backgroundColor: 'purple' }, // 🟣 Couleur de la barre
          headerTintColor: 'white' // ⚪ Couleur du texte
					}}
					/>
					*/}
        {/* <Footer /> 👈 Sera présent sur tous les écrans */}
      </Stack>
      <StatusBar backgroundColor="#f8f9fe" style="dark" />
    </>
  );
}
