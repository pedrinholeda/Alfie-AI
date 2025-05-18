import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { geminiService } from '../services/gemini';

interface ApiKeyContextData {
  apiKey: string | null;
  setApiKey: (key: string) => Promise<boolean>;
  isKeyValid: boolean;
  validateKey: (key: string) => Promise<boolean>;
  loading: boolean;
  needsApiKey: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextData>({} as ApiKeyContextData);

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [isKeyValid, setIsKeyValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [needsApiKey, setNeedsApiKey] = useState(false);

  useEffect(() => {
    loadStoredApiKey();
  }, []);

  const loadStoredApiKey = async () => {
    try {
      setLoading(true);
      setNeedsApiKey(false);

      // Primeiro, tentar usar a chave do .env
      if (geminiService.isConfigured()) {
        try {
          const isValid = await geminiService.validateApiKey();
          if (isValid) {
            setApiKeyState(geminiService.getApiKey());
            setIsKeyValid(true);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error('Erro ao validar API key do .env:', error);
        }
      }

      // Se não tiver chave no .env ou ela for inválida, tentar do AsyncStorage
      const storedKey = await AsyncStorage.getItem('@AlfieApp:apiKey');
      if (storedKey) {
        try {
          const isValid = await geminiService.validateApiKey(storedKey);
          if (isValid) {
            setApiKeyState(storedKey);
            geminiService.setApiKey(storedKey);
            setIsKeyValid(true);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error('Erro ao validar API key do AsyncStorage:', error);
          await AsyncStorage.removeItem('@AlfieApp:apiKey');
        }
      }

      // Se chegou aqui, precisa de uma API key
      setNeedsApiKey(true);
      setIsKeyValid(false);
      setApiKeyState(null);
    } catch (error) {
      console.error('Erro ao carregar API key:', error);
      setNeedsApiKey(true);
      setIsKeyValid(false);
      setApiKeyState(null);
    } finally {
      setLoading(false);
    }
  };

  const setApiKey = async (key: string): Promise<boolean> => {
    try {
      const isValid = await geminiService.validateApiKey(key);
      if (isValid) {
        await AsyncStorage.setItem('@AlfieApp:apiKey', key);
        setApiKeyState(key);
        geminiService.setApiKey(key);
        setIsKeyValid(true);
        setNeedsApiKey(false);
        return true;
      }
      setNeedsApiKey(true);
      return false;
    } catch (error) {
      console.error('Erro ao salvar API key:', error);
      setNeedsApiKey(true);
      return false;
    }
  };

  const validateKey = async (key: string): Promise<boolean> => {
    try {
      return await geminiService.validateApiKey(key);
    } catch (error) {
      console.error('Erro ao validar API key:', error);
      return false;
    }
  };

  return (
    <ApiKeyContext.Provider
      value={{
        apiKey,
        setApiKey,
        isKeyValid,
        validateKey,
        loading,
        needsApiKey
      }}
    >
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
}; 