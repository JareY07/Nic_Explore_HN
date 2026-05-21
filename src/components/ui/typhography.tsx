import React from 'react';
import { TextProps } from 'react-native';
import MyText from './myText';
import { useTheme } from '@/components/hooks/useTheme';
import { AppTheme } from '@/theme';
import { FontFamily } from '@/theme/fonts';

type TypographyProps = TextProps & {
  color?: string;
};

type ColorResolver = (theme: AppTheme, isDarkMode: boolean) => string;

type TypographyConfig = {
  fontFamily: FontFamily;
  sizeKey: keyof AppTheme['typography']['sizes'];
  lineHeightKey?: keyof AppTheme['typography']['lineHeights'];
  colorResolver?: ColorResolver;
  displayName: string;
};

const defaultColorResolver: ColorResolver = (theme, isDarkMode) => {
  const brandShade =
    theme.brand?.shades?.[700] ?? theme.brand?.primary ?? theme.colors.neutral[900];
  return isDarkMode ? theme.colors.neutral[300] : brandShade;
};

function createTypographyComponent({
  fontFamily,
  sizeKey,
  lineHeightKey,
  colorResolver,
  displayName,
}: TypographyConfig) {
  const Component: React.FC<TypographyProps> = ({ children, style, color, ...props }) => {
    const { theme: appTheme, isDarkMode } = useTheme();

    const fontSize = appTheme.typography.sizes[sizeKey];
    const lineHeightMultiplier = lineHeightKey
      ? appTheme.typography.lineHeights[lineHeightKey]
      : undefined;
    const lineHeight = lineHeightMultiplier ? fontSize * lineHeightMultiplier : undefined;

    const resolvedColor = color ?? (colorResolver ?? defaultColorResolver)(appTheme, isDarkMode);

    return (
      <MyText
        fontFamily={fontFamily}
        style={[{ fontSize, lineHeight, color: resolvedColor }, style]}
        {...props}>
        {children}
      </MyText>
    );
  };

  Component.displayName = displayName;
  return Component;
}

const brandShadeResolver: ColorResolver = (theme, isDarkMode) => {
  const brandShade =
    theme.brand?.shades?.[700] ?? theme.brand?.primary ?? theme.colors.neutral[900];
  return isDarkMode ? theme.colors.neutral[400] : brandShade;
};

const captionColorResolver: ColorResolver = (theme, isDarkMode) =>
  isDarkMode ? theme.colors.neutral[400] : theme.colors.neutral[600];

export const Title = createTypographyComponent({
  fontFamily: 'bold',
  sizeKey: '2xl',
  lineHeightKey: 'tight',
  colorResolver: brandShadeResolver,
  displayName: 'Title',
});

export const Heading = createTypographyComponent({
  fontFamily: 'bold',
  sizeKey: 'xl',
  lineHeightKey: 'normal',
  colorResolver: brandShadeResolver,
  displayName: 'Heading',
});

export const Subheading = createTypographyComponent({
  fontFamily: 'regular',
  sizeKey: 'lg',
  lineHeightKey: 'normal',
  colorResolver: brandShadeResolver,
  displayName: 'Subheading',
});

export const Body = createTypographyComponent({
  fontFamily: 'regular',
  sizeKey: 'base',
  lineHeightKey: 'normal',
  colorResolver: brandShadeResolver,
  displayName: 'Body',
});

export const Caption = createTypographyComponent({
  fontFamily: 'light',
  sizeKey: 'sm',
  lineHeightKey: 'normal',
  colorResolver: captionColorResolver,
  displayName: 'Caption',
});
