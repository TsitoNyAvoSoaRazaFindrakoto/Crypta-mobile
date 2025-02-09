import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import Logo from "@/components/ui/Logo";
import { theme } from "@/tailwind.config";
import { useEffect, useState } from "react";
import Historique from "@/types/Historique";
import CryptoAsset from "@/types/CryptoAssets";
import Utilisateur from "@/types/Utilisateur";
import { getItem } from "expo-secure-store";

const index = () => {
  const [recent, setRecent] = useState<Array<Historique>>([]);
  const [assets, setAssets] = useState<Array<CryptoAsset>>([]);
  const [finds, setFunds] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const oldUser: Utilisateur = JSON.parse(getItem("user") || "");
		const getFond = async () => {
			
		};
    const getRecents = async () => {
      const data = await Historique.fetchLatestWithLimit(5);
      setRecent(data);
    };
    const getAssets = async () => {
      const data = await CryptoAsset.getPersonnalData(oldUser.id);
      setAssets(data);
    };

    setIsLoading(true);
    getAssets();
    getRecents();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView className="bg-surface-primary h-full flex justify-center items-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

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

        {/* Section favoris */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {assets.map((asset, index) => (
						<TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => {}}
              className={`bg-brand-100 p-5 rounded-3xl ${index > 0 ? "ml-4" : ""}`}
              style={{
                minWidth: 280,
                maxWidth: 320,
              }}
            >
              <View className="flex-row justify-between items-start mb-4">
                <Text className="text-brand-700 text-lg font-semibold">
                  {asset.crypto.crypto}
                </Text>
              </View>
              <View className="flex-row justify-between items-end">
                <View>
                  <Text className="text-brand-900 text-3xl font-bold">
                    {asset.historique.totalEntree -
                      asset.historique.totalSortie}
                    ;
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

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
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
          {recent.length === 0 ? (
            <Text className="text-center text-text-secondary">
              Aucune opération récente
            </Text>
          ) : (
            <View className="space-y-3">
              {recent.map((operation) => (
                <TouchableOpacity
                  key={operation.idTransCrypto}
                  activeOpacity={0.7}
                  onPress={() => {}}
                  className="bg-surface flex-row justify-between items-center p-4 rounded-2xl border border-border-muted"
                >
                  <View className="flex-row items-center gap-3">
                    <View
                      className={`p-2 rounded-xl ${
                        operation.entree === 0 ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <MaterialCommunityIcons
                        name={
                          operation.entree === 0
                            ? "arrow-bottom-left"
                            : "arrow-top-right"
                        }
                        size={24}
                        color={operation.entree === 0 ? "#16a34a" : "#dc2626"}
                      />
                    </View>
                    <View>
                      <Text className="text-text-primary text-base font-semibold">
                        {operation.entree === 0 ? "Achat" : "Vente"}
                      </Text>
                      <Text className="text-text-secondary text-sm mt-0.5">
                        {operation.dateTransaction.toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-text-primary text-base font-semibold">
                      {operation.entree === 0
                        ? operation.sortie
                        : operation.entree}
                    </Text>
                    <Text
                      className={`text-sm mt-0.5 ${
                        operation.entree === 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {operation.entree === 0 ? "-" : "+"}
                      {operation.prixUnitaire *
                        (operation.entree === 0
                          ? operation.sortie
                          : operation.entree)}{" "}
                      Ar
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
