import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export function Checkbox({ checked = false, title, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} className='flex-row mb-2 items-center' {...rest}>
      {checked ? (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className='h-8 w-8 bg-green-500 rounded-lg items-center justify-center'
        >
          <Feather name='check' size={20} color='white' />
        </Animated.View>
      ) : (
        <View className='h-8 w-8 bg-zinc-900 rounded-lg'></View>
      )}
      <Text className='text-white text-base font-semibold ml-3'>{title}</Text>
    </TouchableOpacity>
  );
}
