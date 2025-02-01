import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native";

export default function LandingPage() {
  return (
    <SafeAreaView className="flex-1 bg-surface-primary">
      <ScrollView showsVerticalScrollIndicator={false} className="pb-8">
        {/* En-tête avec bordure subtile */}
        <View className="px-6 pt-6 pb-4 bg-surface-primary border-b border-border-muted">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-3">
              <MaterialCommunityIcons
                name="wallet-plus-outline"
                size={28}
                className="text-brand-600"
              />
              <Text className="text-2xl font-bold text-text-primary">
                Crypta
              </Text>
            </View>
            <TouchableOpacity className="px-3 py-1.5 rounded-full bg-brand-100 active:bg-brand-200">
              <Text className="text-brand-600 text-sm font-medium">
                Connexion
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section Héros avec texte en dégradé */}
        <View className="px-6 pt-10 pb-4">
          <Text className="text-[38px] font-bold leading-tight mb-4">
            <Text className="text-text-primary">Gerer vos Cryptos</Text>
            {"\n"}
            <Text className="text-brand-600">Tout Simplement</Text>
          </Text>

          <Text className="text-lg text-text-primary font-semibold mb-8 max-w-30">
            Portefeuille multi-chaîne sécurisé avec une sécurité
            institutionnelle et un design élégant
          </Text>
        </View>

        {/* Grille des fonctionnalités */}
        <View className="px-1 py-8  bg-surface-tertiary">
          <Text className="text-xl left-5 font-semibold text-text-primary mb-6">
            Pourquoi Crypta ?
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16 }}
          >
            {[
              {
                icon: "lock-outline",
                title: "Stockage Sécurisé",
                desc: "Coffres protégés par biométrie",
                color: "bg-success-surface",
              },
              {
                icon: "swap-horizontal",
                title: "Échange Instantané",
                desc: "Meilleurs taux garantis",
                color: "bg-accent-100",
              },
              {
                icon: "chart-areaspline",
                title: "Analyse en Temps Réel",
                desc: "Suivi en direct",
                color: "bg-info-surface",
              },
              {
                icon: "web",
                title: "Multi-chaîne",
                desc: "Support de plus de 20 réseaux",
                color: "bg-brand-100",
              },
            ].map((feature, index) => (
              <TouchableOpacity
                key={index}
                className="w-64 mb-2 p-6 rounded-3xl bg-surface-primary border border-border-default"
                activeOpacity={0.9}
              >
                <View
                  className={`w-12 h-12 rounded-lg ${feature.color} items-center justify-center mb-4`}
                >
                  <MaterialCommunityIcons
                    name={feature.icon}
                    size={24}
                    className="text-brand-600"
                  />
                </View>
                <Text className="text-lg font-medium text-text-primary mb-2">
                  {feature.title}
                </Text>
                <Text className="text-base text-text-secondary">
                  {feature.desc}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          className="mx-2 my-6 bg-brand-500 py-4 rounded-2xl items-center active:bg-brand-700 border-3 shadow-lg"
          activeOpacity={0.95}
        >
          <Text className="text-surface text-lg font-semibold">
            Rejoignez-nous
          </Text>
        </TouchableOpacity>

        {/* Dernier appel à l'action */}
        {/* <View className="px-6 pt-12 pb-16">
          <View className="bg-brand-300 rounded-2xl p-8 shadow-xl border border-border-default">
            <Text className="text-2xl font-bold text-surface-inverse text-center mb-3">
              Prêt à commencer ?
            </Text>
            <Text className="text-surface-inverse text-center font-semibold text-sm mb-6">
              Rejoignez l'avenir de la gestion des actifs numériques
            </Text>
            <TouchableOpacity
              className="bg-surface-primary px-6 py-3 rounded-2xl active:bg-surface-tertiary border"
              activeOpacity={0.9}
            >
              <Text className="text-brand-700 text-lg font-semibold text-center">
                Commencer
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
