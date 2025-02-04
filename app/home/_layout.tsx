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
    <View className="items-center justify-center gap-2 w-32">
      <MaterialCommunityIcons
        name={icon}
        color={color}
				size={32}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{
          color: color,
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
        tabBarActiveTintColor: "##4a3a7b",
        tabBarInactiveTintColor: "#161622",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="crypto"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="crypto"
              icon="bitcoin"
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="portefeuille"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="portefeuille"
              icon="wallet"
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="fond"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="depot\retrait"
              icon="bank"
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="mon profil"
              icon="account"
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
