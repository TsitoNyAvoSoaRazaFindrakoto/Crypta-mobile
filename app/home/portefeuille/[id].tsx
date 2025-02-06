import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useMemo } from "react";
import Logo from "@/components/ui/Logo";
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
  // TODO: Implement getting favorite crypto from user preferences
  return "BTC"; // Bitcoin as default
};

const History = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const cryptoId = id === "0" ? getFavoriteCryptoId() : String(id);
  const favoriteCryptoId = getFavoriteCryptoId();

  // Filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCryptos, setSelectedCryptos] = useState<string[]>([]);

  // Filter transactions based on selected filters
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      const typeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(transaction.type);
      const cryptoMatch =
        selectedCryptos.length === 0 ||
        selectedCryptos.includes(transaction.crypto);
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

  // Improved date formatting with better French locale
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Enhanced price formatting
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Improved crypto amount formatting
  const formatCryptoAmount = (amount: number) => {
    return amount.toFixed(amount < 0.1 ? 6 : 2);
  };

  return (
    <SafeAreaView className="bg-surface-primary flex-1 px-4 pt-4">
        {/* Enhanced Header */}
        <View className="pb-4 mb-4 border-b border-border-muted">
          <View className="flex-row justify-between items-center">
            <Logo containerStyle="flex-row gap-2" />
            <TouchableOpacity
              onPress={() => router.back()}
              className="px-4 py-2 rounded-lg bg-brand-500 active:opacity-90"
            >
              <Text className="text-brand-contrast text-sm font-semibold">
                Revenir aux Cours
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Title Section */}
        <View className="mb-4">
          <Text className="text-3xl font-bold text-text-primary">
            Historique des transactions
          </Text>
{/*           <Text className="text-text-tertiary mt-2 text-lg">
            {id === "0" ? "Crypto préférée" : `Crypto #${cryptoId}`}
          </Text> */}
        </View>

        {/* Enhanced Filters Section */}
        <View className="mb-6">
          <View className="px-2 pb-1 ">
            <View className="flex-row flex-wrap gap-3">
              {transactionTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  onPress={() => toggleType(type.id)}
                  className={`flex-row items-center px-4 py-2 rounded-full border ${
                    selectedTypes.includes(type.id)
                      ? "bg-brand-pale border-brand-500"
                      : "border-border-muted"
                  }`}
                >
                  <MaterialCommunityIcons
                    name={
                      selectedTypes.includes(type.id)
                        ? "checkbox-marked"
                        : "checkbox-blank-outline"
                    }
                    size={20}
                    color={
                      selectedTypes.includes(type.id)
                        ? theme.extend.colors.brand[500]
                        : theme.extend.colors.text.muted
                    }
                    className="mr-2"
                  />
                  <Text
                    className={`text-sm ${
                      selectedTypes.includes(type.id)
                        ? "text-brand-600 font-medium"
                        : "text-text-secondary"
                    }`}
                  >
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Improved Crypto Filters */}
          <View className="p-2">
{/*             <Text className="text-lg font-semibold text-text-primary mb-2">
              Cryptomonnaies
            </Text> */}
            <View className="flex-row flex-wrap gap-2">
              {cryptoList.map((crypto) => {
                const isFavorite = crypto.id === favoriteCryptoId;
                const isSelected = selectedCryptos.includes(crypto.id);

                return (
                  <TouchableOpacity
                    key={crypto.id}
                    onPress={() => toggleCrypto(crypto.id)}
                    className={`flex-row items-center px-4 py-2 rounded-full border ${
                      isSelected
                        ? "bg-brand-pale border-brand-500"
                        : isFavorite
                        ? "border-accent-500 bg-accent-50"
                        : "border-border-muted"
                    }`}
                  >
                    <MaterialCommunityIcons
                      name={
                        isSelected
                          ? "checkbox-marked"
                          : "checkbox-blank-outline"
                      }
                      size={20}
                      color={
                        isSelected
                          ? theme.extend.colors.brand[500]
                          : isFavorite
                          ? theme.extend.colors.accent[500]
                          : theme.extend.colors.text.muted
                      }
                      className="mr-2"
                    />
                    <Text
                      className={`text-sm ${
                        isSelected
                          ? "text-brand-600 font-medium"
                          : isFavorite
                          ? "text-accent-700"
                          : "text-text-secondary"
                      }`}
                    >
                      {crypto.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Enhanced Transactions List */}
        <ScrollView className="rounded-xl max-h-[48vh] flex-grow-0 ">
          {filteredTransactions.length === 0 ? (
            <View className="py-12 items-center">
              <MaterialCommunityIcons
                name="chart-line-variant"
                size={40}
                color={theme.extend.colors.text.muted}
              />
              <Text className="text-text-tertiary mt-4 text-lg">
                Aucune transaction trouvée
              </Text>
            </View>
          ) : (
            filteredTransactions.map((transaction) => (
              <View
                key={transaction.id}
                className="bg-elevation-1 p-4"
              >
                <View className="flex-row justify-between items-center">
                  {/* Transaction Details */}
                  <View className="flex-row items-center gap-4">
                    <View
                      className={`w-12 h-12 rounded-full items-center justify-center ${
                        transaction.type === "buy"
                          ? "bg-success-surface"
                          : "bg-error-surface"
                      }`}
                    >
                      <MaterialCommunityIcons
                        name={
                          transaction.type === "buy" ? "arrow-down" : "arrow-up"
                        }
                        size={24}
                        color={
                          transaction.type === "buy"
                            ? theme.extend.colors.success.DEFAULT
                            : theme.extend.colors.error.DEFAULT
                        }
                      />
                    </View>
                    <View>
                      <Text className="text-lg font-semibold text-text-primary capitalize">
                        {transaction.type}
                      </Text>
                      <Text className="text-sm text-text-muted">
                        {formatDate(transaction.date)}
                      </Text>
                    </View>
                  </View>

                  {/* Amount Details */}
                  <View className="items-end">
                    <Text className="text-lg font-semibold text-text-primary">
                      {formatCryptoAmount(transaction.amount)}{" "}
                      {transaction.crypto}
                    </Text>
                    <Text className="text-sm text-text-secondary">
                      {formatPrice(transaction.price)}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>
    </SafeAreaView>
  );
};

export default History;
