/**
 * Pergunta de confirmação que funciona no celular e na web. O Alert.alert com botões não
 * faz nada no navegador, e era o que a tela de histórico usava para limpar tudo.
 */
import { Alert, Platform } from 'react-native';

export function confirm(options: {
  title: string;
  message: string;
  confirmLabel: string;
  destructive?: boolean;
}): Promise<boolean> {
  if (Platform.OS === 'web') {
    return Promise.resolve(window.confirm(`${options.title}\n\n${options.message}`));
  }
  return new Promise((resolve) => {
    Alert.alert(
      options.title,
      options.message,
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => resolve(false) },
        {
          text: options.confirmLabel,
          style: options.destructive ? 'destructive' : 'default',
          onPress: () => resolve(true),
        },
      ],
      { cancelable: true, onDismiss: () => resolve(false) },
    );
  });
}
