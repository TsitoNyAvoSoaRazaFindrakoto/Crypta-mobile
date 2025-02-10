import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import Logo from "@/components/ui/Logo";
import { theme } from "@/tailwind.config";
import { useEffect, useState } from "react";
import Historique from "@/types/Historique";
import CryptoAsset from "@/types/CryptoAssets";
import Utilisateur from "@/types/Utilisateur";
import { getItem, getItemAsync } from "expo-secure-store";

const index = () => {
  const [recent, setRecent] = useState<Array<Historique>>([]);
  const [assets, setAssets] = useState<Array<CryptoAsset>>([]);
  const [funds, setFunds] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const reloadData = async () => {
    setIsLoading(true);
    const userString = await getItemAsync("user");
    const currentUser = userString ? JSON.parse(userString) : null;

    const recentData = await Historique.fetchLatestWithLimit(currentUser.id);
    setRecent(recentData);
    console.log(recent);

    const assetsData = await CryptoAsset.getPersonnalData(currentUser.id);
    setAssets(assetsData);
    setIsLoading(false);
  };

  useEffect(() => {
    reloadData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView className="bg-surface-primary h-full flex justify-center items-center">
        <View className="px-4 py-3 mb-2 bg-surface-primary border-b border-border-muted">
          <View className="flex-row justify-between items-center">
            <Logo containerStyle="flex-row gap-2" />
            <TouchableOpacity
              activeOpacity={0.8}
              className="px-4 py-2 rounded-2xl items-center bg-brand-500"
              onPress={reloadData}
            >
              <Text className="text-text-inverted text-base font-medium">
                Refresh
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-surface-primary p-2 h-full">
      {/* Header with refresh button */}
      <View className="py-2 bg-surface-primary border-b border-border-muted">
        <View className="flex-row justify-between items-center">
          <Logo containerStyle="flex-row gap-2" />
          <TouchableOpacity
            activeOpacity={0.8}
            className="px-4 py-2 rounded-2xl items-center bg-brand-500"
            onPress={reloadData}
          >
            <Text className="text-text-inverted text-base font-medium">
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        className="p-4 rounded-xl w-full my-2 items-center bg-brand-500"
      >
        <Text className="text-text-inverted text-xl font-medium">
          Solde disponible{" "}
          <Text className="text-text-inverted font-bold mt-0.5">
            {Number(2000).toLocaleString()} $
          </Text>
        </Text>
      </TouchableOpacity>

      {/* cryptos section */}
      {assets.length === 0 ? (
        <View className="p-4">
          <Text className="text-center text-text-secondary">
            Vous ne possedez rien
          </Text>
        </View>
      ) : (
        <View className="w-full h-[25%]">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="py-6"
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={reloadData} />
            }
          >
            <View className="flex-row gap-4 w-full first:ml-4 last:mr-4">
              {[
                assets[0],
                assets[0],
                assets[0],
                assets[0],
                assets[0],
                assets[0],
              ].map((asset, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  className="bg-surface-secondary p-3 rounded-2xl border border-border-muted w-40 "
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-text-primary text-lg font-semibold">
                      {asset.crypto.crypto}
                    </Text>
                    <MaterialCommunityIcons
                      name={asset.crypto.crypto.toLowerCase()}
                      size={24}
                      color={theme.extend.colors.brand[500]}
                    />
                  </View>
                  <View>
                    <Text className="text-text-primary text-sm font-bold">
                      {(
                        asset.historique.totalEntree -
                        asset.historique.totalSortie
                      ).toFixed(2)}
                    </Text>
                    <Text className="text-text-secondary text-xs">
                      {(
                        (asset.historique.totalEntree -
                          asset.historique.totalSortie) *
                        (asset.crypto.current ?? 0)
                      ).toFixed(2)}{" "}
                      Ar
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Section opérations récentes */}

      <View className="mt-4 max-h-[50%]">
        <View className="flex-row justify-between items-center border-b-hairline p-2">
          <Text className="text-text-primary text-lg font-semibold">
            Opérations Récentes
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/home/portefeuille/general")}
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={reloadData} />
            }
          >
            <View className="flex-col gap-2 first:mt-4 last:mb-4">
              {[recent[0], recent[0]].map((operation, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  onPress={() => {}}
                  className="bg-surface flex-row justify-between items-center p-4 rounded-2xl border border-border-muted"
                >
                  <View className="flex-row items-center gap-3">
                    <View
                      className={`p-2 rounded-xl`}
                    >
                      <MaterialCommunityIcons
                        name={
                          operation.sortie === 0
                            ? "arrow-bottom-left"
                            : "arrow-top-right"
                        }
                        size={24}
                        color={"#1721e7"}
                      />
                    </View>
                    <View>
                      <Text className="text-text-primary text-base font-semibold">
                        {operation.sortie === 0 ? "Achat" : "Vente"}
                        {" ID:"}
                        {operation.idCrypto}
                      </Text>
                      <Text className="text-text-secondary text-sm mt-0.5">
                        {new Date(
                          operation.dateTransaction
                        ).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-text-primary text-base font-semibold">
                      {operation.sortie === 0
                        ? operation.entree
                        : operation.sortie}
                    </Text>
                    <Text
                      className={`text-sm mt-0.5 ${
                        operation.sortie === 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {operation.sortie === 0 ? "-" : "+"}
                      {operation.prixUnitaire *
                        (operation.sortie === 0
                          ? operation.entree
                          : operation.sortie)}{" "}
                      Ar
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default index;
