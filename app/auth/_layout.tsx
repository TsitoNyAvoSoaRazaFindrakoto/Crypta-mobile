import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{headerShown : false , animation : "ios_from_right"}}>
        <Stack.Screen name="sign-in"/>
        <Stack.Screen name="sign-up"/>
      </Stack>
    </>
  );
};

export default AuthLayout;
