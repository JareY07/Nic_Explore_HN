import MyLayout from '@/components/shared/myLayout';
import { Heading } from '@/components/ui/typhography';
import React from 'react';
import { APP_STRINGS } from '@/constants/shared';

export default function VerificationScreen() {
  return (
    <MyLayout>
      <Heading className="text-center mb-4">{APP_STRINGS.PAYMENT.VERIFICATION.TITLE}</Heading>
    </MyLayout>
  );
}
