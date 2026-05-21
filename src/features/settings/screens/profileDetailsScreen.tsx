import { Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { UserIcon, EditIcon, TrashIcon } from '@/components/icons/icons';
import { APP_STRINGS } from '@/constants/shared';
import NavBar from '@/components/shared/navBar';
import { useAuthStore } from '@/features/auth/store/useAuth';
import { useRouter } from 'expo-router';
import { api } from '@/services/api/baseApi';
import HomeLayout from '@/components/shared/layouts/homeLayout';

export default function ProfileDetailsScreen() {
  const { theme } = useAppStore();
  const isDarkMode = theme === 'dark';
  const { user, logOut } = useAuthStore();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(APP_STRINGS.PROFILE.STATS.POSTS);

  const stats = [
    { label: APP_STRINGS.PROFILE.STATS.POSTS, value: '0' },
    { label: APP_STRINGS.PROFILE.STATS.PHOTOS, value: '0' },
    { label: APP_STRINGS.PROFILE.STATS.VIDEOS, value: '0' },
  ];

  const handleEditProfile = () => {
    router.push('/settings/editProfile');
  };

  const handleDeleteAccount = async () => {
    try {
      if (!user?.id) return;
      logOut();
      await api.delete(`delete/${user.id}`);
    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
    }
  };

  return (
    <HomeLayout>
      <View className="items-center px-6 pt-8 pb-4">
        <View
          className={`w-28 h-28 rounded-full items-center justify-center mb-4 ${
            isDarkMode ? 'bg-neutral-700' : 'bg-neutral-100'
          }`}>
          <UserIcon size={48} color={isDarkMode ? '#d4d4d4' : '#525252'} />
        </View>

        <Text
          className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
          {user?.firstName} {user?.lastName}
        </Text>

        <Text className={`text-base mb-4 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          {user?.userMail}
        </Text>

        <Pressable
          onPress={handleEditProfile}
          className={`flex-row items-center px-6 py-3 rounded-full mb-6 ${
            isDarkMode ? 'bg-primary-600' : 'bg-primary-500'
          }`}>
          <EditIcon size={18} color="#ffffff" />
          <Text className="text-white font-semibold ml-2">{APP_STRINGS.PROFILE.EDIT}</Text>
        </Pressable>

        <View className="flex-row justify-around w-full max-w-xs bg-transparent">
          {stats.map((stat) => (
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

      <View
        className={`mx-6 mt-2 mb-4 p-5 rounded-2xl ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
        <Text
          className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
          {APP_STRINGS.PROFILE.ABOUT_TITLE}
        </Text>
        <Text className={`text-base leading-6 ${isDarkMode ? 'text-black' : 'text-neutral-700'}`}>
          {user?.description}
        </Text>
      </View>

      <View
        className={`mx-6 mb-8 ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'} rounded-2xl overflow-hidden`}>
        <NavBar
          items={[
            APP_STRINGS.PROFILE.STATS.POSTS,
            APP_STRINGS.PROFILE.STATS.PHOTOS,
            APP_STRINGS.PROFILE.STATS.VIDEOS,
          ]}
          activeItem={activeTab}
          onItemPress={setActiveTab}
        />
      </View>

      <View className="px-6">
        {activeTab === APP_STRINGS.PROFILE.STATS.POSTS && (
          <View
            className={`p-8 rounded-2xl items-center ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
            <Text
              className={`text-center text-lg ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              {APP_STRINGS.PROFILE.EMPTY_POSTS}
            </Text>
            <Text
              className={`text-center mt-2 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
              {APP_STRINGS.PROFILE.EMPTY_POSTS_DESC}
            </Text>
          </View>
        )}

        {activeTab === APP_STRINGS.PROFILE.STATS.PHOTOS && (
          <View
            className={`p-8 rounded-2xl items-center ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
            <Text
              className={`text-center text-lg ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              {APP_STRINGS.PROFILE.EMPTY_PHOTOS}
            </Text>
            <Text
              className={`text-center mt-2 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
              {APP_STRINGS.PROFILE.EMPTY_PHOTOS_DESC}
            </Text>
          </View>
        )}

        {activeTab === APP_STRINGS.PROFILE.STATS.VIDEOS && (
          <View
            className={`p-8 rounded-2xl items-center ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
            <Text
              className={`text-center text-lg ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              {APP_STRINGS.PROFILE.EMPTY_VIDEOS}
            </Text>
            <Text
              className={`text-center mt-2 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
              {APP_STRINGS.PROFILE.EMPTY_VIDEOS_DESC}
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
          {APP_STRINGS.PROFILE.DELETE_ACCOUNT}
        </Text>
      </Pressable>
    </HomeLayout>
  );
}
