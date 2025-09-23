import React from 'react';
import { Text } from 'react-native';
import { colors } from '@/theme/colors';
import { InfoIcon } from '../../icons/icons';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <Text style={{ color: colors.status.error }}>
      <InfoIcon color={colors.status.error} />
      {' ' + message || ' Error'}
    </Text>
  );
};

export default ErrorMessage;
