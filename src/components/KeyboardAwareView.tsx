import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  ViewStyle,
  ScrollViewProps,
  KeyboardAvoidingViewProps,
} from 'react-native';

interface KeyboardAwareViewProps extends ScrollViewProps {
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  keyboardAvoidingViewProps?: Partial<KeyboardAvoidingViewProps>;
}

const KeyboardAwareView: React.FC<KeyboardAwareViewProps> = ({
  children,
  containerStyle,
  keyboardAvoidingViewProps,
  ...scrollViewProps
}) => {
  return (
    <KeyboardAvoidingView
      style={[styles.container, containerStyle]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      {...keyboardAvoidingViewProps}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default KeyboardAwareView; 