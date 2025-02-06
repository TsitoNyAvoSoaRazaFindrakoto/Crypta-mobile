import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import Logo from "@/components/ui/Logo";
import { theme } from "@/tailwind.config";

const favoriteCrypto = {
  name: "Bitcoin",
  symbol: "BTC",
  amount: 0.0234,
  value: 23400000,
  id: "0",
};

const recentOperations = [
  {
    id: "1",
    cryptoName: "Bitcoin",
    cryptoSymbol: "BTC",
    type: "achat",
    amount: 0.001,
    date: "2024-02-04",
    value: 1200000,
  },
  {
    id: "2",
    cryptoName: "Ethereum",
    cryptoSymbol: "ETH",
    type: "vente",
    amount: 0.5,
    date: "2024-02-03",
    value: 7500000,
  },
  {
    id: "3",
    cryptoName: "Bitcoin",
    cryptoSymbol: "BTC",
    type: "achat",
    amount: 0.001,
    date: "2024-02-04",
    value: 1200000,
  },
  {
    id: "4",
    cryptoName: "Ethereum",
    cryptoSymbol: "ETH",
    type: "vente",
    amount: 0.5,
    date: "2024-02-03",
    value: 7500000,
  },
  {
    id: "5",
    cryptoName: "Bitcoin",
    cryptoSymbol: "BTC",
    type: "achat",
    amount: 0.001,
    date: "2024-02-04",
    value: 1200000,
  },
];

const index = () => {
  return (
    <SafeAreaView className="bg-surface-primary h-full p-2 flex-col">
      <View className="p-2 mb-2 bg-surface-primary border-b border-border-muted">
        <View className="flex-row justify-between items-center">
          <Logo containerStyle="flex-row gap-2" />
          <TouchableOpacity
            activeOpacity={0.9}
            className="px-3 py-1.5 rounded-xl min-w-[] max-w-3/4 items-center bg-brand-500 active:bg-brand-200"
          >
            <Text className="text-elevation-4 text-lg font-medium">
              Fonds :{" "}
              <Text className="text-text-inverted font-semibold">$2000</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="w-full mt-4 p-2"
        >
          <View className="flex-row first:ml-2 last:mr-6 gap-2">
            <View className="bg-brand-200 p-4 rounded-2xl shadow-sm">
              <Text className="text-text-tertiary text-lg mb-2">
                Votre crypto favori
              </Text>
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-text-tertiary text-2xl font-bold">
                    {favoriteCrypto.amount} {favoriteCrypto.symbol}
                  </Text>
                  <Text className="text-text-tertiary/80 mt-1">
                    {favoriteCrypto.value.toLocaleString()} Ar
                  </Text>
                </View>
                <TouchableOpacity
                  className="bg-surface/20 p-3 rounded-full"
                  onPress={() => {}}
                >
                  <MaterialCommunityIcons
                    name="star"
                    size={24}
                    color={theme.extend.colors.brand[300]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="bg-brand-200 p-4 rounded-2xl shadow-sm">
              <Text className="text-text-tertiary text-lg mb-2">
                Votre crypto favori
              </Text>
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-text-tertiary text-2xl font-bold">
                    {favoriteCrypto.amount} {favoriteCrypto.symbol}
                  </Text>
                  <Text className="text-text-tertiary/80 mt-1">
                    {favoriteCrypto.value.toLocaleString()} Ar
                  </Text>
                </View>
                <TouchableOpacity
                  className="bg-surface/20 p-3 rounded-full"
                  onPress={() => {}}
                >
                  <MaterialCommunityIcons
                    name="star"
                    size={24}
                    color={theme.extend.colors.brand[300]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="bg-brand-200 p-4 rounded-2xl shadow-sm">
              <Text className="text-text-tertiary text-lg mb-2">
                Votre crypto favori
              </Text>
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-text-tertiary text-2xl font-bold">
                    {favoriteCrypto.amount} {favoriteCrypto.symbol}
                  </Text>
                  <Text className="text-text-tertiary/80 mt-1">
                    {favoriteCrypto.value.toLocaleString()} Ar
                  </Text>
                </View>
                <TouchableOpacity
                  className="bg-surface/20 p-3 rounded-full"
                  onPress={() => {}}
                >
                  <MaterialCommunityIcons
                    name="star"
                    size={24}
                    color={theme.extend.colors.brand[300]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <View className="my-4">
          <View className="flex-row justify-between items-center mb-2 px-2">
            <Text className="text-xl font-semibold">Opérations récentes</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push("/home/portefeuille/0")}
              className="px-3 py-1 rounded-xl w-1/4 items-center bg-brand-400 active:bg-brand-300"
            >
              <Text className="text-elevation-2 text-md font-medium">
                voir tout
              </Text>
            </TouchableOpacity>
          </View>
          <View className="max-h-[48vh]">
            <ScrollView
              className="h-fit border-t-hairline pt-4"
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              <View className="flex-col last:mb-6">
                {recentOperations.map((operation) => (
                  <TouchableOpacity
                    key={operation.id}
                    activeOpacity={0.7}
                    className="bg-white p-4 rounded-xl mb-2 border-hairline border-accent-800"
                  >
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <View
                          className={`w-10 h-10 rounded-full ${
                            operation.type === "achat"
                              ? "bg-success"
                              : "bg-error"
                          } items-center justify-center mr-3`}
                        >
                          <MaterialCommunityIcons
                            name={
                              operation.type === "achat"
                                ? "arrow-down"
                                : "arrow-up"
                            }
                            size={20}
                            color="white"
                          />
                        </View>
                        <View>
                          <Text className="font-medium">
                            {operation.type === "achat" ? "Achat" : "Vente"}{" "}
                            {operation.cryptoSymbol}
                          </Text>
                          <Text className="text-sm text-gray-500">
                            {operation.date}
                          </Text>
                        </View>
                      </View>
                      <View className="items-end">
                        <Text className="font-medium">
                          {operation.amount} {operation.cryptoSymbol}
                        </Text>
                        <Text className="text-sm text-gray-500">
                          {operation.value.toLocaleString()} Ar
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
