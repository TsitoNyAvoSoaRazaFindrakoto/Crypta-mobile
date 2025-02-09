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
import Crypto from "@/types/Crypto";
import CryptoVal from "@/types/CryptoVal";
import { criticallyDampedSpringCalculations } from "react-native-reanimated/lib/typescript/animation/springUtils";

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
  const [cryptos, setCryptos] = useState<Array<Crypto>>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      setIsLoading(true);
      const data = await Crypto.getAll();
      await Promise.all(
        data.map(async (cryptoInstance) => {
          await cryptoInstance.initializePrices(false, 5);
        })
      );
      setCryptos(data);
      setIsLoading(false);
      setSelectedCrypto(1);
    };
    fetchCryptos();
  }, []);

	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		const fetchCryptos = async () => {
			const data = await Crypto.getAll();
			await Promise.all(
				data.map(async (cryptoInstance) => {
					await cryptoInstance.initializePrices(false, 5);
				})
			);
			setCryptos(data);
		};

		intervalId = setInterval(fetchCryptos, 10000);

		return () => clearInterval(intervalId);
	}, []);

  const selectedCryptoData : Crypto | undefined = useMemo(
    () => cryptos.find((crypto) => crypto.idCrypto === selectedCrypto),
    [cryptos, selectedCrypto]
  );

  const chartData = useMemo(() => {
		const data = (selectedCryptoData?.vals ?? []).map((point: CryptoVal) => ({
			value: point.valeur,
			label: new Date(point.dateHeure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
			dataPointText: `${point.valeur}$`,
		}));
    return data;
  }, [selectedCryptoData]);

	const handleFavoriteButton = (id: number) => {
		setCryptos((prevData) => {
			// const favoriteCount = prevData.filter((crypto) => crypto.).length;
			// const crypto = prevData.find((c) => c.idCrypto === id);

			// // Si on veut retirer des favoris
			// if (crypto.favorite) {
			// 	return prevData.map((c) => ({
			// 		...c,
			// 		favorite: c.idCrypto === id ? false : c.,
			// 	}));
			// }

			// // Si on veut ajouter aux favoris et qu'on n'a pas atteint la limite
			// if (favoriteCount < 3) {
			// 	return prevData.map((c) => ({
			// 		...c,
			// 		favorite: c.idCrypto === id ? true : c.,
			// 	}));
			// }

			return prevData;
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView className="bg-surface-primary h-full flex justify-center items-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

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
          className="bg-surface border-hairline border-accent-500 rounded-lg mb-2"
          style={{
            height: Math.min(screenHeight * 0.42, 400),
          }}
        >
          {/* Graph Header */}
          <View className="px-4 py-2 border-b-hairline flex-row border-border-muted bg-surface">
            <Text className="text-lg font-bold text-text-primary">
              Évolution du prix
            </Text>
            <View className="flex-row items-center ml-2">
              <Text className="text-base text-indigo-600 font-semibold">
                {selectedCryptoData?.crypto}
              </Text>
              <Text className="text-sm text-text-secondary ml-2">
                ${Number(selectedCryptoData?.current).toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Graph Content */}
          <View className="overflow-hidden w-full">
            <CustomChart
              chartData={chartData}
              chartConfig={{
                thickness: 2,
                color: "#636af0",
                spacing: 58,
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
                height: Math.max(150, screenHeight * 0.29),
                yAxisLabelWidth: 35,
              }}
            />
          </View>
        </View>

        {/* Crypto list */}
        <ScrollView className="rounded-lg h-2/5  overflow-hidden mb-3 border-hairline border-border-intense">
          <View className="p-2">
            {cryptos.map((crypto) => (
              <CryptoRow
                key={crypto.id}
                id={crypto.idCrypto}
                name={crypto.crypto}
                price={crypto.current ?? 0}
                handleFavoriteButton={handleFavoriteButton}
                favorite={true}
                onPress={() => setSelectedCrypto(crypto.idCrypto)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Index;
