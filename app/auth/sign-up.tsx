import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/ui/FormField";
import Logo from "@/components/ui/Logo";
import { Link, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import useSignUp from "@/hooks/auth/signup"; // new import
import getNewId from "@/utils/getNewId"; // new import

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { signUp, loading } = useSignUp(); // using signUp and loading

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      return Alert.alert("Error", "Please fill in all fields");
    }

    const newId = await getNewId(); // get new id from file line count
    const user = await signUp(
      form.username,
      form.email,
      form.password,
      newId,
      true,
      "Membre simple"
    );
    if (!user) return Alert.alert("Error", "Sign up failed");
    else router.push("/home/crypto");
  };

  return (
    <SafeAreaView className="bg-surface-primary h-full">
      <ScrollView>
        <View className="items-center w-full min-h-[85vh] px-4 my-6 justify-center mt-6 py-12">
          {/* title */}
          <Logo containerStyle="mb-6">
            <Text className="text-3xl font-semibold">Bienvenue</Text>
          </Logo>

          <FormField
            title="Pseudo"
            otherStyles="my-2"
            value={form.username} // changed from form.email
            placeholder="monPseudo"
            handleChangeText={(text: string) =>
              setForm({ ...form, username: text })
            }
          />

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
            onPress={submit} // added submit handler
            className="my-6 w-full bg-brand-500 py-4 rounded-xl items-center active:bg-brand-700 border-3 shadow-sm"
            activeOpacity={0.95}
            disabled={loading} // disable button while loading
          >
            <Text className="text-surface text-lg font-semibold">
              {loading ? "Loading..." : "creer un compte"}
            </Text>
          </TouchableOpacity>
          <Text className="text-sm">
            Vous avez deja un compte?{" "}
            <Link href="/auth/sign-in" className="text-brand-500">
              se connecter
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
