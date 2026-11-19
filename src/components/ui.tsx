/** Componentes de interface reutilizados por todas as telas. */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { scoreColors, useStyles, useTheme, type Theme } from '../theme';

export type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export function Icon({
  name,
  size = 22,
  color,
}: {
  name: IconName;
  size?: number;
  color?: string;
}) {
  const theme = useTheme();
  return <MaterialCommunityIcons name={name} size={size} color={color ?? theme.colors.text} />;
}

/* ---------------------------------------------------------------- Screen */

interface ScreenProps {
  children: React.ReactNode;
  /** Rola o conteúdo (padrão). Sem rolagem, o conteúdo ocupa a tela toda. */
  scroll?: boolean;
  /** Fica preso embaixo, fora da rolagem (botão principal da tela). */
  footer?: React.ReactNode;
  header?: React.ReactNode;
  edges?: Edge[];
  contentStyle?: StyleProp<ViewStyle>;
}

export function Screen({
  children,
  scroll = true,
  footer,
  header,
  edges = ['top', 'bottom', 'left', 'right'],
  contentStyle,
}: ScreenProps) {
  const s = useStyles(screenStyles);
  const body = scroll ? (
    <ScrollView
      contentContainerStyle={[s.scrollContent, contentStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={s.column}>{children}</View>
    </ScrollView>
  ) : (
    <View style={[s.fill, s.padded, contentStyle]}>
      <View style={[s.column, s.fill]}>{children}</View>
    </View>
  );

  return (
    <SafeAreaView style={s.safe} edges={edges}>
      <KeyboardAvoidingView style={s.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {header}
        {body}
        {footer ? (
          <View style={s.footer}>
            <View style={s.column}>{footer}</View>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const screenStyles = (t: Theme) => ({
  safe: { flex: 1, backgroundColor: t.colors.background },
  fill: { flex: 1 },
  padded: { padding: t.spacing.xl },
  scrollContent: { flexGrow: 1, padding: t.spacing.xl, paddingBottom: t.spacing.xxl },
  column: { width: '100%' as const, maxWidth: t.maxWidth, alignSelf: 'center' as const },
  footer: {
    paddingHorizontal: t.spacing.xl,
    paddingTop: t.spacing.md,
    paddingBottom: t.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: t.colors.border,
    backgroundColor: t.colors.background,
  },
});

/* ---------------------------------------------------------------- Header */

export function AppHeader({
  title,
  onBack,
  right,
}: {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) {
  const s = useStyles(headerStyles);
  return (
    <View style={s.wrap}>
      <View style={s.row}>
        {onBack ? (
          <IconButton icon="arrow-left" label="Voltar" onPress={onBack} />
        ) : (
          <View style={s.spacer} />
        )}
        <Text style={s.title} numberOfLines={1} accessibilityRole="header">
          {title}
        </Text>
        <View style={s.right}>{right ?? <View style={s.spacer} />}</View>
      </View>
    </View>
  );
}

const headerStyles = (t: Theme) => ({
  wrap: { paddingHorizontal: t.spacing.md, paddingVertical: t.spacing.sm },
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    width: '100%' as const,
    maxWidth: t.maxWidth + t.spacing.xl * 2,
    alignSelf: 'center' as const,
  },
  title: { ...t.type.heading, color: t.colors.text, flex: 1, textAlign: 'center' as const },
  right: { minWidth: 44, alignItems: 'flex-end' as const },
  spacer: { width: 44 },
});

export function IconButton({
  icon,
  label,
  onPress,
  color,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
  color?: string;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        borderRadius: theme.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pressed ? theme.colors.surfaceAlt : 'transparent',
      })}
    >
      <Icon name={icon} color={color ?? theme.colors.text} />
    </Pressable>
  );
}

/* ---------------------------------------------------------------- Button */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export function Button({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  style,
}: {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const { colors } = theme;
  const look = {
    primary: { bg: colors.primary, fg: colors.primaryText, border: colors.primary },
    secondary: { bg: colors.surface, fg: colors.text, border: colors.border },
    ghost: { bg: 'transparent', fg: colors.primary, border: 'transparent' },
    danger: { bg: colors.dangerSoft, fg: colors.danger, border: colors.dangerSoft },
  }[variant];
  const inactive = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy: loading }}
      style={({ pressed }) => [
        {
          minHeight: 52,
          paddingHorizontal: theme.spacing.xl,
          borderRadius: theme.radius.md,
          borderWidth: 1,
          borderColor: look.border,
          backgroundColor: look.bg,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme.spacing.sm,
          opacity: disabled && !loading ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={look.fg} />
      ) : (
        <>
          {icon ? <Icon name={icon} size={20} color={look.fg} /> : null}
          <Text style={{ ...theme.type.label, fontSize: 16, color: look.fg }}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

/* ---------------------------------------------------------------- Card */

export function Card({
  children,
  style,
  onPress,
  accessibilityLabel,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  accessibilityLabel?: string;
}) {
  const theme = useTheme();
  const cardStyle: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
  };
  if (!onPress) return <View style={[cardStyle, style]}>{children}</View>;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [cardStyle, pressed && { opacity: 0.85 }, style]}
    >
      {children}
    </Pressable>
  );
}

/* ---------------------------------------------------------------- Texto */

export function SectionTitle({ children, action }: { children: string; action?: React.ReactNode }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.md,
      }}
    >
      <Text style={{ ...theme.type.heading, color: theme.colors.text }} accessibilityRole="header">
        {children}
      </Text>
      {action}
    </View>
  );
}

export function Muted({ children, style }: { children: React.ReactNode; style?: object }) {
  const theme = useTheme();
  return (
    <Text style={[{ ...theme.type.body, color: theme.colors.textMuted }, style]}>{children}</Text>
  );
}

/** Lista com marcador, para pontos fortes, fracos e sugestões. */
export function BulletList({
  items,
  icon = 'circle-small',
  color,
}: {
  items: string[];
  icon?: IconName;
  color?: string;
}) {
  const theme = useTheme();
  if (items.length === 0) return null;
  return (
    <View style={{ gap: theme.spacing.sm }}>
      {items.map((item, index) => (
        <View key={`${index}-${item}`} style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
          <View style={{ paddingTop: 1 }}>
            <Icon name={icon} size={20} color={color ?? theme.colors.textMuted} />
          </View>
          <Text style={{ ...theme.type.body, color: theme.colors.text, flex: 1 }}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

/* ---------------------------------------------------------------- Campo de texto */

export const TextField = React.forwardRef<
  TextInput,
  TextInputProps & { label?: string; hint?: string; error?: string | null }
>(function TextField({ label, hint, error, style, multiline, ...props }, ref) {
  const theme = useTheme();
  const [focused, setFocused] = React.useState(false);
  return (
    <View style={{ gap: theme.spacing.sm }}>
      {label ? (
        <Text style={{ ...theme.type.label, color: theme.colors.text }}>{label}</Text>
      ) : null}
      <TextInput
        ref={ref}
        placeholderTextColor={theme.colors.textSubtle}
        multiline={multiline}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        style={[
          {
            ...theme.type.body,
            color: theme.colors.text,
            backgroundColor: theme.colors.surface,
            borderWidth: 1.5,
            borderColor: error
              ? theme.colors.danger
              : focused
                ? theme.colors.primary
                : theme.colors.border,
            borderRadius: theme.radius.md,
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
            minHeight: multiline ? 140 : 52,
            textAlignVertical: multiline ? 'top' : 'center',
          },
          style,
        ]}
        {...props}
      />
      {error ? (
        <Text
          style={{ ...theme.type.caption, color: theme.colors.danger }}
          accessibilityLiveRegion="polite"
        >
          {error}
        </Text>
      ) : hint ? (
        <Text style={{ ...theme.type.caption, color: theme.colors.textMuted }}>{hint}</Text>
      ) : null}
    </View>
  );
});

/* ---------------------------------------------------------------- Seleção */

export function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  const theme = useTheme();
  return (
    <View
      accessibilityRole="radiogroup"
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.surfaceAlt,
        borderRadius: theme.radius.md,
        padding: 4,
        gap: 4,
      }}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ checked: active }}
            style={{
              flex: 1,
              minHeight: 40,
              borderRadius: theme.radius.sm,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: active ? theme.colors.surface : 'transparent',
            }}
          >
            <Text
              style={{
                ...theme.type.label,
                color: active ? theme.colors.text : theme.colors.textMuted,
              }}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Pill({
  label,
  tone = 'neutral',
  icon,
}: {
  label: string;
  tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
  icon?: IconName;
}) {
  const theme = useTheme();
  const { colors } = theme;
  const look = {
    neutral: { fg: colors.textMuted, bg: colors.surfaceAlt },
    primary: { fg: colors.primary, bg: colors.primarySoft },
    success: { fg: colors.success, bg: colors.successSoft },
    warning: { fg: colors.warning, bg: colors.warningSoft },
    danger: { fg: colors.danger, bg: colors.dangerSoft },
  }[tone];
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        alignSelf: 'flex-start',
        backgroundColor: look.bg,
        borderRadius: theme.radius.full,
        paddingHorizontal: 10,
        paddingVertical: 4,
      }}
    >
      {icon ? <Icon name={icon} size={14} color={look.fg} /> : null}
      <Text style={{ ...theme.type.caption, fontWeight: '600', color: look.fg }}>{label}</Text>
    </View>
  );
}

