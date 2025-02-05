import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

type LogoProps = {
  children?: React.ReactNode;
	logoSize? : number;
	containerStyle?: string 
};

const Logo: React.FC<LogoProps> = ({ children,logoSize,containerStyle } : LogoProps) => {
  return (
    <View className={`flex-row gap-2 justify-center ${containerStyle}`}>
      <MaterialCommunityIcons
        name="wallet-plus-outline"
        size={logoSize || 28}
				color={'#41337a'}
      />
      <Text className="text-2xl font-bold text-brand-600 mr-2">Crypta</Text>
      {children}
    </View>
  );
};

export default Logo;