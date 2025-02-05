import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useMemo } from 'react';

// Mock data - Replace with actual API calls later
const mockTransactions = [
  {
    id: 1,
    type: 'buy',
    amount: 0.05,
    price: 45000,
    date: '2025-02-01T10:30:00Z',
    crypto: 'BTC',
  },
  {
    id: 2,
    type: 'sell',
    amount: 0.02,
    price: 46500,
    date: '2025-02-03T15:45:00Z',
    crypto: 'ETH',
  },
];

const cryptoList = [
  { id: 'BTC', name: 'Bitcoin' },
  { id: 'ETH', name: 'Ethereum' },
  { id: 'SOL', name: 'Solana' },
];

const transactionTypes = [
  { id: 'buy', name: 'Achats' },
  { id: 'sell', name: 'Ventes' },
];

const getFavoriteCryptoId = () => {
  // TODO: Implement getting favorite crypto from user preferences
  return 'BTC'; // Bitcoin as default
};

const History = () => {
  const { id } = useLocalSearchParams();
  const cryptoId = id === '0' ? getFavoriteCryptoId() : String(id);
  const favoriteCryptoId = getFavoriteCryptoId();

  // Filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCryptos, setSelectedCryptos] = useState<string[]>([]);

  const toggleType = (typeId: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  const toggleCrypto = (cryptoId: string) => {
    setSelectedCryptos(prev =>
      prev.includes(cryptoId)
        ? prev.filter(c => c !== cryptoId)
        : [...prev, cryptoId]
    );
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filter transactions based on selected filters
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(transaction => {
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(transaction.type);
      const cryptoMatch = selectedCryptos.length === 0 || selectedCryptos.includes(transaction.crypto);
      return typeMatch && cryptoMatch;
    });
  }, [selectedTypes, selectedCryptos]);

  return (
    <SafeAreaView className="bg-surface-primary h-full">
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 pt-4 pb-8">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-text-primary">
            Historique des transactions
          </Text>
          <Text className="text-text-secondary mt-1">
            {id === '0' ? 'Crypto favori' : `Crypto #${cryptoId}`}
          </Text>
        </View>

        {/* Filters */}
        <View className="mb-6">
          {/* Transaction Type Filters */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-text-primary mb-2">
              Type de transaction
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {transactionTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  onPress={() => toggleType(type.id)}
                  className={`flex-row items-center p-2 rounded-lg border ${
                    selectedTypes.includes(type.id)
                      ? 'bg-brand-100 border-brand-500'
                      : 'border-border-muted'
                  }`}
                >
                  <MaterialCommunityIcons
                    name={selectedTypes.includes(type.id) ? 'checkbox-marked' : 'checkbox-blank-outline'}
                    size={20}
                    color={selectedTypes.includes(type.id) ? '#6366f1' : '#9ca3af'}
                    className="mr-2"
                  />
                  <Text className={`${
                    selectedTypes.includes(type.id)
                      ? 'text-brand-700'
                      : 'text-text-secondary'
                  }`}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Crypto Filters */}
          <View>
            <Text className="text-lg font-semibold text-text-primary mb-2">
              Cryptomonnaies
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {cryptoList.map((crypto) => (
                <TouchableOpacity
                  key={crypto.id}
                  onPress={() => toggleCrypto(crypto.id)}
                  className={`flex-row items-center p-2 rounded-lg border ${
                    selectedCryptos.includes(crypto.id)
                      ? 'bg-brand-100 border-brand-500'
                      : crypto.id === favoriteCryptoId
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-border-muted'
                  }`}
                >
                  <MaterialCommunityIcons
                    name={selectedCryptos.includes(crypto.id) ? 'checkbox-marked' : 'checkbox-blank-outline'}
                    size={20}
                    color={selectedCryptos.includes(crypto.id) ? '#6366f1' : crypto.id === favoriteCryptoId ? '#eab308' : '#9ca3af'}
                    className="mr-2"
                  />
                  <Text className={`${
                    selectedCryptos.includes(crypto.id)
                      ? 'text-brand-700'
                      : crypto.id === favoriteCryptoId
                      ? 'text-yellow-700'
                      : 'text-text-secondary'
                  }`}>
                    {crypto.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Transactions List */}
        <View className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <View
              key={transaction.id}
              className="bg-surface-secondary p-4 rounded-lg flex-row justify-between items-center"
            >
              {/* Transaction Icon and Type */}
              <View className="flex-row items-center gap-3">
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center ${
                    transaction.type === 'buy'
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  }`}
                >
                  <MaterialCommunityIcons
                    name={transaction.type === 'buy' ? 'arrow-down' : 'arrow-up'}
                    size={24}
                    color={transaction.type === 'buy' ? '#22c55e' : '#ef4444'}
                  />
                </View>
                <View>
                  <Text className="text-lg font-semibold text-text-primary capitalize">
                    {transaction.type}
                  </Text>
                  <Text className="text-text-secondary">
                    {formatDate(transaction.date)}
                  </Text>
                </View>
              </View>

              {/* Amount and Price */}
              <View className="items-end">
                <Text className="text-lg font-semibold text-text-primary">
                  {transaction.amount.toFixed(8)} {transaction.crypto}
                </Text>
                <Text className="text-text-secondary">
                  ${transaction.price.toLocaleString()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;