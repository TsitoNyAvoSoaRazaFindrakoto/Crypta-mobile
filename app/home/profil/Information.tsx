import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Information = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📢 Informations sur l'application</Text>
      </View>

      <Text style={styles.description}>
        Bienvenue dans notre application de gestion de cryptomonnaies. Cette
        application vous permet de suivre vos transactions, de gérer vos dépôts
        et retraits, et d'accéder à des informations en temps réel sur le marché
        des cryptomonnaies.
      </Text>

      <Text style={styles.subtitle}>🚀 Fonctionnalités principales :</Text>
      <View style={styles.listItem}>
        <MaterialCommunityIcons name="chart-line" size={20} color="#6366f1" />
        <Text style={styles.listText}>Suivi des transactions</Text>
      </View>
      <View style={styles.listItem}>
        <MaterialCommunityIcons
          name="bank-transfer"
          size={20}
          color="#6366f1"
        />
        <Text style={styles.listText}>Gestion des dépôts et retraits</Text>
      </View>
      <View style={styles.listItem}>
        <MaterialCommunityIcons name="newspaper" size={20} color="#6366f1" />
        <Text style={styles.listText}>Informations sur le marché</Text>
      </View>
      <View style={styles.listItem}>
        <MaterialCommunityIcons name="cellphone" size={20} color="#6366f1" />
        <Text style={styles.listText}>Interface utilisateur intuitive</Text>
      </View>

      <Text style={styles.subtitle}>📩 Contact :</Text>
      <Text style={styles.description}>
        Pour toute question ou assistance, veuillez nous contacter à{" "}
        <Text style={styles.email}>support@crypta.com</Text>.
      </Text>

      <Text style={styles.subtitle}>📜 Mentions légales :</Text>
      <Text style={styles.description}>
        L'utilisation de cette application est soumise à nos conditions
        d'utilisation. Veuillez les lire attentivement.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fe",
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 5,
    color: "#41337a",
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    lineHeight: 24,
    color: "#555",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    padding: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  listText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  email: {
    fontWeight: "bold",
    color: "#6366f1",
  },
});

export default Information;
