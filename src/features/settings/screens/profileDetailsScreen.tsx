import { ScrollView, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/app/store/useAppStore';
import { UserIcon, EditIcon, TrashIcon } from '@/components/icons/icons';
import NavBar from '@/components/shared/navBar';
import { useAuthStore } from '@/features/auth/store/useAuth';
import { useRouter } from 'expo-router';
import { api } from '@/services/api/baseApi';

export default function ProfileDetailsScreen() {
  const { theme } = useAppStore();
  const [activeTab, setActiveTab] = useState('Posts');
  const isDarkMode = theme === 'dark';
  const { user } = useAuthStore();
  const router = useRouter();
  const { logOut } = useAuthStore();

  // Datos de ejemplo para las estadísticas
  const stats = [
    { label: 'Posts', value: '12' },
    { label: 'Photos', value: '84' },
    { label: 'Videos', value: '15' },
  ];

  const handleEditProfile = () => {
    router.push('/settings/editProfile');
  };

  const handleDeleteAccount = async () => {
    try {
      if (!user?.id) {
        console.log('Faltan datos requeridos', user?.id, user?.description);
        return;
      }

      logOut();
      // Si tu endpoint espera el ID en la URL así:
      const response = await api.delete(`delete/${user.id}`);

      console.log('Actualización exitosa:', response.data);
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-neutral-900' : 'bg-white'}`}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        {/* Header con información del usuario */}
        <View className="items-center px-6 pt-8 pb-4">
          {/* Icono de usuario grande */}
          <View
            className={`w-28 h-28 rounded-full items-center justify-center mb-4 ${
              isDarkMode ? 'bg-neutral-700' : 'bg-neutral-100'
            }`}>
            <UserIcon size={48} color={isDarkMode ? '#d4d4d4' : '#525252'} />
          </View>

          {/* Nombre del usuario */}
          <Text
            className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
            {user?.firstName} {user?.lastName}
          </Text>

          {/* Email del usuario */}
          <Text
            className={`text-base mb-4 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            {user?.userMail}
          </Text>

          {/* Botón Edit Profile */}
          <Pressable
            onPress={handleEditProfile}
            className={`flex-row items-center px-6 py-3 rounded-full mb-6 ${
              isDarkMode ? 'bg-primary-600' : 'bg-primary-500'
            }`}>
            <EditIcon size={18} color="#ffffff" />
            <Text className="text-white font-semibold ml-2">Edit Profile</Text>
          </Pressable>

          {/* Estadísticas */}
          <View className="flex-row justify-around w-full max-w-xs bg-transparent">
            {stats.map((stat, index) => (
              <View key={stat.label} className="items-center">
                <Text
                  className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                  {stat.value}
                </Text>
                <Text
                  className={`text-sm font-medium ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Información adicional */}
        <View
          className={`mx-6 mt-2 mb-4 p-5 rounded-2xl ${
            isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'
          }`}>
          <Text
            className={`text-lg font-semibold mb-3 ${
              isDarkMode ? 'text-white' : 'text-neutral-800'
            }`}>
            Acerca de mí
          </Text>
          <Text className={`text-base leading-6 ${isDarkMode ? 'text-black' : 'text-neutral-700'}`}>
            {user?.description}
          </Text>
        </View>

        {/* NavBar para Posts/Photos/Videos */}
        <View
          className={`mx-6 mb-8 ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'} rounded-2xl overflow-hidden`}>
          <NavBar
            items={['Posts', 'Photos', 'Videos']}
            activeItem={activeTab}
            onItemPress={setActiveTab}
          />
        </View>

        {/* Contenido basado en la pestaña activa */}
        <View className="px-6">
          {activeTab === 'Posts' && (
            <View
              className={`p-8 rounded-2xl items-center ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'
              }`}>
              <Text
                className={`text-center text-lg ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                📝 Tus posts aparecerán aquí
              </Text>
              <Text
                className={`text-center mt-2 ${
                  isDarkMode ? 'text-neutral-500' : 'text-neutral-500'
                }`}>
                Comparte tus experiencias y aventuras con la comunidad
              </Text>
            </View>
          )}

          {activeTab === 'Photos' && (
            <View
              className={`p-8 rounded-2xl items-center ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'
              }`}>
              <Text
                className={`text-center text-lg ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                📸 Tus fotos aparecerán aquí
              </Text>
              <Text
                className={`text-center mt-2 ${
                  isDarkMode ? 'text-neutral-500' : 'text-neutral-500'
                }`}>
                Todas tus capturas memorables en un solo lugar
              </Text>
            </View>
          )}

          {activeTab === 'Videos' && (
            <View
              className={`p-8 rounded-2xl items-center ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'
              }`}>
              <Text
                className={`text-center text-lg ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                🎥 Tus videos aparecerán aquí
              </Text>
              <Text
                className={`text-center mt-2 ${
                  isDarkMode ? 'text-neutral-500' : 'text-neutral-500'
                }`}>
                Revive tus mejores momentos en video
              </Text>
            </View>
          )}
        </View>

        <Pressable
          onPressIn={handleDeleteAccount}
          className={`flex-row items-center justify-center px-6 py-4 rounded-2xl ${
            isDarkMode ? 'bg-red-900/30' : 'bg-red-50'
          } border-2 ${isDarkMode ? 'border-red-800' : 'border-red-200'}`}>
          <TrashIcon size={20} color={isDarkMode ? '#fca5a5' : '#dc2626'} />
          <Text className={`ml-2 font-semibold ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
            Delete Account
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
