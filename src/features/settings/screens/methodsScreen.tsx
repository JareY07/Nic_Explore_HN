import React from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import MyLayout from '@/components/shared/myLayout';
import { Heading, Caption } from '@/components/ui/typhography';
import { useThemeData } from '@/components/hooks/useTheme';
import { usePaymentMethods } from '../hooks/usePaymentMethods';
import MyButton from '@/components/ui/myButton/MyButton';
import { useRouter } from 'expo-router';
import { APP_STRINGS, ROUTES } from '@/constants/shared';
import { PlusIcon } from '@/components/icons/icons';
import { Feather } from '@expo/vector-icons';
import PaymentMethodItem from '../components/PaymentMethodItem';
import PaymentMethodsEmptyState from '../components/PaymentMethodsEmptyState';
import { useMyNavigation } from '@/components/hooks/useMyNavigation';

export default function MethodsScreen() {
  const { theme: appTheme, isDarkMode } = useThemeData();
  const { handleGoBack } = useMyNavigation();
  const router = useRouter();

  const {
    methods,
    handlers: { handleSetDefault, handleDelete },
  } = usePaymentMethods();

  const textColor = isDarkMode ? appTheme.colors.neutral.white : appTheme.colors.neutral[900];
  const subtextColor = isDarkMode ? appTheme.colors.neutral[400] : appTheme.colors.neutral[600];
  const accent = appTheme.brand.primary;

  const buttonBg = isDarkMode ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.92)';

  return (
    <MyLayout>
      <View className="flex-1 px-6 py-4">
        <Pressable
          onPress={handleGoBack}
          accessibilityLabel={APP_STRINGS.PRODUCT.ACCESSIBILITY.GO_BACK}
          className="mb-8"
          style={[styles.iconButton, { backgroundColor: buttonBg }]}>
          <Feather name="chevron-left" size={26} color={isDarkMode ? '#ffffff' : '#1f2937'} />
        </Pressable>

        {/* Header */}
        <View className="mb-6">
          <Heading className="mb-1" style={{ color: textColor }}>
            {APP_STRINGS.PAYMENT.METHODS.TITLE}
          </Heading>
          <Caption style={{ color: subtextColor }}>{APP_STRINGS.PAYMENT.METHODS.SUBTITLE}</Caption>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {methods.length === 0 ? (
            <PaymentMethodsEmptyState
              title={APP_STRINGS.PAYMENT.METHODS.EMPTY_TITLE}
              description={APP_STRINGS.PAYMENT.METHODS.EMPTY_DESC}
            />
          ) : (
            methods.map((method) => {
              return (
                <PaymentMethodItem
                  key={method.id}
                  method={method}
                  onSetDefault={handleSetDefault}
                  onDelete={handleDelete}
                />
              );
            })
          )}

          <View className="mb-4">
            <MyButton
              variant="outline"
              title={APP_STRINGS.PAYMENT.METHODS.ADD_NEW_CARD}
              size="md"
              onPress={() => router.push(ROUTES.ADD_PAYMENT_METHOD as any)}
              icon={<PlusIcon color={accent} size={18} />}
            />
          </View>
          <View className="h-4" />
        </ScrollView>
      </View>
    </MyLayout>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
});
