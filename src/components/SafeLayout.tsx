import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  ViewStyle,
} from 'react-native';
import { theme } from '../styles/theme';

interface SafeLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

const SafeLayout: React.FC<SafeLayoutProps> = ({
  children,
  style,
  contentStyle,
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
        translucent
      />
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
});

export default SafeLayout; 