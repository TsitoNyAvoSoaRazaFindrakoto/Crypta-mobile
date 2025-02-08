import { icon } from "../../assets/images/";
import React from "react";
import { View, Text, Image } from "react-native";

type LogoProps = {
  children?: React.ReactNode;
  logoSize?: number;
  containerStyle?: string;
};

const Logo: React.FC<LogoProps> = ({
  children,
  logoSize,
  containerStyle,
}: LogoProps) => {
  return (
    <View className={`flex-row gap-2 justify-center ${containerStyle}`}>
      <View className="size-8">
        <Image source={icon} width={32} height={32} />
      </View>
      <Text className="text-2xl font-bold text-brand-600 mr-2">Crypta</Text>
      {children}
    </View>
  );
};

export default Logo;
