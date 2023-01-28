import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { BackButton } from "../components/Backbutton";
import { Checkbox } from "../components/Checkbox";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

export function New() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDays(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) => prevState.filter((weekDay) => weekDay !== weekDayIndex));
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewHabbit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert("Novo hábito", "Informe o nome do hábito e escolha a periodicidade.");
      }
      await api.post("/habits", {
        title,
        weekDays,
      });

      setTitle("");
      setWeekDays([]);

      Alert.alert("Novo hábito", "Hábito criado com sucesso.");
    } catch (error) {
      console.error(error);
      Alert.alert("Ops", "Não foi possível criar um novo hábito.");
    }
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className='mt-6 text-white font-extrabold text-3xl'>Criar hábito</Text>

        <Text className='mt-6 text-white font-extrabold text-base'>Qual seu comprometimento?</Text>

        <TextInput
          className='mt-3 h-12 pl-4 rounded-lg bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600'
          placeholder='Exercícios, dormir bem, etc...'
          placeholderTextColor={colors.zinc[400]}
          value={title}
          onChangeText={setTitle}
        />
        <Text className='font-semibold mt-4 mb-3 text-white text-base'>Qual a recorrência?</Text>
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            onPress={() => handleToggleWeekDays(index)}
            checked={weekDays.includes(index)}
          />
        ))}
        <TouchableOpacity
          activeOpacity={0.7}
          className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6'
          onPress={handleCreateNewHabbit}
        >
          <Feather name='check' size={20} color={colors.white} />
          <Text className='font-semibold text-base text-white ml-2'>Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
