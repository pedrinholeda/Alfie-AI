import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import Toast from '../components/Toast';
import SafeLayout from '../components/SafeLayout';
import AlfieAvatar from '../components/AlfieAvatar';

const { width } = Dimensions.get('window');

interface Slide {
  id: number;
  title: string;
  description: string;
  mainIcon: string;
  secondaryIcons: string[];
  color: string;
  alfieExpression: 'happy' | 'thinking' | 'excited' | 'neutral';
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Bem-vindo ao Alfie! 👋',
    description: 'Seu assistente pessoal de entrevistas potencializado por IA. Vou te ajudar a se preparar para entrevistas técnicas de forma inteligente e personalizada.',
    mainIcon: 'robot-happy',
    secondaryIcons: ['star', 'heart', 'star-shooting'],
    color: '#6C63FF',
    alfieExpression: 'happy',
  },
  {
    id: 2,
    title: 'Dois Modos de Prática 🎯',
    description: 'Escolha entre Simulação de Entrevista para praticar com perguntas abertas e feedback detalhado, ou Quiz Técnico para testar seus conhecimentos com questões de múltipla escolha.',
    mainIcon: 'school-outline',
    secondaryIcons: ['account-tie', 'help-circle', 'check-circle'],
    color: '#4CAF50',
    alfieExpression: 'thinking',
  },
  {
    id: 3,
    title: 'Simulação de Entrevista 🗣️',
    description: 'Pratique com perguntas abertas personalizadas, receba feedback detalhado sobre suas respostas e dicas para melhorar suas habilidades de comunicação.',
    mainIcon: 'account-tie',
    secondaryIcons: ['message-text', 'thumb-up', 'lightbulb-on'],
    color: '#2196F3',
    alfieExpression: 'excited',
  },
  {
    id: 4,
    title: 'Quiz Técnico 📝',
    description: 'Teste seus conhecimentos técnicos com perguntas de múltipla escolha, receba explicações detalhadas e acompanhe seu progresso com pontuações e análises.',
    mainIcon: 'help-circle',
    secondaryIcons: ['check-circle', 'brain', 'trophy'],
    color: '#FFC107',
    alfieExpression: 'neutral',
  },
  {
    id: 5,
    title: 'Feedback Inteligente ⚡',
    description: 'Receba análises detalhadas do seu desempenho, com pontuação, pontos fortes, sugestões de melhoria e dicas práticas para cada pergunta.',
    mainIcon: 'lightning-bolt',
    secondaryIcons: ['chart-line', 'thumb-up', 'message-text'],
    color: '#9C27B0',
    alfieExpression: 'excited',
  },
  {
    id: 6,
    title: 'Pronto para Começar? 🚀',
    description: 'Vamos juntos transformar suas entrevistas em oportunidades de sucesso! Configure seu perfil e comece a praticar agora mesmo.',
    mainIcon: 'rocket',
    secondaryIcons: ['check-circle', 'account', 'arrow-right-circle'],
    color: '#E91E63',
    alfieExpression: 'excited',
  },
];

const IntroductionScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    visible: false,
    message: '',
    type: 'info',
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({
      visible: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollViewRef.current?.scrollTo({
        x: nextSlide * width,
        animated: true
      });
    } else {
      showToast('Vamos começar sua jornada!', 'success');
      setTimeout(() => {
        navigation.replace('Onboarding');
      }, 1000);
    }
  };

  const handleSkip = () => {
    showToast('Pulando introdução...', 'info');
    setTimeout(() => {
      navigation.replace('Onboarding');
    }, 1000);
  };

  const renderSecondaryIcons = (icons: string[], color: string) => (
    <View style={styles.secondaryIconsContainer}>
      {icons.map((icon, index) => (
        <View
          key={icon}
          style={[
            styles.secondaryIconWrapper,
            {
              backgroundColor: `${color}15`,
              transform: [
                { translateX: index * 20 },
                { translateY: Math.sin(index) * 20 },
              ],
            },
          ]}
        >
          <MaterialCommunityIcons
            name={icon as any}
            size={24}
            color={color}
          />
        </View>
      ))}
    </View>
  );

  const renderSlide = (slide: Slide) => (
    <View key={slide.id} style={styles.slide}>
      <View style={styles.avatarContainer}>
        <AlfieAvatar
          size={width * 0.4}
          expression={slide.alfieExpression}
          style={styles.avatar}
        />
        {renderSecondaryIcons(slide.secondaryIcons, slide.color)}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeLayout>
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onDismiss={hideToast}
      />

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentSlide(slideIndex);
        }}
        scrollEventThrottle={16}
      >
        {slides.map(renderSlide)}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentSlide && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipButtonText}>Pular</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>
              {currentSlide === slides.length - 1 ? 'Começar' : 'Próximo'}
            </Text>
            <Ionicons
              name="arrow-forward"
              size={20}
              color="#FFFFFF"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  avatarContainer: {
    width: width * 0.8,
    height: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  avatar: {
    marginBottom: theme.spacing.lg,
  },
  secondaryIconsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: width * 0.1,
  },
  secondaryIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingBottom: Platform.OS === 'ios' ? theme.spacing.xl : theme.spacing.lg,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.textSecondary,
    marginHorizontal: 4,
    opacity: 0.4,
  },
  paginationDotActive: {
    opacity: 1,
    backgroundColor: theme.colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  skipButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  skipButtonText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
  },
});

export default IntroductionScreen; 