import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Logo from "@/components/ui/Logo";

type CrytpoRowProps = {
  name: string;
  price: string | number;
  previousPrice?: string | number;
};

const CryptoRow = ({ name, price, previousPrice }: CrytpoRowProps) => {
  const priceChange = previousPrice
    ? ((Number(price) - Number(previousPrice)) / Number(previousPrice)) * 100
    : null;

  return (
    <View className="p-4 bg-surface-primary dark:bg-surface-inverse rounded-lg mb-2 shadow-sm w-1/2">
      <View className="flex-row justify-between items-center">
        {/* Left Section */}
        <View className="flex-1">
          <Text className="text-lg font-semibold text-text-primary dark:text-text-inverted">
            {name}
          </Text>
        </View>

        {/* Right Section */}
        <View className="flex-row items-center gap-3">
          <View className="items-end">
            <Text className="text-base font-medium text-text-primary dark:text-text-inverted">
              ${Number(price).toFixed(2)}
            </Text>

            {priceChange && (
              <View className="flex-row items-center gap-1">
                <MaterialCommunityIcons
                  name={priceChange >= 0 ? "arrow-up" : "arrow-down"}
                  size={14}
                  color={priceChange >= 0 ? "success.DEFAULT" : "error.DEFAULT"}
                />
                <Text
                  className={`text-xs font-medium ${
                    priceChange >= 0 ? "text-success-text" : "text-error-text"
                  }`}
                >
                  {Math.abs(priceChange).toFixed(2)}%
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const index = () => {
  const data = [
    { id: 1, name: "Bitcoin", price: 10000, previousPrice: 9000 },
    { id: 2, name: "Ethereum", price: 8000, previousPrice: 9000 },
    { id: 3, name: "Solana", price: 5000, previousPrice: 9000 },
  ];

  return (
    <SafeAreaView className="bg-surface-primary h-full">
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 pt-4 pb-8">
        {/* Header */}
        <View className="px-6 pt-2 pb-6 mb-12 bg-surface-primary border-b border-border-muted">
          <View className="flex-row justify-between items-center">
            <Logo containerStyle="flex-row gap-2"/>
						<TouchableOpacity className="px-3 py-1.5 rounded-xl w-1/3 items-center bg-brand-100 active:bg-brand-200">
              <Text className="text-brand-600 text-md font-medium">
                Graphe
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Crypto List */}
        <View>
          {data.map((crypto) => (
            <CryptoRow
              key={crypto.id}
              name={crypto.name}
              price={crypto.price}
              previousPrice={crypto.previousPrice}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;