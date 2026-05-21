import React from 'react';
import {
  View,
  Pressable,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MyLayout from '@/components/shared/myLayout';
import { Heading, Caption } from '@/components/ui/typhography';
import { useThemeData } from '@/components/hooks/useTheme';
import MyButton from '@/components/ui/myButton/MyButton';
import { Feather } from '@expo/vector-icons';
import { APP_STRINGS } from '@/constants/shared';
import PaymentCardPreview from '../components/PaymentCardPreview';
import PaymentMethodField from '../components/PaymentMethodField';
import { useNoHeader } from '@/components/hooks/useMyNavigation';
import { useAddPaymentMethod } from '../hooks/useAddPaymentMethod';
import { getPaymentFieldsConfig } from '../utils/paymentFormConfig';
import { useFocusEffect } from '@react-navigation/native';

export default function AddMethodsScreen() {
  const { theme: appTheme, isDarkMode } = useThemeData();
  useNoHeader();

  const {
    state: { cardNumber, holder, expiry, cvv, flipped, cardType, isValid, hasAnyTouchErrors },
    errors: { cardNumberError, holderError, expiryError, cvvError },
    actions: {
      handleSaveCard,
      handleGoBack,
      resetForm,
      setFlipped,
      handleBlurField,
      setCardNumber,
      setHolder,
      setExpiry,
      setCvv,
    },
  } = useAddPaymentMethod();

  const textColor = isDarkMode ? appTheme.colors.neutral.white : appTheme.colors.neutral[900];
  const subtextColor = isDarkMode ? appTheme.colors.neutral[400] : appTheme.colors.neutral[600];

  const fields = getPaymentFieldsConfig(
    { cardNumber, holder, expiry, cvv },
    { cardNumberError, holderError, expiryError, cvvError },
    { setCardNumber, setHolder, setExpiry, setCvv, handleBlurField, setFlipped },
  );

  const buttonBg = isDarkMode ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.92)';

  useFocusEffect(
    React.useCallback(() => {
      resetForm();
    }, [resetForm]),
  );

  return (
    <MyLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.heroGlowTop} pointerEvents="none" />
            <View style={styles.heroGlowBottom} pointerEvents="none" />

            <Pressable
              onPress={handleGoBack}
              accessibilityLabel={APP_STRINGS.PRODUCT.ACCESSIBILITY.GO_BACK}
              style={[
                styles.backButton,
                {
                  backgroundColor: buttonBg,
                  shadowOpacity: isDarkMode ? 0.08 : 0.05,
                },
              ]}>
              <Feather name="chevron-left" size={26} color={isDarkMode ? '#ffffff' : '#1f2937'} />
            </Pressable>

            <View className="mb-6">
              <Heading className="mb-1" style={{ color: textColor }}>
                {APP_STRINGS.PAYMENT.ADD_METHOD.TITLE}
              </Heading>
              <Caption style={{ color: subtextColor }}>
                {APP_STRINGS.PAYMENT.ADD_METHOD.SUBTITLE}
              </Caption>
            </View>

            <PaymentCardPreview
              cardNumber={cardNumber}
              holder={holder}
              expiry={expiry}
              cvv={cvv}
              cardType={cardType}
              flipped={flipped}
              onToggleFlip={() => setFlipped((f) => !f)}
            />

            {fields.map((field) => (
              <PaymentMethodField key={field.label} {...field} />
            ))}

            <View className="mt-2 mb-6">
              {hasAnyTouchErrors && !isValid && (
                <Caption
                  className="mb-3 text-center"
                  style={{ color: appTheme.colors.status.error, fontWeight: '200' }}>
                  {APP_STRINGS.PAYMENT.ADD_METHOD.ERRORS.FORM_INCOMPLETE}
                </Caption>
              )}
              <MyButton
                onPress={handleSaveCard}
                variant="primary"
                title={APP_STRINGS.PAYMENT.ADD_METHOD.ADD_CARD_BTN}
                size="lg"
                disabled={!isValid}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </MyLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 40,
    position: 'relative',
  },
  heroGlowTop: {
    position: 'absolute',
    top: -70,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(54,115,86,0.08)',
  },
  heroGlowBottom: {
    position: 'absolute',
    bottom: 50,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 32,
  },
});
