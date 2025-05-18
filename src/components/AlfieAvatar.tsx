import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

interface AlfieAvatarProps {
  size?: number;
  style?: ViewStyle;
  expression?: 'happy' | 'thinking' | 'excited' | 'neutral';
}

const AlfieAvatar: React.FC<AlfieAvatarProps> = ({
  size = 100,
  style,
  expression = 'happy',
}) => {
  const getExpression = () => {
    switch (expression) {
      case 'thinking':
        return 'robot-confused';
      case 'excited':
        return 'robot-excited';
      case 'neutral':
        return 'robot';
      case 'happy':
      default:
        return 'robot-happy';
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: `${theme.colors.primary}15`,
        },
        style,
      ]}
    >
      <MaterialCommunityIcons
        name={getExpression()}
        size={size * 0.7}
        color={theme.colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default AlfieAvatar; 