import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from "react-native";
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
  onPress,
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
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
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
      ],
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
      ],
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
      ],
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
        { value: 3000, label: "Juillet" },
        { value: 4000, label: "Aout" },
        { value: 4500, label: "Septembre" },
        { value: 6000, label: "Octobre" },
      ],
    },
		
  ]);

  const handleFavoriteButton = (id: number) => {
    setData((prevData) => {
      const favoriteCount = prevData.filter((crypto) => crypto.favorite).length;
      const crypto = prevData.find((c) => c.id === id);

      // Si on veut retirer des favoris
      if (crypto?.favorite) {
        return prevData.map((c) => ({
          ...c,
          favorite: c.id === id ? false : c.favorite,
        }));
      }

      // Si on veut ajouter aux favoris et qu'on n'a pas atteint la limite
      if (favoriteCount < 3) {
        return prevData.map((c) => ({
          ...c,
          favorite: c.id === id ? true : c.favorite,
        }));
      }

      return prevData;
    });
  };

  const selectedCryptoData = useMemo(
    () => data.find((crypto) => crypto.id === selectedCrypto),
    [data, selectedCrypto]
  );

  const chartData = useMemo(
    () =>
      selectedCryptoData?.graphData.map((point) => ({
        value: point.value,
        label: point.label,
        dataPointText: `${point.value}$`,
      })) || [],
    [selectedCryptoData]
  );

  return (
    <SafeAreaView className="bg-surface-primary h-full px-2">
      {/* header section */}
      <View className="px-4 py-3 mb-2 border-b-hairline border-border-muted">
        <View className="flex-row justify-between items-center">
          <Logo containerStyle="flex-row gap-2" />
        </View>
      </View>

      {/* Main Content */}
      <View>
        {/* Graph section */}
        <View
          className="bg-surface border-hairline border-border-muted rounded-lg mb-2"
          style={{
            height: Math.min(screenHeight * 0.42, 400),
            elevation: 3,
          }}
        >
          {/* Graph Header */}
          <View className="px-4 py-3 border-b flex-row border-border-muted bg-surface">
            <Text className="text-lg font-bold text-text-primary">
              Évolution du prix
            </Text>
            <View className="flex-row items-center ml-2">
              <Text className="text-base text-indigo-600 font-semibold">
                {selectedCryptoData?.name}
              </Text>
              <Text className="text-sm text-text-secondary ml-2">
                ${Number(selectedCryptoData?.price).toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Graph Content */}
          <View>
            <CustomChart
              chartData={chartData}
              chartConfig={{
                thickness: 2,
                color: "#636af0",
                spacing: 42,
                initialSpacing: 25,
                rulesColor: "#e2e8f0",
                rulesType: "solid",
                showReferenceLine1: true,
                referenceLine1Config: {
                  color: "#818cf8",
                  dashWidth: 2,
                  dashGap: 3,
                },
                yAxisTextStyle: {
                  color: "#64748b",
                  fontSize: 11,
                  fontWeight: "600",
                },
                xAxisLabelTextStyle: {
                  color: "#64748b",
                  fontSize: 10,
                  fontWeight: "500",
                },
                height: Math.max(150, screenHeight * 0.22),
                yAxisLabelWidth: 35,
              }}
            />
          </View>
        </View>

        {/* Crypto list */}
        <ScrollView className="rounded-lg h-2/5  overflow-hidden mb-3 border-hairline border-border-intense">
          <View className="p-2">
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
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Index;