/* ---------------------------------------------------------------- Nota */

/** Selo redondo com a nota de 0 a 10 (ou percentual, com `suffix`). */
export function ScoreBadge({
  score,
  size = 64,
  display,
}: {
  /** Nota de 0 a 10, usada para a cor. */
  score: number;
  size?: number;
  /** Texto mostrado; por padrão, a nota com uma casa. */
  display?: string;
}) {
  const theme = useTheme();
  const { fg, bg } = scoreColors(theme, score);
  return (
    <View
      accessibilityLabel={`Nota ${display ?? score.toFixed(1)}`}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bg,
        borderWidth: 3,
        borderColor: fg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: fg, fontWeight: '800', fontSize: size * 0.3 }}>
        {display ?? score.toFixed(1)}
      </Text>
    </View>
  );
}

export function ProgressBar({ progress }: { progress: number }) {
  const theme = useTheme();
  const pct = Math.max(0, Math.min(1, progress)) * 100;
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}
      style={{
        height: 6,
        borderRadius: 3,
        backgroundColor: theme.colors.surfaceAlt,
        overflow: 'hidden',
      }}
    >
      <View style={{ width: `${pct}%`, height: '100%', backgroundColor: theme.colors.primary }} />
    </View>
  );
}

/* ---------------------------------------------------------------- Estados */

