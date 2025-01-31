import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LandingPage() {
  return (
    <SafeAreaView className="flex-1 bg-surface-primary">
      <ScrollView showsVerticalScrollIndicator={false} className="pb-8">
        {/* Header with Subtle Border */}
        <View className="px-6 pt-6 pb-4 bg-surface-primary border-b border-border-muted">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-3">
              <MaterialCommunityIcons 
                name="wallet-outline" 
                size={28} 
                className="text-brand-600" 
              />
              <Text className="text-2xl font-bold text-text-primary">Crypta</Text>
            </View>
            <TouchableOpacity className="px-3 py-1.5 rounded-full bg-brand-100 active:bg-brand-200">
              <Text className="text-brand-600 text-sm font-medium">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section with Gradient Text */}
        <View className="px-6 pt-10 pb-8">
          <Text className="text-[38px] font-bold leading-tight mb-4">
            <Text className="text-text-primary">Modern Crypto</Text>
            <Text className="text-brand-600"> Management</Text>
          </Text>
          
          <Text className="text-lg text-text-secondary mb-8">
            Secure multi-chain wallet with institutional-grade security and elegant design
          </Text>

          <TouchableOpacity 
            className="bg-brand-600 py-4 rounded-xl items-center active:bg-brand-700 shadow-lg"
            activeOpacity={0.95}
          >
            <Text className="text-surface-inverse text-lg font-semibold">
              Create Free Wallet
            </Text>
          </TouchableOpacity>

          {/* Abstract Graphic */}
          <View className="mt-12 h-52 bg-surface-secondary rounded-2xl border border-border-default justify-center items-center">
            <MaterialCommunityIcons 
              name="shield-check" 
              size={80} 
              className="text-brand-400" 
            />
          </View>
        </View>

        {/* Features Grid */}
        <View className="px-6 pt-8 bg-surface-secondary">
          <Text className="text-xl font-semibold text-text-primary mb-6">
            Why Crypta Stands Out
          </Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16 }}
          >
            {[
              {
                icon: "lock-outline",
                title: "Secure Storage",
                desc: "Biometric protected vaults",
                color: "bg-success-surface"
              },
              {
                icon: "swap-horizontal",
                title: "Instant Swap",
                desc: "Best rates guaranteed",
                color: "bg-accent-100"
              },
              {
                icon: "chart-areaspline",
                title: "Live Analytics",
                desc: "Real-time tracking",
                color: "bg-info-surface"
              },
              {
                icon: "web",
                title: "Multi-chain",
                desc: "20+ networks supported",
                color: "bg-brand-100"
              },
            ].map((feature, index) => (
              <TouchableOpacity
                key={index}
                className="w-64 p-6 rounded-2xl bg-surface-primary border border-border-default"
                activeOpacity={0.9}
              >
                <View className={`w-12 h-12 rounded-lg ${feature.color} items-center justify-center mb-4`}>
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

        {/* Stats with Gradient Background */}
        <View className="px-6 pt-12">
          <View className="bg-gradient-to-r from-brand-200 to-accent-100 rounded-2xl p-8">
            <View className="flex-row justify-around">
              <View className="items-center">
                <Text className="text-3xl font-bold text-text-primary">$10B+</Text>
                <Text className="text-text-secondary text-sm">Assets Secured</Text>
              </View>
              <View className="h-12 w-px bg-border-default my-auto" />
              <View className="items-center">
                <Text className="text-3xl font-bold text-text-primary">5M+</Text>
                <Text className="text-text-secondary text-sm">Happy Users</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Final CTA */}
        <View className="px-6 pt-12 pb-16">
          <View className="bg-brand-600 rounded-2xl p-8 shadow-xl">
            <Text className="text-2xl font-bold text-surface-inverse text-center mb-3">
              Ready to Start?
            </Text>
            <Text className="text-surface-inverse/80 text-center text-sm mb-6">
              Join the future of digital asset management
            </Text>
            <TouchableOpacity 
              className="bg-surface-primary px-6 py-3 rounded-lg active:bg-surface-secondary"
              activeOpacity={0.9}
            >
              <Text className="text-brand-600 text-base font-semibold text-center">
                Get Started Free
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}