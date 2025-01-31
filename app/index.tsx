import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LandingPage() {
  return (
    <SafeAreaView className="flex-1 bg-background-500">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-6 pb-4 bg-background-100">
          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons 
              name="wallet" 
              size={32} 
              className="text-brand-primary-600" 
            />
            <Text className="text-3xl font-extrabold text-brand-primary-500">
              Crypta
            </Text>
          </View>
          <TouchableOpacity className="px-4 py-2 rounded-full bg-brand-primary-100/20">
            <Text className="text-brand-primary-600 font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View className="px-6 pt-12 pb-8 bg-background-100">
          <View className="mb-8">
            <Text className="text-5xl font-black text-neutral-900 leading-tight">
              Your Gateway to{'\n'}
              <Text className="text-brand-primary-600">Crypto Freedom</Text>
            </Text>
          </View>
          
          <Text className="text-lg text-neutral-600 mb-12">
            Secure storage, real-time tracking, and seamless transactions for all your digital assets.
          </Text>

          <TouchableOpacity 
            className="bg-brand-primary-500 py-5 rounded-2xl items-center active:bg-brand-primary-600"
            activeOpacity={0.95}
          >
            <Text className="text-background-100 text-xl font-bold">
              Get Started Free
            </Text>
          </TouchableOpacity>

          {/* Placeholder for 3D wallet illustration */}
          <View className="h-64 mt-12 bg-brand-primary-100/20 rounded-3xl justify-center items-center">
            <MaterialCommunityIcons 
              name="cellphone" 
              size={120} 
              className="text-brand-primary-500/30" 
            />
          </View>
        </View>

        {/* Features Section */}
        <View className="pt-12 pb-8 bg-background-300">
          <Text className="text-3xl font-bold text-neutral-900 mb-8 px-6">
            Why Crypta?
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            className="mb-6"
          >
            {[
              {
                icon: "shield-lock",
                title: "Military-Grade Security",
                description: "Bank-level encryption & biometric access",
                color: "bg-success-light",
              },
              {
                icon: "chart-areaspline",
                title: "Smart Tracking",
                description: "Real-time portfolio analytics",
                color: "bg-info-light",
              },
              {
                icon: "swap-horizontal-circle",
                title: "Instant Swaps",
                description: "Low-fee cross-chain exchanges",
                color: "bg-brand-accent-200",
              },
              {
                icon: "database",
                title: "Multi-Chain",
                description: "100+ blockchain networks supported",
                color: "bg-warning-light",
              },
            ].map((feature, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                className={`w-64 min-h-[180px] p-6 mr-4 rounded-[28px] ${feature.color} justify-between shadow-lg`}
              >
                <MaterialCommunityIcons
                  name={feature.icon}
                  size={36}
                  className="text-brand-primary-600 mb-4"
                />
                <View>
                  <Text className="text-xl font-bold text-neutral-900 mb-2">
                    {feature.title}
                  </Text>
                  <Text className="text-base text-neutral-600">
                    {feature.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stats Section */}
        <View className="px-6 py-16 bg-brand-primary-500">
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-4xl font-black text-background-100 mb-2">$10B+</Text>
              <Text className="text-background-200 font-medium">Assets Protected</Text>
            </View>
            <View className="items-center">
              <Text className="text-4xl font-black text-brand-accent-500 mb-2">5M+</Text>
              <Text className="text-background-200 font-medium">Active Users</Text>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View className="px-6 py-16 bg-background-100">
          <View className="bg-brand-primary-500 rounded-3xl p-8 items-center">
            <Text className="text-3xl font-black text-background-100 text-center mb-4">
              Start Your Crypto Journey Today
            </Text>
            <Text className="text-background-200 text-center mb-8">
              Join millions already managing their crypto assets securely
            </Text>
            <TouchableOpacity 
              className="bg-background-100 px-8 py-4 rounded-2xl"
              activeOpacity={0.9}
            >
              <Text className="text-brand-primary-600 text-lg font-bold">
                Create Free Wallet
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}