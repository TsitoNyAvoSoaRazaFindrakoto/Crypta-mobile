import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", width: 80 }}>
      <MaterialCommunityIcons name={icon} color={color} size={24} />
      <Text
        style={{
          color: color,
          fontWeight: focused ? "600" : "300",
          fontSize: 12,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#6366f1",
        tabBarInactiveTintColor: "#41337a",
        tabBarStyle: {
          height: 56,
          paddingTop: 10,
          backgroundColor: "#f8f9fe",
        },
        animation: "shift",
      }}
    >
      <Tabs.Screen
        name="crypto"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Cryptos" icon="bitcoin" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="portefeuille"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Portefeuille" icon="wallet" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fond"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Dépôt/Retrait" icon="bank" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Mon Profil" icon="account" focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
