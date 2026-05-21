import React from 'react';
import { Text as RNText } from 'react-native';
import { fonts } from '@/theme/fonts';
import { MyTextProps } from '@/types/themeTypes';

export default function MyText({ fontFamily = 'regular', style, children, ...props }: MyTextProps) {
  return (
    <RNText
      style={[
        {
          fontFamily: fonts[fontFamily],
        },
        style,
      ]}
      {...props}>
      {children}
    </RNText>
  );
}
