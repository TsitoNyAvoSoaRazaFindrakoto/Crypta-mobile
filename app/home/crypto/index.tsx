import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Logo from "@/components/ui/Logo";
import CustomChart from "@/components/CustomChart";
import { useRouter } from "expo-router";
import { chartTypes } from "react-native-gifted-charts";

type CryptoRowProps = {
  id: number;
  name: string;
  price: string | number;
  previousPrice?: string | number;
  handleFavoriteButton: (id: number) => void;
  favorite: boolean;
  onPress: () => void;
};

const CryptoRow = ({
  id,
  name,
  price,
  previousPrice,
  handleFavoriteButton,
  favorite,
  onPress
}: CryptoRowProps) => {
  const priceChange = previousPrice
    ? ((Number(price) - Number(previousPrice)) / Number(previousPrice)) * 100
    : null;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className="p-4 bg-surface rounded-lg mb-2 border-hairline border-accent-800"
      onPress={onPress}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row gap-2 items-center justify-center">
          <MaterialCommunityIcons
            name={`alpha-${name.charAt(0).toLocaleLowerCase()}-circle`}
            size={32}
            color="#636af0"
          />
          <Text className="text-xl font-semibold text-text-primary">
            {name}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
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
            onPress={(e) => {
              e.stopPropagation();
              handleFavoriteButton(id);
            }}
          >
            <MaterialCommunityIcons
              name={favorite ? "star" : "star-outline"}
              size={24}
              color={favorite ? "#6366f1" : "#aba0d7"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Index = () => {
  const router = useRouter();
  const [selectedCrypto, setSelectedCrypto] = useState<number>(1);
  const [data, setData] = useState([
    {
      id: 1,
      name: "Bitcoin",
      price: 10000,
      previousPrice: 9000,
      favorite: true,
      graphData: [
        { value: 9000, label: "Jan" },
        { value: 9500, label: "Fév" },
        { value: 10200, label: "Mar" },
        { value: 9800, label: "Avr" },
        { value: 10500, label: "Mai" },
        { value: 10000, label: "Juin" },
      ]
    },
    {
      id: 2,
      name: "Ethereum",
      price: 8000,
      previousPrice: 9000,
      favorite: false,
      graphData: [
        { value: 9000, label: "Jan" },
        { value: 8500, label: "Fév" },
        { value: 8200, label: "Mar" },
        { value: 7800, label: "Avr" },
        { value: 8500, label: "Mai" },
        { value: 8000, label: "Juin" },
      ]
    },
    {
      id: 3,
      name: "Solana",
      price: 5000,
      previousPrice: 9000,
      favorite: false,
      graphData: [
        { value: 9000, label: "Jan" },
        { value: 7500, label: "Fév" },
        { value: 6200, label: "Mar" },
        { value: 5800, label: "Avr" },
        { value: 5500, label: "Mai" },
        { value: 5000, label: "Juin" },
      ]
    },
    {
      id: 4,
      name: "Solex",
      price: 5000,
      previousPrice: 9000,
      favorite: false,
      graphData: [
        { value: 9000, label: "Jan" },
        { value: 7000, label: "Fév" },
        { value: 6000, label: "Mar" },
        { value: 5500, label: "Avr" },
        { value: 5200, label: "Mai" },
        { value: 5000, label: "Juin" },
      ]
    },
  ]);

  const handleFavoriteButton = (id: number) => {
    setData((prevData) =>
      prevData.map((crypto) => ({
        ...crypto,
        favorite: crypto.id === id,
      }))
    );
  };

  const selectedCryptoData = useMemo(() => 
    data.find(crypto => crypto.id === selectedCrypto),
    [data, selectedCrypto]
  );

  const chartData = useMemo(() => 
    selectedCryptoData?.graphData.map(point => ({
      value: point.value,
      label: point.label,
      dataPointText: `${point.value}$`
    })) || [],
    [selectedCryptoData]
  );

  return (
    <SafeAreaView className="bg-surface-primary h-full p-2">
      {/* header section */}
      <View className="p-2 mb-2 bg-surface-primary border-b border-border-muted">
        <View className="flex-row justify-between items-center">
          <Logo containerStyle="flex-row gap-2" />
        </View>
      </View>

      {/* Graph section */}
      <View className="bg-surface p-4 rounded-lg mb-4 h-2/4">
        <Text className="text-xl font-bold text-text-primary mb-6">
          Évolution du prix {selectedCryptoData?.name}
        </Text>
        <ScrollView className="w-full pb-4 -ml-2">
          <CustomChart 
            chartData={chartData}
            chartConfig={{
              thickness: 3,
              color: "#636af0",
              maxValue: 12000,
              noOfSections: 6,
              spacing: 45,
              initialSpacing: 20,
              yAxisOffset: 23,
              rulesColor: "#94a3b8",
              rulesType: "solid",
              showReferenceLine1: true,
              referenceLine1Config: {
                color: "#8171c3",
                dashWidth: 2,
                dashGap: 4,
              },
              yAxisTextStyle: {
                color: "#94a3b8",
              }
            }}
          />
        </ScrollView>
      </View>

      {/* Crypto list */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((crypto) => (
          <CryptoRow
            key={crypto.id}
            id={crypto.id}
            name={crypto.name}
            price={crypto.price}
            previousPrice={crypto.previousPrice}
            handleFavoriteButton={handleFavoriteButton}
            favorite={crypto.favorite}
            onPress={() => setSelectedCrypto(crypto.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
