import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/ui/FormField";
import Logo from "@/components/ui/Logo";
import { Link } from "expo-router";
import useSignIn from "@/hooks/auth/signin";
import {getItemAsync, setItemAsync } from "expo-secure-store";
import { router } from "expo-router";
import Utilisateur from "@/types/Utilisateur";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const [isSumbitting, setIsSumbitting] = useState(false);
  const { signIn, loading, error } = useSignIn();

  const submit = async () => {
		console.log("trying sign-in");
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
    }
		console.log("all data is there");
    setIsSumbitting(true);	
    const user = await signIn(form.email, form.password);
    if (user) {
			await setItemAsync('user', JSON.stringify(user));
			router.push("/home/crypto");
      Alert.alert("Success", "You are now signed in");
    } else {
      Alert.alert("Error", error || "Sign-in failed");
    }

    setIsSumbitting(false);
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
            onPress={submit}
            disabled={isSumbitting}
          >
            <Text className="text-surface text-lg font-semibold">
              {isSumbitting ? "Signing in..." : "Se connecter"}
            </Text>
          </TouchableOpacity>
					<Text className="text-sm">Pas de compte? <Link href="/auth/sign-up" className="text-brand-500">creer un compte</Link></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
