import {
  View,
  Text,
  TextInputProps,
  TextInput,
  TouchableOpacity,
	Image,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FormFieldProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: string;
  props?: TextInputProps;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyles,
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-21 ${otherStyles}`}>
      <Text className="text-xl font-thin ml-2">{title}</Text>
      <View className="border-[0.5px] w-full h-12 px-4 mt-2 border-accent-800 focus:border-accent-500 rounded-md items-center flex-row">
        <TextInput
          className="flex-1 font-semibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#a1a1a1"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Mot De Passe" && !showPassword}
        />

        {title === "Mot De Passe" && (
          <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
						<MaterialCommunityIcons
              name={!showPassword ? "eye-off" : "eye"}
              size={26}
              className="text-brand-500"
            />
					</TouchableOpacity>
        )}

      </View>
    </View>
  );
};

export default FormField;