import React from 'react';
import { Animated, View, Pressable } from 'react-native';
import { Body, Caption, Subheading } from '@/components/ui/typhography';
import { useThemeData } from '@/components/hooks/useTheme';
import { APP_STRINGS } from '@/constants/shared';

type CardType = 'visa' | 'mastercard' | 'amex' | 'unknown';

type PaymentCardPreviewProps = {
  cardNumber: string;
  holder: string;
  expiry: string;
  cvv: string;
  cardType: CardType;
  flipped: boolean;
  onToggleFlip: () => void;
};

const BRAND_LABELS: Record<CardType, string> = {
  visa: 'VISA',
  mastercard: 'Mastercard',
  amex: 'Amex',
  unknown: '····',
};

const BRAND_COLORS: Record<CardType, string> = {
  visa: '#1A1F71',
  mastercard: '#EB001B',
  amex: '#007BC1',
  unknown: '#6B7280',
};

export default function PaymentCardPreview({
  cardNumber,
  holder,
  expiry,
  cvv,
  cardType,
  flipped,
  onToggleFlip,
}: PaymentCardPreviewProps) {
  const { theme: appTheme } = useThemeData();
  const cardColor = BRAND_COLORS[cardType] ?? appTheme.brand.primary;
  const flipProgress = React.useRef(new Animated.Value(flipped ? 1 : 0)).current;
  const pressProgress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(flipProgress, {
      toValue: flipped ? 1 : 0,
      useNativeDriver: true,
      speed: 14,
      bounciness: 0,
    }).start();
  }, [flipProgress, flipped]);

  const handlePressIn = () => {
    Animated.spring(pressProgress, {
      toValue: 1,
      useNativeDriver: true,
      speed: 22,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressProgress, {
      toValue: 0,
      useNativeDriver: true,
      speed: 22,
      bounciness: 0,
    }).start();
  };

  const cardAnimatedStyle = {
    transform: [
      {
        scale: pressProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.985],
        }),
      },
      {
        translateY: pressProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 2],
        }),
      },
    ],
  };

  const frontStyle = {
    opacity: flipProgress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.25, 0],
    }),
    transform: [
      {
        rotateY: flipProgress.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
      {
        scale: flipProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.98],
        }),
      },
    ],
  };

  const backStyle = {
    opacity: flipProgress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.3, 1],
    }),
    transform: [
      {
        rotateY: flipProgress.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '360deg'],
        }),
      },
      {
        scale: flipProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1],
        }),
      },
    ],
  };

  return (
    <Pressable
      onPress={onToggleFlip}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="mb-6">
      <Animated.View
        className="rounded-[28px] p-6 overflow-hidden"
        style={[
          cardAnimatedStyle,
          {
            backgroundColor: cardColor,
            minHeight: 192,
            shadowColor: cardColor,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.18,
            shadowRadius: 24,
            elevation: 3,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.12)',
          },
        ]}>
        <View
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(255,255,255,0.04)',
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: -36,
            right: -24,
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: 'rgba(255,255,255,0.08)',
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: -50,
            left: -28,
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: 'rgba(255,255,255,0.05)',
          }}
        />
        <Animated.View
          style={[
            frontStyle,
            {
              position: 'absolute',
              inset: 24,
              backfaceVisibility: 'hidden',
            },
          ]}>
          {!flipped ? (
            <>
              <View className="flex-row items-center justify-between mb-8">
                <Subheading style={{ color: '#fff', letterSpacing: 2, opacity: 0.92 }}>
                  {BRAND_LABELS[cardType]}
                </Subheading>
                <Caption style={{ color: 'rgba(255,255,255,0.68)', fontSize: 11 }}>
                  {APP_STRINGS.PAYMENT.ADD_METHOD.TAP_FLIP}
                </Caption>
              </View>
              <Body style={{ color: '#fff', letterSpacing: 5, fontSize: 17, marginBottom: 16 }}>
                {cardNumber.length > 0
                  ? cardNumber.padEnd(19, ' ').replace(/(.{5})/g, '$1')
                  : '•••• •••• •••• ••••'}
              </Body>
              <View className="flex-row items-end justify-between">
                <View>
                  <Caption
                    style={{ color: 'rgba(255,255,255,0.68)', fontSize: 10, marginBottom: 2 }}>
                    {APP_STRINGS.PAYMENT.ADD_METHOD.CARD_HOLDER}
                  </Caption>
                  <Body style={{ color: '#fff', fontSize: 13 }}>
                    {holder || APP_STRINGS.PAYMENT.ADD_METHOD.YOUR_NAME}
                  </Body>
                </View>
                <View>
                  <Caption
                    style={{ color: 'rgba(255,255,255,0.68)', fontSize: 10, marginBottom: 2 }}>
                    {APP_STRINGS.PAYMENT.ADD_METHOD.VALID_THRU}
                  </Caption>
                  <Body style={{ color: '#fff', fontSize: 13 }}>
                    {expiry || APP_STRINGS.PAYMENT.ADD_METHOD.EXPIRY_HINT}
                  </Body>
                </View>
              </View>
            </>
          ) : null}
        </Animated.View>
        <Animated.View
          style={[
            backStyle,
            {
              position: 'absolute',
              inset: 24,
              backfaceVisibility: 'hidden',
            },
          ]}>
          {flipped ? (
            <>
              <View
                style={{
                  height: 42,
                  backgroundColor: 'rgba(0,0,0,0.26)',
                  marginHorizontal: -24,
                  marginTop: 8,
                  marginBottom: 20,
                  borderRadius: 14,
                }}
              />
              <View className="items-end">
                <View
                  className="px-4 py-2 rounded-2xl items-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.16)', width: 200 }}>
                  <Caption style={{ color: 'rgba(255,255,255,0.68)', fontSize: 10 }}>
                    {APP_STRINGS.PAYMENT.ADD_METHOD.CVV_LABEL}
                  </Caption>
                  <Body style={{ color: '#fff', letterSpacing: 4 }}>
                    {cvv ? '•'.repeat(cvv.length) : '•••'}
                  </Body>
                </View>
              </View>
              <View className="flex-1 items-end justify-end">
                <Subheading style={{ color: '#fff', letterSpacing: 2 }}>
                  {BRAND_LABELS[cardType]}
                </Subheading>
              </View>
            </>
          ) : null}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}
