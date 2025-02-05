import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Mock data - Replace with actual user photos later
const mockPhotos = [
  {
    id: 1,
    uri: 'https://picsum.photos/400',
    date: '2025-01-15',
  },
  {
    id: 2,
    uri: 'https://picsum.photos/401',
    date: '2025-01-10',
  },
  {
    id: 3,
    uri: 'https://picsum.photos/402',
    date: '2025-01-05',
  },
  // Add more mock photos as needed
];

const PhotoGallery = () => {
  const windowWidth = Dimensions.get('window').width;
  const imageSize = (windowWidth - 48) / 3; // 3 images per row with 16px padding and 8px gap

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-primary">
      <View className="px-4 py-6">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={goBack} className="mr-4">
            <MaterialCommunityIcons name="arrow-left" size={24} color="#6366f1" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-text-primary">Photos de profil</Text>
        </View>

        {/* Current Profile Picture */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-text-primary mb-3">
            Photo actuelle
          </Text>
          <View className="w-24 h-24 rounded-full overflow-hidden bg-surface-secondary border-2 border-brand-500">
            <Image
              source={{ uri: mockPhotos[0].uri }}
              className="w-full h-full"
            />
          </View>
        </View>

        {/* Photo Grid */}
        <View>
          <Text className="text-lg font-semibold text-text-primary mb-3">
            Historique des photos
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap gap-2">
              {mockPhotos.map((photo) => (
                <TouchableOpacity
                  key={photo.id}
                  className="relative"
                  style={{ width: imageSize, height: imageSize }}
                >
                  <Image
                    source={{ uri: photo.uri }}
                    className="w-full h-full rounded-lg"
                  />
                  <View className="absolute bottom-2 right-2 flex-row items-center">
                    <TouchableOpacity
                      className="bg-surface-primary/80 p-1.5 rounded-full mr-2"
                      onPress={() => {
                        // TODO: Implement set as profile picture
                      }}
                    >
                      <MaterialCommunityIcons name="account-check" size={20} color="#6366f1" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-surface-primary/80 p-1.5 rounded-full"
                      onPress={() => {
                        // TODO: Implement delete photo
                      }}
                    >
                      <MaterialCommunityIcons name="delete" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PhotoGallery;
