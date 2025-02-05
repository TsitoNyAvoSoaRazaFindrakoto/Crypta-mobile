import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
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
    id: "1",
    cryptoName: "Bitcoin",
    cryptoSymbol: "BTC",
    type: "achat",
    amount: 0.001,
    date: "2024-01-24",
    value: 1900000,
  },
  {
    id: "2",
    cryptoName: "Ethereum",
    cryptoSymbol: "ETH",
    type: "vente",
    amount: 0.5,
    date: "2024-01-13",
    value: 7400000,
  },
  {
    id: "2",
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
    <SafeAreaView className="bg-surface-primary h-full">
      {/* En-tête avec logo */}
      <View className="px-4 pb-4 bg-surface-primary border-b border-border-muted">
        <View className="flex-row justify-between items-center">
          <Logo containerStyle="flex-row gap-2" />
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Crypto favori */}
        <View className="bg-brand-500 p-6 mx-4 mt-6 rounded-2xl shadow-sm">
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

        {/* Dernières opérations */}
        <View className="mx-4 mt-8">
          <Text className="text-xl font-semibold mb-4">
            Dernières opérations
          </Text>

          {/* Liste des opérations */}
          {recentOperations.map((operation) => (
            <Link
              href={`/home/portefeuille/crypto${operation.id}`}
              key={operation.id}
              asChild
            >
              <TouchableOpacity className="bg-white p-4 rounded-xl mb-3 shadow-sm">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <View
                      className={`w-10 h-10 rounded-full ${
                        operation.type === "achat"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } items-center justify-center mr-3`}
                    >
                      <MaterialCommunityIcons
                        name={
                          operation.type === "achat" ? "arrow-down" : "arrow-up"
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
            </Link>
          ))}

          {/* Bouton voir tout l'historique */}
          <Link href="/home/portefeuille/0" asChild>
            <TouchableOpacity
              className="bg-brand-500 py-3 rounded-xl items-center mt-4"
              activeOpacity={0.8}
            >
              <Text className="text-surface font-medium">
                Voir tout l'historique
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
