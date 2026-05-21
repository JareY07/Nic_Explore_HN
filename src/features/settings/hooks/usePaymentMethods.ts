import { Alert } from 'react-native';
import { usePaymentStore } from '../store/usePaymentStore';
import { APP_STRINGS } from '@/constants/shared';

export function usePaymentMethods() {
  const methods = usePaymentStore((state) => state.methods);
  const setDefaultMethod = usePaymentStore((state) => state.setDefault);
  const removeMethod = usePaymentStore((state) => state.removeMethod);

  const handleSetDefault = (id: string) => {
    setDefaultMethod(id);
  };

  const handleDelete = (id: string) => {
    const method = methods.find((m) => m.id === id);
    if (!method) return;
    Alert.alert(
      APP_STRINGS.PAYMENT.METHODS.REMOVE_TITLE,
      APP_STRINGS.PAYMENT.METHODS.REMOVE_DESC(method.last4),
      [
        { text: APP_STRINGS.PAYMENT.METHODS.CANCEL, style: 'cancel' },
        {
          text: APP_STRINGS.PAYMENT.METHODS.REMOVE,
          style: 'destructive',
          onPress: () => removeMethod(id),
        },
      ],
    );
  };

  return {
    methods,
    handlers: {
      handleSetDefault,
      handleDelete,
    },
  };
}
