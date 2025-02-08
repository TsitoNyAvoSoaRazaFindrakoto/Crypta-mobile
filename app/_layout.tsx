import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import "react-native-reanimated";
import "../global.css";

import * as Notifications from "expo-notifications";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function RootLayout() {

	const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // Handle foreground notifications
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        if (data?.url) {
          router.push(data.url);
        }
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  

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
      <StatusBar backgroundColor="#f8f9fe" style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="home" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
