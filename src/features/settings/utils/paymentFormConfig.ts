import { APP_STRINGS } from '@/constants/shared';

type PaymentFieldState = {
  cardNumber: string;
  holder: string;
  expiry: string;
  cvv: string;
};

type PaymentFieldErrors = {
  cardNumberError?: string;
  holderError?: string;
  expiryError?: string;
  cvvError?: string;
};

type PaymentFieldActions = {
  setCardNumber: (v: string) => void;
  setHolder: (v: string) => void;
  setExpiry: (v: string) => void;
  setCvv: (v: string) => void;
  handleBlurField: (field: string) => void;
  setFlipped: (v: boolean) => void;
};

export const getPaymentFieldsConfig = (
  state: PaymentFieldState,
  errors: PaymentFieldErrors,
  actions: PaymentFieldActions,
) => {
  return [
    {
      fieldId: 'cardNumber',
      label: APP_STRINGS.PAYMENT.ADD_METHOD.CARD_NUMBER_LABEL,
      value: state.cardNumber,
      onChange: actions.setCardNumber,
      onBlur: () => actions.handleBlurField('cardNumber'),
      placeholder: APP_STRINGS.PAYMENT.ADD_METHOD.CARD_NUMBER_HINT,
      keyboardType: 'number-pad' as const,
      maxLength: 19,
      error: errors.cardNumberError,
    },
    {
      fieldId: 'holder',
      label: APP_STRINGS.PAYMENT.ADD_METHOD.CARD_HOLDER_LABEL,
      value: state.holder,
      onChange: actions.setHolder,
      onBlur: () => actions.handleBlurField('holder'),
      placeholder: APP_STRINGS.PAYMENT.ADD_METHOD.CARD_HOLDER_HINT,
      keyboardType: 'default' as const,
      maxLength: 40,
      error: errors.holderError,
    },
    {
      fieldId: 'expiry',
      label: APP_STRINGS.PAYMENT.ADD_METHOD.EXPIRY_LABEL,
      value: state.expiry,
      onChange: actions.setExpiry,
      onBlur: () => actions.handleBlurField('expiry'),
      placeholder: APP_STRINGS.PAYMENT.ADD_METHOD.EXPIRY_HINT,
      keyboardType: 'number-pad' as const,
      maxLength: 5,
      error: errors.expiryError,
    },
    {
      fieldId: 'cvv',
      label: APP_STRINGS.PAYMENT.ADD_METHOD.CVV_LABEL,
      value: state.cvv,
      onChange: actions.setCvv,
      onFocus: () => actions.setFlipped(true),
      onBlur: () => {
        actions.setFlipped(false);
        actions.handleBlurField('cvv');
      },
      placeholder: APP_STRINGS.PAYMENT.ADD_METHOD.CVV_HINT,
      keyboardType: 'number-pad' as const,
      maxLength: 4,
      secure: true,
      error: errors.cvvError,
    },
  ] as const;
};
