import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Logo from "@/components/ui/Logo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Graph = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="bg-surface-primary h-full p-2">
      {/* header section */}
      <View className="p-2 mb-2 bg-surface-primary border-b border-border-muted">
        <View className="flex-row justify-between items-center">
          <Logo containerStyle="flex-row gap-2" />
          <TouchableOpacity
						activeOpacity={0.9}
            onPress={() => router.back()}
            className="px-3 py-1.5 rounded-xl w-2/4 items-center bg-brand-500 active:bg-brand-400 border-hairline"
          >
            <Text className="text-brand-100 text-md font-medium">
              Revenir aux Cours
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View></View>

      {/* Graph */}
      <View className="w-full mb-2 h-4/6 bg-surface-primary overflow-hidden border-hairline rounded-lg border-elevation-5 py-4">
        {/* <CustomChart chartData={graphData} /> */}
      </View>
    </SafeAreaView>
  );
};

export default Graph;
