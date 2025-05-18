import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { geminiService } from '../services/gemini';
import Toast from '../components/Toast';
import SafeLayout from '../components/SafeLayout';
import AlfieAvatar from '../components/AlfieAvatar';
import KeyboardAwareView from '../components/KeyboardAwareView';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [jobInfo, setJobInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [processingStep, setProcessingStep] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<'interview' | 'quiz' | null>(null);
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    visible: false,
    message: '',
    type: 'info',
  });

  useEffect(() => {
    loadUserName();
  }, []);

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

  const loadUserName = async () => {
    try {
      const name = await AsyncStorage.getItem('@AlfieApp:userName');
      if (name) setUserName(name);
    } catch (error) {
      console.error('Erro ao carregar nome do usuário:', error);
      showToast('Erro ao carregar dados do usuário', 'error');
    }
  };

  const handleStartProcess = async () => {
    if (jobInfo.trim().length < 30) {
      showToast('Por favor, insira uma descrição mais detalhada da vaga (mínimo 30 caracteres).', 'error');
      setError('Por favor, insira uma descrição mais detalhada da vaga (mínimo 30 caracteres).');
      return;
    }

    if (!selectedMode) {
      showToast('Por favor, selecione um modo de prática.', 'error');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Passo 1: Extrair requisitos
      setProcessingStep('Analisando informações da vaga...');
      const requirements = await geminiService.extractRequirements(jobInfo);

      // Mostrar requisitos extraídos
      setProcessingStep('Requisitos identificados! Gerando perguntas...');
      showToast('Requisitos identificados com sucesso!', 'success');

      // Passo 2: Gerar perguntas baseado no modo selecionado
      if (selectedMode === 'quiz') {
        try {
          const questions = await geminiService.generateQuizQuestions(requirements);
          navigation.navigate('Quiz', {
            requirements,
            questions,
          });
        } catch (error) {
          console.error('Erro ao gerar quiz:', error);
          showToast('Não foi possível gerar o quiz. Tente novamente.', 'error');
        }
      } else {
        try {
          const questions = await geminiService.generateQuestions(requirements);
          navigation.navigate('Interview', {
            requirements,
            questions,
          });
        } catch (error) {
          console.error('Erro ao gerar simulação:', error);
          showToast('Não foi possível gerar a simulação. Tente novamente.', 'error');
        }
      }
    } catch (error) {
      console.error('Erro ao processar informações da vaga:', error);
      
      let errorMessage = 'Ocorreu um erro ao processar as informações da vaga.';
      
      if (error instanceof Error) {
        if (error.message.includes('Links diretos não podem ser processados')) {
          errorMessage = 'Por favor, cole o texto da descrição da vaga ao invés do link.';
        } else if (error.message.includes('texto fornecido é muito curto')) {
          errorMessage = 'A descrição fornecida é muito curta. Adicione mais detalhes sobre a vaga.';
        } else if (error.message.includes('API key não configurada')) {
          errorMessage = 'Chave API não configurada. Por favor, configure nas configurações.';
        } else {
          errorMessage = error.message;
        }
      }
      
      showToast(errorMessage, 'error');
      setError(errorMessage);
    } finally {
      setLoading(false);
      setProcessingStep('');
    }
  };

  const renderProcessingStep = () => {
    if (!processingStep) return null;
    
    return (
      <View style={styles.processingContainer}>
        <ActivityIndicator color={theme.colors.primary} style={styles.spinner} />
        <Text style={styles.processingText}>{processingStep}</Text>
      </View>
    );
  };

  return (
    <SafeLayout>
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onDismiss={hideToast}
      />
      
      <KeyboardAwareView
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <AlfieAvatar
            size={60}
            expression={loading ? 'thinking' : 'happy'}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>Olá, {userName}! 👋</Text>
            <Text style={styles.title}>Vamos praticar?</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="school-outline"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={styles.cardTitle}>Modo de Prática</Text>
          </View>
          
          <Text style={styles.description}>
            Escolha como você quer praticar hoje:
          </Text>

          <View style={styles.modeSelectionContainer}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                { backgroundColor: selectedMode === 'interview' ? theme.colors.primary : `${theme.colors.primary}30` }
              ]}
              onPress={() => setSelectedMode('interview')}
              disabled={loading}
            >
              <MaterialCommunityIcons
                name="account-tie"
                size={24}
                color={selectedMode === 'interview' ? '#FFFFFF' : theme.colors.primary}
              />
              <View style={styles.modeButtonContent}>
                <Text style={[styles.modeButtonTitle, { color: selectedMode === 'interview' ? '#FFFFFF' : theme.colors.text }]}>
                  Simulação de Entrevista
                </Text>
                <Text style={[styles.modeButtonDescription, { color: selectedMode === 'interview' ? '#FFFFFF' : theme.colors.textSecondary }]}>
                  Pratique com perguntas abertas e receba feedback detalhado
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeButton,
                { backgroundColor: selectedMode === 'quiz' ? theme.colors.success : `${theme.colors.success}30` }
              ]}
              onPress={() => setSelectedMode('quiz')}
              disabled={loading}
            >
              <MaterialCommunityIcons
                name="help-circle"
                size={24}
                color={selectedMode === 'quiz' ? '#FFFFFF' : theme.colors.success}
              />
              <View style={styles.modeButtonContent}>
                <Text style={[styles.modeButtonTitle, { color: selectedMode === 'quiz' ? '#FFFFFF' : theme.colors.text }]}>
                  Quiz Técnico
                </Text>
                <Text style={[styles.modeButtonDescription, { color: selectedMode === 'quiz' ? '#FFFFFF' : theme.colors.textSecondary }]}>
                  Teste seus conhecimentos com perguntas de múltipla escolha
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.cardHeader, { marginTop: theme.spacing.xl }]}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={styles.cardTitle}>Descrição da Vaga</Text>
          </View>
          
          <Text style={styles.description}>
            Cole o texto da descrição da vaga ou liste os principais requisitos e responsabilidades
            que você quer praticar.
          </Text>
          
          <TextInput
            style={[
              styles.input,
              error ? styles.inputError : null
            ]}
            placeholder="Cole aqui a descrição da vaga..."
            placeholderTextColor={theme.colors.textSecondary}
            value={jobInfo}
            onChangeText={(text) => {
              setJobInfo(text);
              setError('');
            }}
            multiline
            numberOfLines={6}
            editable={!loading}
          />
          
          {error ? (
            <View style={styles.errorContainer}>
              <MaterialCommunityIcons
                name="alert-circle"
                size={20}
                color={theme.colors.error}
              />
              <Text style={styles.error}>{error}</Text>
            </View>
          ) : null}
          
          {renderProcessingStep()}
          
          <TouchableOpacity
            style={[
              styles.button,
              loading ? styles.buttonDisabled : null,
            ]}
            onPress={handleStartProcess}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Começar</Text>
            )}
          </TouchableOpacity>
        </View>

        {!loading && (
          <View style={styles.tipsCard}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons
                name="lightbulb-outline"
                size={24}
                color={theme.colors.primary}
              />
              <Text style={styles.cardTitle}>Dicas</Text>
            </View>
            
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <MaterialCommunityIcons
                  name="text-box-outline"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={styles.tipText}>Cole o texto completo da descrição da vaga</Text>
              </View>
              
              <View style={styles.tipItem}>
                <MaterialCommunityIcons
                  name="account-tie"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={styles.tipText}>Inclua requisitos técnicos e comportamentais</Text>
              </View>
              
              <View style={styles.tipItem}>
                <MaterialCommunityIcons
                  name="star-outline"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={styles.tipText}>Mencione o nível de experiência desejado</Text>
              </View>
              
              <View style={styles.tipItem}>
                <MaterialCommunityIcons
                  name="code-tags"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={styles.tipText}>Liste as principais tecnologias</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.socialContainer}>
          <Text style={styles.socialText}>Conecte-se comigo:</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => Linking.openURL('https://www.linkedin.com/in/pedroleda/')}
            >
              <Ionicons name="logo-linkedin" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => Linking.openURL('https://github.com/pedrinholeda')}
            >
              <Ionicons name="logo-github" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareView>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  avatar: {
    marginRight: theme.spacing.md,
  },
  greeting: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  description: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },
  input: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    color: theme.colors.text,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  error: {
    color: theme.colors.error,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    flexDirection: 'row',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: theme.spacing.sm,
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  spinner: {
    marginRight: theme.spacing.sm,
  },
  processingText: {
    color: theme.colors.text,
    fontSize: 14,
  },
  tipsCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
  },
  tipsList: {
    marginTop: theme.spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  tipText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  modeSelectionContainer: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  modeButtonContent: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  modeButtonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  modeButtonDescription: {
    fontSize: 14,
  },
  socialContainer: {
    marginTop: theme.spacing.lg,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  socialText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButton: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: `${theme.colors.primary}15`,
    borderRadius: theme.borderRadius.full,
  },
});

export default HomeScreen; 