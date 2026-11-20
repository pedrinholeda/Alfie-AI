/** Apresentação do Alfie. Aparece só na primeira abertura. */
import React, { useRef, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import AlfieAvatar from '../components/AlfieAvatar';
import { Button, Icon, Screen, type IconName } from '../components/ui';
import { useApp } from '../state/app';
import { useTheme } from '../theme';

interface Slide {
  title: string;
  text: string;
  expression: 'happy' | 'thinking' | 'excited' | 'neutral';
  points: { icon: IconName; text: string }[];
}

const slides: Slide[] = [
  {
    title: 'Treine para a vaga que você quer',
    text: 'Cole a descrição de uma vaga e o Alfie monta uma entrevista sob medida, com perguntas técnicas e comportamentais.',
    expression: 'happy',
    points: [
      { icon: 'file-document-outline', text: 'Qualquer área de tecnologia' },
      { icon: 'tune-variant', text: 'Do estágio ao sênior' },
    ],
  },
  {
    title: 'Dois jeitos de praticar',
    text: 'Na entrevista simulada você responde com suas palavras e recebe nota e feedback. No quiz, testa o conhecimento com múltipla escolha.',
    expression: 'thinking',
    points: [
      { icon: 'account-tie-voice-outline', text: 'Entrevista com feedback por resposta' },
      { icon: 'checkbox-marked-circle-outline', text: 'Quiz com explicação de cada questão' },
    ],
  },
  {
    title: 'Acompanhe sua evolução',
    text: 'Cada sessão fica salva no seu aparelho, com pontos fortes, pontos a desenvolver e um plano de estudo.',
    expression: 'excited',
    points: [
      { icon: 'chart-line', text: 'Histórico e média das notas' },
      { icon: 'shield-lock-outline', text: 'Seus dados ficam só com você' },
    ],
  },
];

export default function IntroductionScreen() {
  const theme = useTheme();
  // Medida real da área dos slides: na web e no tablet ela é menor que a janela.
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { width } = size;
  const { updateSettings } = useApp();
  const [index, setIndex] = useState(0);
  const list = useRef<FlatList<Slide>>(null);
  const last = index === slides.length - 1;

  const finish = () => updateSettings({ introSeen: true });
  const next = () => {
    if (last) return finish();
    list.current?.scrollToIndex({ index: index + 1, animated: true });
    setIndex(index + 1);
  };

  return (
    <Screen
      scroll={false}
      contentStyle={{ paddingHorizontal: 0 }}
      footer={
        <View style={{ gap: theme.spacing.lg }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}
            accessibilityLabel={`Página ${index + 1} de ${slides.length}`}
          >
            {slides.map((_, i) => (
              <View
                key={i}
                style={{
                  width: i === index ? 22 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: i === index ? theme.colors.primary : theme.colors.border,
                }}
              />
            ))}
          </View>
          <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
            {!last ? (
              <Button title="Pular" variant="ghost" onPress={finish} style={{ flex: 1 }} />
            ) : null}
            <Button
              title={last ? 'Começar' : 'Próximo'}
              icon={last ? 'rocket-launch-outline' : undefined}
              onPress={next}
              style={{ flex: 2 }}
            />
          </View>
        </View>
      }
    >
      <View style={{ flex: 1 }} onLayout={(e) => setSize(e.nativeEvent.layout)}>
        {width > 0 ? (
          <FlatList
            ref={list}
            data={slides}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.title}
            onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
            getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
            renderItem={({ item }) => (
              <View
                style={{
                  width,
                  height: size.height,
                  paddingHorizontal: theme.spacing.xl,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: theme.spacing.xl,
                }}
              >
                <AlfieAvatar size={140} expression={item.expression} />
                <View style={{ gap: theme.spacing.md, maxWidth: 480 }}>
                  <Text
                    style={{ ...theme.type.display, color: theme.colors.text, textAlign: 'center' }}
                    accessibilityRole="header"
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      ...theme.type.body,
                      color: theme.colors.textMuted,
                      textAlign: 'center',
                    }}
                  >
                    {item.text}
                  </Text>
                </View>
                <View style={{ gap: theme.spacing.md }}>
                  {item.points.map((p) => (
                    <View
                      key={p.text}
                      style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
                    >
                      <Icon name={p.icon} color={theme.colors.primary} />
                      <Text style={{ ...theme.type.body, color: theme.colors.text }}>{p.text}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          />
        ) : null}
      </View>
    </Screen>
  );
}
