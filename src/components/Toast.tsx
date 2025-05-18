import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { theme } from '../styles/theme';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
}

interface ToastProps {
  visible: boolean;
  message: string;
  type: ToastType;
  onDismiss?: () => void;
}

class Toast extends React.Component<ToastProps, ToastState> {
  private static instance: Toast | null = null;
  private fadeAnim = new Animated.Value(0);
  private timeout: ReturnType<typeof setTimeout> | null = null;

  constructor(props: ToastProps) {
    super(props);
    this.state = {
      visible: props.visible,
      message: props.message,
      type: props.type,
    };
  }

  static show(message: string, type: ToastType = 'info') {
    if (Toast.instance) {
      Toast.instance.showToast(message, type);
    }
  }

  private showToast(message: string, type: ToastType) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.setState({ visible: true, message, type }, () => {
      Animated.sequence([
        Animated.timing(this.fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(this.fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        this.setState({ visible: false });
        if (this.props.onDismiss) {
          this.props.onDismiss();
        }
      });
    });
  }

  componentDidMount() {
    Toast.instance = this;
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    Toast.instance = null;
  }

  componentDidUpdate(prevProps: ToastProps) {
    if (this.props.visible !== prevProps.visible) {
      if (this.props.visible) {
        this.showToast(this.props.message, this.props.type);
      }
    }
  }

  render() {
    if (!this.state.visible) return null;

    const backgroundColor = {
      success: theme.colors.success,
      error: theme.colors.error,
      warning: theme.colors.warning,
      info: theme.colors.primary,
    }[this.state.type];

    return (
      <Animated.View
        style={[
          styles.container,
          { opacity: this.fadeAnim, backgroundColor },
        ]}
      >
        <Text style={styles.text}>{this.state.message}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Toast; 