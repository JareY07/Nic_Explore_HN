import {
  ScrollView,
  Text,
  View,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/useAppStore';
import { UserIcon, ArrowLeftIcon } from '@/components/icons/icons';
import { useAuthStore } from '@/features/auth/store/useAuth';
import { api } from '@/services/api/baseApi';
import MyButton from '@/components/ui/myButton/MyButton';
import { useRouter } from 'expo-router';
import { APP_STRINGS } from '@/constants/shared';

export default function EditProfileScreen() {
  const { theme } = useAppStore();
  const { user } = useAuthStore();

  const router = useRouter();
  const isDarkMode = theme === 'dark';

  // Estados para los campos editables
  const [name, setName] = useState(`${user?.firstName || ''} ${user?.lastName || ''}`.trim());
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.description || '');

  const handleSave = async () => {
    try {
      if (!user?.id) {
        console.log('Faltan datos requeridos', user?.id, user?.description);
        return;
      }

      const completeUserData = {
        description: bio,
      };

      // Si tu endpoint espera el ID en la URL así:
      const response = await api.put(`addDescription/${user.id}`, completeUserData);

      console.log('Actualización exitosa:', response.data);
      user.description = bio;
      router.back();
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-neutral-900' : 'bg-white'}`}>
      {/* Header */}
      <View
        className={`flex-row items-center justify-between px-6 py-4 border-b ${
          isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
        }`}>
        <Pressable onPress={() => router.back()} className="p-2">
          <ArrowLeftIcon size={24} color={isDarkMode ? '#fff' : '#000'} />
        </Pressable>

        <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
          {APP_STRINGS.PROFILE.EDIT}
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}>
          {/* Sección de Foto de Perfil simplificada */}
          <View className="items-center px-6 pt-6 pb-4">
            <View
              className={`w-24 h-24 rounded-full items-center justify-center ${
                isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'
              }`}>
              <UserIcon size={40} color={isDarkMode ? '#d4d4d4' : '#525252'} />
            </View>
          </View>

          {/* Formulario de Edición - Más compacto */}
          <View className="px-6">
            {/* Name */}
            <View className="mb-4">
              <Text
                className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                }`}>
                {APP_STRINGS.PROFILE.NAME}
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                className={`px-3 py-2 rounded-xl text-base ${
                  isDarkMode ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-800'
                }`}
                placeholder={APP_STRINGS.PROFILE.NAME_PLACEHOLDER || 'Ingrese su nombre'}
                placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
                returnKeyType="next"
              />
            </View>

            {/* Username */}
            <View className="mb-4">
              <Text
                className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                }`}>
                {APP_STRINGS.PROFILE.USERNAME}
              </Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                className={`px-3 py-2 rounded-xl text-base ${
                  isDarkMode ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-800'
                }`}
                placeholder={APP_STRINGS.PROFILE.USERNAME_PLACEHOLDER || 'Tu usuario'}
                placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>

            {/* Bio */}
            <View className="mb-4">
              <Text
                className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                }`}>
                {APP_STRINGS.PROFILE.BIO}
              </Text>
              <TextInput
                value={bio}
                onChangeText={setBio}
                className={`px-3 py-2 rounded-xl text-base ${
                  isDarkMode ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-800'
                }`}
                placeholder={APP_STRINGS.PROFILE.BIO_PLACEHOLDER || ''}
                placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                returnKeyType="done"
              />
            </View>

            <MyButton onPress={handleSave} size="sm" title={APP_STRINGS.COMMON.SAVE} />
            <Text className="text-black">{user?.description}</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
