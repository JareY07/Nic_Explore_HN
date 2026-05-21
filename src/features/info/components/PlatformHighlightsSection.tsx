import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Body, Subheading } from '@/components/ui/typhography';
import { typography } from '@/theme/typography';
import { APP_STRINGS } from '@/constants/shared';

type Highlight = {
  title: string;
  description: string;
};

interface PlatformHighlightsSectionProps {
  surfaceColor: string;
  cardBackground: string;
  borderColor: string;
  textColor: string;
  highlights: Highlight[];
  futureNote: string;
  style?: StyleProp<ViewStyle>;
}

export function PlatformHighlightsSection({
  surfaceColor,
  cardBackground,
  borderColor,
  textColor,
  highlights,
  futureNote,
  style,
}: PlatformHighlightsSectionProps) {
  return (
    <View style={[styles.container, { backgroundColor: surfaceColor, borderColor }, style]}>
      <Subheading style={[styles.sectionTitle, { color: textColor }]}>
        {APP_STRINGS.INFO.ABOUT.HIGHLIGHTS_TITLE}
      </Subheading>
      {highlights.map((item) => (
        <View
          key={item.title}
          style={[styles.highlightCard, { backgroundColor: cardBackground, borderColor }]}>
          <Subheading style={[styles.highlightTitle, { color: textColor }]}>
            {item.title}
          </Subheading>
          <Body style={[styles.paragraph, { color: textColor }]}>{item.description}</Body>
        </View>
      ))}
      <Body style={[styles.paragraph, styles.futureNote, { color: textColor }]}>{futureNote}</Body>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    borderWidth: 1,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    marginBottom: 16,
  },
  highlightCard: {
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  highlightTitle: {
    fontSize: typography.sizes.base,
  },
  paragraph: {
    marginTop: 8,
    lineHeight: typography.sizes.base * typography.lineHeights.loose,
  },
  futureNote: {
    marginTop: 16,
  },
});
