/**
 * Aviso rápido no rodapé. Um único provedor na raiz do app, para o aviso aparecer na tela
 * em que o usuário está (a versão 1.0 usava uma instância estática que podia mostrar o aviso
 * numa tela escondida atrás da atual).
 */
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../theme';
import { Icon, type IconName } from './ui';

type ToastTone = 'success' | 'error' | 'info';

interface ToastMessage {
  id: number;
  text: string;
  tone: ToastTone;
}

const ToastContext = createContext<(text: string, tone?: ToastTone) => void>(() => {});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<ToastMessage | null>(null);
  const show = useCallback((text: string, tone: ToastTone = 'info') => {
    setMessage({ id: Date.now(), text, tone });
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      {message ? (
        <ToastView key={message.id} message={message} onDone={() => setMessage(null)} />
      ) : null}
    </ToastContext.Provider>
  );
}

function ToastView({ message, onDone }: { message: ToastMessage; onDone: () => void }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
      Animated.delay(message.tone === 'error' ? 4000 : 2400),
      Animated.timing(opacity, { toValue: 0, duration: 220, useNativeDriver: true }),
    ]);
    animation.start(({ finished }) => finished && onDone());
    return () => animation.stop();
  }, [message, onDone, opacity]);

  const look: Record<ToastTone, { icon: IconName; color: string }> = {
    success: { icon: 'check-circle', color: theme.colors.success },
    error: { icon: 'alert-circle', color: theme.colors.danger },
    info: { icon: 'information', color: theme.colors.primary },
  };

  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: insets.bottom + 24,
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
      }}
    >
      <Animated.View
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
        style={{
          opacity,
          maxWidth: 520,
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.md,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderWidth: 1,
          borderRadius: theme.radius.md,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          shadowColor: '#000',
          shadowOpacity: 0.18,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
        }}
      >
        <Icon name={look[message.tone].icon} color={look[message.tone].color} size={20} />
        <Text style={{ ...theme.type.body, color: theme.colors.text, flexShrink: 1 }}>
          {message.text}
        </Text>
      </Animated.View>
    </View>
  );
}

export const useToast = () => useContext(ToastContext);
