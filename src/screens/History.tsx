import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { theme } from '../styles/theme';
import SafeLayout from '../components/SafeLayout';
import Header from '../components/Header';
import { useFeedbackHistory } from '../contexts/FeedbackHistoryContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const History: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { history, clearHistory } = useFeedbackHistory();

  const handleClearHistory = () => {
    Alert.alert(
      'Limpar Histórico',
      'Tem certeza que deseja limpar todo o histórico de feedbacks?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: clearHistory,
        },
      ],
    );
  };

  const handleViewFeedback = (item: any) => {
    navigation.navigate('Results', {
      ...(item.type === 'quiz'
        ? {
            score: item.score,
            total: item.totalQuestions,
          }
        : {
            questions: item.questions,
            answers: item.answers,
            requirements: item.requirements,
          }),
    });
  };

  const renderItem = ({ item }: { item: any }) => {
    const date = format(new Date(item.date), "dd 'de' MMMM', às' HH:mm", {
      locale: ptBR,
    });

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleViewFeedback(item)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            {item.type === 'quiz' ? 'Quiz' : 'Entrevista'}
          </Text>
          <Text
            style={[
              styles.score,
              {
                color:
                  item.score >= 7
                    ? theme.colors.success
                    : item.score >= 5
                    ? theme.colors.warning
                    : theme.colors.error,
              },
            ]}
          >
            {item.type === 'quiz'
              ? `${((item.score / item.totalQuestions) * 100).toFixed(1)}%`
              : item.score.toFixed(1)}
          </Text>
        </View>

        <Text style={styles.date}>{date}</Text>

        {item.type === 'quiz' ? (
          <Text style={styles.details}>
            {item.score} de {item.totalQuestions} questões corretas
          </Text>
        ) : (
          <Text style={styles.details}>
            {item.answers?.length || 0} perguntas respondidas
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeLayout>
      <Header
        title="Histórico"
        onBack={() => navigation.goBack()}
        rightComponent={
          history.length > 0 && (
            <TouchableOpacity
              onPress={handleClearHistory}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.clearButton}>Limpar</Text>
            </TouchableOpacity>
          )
        }
      />

      {history.length > 0 ? (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Você ainda não tem nenhum feedback salvo.
          </Text>
          <Text style={styles.emptySubtext}>
            Complete um quiz ou uma entrevista para começar seu histórico.
          </Text>
        </View>
      )}
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: theme.colors.text + 'CC',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: theme.colors.text,
  },
  clearButton: {
    color: theme.colors.error,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: theme.colors.text + 'CC',
    textAlign: 'center',
  },
});

export default History; 