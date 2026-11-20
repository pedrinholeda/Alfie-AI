/** O Alfie, com uma expressão para cada momento. */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, type ViewStyle } from 'react-native';

import { useTheme } from '../theme';

export type AlfieExpression = 'happy' | 'thinking' | 'excited' | 'neutral';

const icons = {
  happy: 'robot-happy-outline',
  thinking: 'robot-confused-outline',
  excited: 'robot-excited-outline',
  neutral: 'robot-outline',
} as const;

export default function AlfieAvatar({
  size = 100,
  style,
  expression = 'happy',
}: {
  size?: number;
  style?: ViewStyle;
  expression?: AlfieExpression;
}) {
  const theme = useTheme();
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel="Alfie"
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <MaterialCommunityIcons
        name={icons[expression]}
        size={size * 0.6}
        color={theme.colors.primary}
      />
    </View>
  );
}
