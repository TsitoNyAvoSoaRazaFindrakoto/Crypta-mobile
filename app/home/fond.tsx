import { View, Text, TouchableOpacity, Modal, TextInput, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import Logo from "@/components/ui/Logo"
import { MaterialIcons } from '@expo/vector-icons'
import Fond from '@/types/Fond'

export default function Page() {
  const [form, setForm] = useState({
    depot: true,
    montant: '',
  })
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = async () => {
    if (!form.montant) {
      Alert.alert('Erreur', 'Veuillez entrer un montant')
      return;
    }
    const fond = await Fond.createFond(form.depot, Number(form.montant));
		await fond.saveToFirestore();
    setShowModal(true);
  }

  return (
    <SafeAreaView className="bg-surface-primary h-full p-2">
      {/* header section */}
      <View className="p-2 mb-2 bg-surface-primary border-b border-border-muted">
        <View className="flex-row justify-between items-center">
          <Logo />
        </View>
      </View>

      {/* Container principal pour le titre et le formulaire */}
      <ScrollView className="flex-1 rounded-t-3xl h-full px-6 pt-8">
        {/* Titre */}
        <Text className="text-2xl font-semibold mb-4 text-center">
          Mouvement de fond
        </Text>

        {/* Type d'opération */}
        <View className="mb-2">
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 20 }}>
            <TouchableOpacity
              style={{ backgroundColor: form.depot  ? '#4CAF50' : '#ccc', padding: 15, borderRadius: 10, elevation: 5, flexDirection: 'row', alignItems: 'center' }}
              onPress={() => setForm({ ...form, depot : true })}
              activeOpacity={0.7}
            >
              <MaterialIcons name="arrow-upward" size={24} color={form.depot  ? 'white' : 'black'} />
              <Text style={{ color: form.depot ? 'white' : 'black', fontSize: 18, textAlign: 'center', marginLeft: 10 }}>Dépôt</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: !form.depot ? '#F44336' : '#ccc', padding: 15, borderRadius: 10, elevation: 5, flexDirection: 'row', alignItems: 'center' }}
              onPress={() => setForm({ ...form, depot : false })}
              activeOpacity={0.7}
            >
              <MaterialIcons name="arrow-downward" size={24} color={!form.depot ? 'white' : 'black'} />
              <Text style={{ color: !form.depot ? 'white' : 'black', fontSize: 18, textAlign: 'center', marginLeft: 10 }}>Retrait</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Montant */}
        <View className="mb-4">
          <Text className="text-lg font-medium mb-2 ml-2">
            Montant
          </Text>
          <View className="border-hairline border-accent-800 rounded-lg p-3 bg-white">
            <TextInput
              value={form.montant}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, '')
                setForm({ ...form, montant: numericValue })
              }}
              keyboardType="numeric"
              placeholder="Entrez le montant"
              className="text-lg"
            />
          </View>
        </View>

        {/* Bouton Valider */}
        <TouchableOpacity
          className="bg-brand-600 py-4 rounded-lg items-center mt-4"
          activeOpacity={0.8}
          onPress={handleSubmit}
        >
          <Text className="text-surface text-lg font-semibold">
            Valider
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de confirmation moderne */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-surface-primary p-6 rounded-2xl w-[85%] items-center shadow-lg">
            {/* Icône de succès */}
            <View className="w-16 h-16 bg-green-500 rounded-full items-center justify-center mb-4">
              <MaterialIcons name="check" size={40} color="white" />
            </View>
            
            {/* Message de succès */}
            <Text className="text-xl font-semibold mb-2 text-center">
              Demande envoyée !
            </Text>
            <Text className="text-base text-gray-600 mb-6 text-center">
              Votre demande de {form.depot ? 'dépôt' : 'retrait'} de {form.montant} Ar est en cours de validation
            </Text>

            {/* Bouton de fermeture */}
            <TouchableOpacity
              className="bg-brand-500 w-full py-4 rounded-xl items-center"
              onPress={() => {
                setShowModal(false)
                setForm({ depot : true , montant: '' })
              }}
            >
              <Text className="text-surface text-base font-semibold">
                Fermer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}