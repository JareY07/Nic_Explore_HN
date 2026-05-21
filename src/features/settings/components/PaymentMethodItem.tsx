import React from 'react';
import { View, Pressable } from 'react-native';
import { Body, Caption, Subheading } from '@/components/ui/typhography';
import { APP_STRINGS } from '@/constants/shared';
import { CheckIcon, TrashIcon } from '@/components/icons/icons';
import { useThemeData } from '@/components/hooks/useTheme';

type PaymentMethod = {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'unknown';
  last4: string;
  holder: string;
  expiry: string;
  isDefault: boolean;
};

type PaymentMethodItemProps = {
  method: PaymentMethod;
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
};

const CARD_BRAND_COLORS: Record<PaymentMethod['type'], string> = {
  visa: '#1A1F71',
  mastercard: '#EB001B',
  amex: '#007BC1',
  unknown: '#6B7280',
};

const CARD_BRAND_LABELS: Record<PaymentMethod['type'], string> = {
  visa: 'VISA',
  mastercard: 'Mastercard',
  amex: 'Amex',
  unknown: 'Card',
};

export default function PaymentMethodItem({
  method,
  onSetDefault,
  onDelete,
}: PaymentMethodItemProps) {
  const { theme: appTheme, isDarkMode } = useThemeData();
  const cardBg = isDarkMode ? appTheme.colors.neutral[800] : appTheme.colors.neutral.white;
  const borderColor = isDarkMode ? appTheme.colors.neutral[700] : appTheme.colors.neutral[200];
  const accent = appTheme.brand.primary;
  const primaryColor = CARD_BRAND_COLORS[method.type];

  return (
    <View
      className="rounded-2xl border mb-4 overflow-hidden"
      style={{ borderColor, backgroundColor: cardBg }}>
      <View className="px-5 py-4" style={{ backgroundColor: primaryColor }}>
        <View className="flex-row items-center justify-between mb-6">
          <Subheading style={{ color: '#fff', letterSpacing: 1 }}>
            {CARD_BRAND_LABELS[method.type]}
          </Subheading>
          {method.isDefault && (
            <View
              className="px-2 py-1 rounded-full flex-row items-center gap-1"
              style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
              <CheckIcon color="#fff" size={12} />
              <Caption style={{ color: '#fff', fontSize: 11 }}>
                {APP_STRINGS.PAYMENT.METHODS.DEFAULT_BADGE}
              </Caption>
            </View>
          )}
        </View>
        <Body style={{ color: '#fff', letterSpacing: 4, fontSize: 15 }}>
          •••• •••• •••• {method.last4}
        </Body>
        <View className="flex-row items-center justify-between mt-3">
          <Caption style={{ color: 'rgba(255,255,255,0.8)' }}>{method.holder}</Caption>
          <Caption style={{ color: 'rgba(255,255,255,0.8)' }}>{method.expiry}</Caption>
        </View>
      </View>

      <View
        className="flex-row items-center justify-between px-5 py-3"
        style={{ borderTopWidth: 1, borderTopColor: borderColor }}>
        {!method.isDefault ? (
          <Pressable onPress={() => onSetDefault(method.id)}>
            <Body style={{ color: accent, fontSize: 13, fontWeight: '600' }}>
              {APP_STRINGS.PAYMENT.METHODS.SET_DEFAULT}
            </Body>
          </Pressable>
        ) : (
          <View />
        )}
        <Pressable onPress={() => onDelete(method.id)} className="flex-row items-center gap-1">
          <TrashIcon color={appTheme.colors.status.error} size={16} />
          <Caption style={{ color: appTheme.colors.status.error }}>
            {APP_STRINGS.PAYMENT.METHODS.REMOVE}
          </Caption>
        </Pressable>
      </View>
    </View>
  );
}
