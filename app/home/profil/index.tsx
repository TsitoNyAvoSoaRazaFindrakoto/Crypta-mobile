import { View, Text, TouchableOpacity, Image, Platform, TextInput, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { deleteItemAsync, getItemAsync } from 'expo-secure-store';
import Utilisateur from '@/types/Utilisateur';

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState('');

  const loadUser = async () => {
		await Utilisateur.updateLocalConfig();
    const userString = await getItemAsync('user');
    if (userString) {
      const storedUser = JSON.parse(userString);
      // Only preserve allowed fields: id, name, email, region, birthDate, bonus, profilePicture
      const allowedUser = {
        id: storedUser.id,
        pseudo: storedUser.pseudo,
        email: storedUser.email,
        // profilePicture: storedUser.profilePicture
      };
      setUser(allowedUser);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

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

	const handleLogOut = async () => {
		await deleteItemAsync('user');
		router.push('/auth/sign-in');
	}

  if (isLoading || !user) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-surface-primary">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f8f9fe]">
      <PhotoOptionsModal />
      <PermissionModal />
      <ErrorModal />

      <View className="flex-1 px-4 py-6 mt-3">
        {/* Profile Header */}
        <View className="items-center mb-6">
          <View className="flex-row items-end mb-4">
            <View className="w-24 h-24 rounded-full overflow-hidden bg-[#e5e7eb] border-2 border-[#6366f1]">
              {user.profilePicture ? (
                <Image source={{ uri: user.profilePicture }} className="w-full h-full" />
              ) : (
                <View className="w-full h-full flex justify-center items-center bg-[#e5e7eb]">
                  <MaterialCommunityIcons name="account" size={48} color="#9ca3af" />
                </View>
              )}
            </View>
            <TouchableOpacity 
              onPress={() => setShowPhotoModal(true)}
              className="bg-[#6366f1] p-2 rounded-full -ml-8 mb-2"
            >
              <MaterialCommunityIcons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="text-xl font-bold text-[#1f2937] text-center">
            {user.pseudo}
          </Text>
        </View>

        {/* New: Display user's personal info */}
        <View className="mb-6 bg-white p-4 rounded-xl shadow">
          <Text className="text-lg font-bold text-[#1f2937] mb-2">Informations personnelles</Text>
          <Text className="text-base text-[#4b5563]">Email: {user.email}</Text>
        </View>

        {/* Options List */}
        <View className="space-y-3">
          <TouchableOpacity
            onPress={() => router.push("/home/profil/Information")}
            className="flex-row items-center p-4 bg-[#f3f4f6] rounded-xl"
          >
            <MaterialCommunityIcons name="information" size={24} color="#6366f1" className="mr-3" />
            <Text className="text-[#1f2937] font-medium">Informations sur l'app</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9ca3af" className="ml-auto" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogOut}
            className="flex-row items-center p-4 bg-[#f3f4f6] rounded-xl"
          >
            <MaterialCommunityIcons name="logout" size={24} color="#6366f1" className="mr-3" />
            <Text className="text-[#1f2937] font-medium">Se déconnecter</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9ca3af" className="ml-auto" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;