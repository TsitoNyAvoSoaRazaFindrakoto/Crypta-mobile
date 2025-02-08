import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f8f9fe", justifyContent: "center" }}>
      {/* Titre */}
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#333" }}>
        Changer le mot de passe
      </Text>

      {/* Description */}
      <Text style={{ marginBottom: 20, textAlign: "center", color: "#555" }}>
        Veuillez entrer votre mot de passe actuel, puis choisissez un nouveau mot de passe.
      </Text>

      {/* Input Mot de passe actuel */}
      <TextInput
        placeholder="Mot de passe actuel"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Input Nouveau mot de passe */}
      <TextInput
        placeholder="Nouveau mot de passe"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Input Confirmer mot de passe */}
      <TextInput
        placeholder="Confirmer le mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Bouton Confirmer */}
      <TouchableOpacity style={styles.button} onPress={() => console.log("Mot de passe changé")}>
        <Text style={styles.buttonText}>Confirmer</Text>
      </TouchableOpacity>

      {/* Bouton Annuler */}
      <TouchableOpacity onPress={() => router.push("/home/profil")} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Annuler</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  input: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: "#6366F1",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#E5E7EB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#6366F1",
    fontWeight: "500",
    fontSize: 16,
  },
};

export default ChangePassword;
