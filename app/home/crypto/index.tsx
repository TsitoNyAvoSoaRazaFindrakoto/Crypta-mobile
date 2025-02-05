import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Logo from "@/components/ui/Logo";

type CryptoRowProps = {
  id: number;
  name: string;
  price: string | number;
  previousPrice?: string | number;
  handleFavoriteButton: (id: number) => void;
  favorite: boolean;
};

const CryptoRow = ({
  id,
  name,
  price,
  previousPrice,
  handleFavoriteButton,
  favorite,
}: CryptoRowProps) => {
  const priceChange = previousPrice
    ? ((Number(price) - Number(previousPrice)) / Number(previousPrice)) * 100
    : null;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className="p-4 bg-surface rounded-lg mb-2 border-hairline border-accent-800"
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-text-primary">
            {name}
          </Text>
        </View>

        <View className="flex-row items-center gap-3">
          <View className="items-end">
            <Text className="text-base font-medium text-text-primary">
              ${Number(price).toFixed(2)}
            </Text>

            {priceChange !== null && (
              <View className="flex-row items-center gap-1">
                <Text
                  className={`text-xs font-medium ${
                    priceChange >= 0 ? "text-success-text" : "text-error-text"
                  }`}
                >
                  {Math.abs(priceChange).toFixed(2)}%
                </Text>
                <MaterialCommunityIcons
                  name={
                    priceChange >= 0
                      ? "arrow-up-right-bold"
                      : "arrow-down-right-bold"
                  }
                  size={14}
                  color={priceChange >= 0 ? "#065f46" : "#7f1d1d"}
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleFavoriteButton(id)}
          >
            <MaterialCommunityIcons
              name={favorite ? "star" : "star-outline"}
              size={24}
              color={"#aba0d7"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Index = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Bitcoin",
      price: 10000,
      previousPrice: 9000,
      favorite: true,
    },
    {
      id: 2,
      name: "Ethereum",
      price: 8000,
      previousPrice: 9000,
      favorite: false,
    },
    {
      id: 3,
      name: "Solana",
      price: 5000,
      previousPrice: 9000,
      favorite: false,
    },
    {
      id: 4,
      name: "Solex",
      price: 5000,
      previousPrice: 9000,
      favorite: false,
    },
  ]);

  const handleFavoriteButton = (id: number) => {
    setData((prevData) =>
      prevData.map((crypto) => ({
        ...crypto,
        favorite: crypto.id === id, // Only one can be favorite
      }))
    );
  };

  return (
    <SafeAreaView className="bg-surface-primary h-full p-2">
      {/* header section */}
      <View className="p-4 pb-4 mb-8 bg-surface-primary border-b border-border-muted">
        <View className="flex-row justify-between items-center">
          <Logo containerStyle="flex-row gap-2" />
          <TouchableOpacity className="px-3 py-1.5 rounded-xl w-1/3 items-center bg-brand-100 active:bg-brand-200 border-hairline">
            <Text className="text-brand-600 text-md font-medium">Graphe</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="w-full -px-2 h-56">
        <Text> Graph</Text>
      </View>

      {/* price section */}
      <View className="p-2 pt-4 border rounded-lg border-border-muted">
        <Text className="text-xl mx-2 font-semibold text-text-primary">
          Cours des Cryptomonnaies
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="border-t-hairline py-4 mt-2 -mb-2 max-h-60"
        >
          <View className="flex-col last:mb-8">
            {data.map((crypto) => (
              <CryptoRow
                key={crypto.id}
                id={crypto.id}
                name={crypto.name}
                price={crypto.price}
                previousPrice={crypto.previousPrice}
                favorite={crypto.favorite}
                handleFavoriteButton={handleFavoriteButton}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Index;
