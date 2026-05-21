import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Body, Caption, Heading } from '@/components/ui/typhography';
import { typography } from '@/theme/typography';
import { APP_STRINGS } from '@/constants/shared';

type Metric = {
  value: string;
  label: string;
};

interface AboutHeroCardProps {
  accent: string;
  cardBackground: string;
  borderColor: string;
  textColor: string;
  paragraphs: string[];
  metrics: Metric[];
  style?: StyleProp<ViewStyle>;
}

export function AboutHeroCard({
  accent,
  cardBackground,
  borderColor,
  textColor,
  paragraphs,
  metrics,
  style,
}: AboutHeroCardProps) {
  return (
    <View style={[styles.container, { backgroundColor: cardBackground, borderColor }, style]}>
      <Heading style={[styles.title, { color: textColor }]}>
        {APP_STRINGS.INFO.ABOUT.HERO_TITLE}
      </Heading>
      {paragraphs.map((paragraph) => (
        <Body key={paragraph} style={[styles.paragraph, { color: textColor }]}>
          {paragraph}
        </Body>
      ))}
      <View style={styles.metricsRow}>
        {metrics.map((metric) => (
          <View key={metric.label} style={styles.metricItem}>
            <Heading style={[styles.metricValue, { color: accent }]}>{metric.value}</Heading>
            <Caption style={[styles.metricLabel, { color: textColor }]}>{metric.label}</Caption>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    borderWidth: 1,
    paddingVertical: 28,
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 12,
    textAlign: 'left',
  },
  paragraph: {
    marginTop: 8,
    lineHeight: typography.sizes.base * typography.lineHeights.loose,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold as any,
    marginBottom: 6,
  },
  metricLabel: {
    textAlign: 'center',
  },
});
