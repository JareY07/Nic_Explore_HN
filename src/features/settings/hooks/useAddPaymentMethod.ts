import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { usePaymentStore } from '../store/usePaymentStore';
import { APP_STRINGS } from '@/constants/shared';
import { useMyNavigation } from '@/components/hooks/useMyNavigation';

type CardType = 'visa' | 'mastercard' | 'amex' | 'unknown';

export function detectCardType(number: string): CardType {
  const clean = number.replace(/\s/g, '');
  if (/^4/.test(clean)) return 'visa';
  if (/^5[1-5]/.test(clean)) return 'mastercard';
  if (/^3[47]/.test(clean)) return 'amex';
  return 'unknown';
}

export function formatCardNumber(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 16);
  return clean.replace(/(.{4})/g, '$1 ').trim();
}

export function formatExpiry(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 4);
  if (clean.length >= 3) return `${clean.slice(0, 2)}/${clean.slice(2)}`;
  return clean;
}

export function isValidExpiry(dateStr: string): boolean {
  if (dateStr.length !== 5) return false;
  const [month, year] = dateStr.split('/');
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);

  if (m < 1 || m > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (y < currentYear) return false;
  if (y === currentYear && m < currentMonth) return false;

  return true;
}

export function useAddPaymentMethod() {
  const { handleGoBack } = useMyNavigation();
  const addMethod = usePaymentStore((state) => state.addMethod);

  const [cardNumber, setCardNumber] = useState('');
  const [holder, setHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [flipped, setFlipped] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const resetForm = useCallback(() => {
    setCardNumber('');
    setHolder('');
    setExpiry('');
    setCvv('');
    setFlipped(false);
    setTouched({});
  }, []);

  const handleBlurField = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const cardType = detectCardType(cardNumber);

  const isCardNumberValid = cardNumber.replace(/\s/g, '').length === 16;
  const isHolderValid = holder.trim().length > 2;
  const isExpiryValid = isValidExpiry(expiry);
  const isCvvValid = cvv.length >= 3;

  const getFieldError = (
    field: string,
    valid: boolean,
    val: string,
    emptyMessage: string,
    invalidMessage: string,
  ) => {
    if (!touched[field]) return undefined;
    if (!val) return emptyMessage;
    if (!valid) return invalidMessage;
    return undefined;
  };

  const ERRORS = APP_STRINGS.PAYMENT.ADD_METHOD.ERRORS;

  const cardNumberError = getFieldError(
    'cardNumber',
    isCardNumberValid,
    cardNumber,
    ERRORS.CARD_NUMBER_REQ,
    ERRORS.CARD_NUMBER_INVALID,
  );
  const holderError = getFieldError(
    'holder',
    isHolderValid,
    holder,
    ERRORS.HOLDER_REQ,
    ERRORS.HOLDER_INVALID,
  );
  const expiryError = getFieldError(
    'expiry',
    isExpiryValid,
    expiry,
    ERRORS.EXPIRY_REQ,
    ERRORS.EXPIRY_INVALID,
  );
  const cvvError = getFieldError('cvv', isCvvValid, cvv, ERRORS.CVV_REQ, ERRORS.CVV_INVALID);

  const isValid = isCardNumberValid && isHolderValid && isExpiryValid && isCvvValid;

  const hasAnyTouchErrors =
    Object.values(touched).some(Boolean) &&
    (!isCardNumberValid || !isHolderValid || !isExpiryValid || !isCvvValid) &&
    Object.keys(touched).length > 0;

  const handleSaveCard = () => {
    if (!isValid) {
      Alert.alert(
        APP_STRINGS.PAYMENT.ADD_METHOD.INCOMPLETE_TITLE,
        APP_STRINGS.PAYMENT.ADD_METHOD.INCOMPLETE_DESC,
      );
      return;
    }

    addMethod({
      type: cardType === 'unknown' ? 'visa' : cardType,
      last4: cardNumber.slice(-4),
      holder,
      expiry,
    });

    Alert.alert(
      APP_STRINGS.PAYMENT.ADD_METHOD.SUCCESS_TITLE,
      APP_STRINGS.PAYMENT.ADD_METHOD.SUCCESS_DESC(cardNumber.slice(-4)),
      [{ text: APP_STRINGS.COMMON.OK, onPress: handleGoBack }],
    );
  };

  const setters = {
    setCardNumber: (v: string) => {
      setCardNumber(formatCardNumber(v));
      handleBlurField('cardNumber');
    },
    setHolder: (v: string) => {
      setHolder(v.replace(/\d/g, ''));
      handleBlurField('holder');
    },
    setExpiry: (v: string) => {
      setExpiry(formatExpiry(v));
      handleBlurField('expiry');
    },
    setCvv: (v: string) => {
      setCvv(v.replace(/\D/g, '').slice(0, 4));
      handleBlurField('cvv');
    },
  };

  return {
    state: { cardNumber, holder, expiry, cvv, flipped, cardType, isValid, hasAnyTouchErrors },
    errors: { cardNumberError, holderError, expiryError, cvvError },
    actions: {
      handleSaveCard,
      handleGoBack,
      resetForm,
      setFlipped,
      handleBlurField,
      ...setters,
    },
  };
}