export function EmptyState({
  icon,
  title,
  message,
  action,
}: {
  icon: IconName;
  title: string;
  message: string;
  action?: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <View
      style={{ alignItems: 'center', paddingVertical: theme.spacing.xxl, gap: theme.spacing.md }}
    >
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: theme.colors.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={icon} size={34} color={theme.colors.primary} />
      </View>
      <Text style={{ ...theme.type.heading, color: theme.colors.text, textAlign: 'center' }}>
        {title}
      </Text>
      <Text
        style={{
          ...theme.type.body,
          color: theme.colors.textMuted,
          textAlign: 'center',
          maxWidth: 360,
        }}
      >
        {message}
      </Text>
      {action ? <View style={{ marginTop: theme.spacing.sm }}>{action}</View> : null}
    </View>
  );
}

/** Caixa de erro com ação de tentar de novo. */
export function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  const theme = useTheme();
  return (
    <View
      accessibilityRole="alert"
      style={{
        flexDirection: 'row',
        gap: theme.spacing.md,
        alignItems: 'flex-start',
        backgroundColor: theme.colors.dangerSoft,
        borderRadius: theme.radius.md,
        padding: theme.spacing.lg,
      }}
    >
      <Icon name="alert-circle-outline" color={theme.colors.danger} />
      <View style={{ flex: 1, gap: theme.spacing.sm }}>
        <Text style={{ ...theme.type.body, color: theme.colors.text }}>{message}</Text>
        {onRetry ? (
          <Pressable onPress={onRetry} accessibilityRole="button">
            <Text style={{ ...theme.type.label, color: theme.colors.danger }}>Tentar de novo</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
