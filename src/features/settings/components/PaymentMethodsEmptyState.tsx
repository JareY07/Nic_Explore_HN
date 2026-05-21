import React from 'react';
import { View } from 'react-native';
import { Body, Caption } from '@/components/ui/typhography';
import { useThemeData } from '@/components/hooks/useTheme';

type PaymentMethodsEmptyStateProps = {
  title: string;
  description: string;
};

export default function PaymentMethodsEmptyState({
  title,
  description,
}: PaymentMethodsEmptyStateProps) {
  const { theme: appTheme, isDarkMode } = useThemeData();
  const textColor = isDarkMode ? appTheme.colors.neutral.white : appTheme.colors.neutral[900];
  const subtextColor = isDarkMode ? appTheme.colors.neutral[400] : appTheme.colors.neutral[600];
  const emptyBg = isDarkMode ? appTheme.colors.neutral[800] : appTheme.colors.neutral[100];

  return (
    <View className="items-center justify-center py-20">
      <View
        className="w-20 h-20 rounded-full items-center justify-center mb-4"
        style={{ backgroundColor: emptyBg }}>
        <Body style={{ fontSize: 36 }}>💳</Body>
      </View>
      <Body className="font-semibold mb-1" style={{ color: textColor }}>
        {title}
      </Body>
      <Caption className="text-center" style={{ color: subtextColor }}>
        {description}
      </Caption>
    </View>
  );
}
