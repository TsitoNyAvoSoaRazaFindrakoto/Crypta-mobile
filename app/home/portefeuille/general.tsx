import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useMemo } from "react";
import { theme } from "@/tailwind.config";

// Mock data - Replace with actual API calls later
const mockTransactions = [
  {
    id: 1,
    type: "buy",
    amount: 0.05,
    price: 45000,
    date: "2025-02-01T10:30:00Z",
    crypto: "BTC",
  },
  {
    id: 2,
    type: "sell",
    amount: 0.02,
    price: 46500,
    date: "2025-02-03T15:45:00Z",
    crypto: "ETH",
  },
  {
    id: 3,
    type: "sell",
    amount: 0.02,
    price: 46500,
    date: "2025-02-03T15:45:00Z",
    crypto: "ETH",
  },
  {
    id: 4,
    type: "sell",
    amount: 0.02,
    price: 46500,
    date: "2025-02-03T15:45:00Z",
    crypto: "ETH",
  },
  {
    id: 5,
    type: "sell",
    amount: 0.02,
    price: 46500,
    date: "2025-02-03T15:45:00Z",
    crypto: "ETH",
  },
  {
    id: 6,
    type: "sell",
    amount: 0.02,
    price: 46500,
    date: "2025-02-03T15:45:00Z",
    crypto: "ETH",
  },
];

const cryptoList = [
  { id: "BTC", name: "Bitcoin" },
  { id: "ETH", name: "Ethereum" },
  { id: "SOL", name: "Solana" },
];

const transactionTypes = [
  { id: "buy", name: "Achats" },
  { id: "sell", name: "Ventes" },
];

const getFavoriteCryptoId = () => {
  return "BTC";
};

const History = () => {
  const router = useRouter();

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCryptos, setSelectedCryptos] = useState<string[]>([]);

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      const typeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(transaction.type);
      const cryptoMatch =
        selectedCryptos.length === 0 || selectedCryptos.includes(transaction.crypto);
      return typeMatch && cryptoMatch;
    });
  }, [selectedTypes, selectedCryptos]);

  const toggleType = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((t) => t !== typeId)
        : [...prev, typeId]
    );
  };

  const toggleCrypto = (cryptoId: string) => {
    setSelectedCryptos((prev) =>
      prev.includes(cryptoId)
        ? prev.filter((c) => c !== cryptoId)
        : [...prev, cryptoId]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatCryptoAmount = (amount: number) => {
    return amount.toFixed(amount < 0.1 ? 6 : 2);
  };

  return (
    <SafeAreaView className="bg-surface-primary flex-1">
      <View className="flex-1">
        {/* Header avec description */}
        <View className="px-4 py-4 border-b border-border-muted">
          <View className="flex-row justify-between items-center mb-2">
            <Text style={{ marginTop: 20, marginBottom: 20, fontSize: 24, textAlign: 'center', color: '#333', fontWeight: 'bold' }} className="text-text-primary">
              Transactions
            </Text>
						<TouchableOpacity
							onPress={() => router.back()}
							className="px-4 py-2 rounded-lg bg-brand-500 mt-2"
						>
              <Text className="text-white font-medium">
                Retour au portefeuille
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1 px-4">
          {/* Section des filtres avec descriptions */}
          <View className="py-4">
            <Text className="text-lg font-semibold text-text-primary mb-3">
              Filtrer par type d'opération
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-6">
              {transactionTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  onPress={() => toggleType(type.id)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedTypes.includes(type.id)
                      ? "bg-brand-500 border-brand-500"
                      : "border-border-muted"
                  }`}
                >
                  <Text
                    className={
                      selectedTypes.includes(type.id)
                        ? "text-white font-medium"
                        : "text-text-secondary"
                    }
                  >
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-lg font-semibold text-text-primary mb-3">
              Sélectionner les cryptomonnaies
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-6">
              {cryptoList.map((crypto) => (
                <TouchableOpacity
                  key={crypto.id}
                  onPress={() => toggleCrypto(crypto.id)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedCryptos.includes(crypto.id)
                      ? "bg-brand-500 border-brand-500"
                      : "border-border-muted"
                  }`}
                >
                  <Text
                    className={
                      selectedCryptos.includes(crypto.id)
                        ? "text-white font-medium"
                        : "text-text-secondary"
                    }
                  >
                    {crypto.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Liste des transactions avec titre */}
          <View className="pb-4">
            <Text className="text-lg font-semibold text-text-primary mb-4">
              Vos transactions {selectedTypes.length > 0 ? "filtrées" : "récentes"}
            </Text>
            
            {filteredTransactions.length === 0 ? (
              <View className="py-12 items-center bg-surface-secondary rounded-xl">
                <MaterialCommunityIcons
                  name="history"
                  size={40}
                  color={theme.extend.colors.text.muted}
                />
                <Text className="text-text-primary font-medium text-lg mt-4">
                  Aucune transaction trouvée
                </Text>
                <Text className="text-text-secondary text-center mt-2 px-4">
                  Modifiez vos filtres ou revenez plus tard pour voir vos nouvelles transactions
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedTypes([]);
                    setSelectedCryptos([]);
                  }}
                  className="mt-4 px-6 py-2 bg-brand-500 rounded-full"
                >
                  <Text className="text-white font-medium">
                    Réinitialiser les filtres
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              filteredTransactions.map((transaction) => (
                <View
                  key={transaction.id}
                  className="bg-surface p-4 rounded-xl border border-border-muted mb-3"
                >
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center gap-3">
                      <View
                        className={`w-10 h-10 rounded-full items-center justify-center ${
                          transaction.type === "buy"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        <MaterialCommunityIcons
                          name={transaction.type === "buy" ? "arrow-down" : "arrow-up"}
                          size={24}
                          color={transaction.type === "buy" ? "#16a34a" : "#dc2626"}
                        />
                      </View>
                      <View>
                        <Text className="text-text-primary font-medium text-base">
                          {transaction.type === "buy" ? "Achat de" : "Vente de"} {transaction.crypto}
                        </Text>
                        <Text className="text-text-secondary text-sm">
                          Effectué le {formatDate(transaction.date)}
                        </Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text className="text-text-primary font-medium text-base">
                        {formatCryptoAmount(transaction.amount)} {transaction.crypto}
                      </Text>
                      <Text
                        className={`text-sm ${
                          transaction.type === "buy"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "buy" ? "-" : "+"}{formatPrice(transaction.price)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default History;
