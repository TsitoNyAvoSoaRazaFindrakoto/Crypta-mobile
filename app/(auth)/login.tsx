import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "react-native-heroicons/solid";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import React from "react";

export default function LoginSignupPage() {
  const [isLogin, setIsLogin] = React.useState(true); // Toggle between Login and Signup
  const [showPassword, setShowPassword] = React.useState(false); // Toggle password visibility

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient colors={["#0F072C", "#2D1B69"]} className="flex-1">
        <StatusBar style="light" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* Header Section */}
            <View className="px-6 pt-20 pb-8">
              <Animated.Text
                entering={FadeInUp.duration(1000)}
                className="text-4xl font-bold text-white mb-4"
              >
                {isLogin ? "Welcome Back!" : "Create Account"}
              </Animated.Text>

              <Animated.Text
                entering={FadeInUp.duration(1000).delay(200)}
                className="text-lg text-purple-100"
              >
                {isLogin
                  ? "Sign in to manage your crypto portfolio."
                  : "Join us to start your crypto journey."}
              </Animated.Text>
            </View>

            {/* Form Section */}
            <Animated.View
              entering={FadeInDown.duration(1000)}
              className="bg-black/20 mx-6 p-8 rounded-3xl"
            >
              {/* Email Input */}
              <View className="mb-6">
                <View className="flex-row items-center bg-black/30 p-4 rounded-xl">
                  <EnvelopeIcon size={20} color="#A855F7" />
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#A855F7"
                    className="flex-1 ml-3 text-white"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-6">
                <View className="flex-row items-center bg-black/30 p-4 rounded-xl">
                  <LockClosedIcon size={20} color="#A855F7" />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#A855F7"
                    className="flex-1 ml-3 text-white"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon size={20} color="#A855F7" />
                    ) : (
                      <EyeIcon size={20} color="#A855F7" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password */}
              {isLogin && (
                <TouchableOpacity className="items-end mb-6">
                  <Text className="text-purple-400">Forgot Password?</Text>
                </TouchableOpacity>
              )}

              {/* Submit Button */}
              <TouchableOpacity className="bg-purple-500 p-4 rounded-xl">
                <Text className="text-white text-center font-semibold text-lg">
                  {isLogin ? "Sign In" : "Sign Up"}
                </Text>
              </TouchableOpacity>

              {/* Toggle Between Login and Signup */}
              <View className="flex-row justify-center mt-6">
                <Text className="text-purple-200">
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                </Text>
                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                  <Text className="text-purple-400 font-semibold">
                    {isLogin ? "Sign Up" : "Sign In"}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </GestureHandlerRootView>
  );
}
