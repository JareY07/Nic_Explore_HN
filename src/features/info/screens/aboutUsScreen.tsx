import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyLayout from '@/components/shared/myLayout';
import { useTheme } from '@/components/hooks/useTheme';
import { AboutHeroCard } from '@/features/info/components/AboutHeroCard';
import { PlatformHighlightsSection } from '@/features/info/components/PlatformHighlightsSection';
import { TeamSection } from '@/features/info/components/TeamSection';
import {
  teamMembers,
  platformHighlights,
  heroParagraphs,
  heroMetrics,
  futureNote,
} from '@/features/info/utils/aboutUsData';
import { useNoHeader } from '@/components/hooks/useMyNavigation';

export default function AboutUsScreen() {
  const { theme: appTheme, isDarkMode } = useTheme();
  const surface = isDarkMode ? appTheme.colors.neutral[800] : appTheme.colors.neutral[50];
  const cardBackground = isDarkMode ? appTheme.colors.neutral[800] : appTheme.colors.neutral.white;
  const borderColor = isDarkMode ? appTheme.colors.neutral[700] : appTheme.colors.neutral[200];
  const textColor = isDarkMode ? appTheme.colors.neutral.white : appTheme.colors.neutral[900];
  const accent = appTheme.brand.primary;
  useNoHeader();
  return (
    <MyLayout>
      <View style={styles.container}>
        <AboutHeroCard
          accent={accent}
          cardBackground={cardBackground}
          borderColor={borderColor}
          textColor={textColor}
          paragraphs={heroParagraphs}
          metrics={heroMetrics}
          style={styles.sectionSpacing}
        />
        <PlatformHighlightsSection
          surfaceColor={surface}
          cardBackground={cardBackground}
          borderColor={borderColor}
          textColor={textColor}
          highlights={platformHighlights}
          futureNote={futureNote}
          style={styles.sectionSpacing}
        />
        <TeamSection
          accent={accent}
          cardBackground={cardBackground}
          borderColor={borderColor}
          textColor={textColor}
          members={teamMembers}
        />
      </View>
    </MyLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  sectionSpacing: {
    marginBottom: 32,
  },
});
