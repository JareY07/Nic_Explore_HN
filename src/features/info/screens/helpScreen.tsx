import React from 'react';
import { View } from 'react-native';
import MyLayout from '@/components/shared/myLayout';
import { useTheme } from '@/components/hooks/useTheme';
import { Body, Caption, Heading, Subheading } from '@/components/ui/typhography';
import { supportChannels, quickSteps, faqs } from '@/features/info/utils/helpData';
import { useNoHeader } from '@/components/hooks/useMyNavigation';
import { APP_STRINGS } from '@/constants/shared';

export default function HelpScreen() {
  const { theme: appTheme, isDarkMode } = useTheme();
  const cardBg = isDarkMode ? appTheme.colors.neutral[800] : appTheme.colors.neutral.white;
  const borderColor = isDarkMode ? appTheme.colors.neutral[700] : appTheme.colors.neutral[200];
  const textColor = isDarkMode ? appTheme.colors.neutral.white : appTheme.colors.neutral[900];
  const subtextColor = isDarkMode ? appTheme.colors.neutral[400] : appTheme.colors.neutral[600];
  const accent = appTheme.brand.primary;
  useNoHeader();

  return (
    <MyLayout>
      <View className="px-6 py-8">
        {/* Hero */}
        <View
          className="rounded-[28px] border px-6 py-7 mb-8"
          style={{ backgroundColor: cardBg, borderColor }}>
          <Heading className="mb-3" style={{ color: textColor }}>
            {APP_STRINGS.INFO.HELP.TITLE}
          </Heading>
          <Body className="mt-2 leading-relaxed" style={{ color: textColor }}>
            {APP_STRINGS.INFO.HELP.DESC}
          </Body>
        </View>

        {/* Canales de soporte */}
        <View className="mb-8">
          <Subheading className="text-lg mb-4" style={{ color: textColor }}>
            {APP_STRINGS.INFO.HELP.CHANNELS_TITLE}
          </Subheading>
          {supportChannels.map((channel) => (
            <View
              key={channel.title}
              className="rounded-3xl border p-5 mb-4"
              style={{ backgroundColor: cardBg, borderColor }}>
              <Subheading className="mb-2" style={{ color: textColor }}>
                {channel.title}
              </Subheading>
              <Body className="leading-relaxed mb-3" style={{ color: textColor }}>
                {channel.description}
              </Body>
              <Caption className="text-sm" style={{ color: subtextColor }}>
                {channel.availability}
              </Caption>
            </View>
          ))}
        </View>

        {/* Pasos rápidos */}
        <View className="mb-8">
          <Subheading className="text-lg mb-4" style={{ color: textColor }}>
            {APP_STRINGS.INFO.HELP.QUICK_STEPS_TITLE}
          </Subheading>
          {quickSteps.map((step, index) => (
            <View key={index} className="flex-row items-start mb-4">
              <View
                className="w-8 h-8 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: accent }}>
                <Caption className="text-white font-bold">{index + 1}</Caption>
              </View>
              <Body className="flex-1 leading-relaxed" style={{ color: textColor }}>
                {step}
              </Body>
            </View>
          ))}
        </View>

        {/* FAQs */}
        <View className="mb-8">
          <Subheading className="text-lg mb-4" style={{ color: textColor }}>
            {APP_STRINGS.INFO.HELP.FAQ_TITLE}
          </Subheading>
          {faqs.map((faq) => (
            <View
              key={faq.question}
              className="rounded-[20px] border py-[18px] px-5 mb-3"
              style={{ backgroundColor: cardBg, borderColor }}>
              <Subheading className="mb-2" style={{ color: textColor }}>
                {faq.question}
              </Subheading>
              <Body className="leading-relaxed" style={{ color: textColor }}>
                {faq.answer}
              </Body>
            </View>
          ))}
        </View>
      </View>
    </MyLayout>
  );
}
