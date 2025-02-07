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
    <SafeAreaView className="bg-surface-primary flex-1">
      {/* Header avec solde */}
      <View className="px-4 py-3 mb-2 bg-surface-primary border-b border-border-muted">
        <View className="flex-row justify-between items-center">
          <Logo containerStyle="flex-row gap-2" />
          <TouchableOpacity
            activeOpacity={0.8}
            className="px-4 py-2 rounded-2xl items-center bg-brand-500"
          >
            <Text className="text-text-inverted text-base font-medium">
              Solde disponible
            </Text>
            <Text className="text-text-inverted text-xl font-bold mt-0.5">
              {Number(2000).toLocaleString()} $
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4"
      >
        {/* Section favoris */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {[favoriteCrypto, favoriteCrypto, favoriteCrypto].map((crypto, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => {}}
              className={`bg-brand-100 p-5 rounded-3xl ${index > 0 ? 'ml-4' : ''}`}
              style={{ 
                minWidth: 280,
                maxWidth: 320
              }}
            >
              <View className="flex-row justify-between items-start mb-4">
                <Text className="text-brand-700 text-lg font-semibold">
                  Crypto Favori {index + 1}
                </Text>
                <MaterialCommunityIcons 
                  name="star" 
                  size={24} 
                  color={theme.extend.colors.brand[500]} 
                />
              </View>
              <View className="flex-row justify-between items-end">
                <View>
                  <Text className="text-brand-900 text-3xl font-bold">
                    {crypto.amount} {crypto.symbol}
                  </Text>
                  <Text className="text-brand-700 text-lg mt-1">
                    {crypto.value.toLocaleString()} Ar
                  </Text>
                </View>
                {index < 2 && (
                  <TouchableOpacity 
                    className="bg-brand-500/20 p-2 rounded-xl"
                    activeOpacity={0.8}
                    onPress={() => {}}
                  >
                    <MaterialCommunityIcons 
                      name="arrow-right" 
                      size={24} 
                      color={theme.extend.colors.brand[700]} 
                    />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section opérations récentes */}
        <View className="mt-6 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-text-primary text-lg font-semibold">
              Opérations Récentes
            </Text>
            <TouchableOpacity 
              onPress={() => router.push("/home/portefeuille/0")}
              activeOpacity={0.7}
            >
              <Text className="text-brand-500 text-base">Voir tout</Text>
            </TouchableOpacity>
          </View>

          {/* Liste des opérations */}
          <View className="space-y-3">
            {recentOperations.map((operation) => (
              <TouchableOpacity
                key={operation.id}
                activeOpacity={0.7}
                onPress={() => {}}
                className="bg-surface flex-row justify-between items-center p-4 rounded-2xl border border-border-muted"
              >
                <View className="flex-row items-center gap-3">
                  <View 
                    className={`p-2 rounded-xl ${
                      operation.type === "achat" 
                        ? "bg-green-100" 
                        : "bg-red-100"
                    }`}
                  >
                    <MaterialCommunityIcons
                      name={operation.type === "achat" ? "arrow-bottom-left" : "arrow-top-right"}
                      size={24}
                      color={operation.type === "achat" ? "#16a34a" : "#dc2626"}
                    />
                  </View>
                  <View>
                    <Text className="text-text-primary text-base font-semibold">
                      {operation.type === "achat" ? "Achat" : "Vente"} {operation.cryptoSymbol}
                    </Text>
                    <Text className="text-text-secondary text-sm mt-0.5">
                      {new Date(operation.date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-text-primary text-base font-semibold">
                    {operation.amount} {operation.cryptoSymbol}
                  </Text>
                  <Text 
                    className={`text-sm mt-0.5 ${
                      operation.type === "achat" 
                        ? "text-green-600" 
                        : "text-red-600"
                    }`}
                  >
                    {operation.type === "achat" ? "-" : "+"}{operation.value.toLocaleString()} Ar
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
