import { View, Text, TouchableOpacity, Image, Platform, TextInput, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';

// Mock user data - Replace with actual user data later
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  region: 'Antananarivo',
  birthDate: '1986-06-20',
  bonus: '345',
  profilePicture: null,
};

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState('');

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
        setShowPermissionModal(true);
        return false;
      }
      return true;
    }
    return true;
  };

  const PhotoOptionsModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showPhotoModal}
      onRequestClose={() => setShowPhotoModal(false)}
    >
      <Pressable 
        className="flex-1 bg-black/50 justify-center items-center"
        onPress={() => setShowPhotoModal(false)}
      >
        <Pressable 
          className="bg-surface-primary rounded-xl w-[80%] overflow-hidden"
          onPress={(e) => e.stopPropagation()}
        >
          <View className="p-4 border-b border-border-muted">
            <Text className="text-lg font-semibold text-text-primary text-center">
              Photo de profil
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setShowPhotoModal(false);
              router.push('/home/photos');
            }}
            className="flex-row items-center p-4 border-b border-border-muted active:bg-surface-secondary"
          >
            <MaterialCommunityIcons name="image-size-select-actual" size={24} color="#6366f1" className="mr-3" />
            <Text className="text-text-primary">Agrandir la photo de profil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setShowPhotoModal(false);
              takePhoto();
            }}
            className="flex-row items-center p-4 border-b border-border-muted active:bg-surface-secondary"
          >
            <MaterialCommunityIcons name="camera" size={24} color="#6366f1" className="mr-3" />
            <Text className="text-text-primary">Prendre une nouvelle photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setShowPhotoModal(false);
              pickImage();
            }}
            className="flex-row items-center p-4 border-b border-border-muted active:bg-surface-secondary"
          >
            <MaterialCommunityIcons name="image-multiple" size={24} color="#6366f1" className="mr-3" />
            <Text className="text-text-primary">Sélectionner depuis la galerie</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowPhotoModal(false)}
            className="p-4 items-center active:bg-surface-secondary"
          >
            <Text className="text-brand-600 font-medium">Annuler</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );

  const PermissionModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showPermissionModal}
      onRequestClose={() => setShowPermissionModal(false)}
    >
      <Pressable 
        className="flex-1 bg-black/50 justify-center items-center"
        onPress={() => setShowPermissionModal(false)}
      >
        <Pressable 
          className="bg-surface-primary rounded-xl w-[80%] overflow-hidden"
          onPress={(e) => e.stopPropagation()}
        >
          <View className="p-4 border-b border-border-muted">
            <Text className="text-lg font-semibold text-text-primary text-center">
              Permission requise
            </Text>
          </View>

          <Text className="p-4 text-text-secondary">
            Nous avons besoin de votre permission pour accéder à la caméra et à la galerie.
          </Text>

          <TouchableOpacity
            onPress={() => setShowPermissionModal(false)}
            className="p-4 items-center active:bg-surface-secondary"
          >
            <Text className="text-brand-600 font-medium">OK</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );

  const ErrorModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showErrorModal}
      onRequestClose={() => setShowErrorModal(false)}
    >
      <Pressable 
        className="flex-1 bg-black/50 justify-center items-center"
        onPress={() => setShowErrorModal(false)}
      >
        <Pressable 
          className="bg-surface-primary rounded-xl w-[80%] overflow-hidden"
          onPress={(e) => e.stopPropagation()}
        >
          <View className="p-4 border-b border-border-muted">
            <Text className="text-lg font-semibold text-text-primary text-center">
              Erreur
            </Text>
          </View>

          <Text className="p-4 text-text-secondary">
            {errorModalMessage}
          </Text>

          <TouchableOpacity
            onPress={() => setShowErrorModal(false)}
            className="p-4 items-center active:bg-surface-secondary"
          >
            <Text className="text-brand-600 font-medium">OK</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        presentationStyle: 'fullScreen',
      });

      if (!result.canceled && result.assets[0]) {
        setUser(prev => ({
          ...prev,
          profilePicture: result.assets[0].uri,
        }));
      }
    } catch (error) {
      setErrorModalMessage('Impossible d\'accéder à la caméra. Veuillez vérifier vos permissions.');
      setShowErrorModal(true);
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        presentationStyle: 'fullScreen',
      });

      if (!result.canceled && result.assets[0]) {
        setUser(prev => ({
          ...prev,
          profilePicture: result.assets[0].uri,
        }));
      }
    } catch (error) {
      setErrorModalMessage('Impossible d\'accéder à la galerie. Veuillez vérifier vos permissions.');
      setShowErrorModal(true);
    }
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

	const handleLogOut = () => {
		router.push('/auth/sign-in');
	}

  if (isEditing) {
    return (
      <SafeAreaView className="flex-1 bg-surface-primary">
        <View className="px-4 py-6">
          {/* Header */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity onPress={() => setIsEditing(false)} className="mr-4">
              <MaterialCommunityIcons name="arrow-left" size={24} color="#6366f1"  />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-text-primary">Éditer le profil</Text>
            <TouchableOpacity onPress={handleSave} className="ml-auto">
              <MaterialCommunityIcons name="check" size={24} color="#6366f1" />
            </TouchableOpacity>
          </View>

          {/* Profile Picture */}
          <View className="items-center mb-8">
            <TouchableOpacity onPress={() => setShowPhotoModal(true)} className="relative">
              <View className="w-24 h-24 rounded-full overflow-hidden bg-surface-secondary">
                {user.profilePicture ? (
                  <Image source={{ uri: user.profilePicture }} className="w-full h-full" />
                ) : (
                  <View className="w-full h-full items-center justify-center bg-surface-secondary">
                    <MaterialCommunityIcons name="account" size={48} color="#9ca3af" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Edit Form */}
          <View className="space-y-4">
            <View>
              <Text className="text-text-secondary mb-1">Nom</Text>
              <TextInput
                value={editedUser.name}
                onChangeText={(text) => setEditedUser(prev => ({ ...prev, name: text }))}
                className="p-3 bg-surface-secondary rounded-lg text-text-primary"
              />
            </View>
            <View>
              <Text className="text-text-secondary mb-1">Email</Text>
              <TextInput
                value={editedUser.email}
                onChangeText={(text) => setEditedUser(prev => ({ ...prev, email: text }))}
                className="p-3 bg-surface-secondary rounded-lg text-text-primary"
                keyboardType="email-address"
              />
            </View>
            <View>
              <Text className="text-text-secondary mb-1">Région</Text>
              <TextInput
                value={editedUser.region}
                onChangeText={(text) => setEditedUser(prev => ({ ...prev, region: text }))}
                className="p-3 bg-surface-secondary rounded-lg text-text-primary"
              />
            </View>
            <View>
              <Text className="text-text-secondary mb-1">Date de naissance</Text>
              <TextInput
                value={editedUser.birthDate}
                onChangeText={(text) => setEditedUser(prev => ({ ...prev, birthDate: text }))}
                className="p-3 bg-surface-secondary rounded-lg text-text-primary"
                placeholder="YYYY-MM-DD"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
<SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fe" }}>
      <PhotoOptionsModal />
      <PermissionModal />
      <ErrorModal />
      
      <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24, marginTop: 10 }}>
        {/* Profile Header */}
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 16 }}>
            <View style={{ width: 96, height: 96, borderRadius: 48, overflow: "hidden", backgroundColor: "#e5e7eb", borderWidth: 2, borderColor: "#6366f1" }}>
              {user.profilePicture ? (
                <Image source={{ uri: user.profilePicture }} style={{ width: "100%", height: "100%" }} />
              ) : (
                <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "#e5e7eb" }}>
                  <MaterialCommunityIcons name="account" size={48} color="#9ca3af" />
                </View>
              )}
            </View>

            <TouchableOpacity 
              onPress={() => setShowPhotoModal(true)}
              style={{
                backgroundColor: "#6366f1",
                padding: 8,
                borderRadius: 20,
                marginLeft: -30,
                marginBottom: 8
              }}
            >
              <MaterialCommunityIcons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1f2937", textAlign: "center" }}>
            {user.name}
          </Text>
        </View>

        {/* Options List */}
        <View style={{ gap: 10 }}>
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              backgroundColor: "#f3f4f6",
              borderRadius: 10
            }}
          >
            <MaterialCommunityIcons name="account-edit" size={24} color="#6366f1" style={{ marginRight: 12 }} />
            <Text style={{ color: "#1f2937", fontWeight: "500" }}>Éditer le profil</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9ca3af" style={{ marginLeft: "auto" }} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/home/ChangePassword")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              backgroundColor: "#f3f4f6",
              borderRadius: 10
            }}
          >
            <MaterialCommunityIcons name="lock" size={24} color="#6366f1" style={{ marginRight: 12 }} />
            <Text style={{ color: "#1f2937", fontWeight: "500" }}>Changer le mot de passe</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9ca3af" style={{ marginLeft: "auto" }} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/home/Information")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              backgroundColor: "#f3f4f6",
              borderRadius: 10
            }}
          >
            <MaterialCommunityIcons name="information" size={24} color="#6366f1" style={{ marginRight: 12 }} />
            <Text style={{ color: "#1f2937", fontWeight: "500" }}>Informations</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9ca3af" style={{ marginLeft: "auto" }} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleLogOut()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              backgroundColor: "#f3f4f6",
              borderRadius: 10
            }}
          >
            <MaterialCommunityIcons name="logout" size={24} color="#6366f1" style={{ marginRight: 12 }} />
            <Text style={{ color: "#1f2937", fontWeight: "500" }}>Se déconnecter</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9ca3af" style={{ marginLeft: "auto" }} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;