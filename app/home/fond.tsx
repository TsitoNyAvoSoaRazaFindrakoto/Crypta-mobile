import { View, Text, TouchableOpacity, Modal, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { Picker } from '@react-native-picker/picker'
import Logo from "@/components/ui/Logo"
import { MaterialIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'

export default function Page() {
  const [form, setForm] = useState({
    type: 'depot',
    montant: '',
  })
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = () => {
    if (!form.montant) {
      Alert.alert('Erreur', 'Veuillez entrer un montant')
      return
    }
    setShowModal(true)
  }

  return (
    <SafeAreaView className="bg-surface-primary h-full">
      {/* Logo en haut à gauche */}
      <View className="px-4 pb-4 mb-12 bg-surface-primary border-b border-border-muted">
          <View className="flex-row justify-between items-center">
            <Logo containerStyle="flex-row gap-2"/>
          </View>
        </View>

      {/* Container principal pour le titre et le formulaire */}
      <View className="flex-1 bg-white rounded-t-3xl mt-6 px-6 pt-8">
        {/* Titre */}
        <Text className="text-2xl font-semibold mb-8 text-center">
          Mouvement de fond
        </Text>

        {/* Type d'opération */}
        <View className="mb-6">
          <Text className="text-lg font-medium mb-2">
            Type d'opération
          </Text>
          <View className="border-[0.5px] border-accent-800 rounded-xl overflow-hidden bg-white shadow-sm">
            <Picker
              selectedValue={form.type}
              onValueChange={(itemValue) => setForm({ ...form, type: itemValue })}
              className="h-12"
            >
              <Picker.Item label="Dépôt" value="depot" />
              <Picker.Item label="Retrait" value="retrait" />
            </Picker>
          </View>
        </View>

        {/* Montant */}
        <View className="mb-6">
          <Text className="text-lg font-medium mb-2">
            Montant
          </Text>
          <View className="border-[0.5px] border-accent-800 rounded-xl p-3 bg-white shadow-sm">
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
          className="bg-brand-500 py-4 rounded-xl items-center mt-4 shadow-sm"
          activeOpacity={0.8}
          onPress={handleSubmit}
        >
          <Text className="text-surface text-lg font-semibold">
            Valider
          </Text>
        </TouchableOpacity>
      </View>

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
              Votre demande de {form.type === 'depot' ? 'dépôt' : 'retrait'} de {form.montant} Ar est en cours de validation
            </Text>

            {/* Bouton de fermeture */}
            <TouchableOpacity
              className="bg-brand-500 w-full py-4 rounded-xl items-center"
              onPress={() => {
                setShowModal(false)
                setForm({ type: 'depot', montant: '' })
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