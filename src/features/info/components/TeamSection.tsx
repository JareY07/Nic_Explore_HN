import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Body, Caption, Subheading } from '@/components/ui/typhography';
import { typography } from '@/theme/typography';
import { APP_STRINGS } from '@/constants/shared';

type TeamMember = {
  name: string;
  role: string;
  summary: string;
};

interface TeamSectionProps {
  accent: string;
  cardBackground: string;
  borderColor: string;
  textColor: string;
  members: TeamMember[];
  style?: StyleProp<ViewStyle>;
}

export function TeamSection({
  accent,
  cardBackground,
  borderColor,
  textColor,
  members,
  style,
}: TeamSectionProps) {
  return (
    <View style={[styles.container, style]}>
      <Subheading style={[styles.title, { color: textColor }]}>
        {APP_STRINGS.INFO.ABOUT.TEAM_TITLE}
      </Subheading>
      <View style={styles.grid}>
        {members.map((member) => (
          <View
            key={member.name}
            style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
            <Subheading style={[styles.name, { color: textColor }]}>{member.name}</Subheading>
            <Caption style={[styles.role, { color: accent }]}>{member.role}</Caption>
            <Body style={[styles.summary, { color: textColor }]}>{member.summary}</Body>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: typography.sizes.lg,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'column',
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  name: {
    fontSize: typography.sizes.lg,
  },
  role: {
    fontSize: typography.sizes.sm,
    marginBottom: 8,
  },
  summary: {
    lineHeight: typography.sizes.base * typography.lineHeights.loose,
  },
});
