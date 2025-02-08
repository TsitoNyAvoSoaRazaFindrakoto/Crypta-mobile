import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router, useRouter } from "expo-router";
import Logo from "@/components/ui/Logo";
import { registerForPushNotifications } from "@/hooks/notifications";
import { useEffect } from "react";
import * as SecureStorage from "expo-secure-store";

export default function LandingPage() {
  const router = useRouter();

	useEffect(() => {
		const checkRegister = async () => {
			if (await SecureStorage.getItemAsync('user')) {
				router.push('/home/crypto');
			}
		}
		checkRegister();
	}, [])
	

  const toSignin = () => {
    router.push("/auth/sign-in");
  };

  const toSignup = () => {
    router.push("/auth/sign-up");
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-primary">
      <ScrollView showsVerticalScrollIndicator={false} className="pb-8">
        {/* En-tête avec bordure subtile */}
        <View className="px-6 pt-6 pb-4 bg-surface-primary border-b border-border-muted">
          <View className="flex-row justify-between items-center">
            <Logo containerStyle="flex-row gap-2" />
            <TouchableOpacity
              className="px-3 py-1.5 w-1/3 rounded-full bg-brand-100 active:bg-brand-200 items-center"
              onPress={toSignin}
            >
              <Text className="text-brand-600 text-sm font-medium">
                Connexion
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section Héros avec texte en dégradé */}
        <View className="px-6 pt-10 pb-4">
          <Text className="text-4xl font-bold leading-tight mb-4">
            <Text className="text-text-primary">Gérer vos Cryptos{"\n"}</Text>
            <Text className="text-brand-600">Tout Simplement</Text>
          </Text>
          <Text className="text-lg text-text-primary font-semibold mb-8 w-2/3">
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
          className="mx-2 my-6 bg-brand-500 py-4 rounded-2xl items-center active:bg-brand-700 border-3 shadow-sm"
          activeOpacity={0.95}
          onPress={toSignup}
        >
          <Text className="text-surface text-lg font-semibold">
            Rejoignez-nous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mx-2 my-6 bg-brand-500 py-4 rounded-2xl items-center active:bg-brand-700 border-3 shadow-sm"
          activeOpacity={0.95}
          onPress={() => router.push("/home/crypto")}
        >
          <Text className="text-surface text-lg font-semibold">Homepage</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
