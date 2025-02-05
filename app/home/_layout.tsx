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
    <View className="items-center justify-center w-32">
      <MaterialCommunityIcons
        name={icon}
        color={color}
				size={24}
      />
      <Text
        className={`${focused ? "font-semibold" : "font-thin"} text-xs`}
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
        tabBarActiveTintColor: "#41337a",
        tabBarInactiveTintColor: "#aaaada",
        tabBarStyle: {
          height: 56,
					paddingTop:10,
					backgroundColor: '#f8f9fe'
        },
				animation : "shift"				
      }}
    >
      <Tabs.Screen
        name="crypto"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="Cryptos"
              icon="bitbucket"
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
              name="Portefeuille"
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
              name="Depot/Retrait"
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
              name="Mon Profil"
              icon="account-outline"
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
