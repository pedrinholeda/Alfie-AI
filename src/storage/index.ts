/**
 * Persistência local. Tudo fica no aparelho: o Alfie não tem servidor.
 *
 * A chave do Gemini vai para o armazenamento seguro do sistema (Keychain no iOS, Keystore no
 * Android). Na web não existe esse cofre, então ela fica no armazenamento do navegador, e a
 * tela de configuração avisa isso.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const PREFIX = '@alfie:';

export const keys = {
  profile: `${PREFIX}profile`,
  settings: `${PREFIX}settings`,
  history: `${PREFIX}history`,
  draft: `${PREFIX}draft`,
  /** Nome no SecureStore só aceita letras, números, ".", "-" e "_". */
  apiKey: 'alfie.geminiApiKey',
} as const;

/** Chaves da versão 1.0, migradas na primeira abertura. */
export const legacyKeys = {
  apiKey: '@AlfieApp:apiKey',
  userName: '@AlfieApp:userName',
  history: '@AlfieApp:feedbackHistory',
} as const;

export async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? { ...fallbackObject(fallback), ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

/** Para listas, devolve a lista; para objetos, mescla com o padrão (campos novos). */
function fallbackObject<T>(fallback: T): T | object {
  return Array.isArray(fallback) || typeof fallback !== 'object' ? {} : (fallback as object);
}

export async function readList<T>(key: string): Promise<T[]> {
  try {
    const raw = await AsyncStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeJson(key: string, value: unknown): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function remove(...names: string[]): Promise<void> {
  await AsyncStorage.multiRemove(names);
}

const secureAvailable = Platform.OS === 'ios' || Platform.OS === 'android';

export const secret = {
  async get(): Promise<string | null> {
    if (secureAvailable) return SecureStore.getItemAsync(keys.apiKey);
    return AsyncStorage.getItem(keys.apiKey);
  },
  async set(value: string): Promise<void> {
    if (secureAvailable) return SecureStore.setItemAsync(keys.apiKey, value);
    return AsyncStorage.setItem(keys.apiKey, value);
  },
  async clear(): Promise<void> {
    if (secureAvailable) return SecureStore.deleteItemAsync(keys.apiKey);
    return AsyncStorage.removeItem(keys.apiKey);
  },
  /** Diz se a chave fica no cofre do sistema (celular) ou no navegador. */
  secure: secureAvailable,
};
