import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/ui/FormField";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Logo from "@/components/ui/Logo";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSumbitting, setIsSumbitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSumbitting(true);
  };

  return (
    <SafeAreaView className="bg-surface-primary h-full">
      <ScrollView>
        <View className="items-center w-full min-h-[85vh] px-4 my-6 justify-center mt-6 py-12">
          {/* title */}
          <Logo containerStyle="mb-6">
            <Text className="text-3xl font-semibold">Bienvenue</Text>
          </Logo>

          {/* email */}
          <FormField
            title="Email"
            otherStyles="my-2"
            value={form.email}
            placeholder="mail@example.com"
            handleChangeText={(text: string) =>
              setForm({ ...form, email: text })
            }
          />
          <FormField
            title="Mot De Passe"
            otherStyles="my-2"
            value={form.password}
            handleChangeText={(text: string) =>
              setForm({ ...form, password: text })
            }
          />
          <TouchableOpacity
            className="my-6 w-full bg-brand-500 py-4 rounded-xl items-center active:bg-brand-700 border-3 shadow-sm"
            activeOpacity={0.95}
          >
            <Text className="text-surface text-lg font-semibold">
              Se connecter
            </Text>
          </TouchableOpacity>
					<Text className="text-sm">Pas de compte? <Link href="/(auth)/sign-up" className="text-brand-500">creer un compte</Link></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
