import { router, Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";
import "../global.css";

import * as Notifications from "expo-notifications";
import type { NotificationResponse, Notification } from "expo-notifications"; // Import types
import { StatusBar } from "expo-status-bar";

// Prevent the splash screen from auto-hiding before asset loading is complete.

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

interface InAppNotification {
  title: string;
  body?: string; // Body is optional
}

export default function RootLayout() {
  const notificationListener = useRef<Notifications.EventSubscription | null>(
    null
  ); // Ref can be null initially
  const responseListener = useRef<Notifications.EventSubscription | null>(null); // Ref can be null initially
  const [inAppNotification, setInAppNotification] =
    useState<InAppNotification | null>(null); // State type

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener(
        (notification: Notification) => {
          setInAppNotification({
            title:
              notification.request.content.title || "Notification Received",
            body: notification.request.content.body ?? undefined,
          });
        }
      );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        (response: NotificationResponse) => {
          // Type the response parameter
          const data = response.notification.request.content.data as
            | { url?: string }
            | undefined; // Type the data, be explicit about undefined
          if (data?.url) {
            router.push(data.url as any);
          }
        }
      );

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

  // Auto-dismiss the in-app notification after a few seconds
  useEffect(() => {
    if (inAppNotification) {
      const timer = setTimeout(() => {
        setInAppNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [inAppNotification]);

  return (
    <>
      <StatusBar backgroundColor="#f8f9fe" style="dark" />
      {inAppNotification && (
        <View style={styles.inAppBanner}>
          <Text style={styles.inAppBannerTitle}>{inAppNotification.title}</Text>
          {inAppNotification.body && (
            <Text style={styles.inAppBannerBody}>{inAppNotification.body}</Text>
          )}
        </View>
      )}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="home" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  inAppBanner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 15,
    paddingTop: 30,
    alignItems: "center",
    zIndex: 1000,
  },
  inAppBannerTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  inAppBannerBody: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});
