import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import Logo from "@/components/ui/Logo";

// Données simulées pour la démonstration
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
    date: "2024-01-24",
    value: 1900000,
  },
  {
    id: "4",
    cryptoName: "Ethereum",
    cryptoSymbol: "ETH",
    type: "vente",
    amount: 0.5,
    date: "2024-01-13",
    value: 7400000,
  },
  {
    id: "5",
    cryptoName: "Ethereum",
    cryptoSymbol: "ETH",
    type: "vente",
    amount: 0.5,
    date: "2024-02-12",
    value: 5400000,
  },
  // Ajoutez plus d'opérations si nécessaire
];

const index = () => {
  return (
    <SafeAreaView className="bg-surface-primary h-full p-2 flex-col">
      {/* header section */}
      <View className="p-2 mb-2 bg-surface-primary border-b border-border-muted">
        <View className="flex-row justify-between items-center">
          <Logo containerStyle="flex-row gap-2" />
        </View>
      </View>

      <ScrollView>
        {/* Crypto favori */}
        <View className="bg-brand-500 p-4 mt-6 rounded-2xl shadow-sm">
          <Text className="text-surface text-lg mb-2">Votre crypto favori</Text>
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-surface text-2xl font-bold">
                {favoriteCrypto.amount} {favoriteCrypto.symbol}
              </Text>
              <Text className="text-surface/80 mt-1">
                {favoriteCrypto.value.toLocaleString()} Ar
              </Text>
            </View>
            <TouchableOpacity
              className="bg-surface/20 p-3 rounded-full"
              onPress={() => {}}
            >
              <MaterialCommunityIcons name="star" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* les autres */}
        <View>
          <View className="bg-elevation-5 p-4 mt-6 rounded-2xl shadow-sm">
            <Text className="text-surface text-lg mb-2">
              Votre crypto favori
            </Text>
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-surface text-2xl font-bold">
                  {favoriteCrypto.amount} {favoriteCrypto.symbol}
                </Text>
                <Text className="text-surface/80 mt-1">
                  {favoriteCrypto.value.toLocaleString()} Ar
                </Text>
              </View>
              <TouchableOpacity
                className="bg-surface/20 p-3 rounded-full"
                onPress={() => {}}
              >
                <MaterialCommunityIcons name="star" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="bg-brand-500 p-4 mt-6 rounded-2xl shadow-sm">
            <Text className="text-surface text-lg mb-2">
              Votre crypto favori
            </Text>
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-surface text-2xl font-bold">
                  {favoriteCrypto.amount} {favoriteCrypto.symbol}
                </Text>
                <Text className="text-surface/80 mt-1">
                  {favoriteCrypto.value.toLocaleString()} Ar
                </Text>
              </View>
              <TouchableOpacity
                className="bg-surface/20 p-3 rounded-full"
                onPress={() => {}}
              >
                <MaterialCommunityIcons name="star" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="bg-brand-500 p-4 mt-6 rounded-2xl shadow-sm">
            <Text className="text-surface text-lg mb-2">
              Votre crypto favori
            </Text>
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-surface text-2xl font-bold">
                  {favoriteCrypto.amount} {favoriteCrypto.symbol}
                </Text>
                <Text className="text-surface/80 mt-1">
                  {favoriteCrypto.value.toLocaleString()} Ar
                </Text>
              </View>
              <TouchableOpacity
                className="bg-surface/20 p-3 rounded-full"
                onPress={() => {}}
              >
                <MaterialCommunityIcons name="star" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Dernières opérations */}
        <View className="my-6 h-1/4">
          <Text className="text-xl font-semibold mb-3 mx-2">
            Opérations récentes
          </Text>

          <ScrollView
						focusable
            className="h-full border-y-hairline pt-4"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-col last:mb-6">
              {/* Liste des opérations */}
              {recentOperations.map((operation) => (
                <TouchableOpacity
                  className="bg-white p-4 rounded-xl mb-2 border-hairline border-accent-800"
                  onPress={() =>
                    router.push(`/home/portefeuille/crypto${operation.id}`)
                  }
                >
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <View
                        className={`w-10 h-10 rounded-full ${
                          operation.type === "achat" ? "bg-success" : "bg-error"
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
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/home/portefeuille/0")}
          className="px-3 py-4 rounded-lg w-full items-center bg-brand-500 active:bg-brand-400 border-hairline"
        >
          <Text className="text-brand-100 text-md font-medium">
            Voir tout l'historique
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
