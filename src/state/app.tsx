/**
 * Estado global do app: perfil, ajustes e a chave do Gemini. Carrega tudo do aparelho uma
 * vez, migra os dados da versão 1.0 e mantém o cliente do Gemini configurado.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { defaultSessionLength, type SessionLength } from '../config/practice';
import { gemini } from '../services/gemini';
import { keys, legacyKeys, readJson, remove, secret, writeJson } from '../storage';
import type { ThemePreference } from '../theme';

export interface Settings {
  sessionLength: SessionLength;
  theme: ThemePreference;
  introSeen: boolean;
  /** Modelo escolhido na última validação da chave. */
  model: string | null;
}

const defaultSettings: Settings = {
  sessionLength: defaultSessionLength,
  theme: 'system',
  introSeen: false,
  model: null,
};

interface AppState {
  ready: boolean;
  name: string;
  settings: Settings;
  hasApiKey: boolean;
  /** Chave salva mascarada para exibição ("•••• a91f"). */
  maskedKey: string | null;
  setName: (name: string) => Promise<void>;
  updateSettings: (patch: Partial<Settings>) => Promise<void>;
  /** Valida e salva a chave. Lança AiError se ela for recusada. */
  saveApiKey: (key: string) => Promise<void>;
  removeApiKey: () => Promise<void>;
  /** Apaga perfil, chave, ajustes, rascunho e histórico. */
  resetAll: () => Promise<void>;
}

const AppContext = createContext<AppState | null>(null);

const mask = (key: string) => `•••• ${key.slice(-4)}`;

/** Chave de desenvolvimento lida do .env (EXPO_PUBLIC_GEMINI_API_KEY), nunca embutida em build. */
export const devApiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [name, setNameState] = useState('');
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [maskedKey, setMaskedKey] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      let [profile, stored, key] = await Promise.all([
        readJson(keys.profile, { name: '' }),
        readJson<Settings>(keys.settings, defaultSettings),
        secret.get().catch(() => null),
      ]);

      // Migração da versão 1.0: nome e chave ficavam em texto puro no AsyncStorage.
      const [legacyName, legacyKey] = await Promise.all([
        AsyncStorage.getItem(legacyKeys.userName).catch(() => null),
        AsyncStorage.getItem(legacyKeys.apiKey).catch(() => null),
      ]);
      if (!profile.name && legacyName) {
        profile = { name: legacyName };
        await writeJson(keys.profile, profile);
      }
      if (!key && legacyKey) {
        key = legacyKey;
        await secret.set(legacyKey);
      }
      if (legacyName || legacyKey) {
        stored = { ...stored, introSeen: true };
        await writeJson(keys.settings, stored);
        await remove(legacyKeys.userName, legacyKeys.apiKey);
      }

      if (key) gemini.setApiKey(key, stored.model ?? undefined);
      if (!alive) return;
      setNameState(profile.name);
      setSettings(stored);
      setMaskedKey(key ? mask(key) : null);
      setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Ref com o valor atual: o updater do setState não roda na hora, então não serve para
  // saber o que gravar.
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const updateSettings = useCallback(async (patch: Partial<Settings>) => {
    const next = { ...settingsRef.current, ...patch };
    settingsRef.current = next;
    setSettings(next);
    await writeJson(keys.settings, next);
  }, []);

  // O cliente troca de modelo sozinho se o atual sair do ar; guarda a escolha nova.
  useEffect(() => {
    gemini.onModelChange = (model) => void updateSettings({ model });
    return () => {
      gemini.onModelChange = undefined;
    };
  }, [updateSettings]);

  const setName = useCallback(async (value: string) => {
    const trimmed = value.trim();
    setNameState(trimmed);
    await writeJson(keys.profile, { name: trimmed });
  }, []);

  const saveApiKey = useCallback(
    async (key: string) => {
      const trimmed = key.trim();
      const model = await gemini.validateKey(trimmed);
      await secret.set(trimmed);
      gemini.setApiKey(trimmed, model);
      setMaskedKey(mask(trimmed));
      await updateSettings({ model });
    },
    [updateSettings],
  );

  const removeApiKey = useCallback(async () => {
    await secret.clear();
    gemini.clear();
    setMaskedKey(null);
  }, []);

  const resetAll = useCallback(async () => {
    await secret.clear();
    await remove(keys.profile, keys.settings, keys.history, keys.draft, legacyKeys.history);
    gemini.clear();
    setMaskedKey(null);
    setNameState('');
    settingsRef.current = defaultSettings;
    setSettings(defaultSettings);
  }, []);

  const value = useMemo<AppState>(
    () => ({
      ready,
      name,
      settings,
      hasApiKey: maskedKey !== null,
      maskedKey,
      setName,
      updateSettings,
      saveApiKey,
      removeApiKey,
      resetAll,
    }),
    [ready, name, settings, maskedKey, setName, updateSettings, saveApiKey, removeApiKey, resetAll],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp precisa estar dentro de <AppProvider>');
  return context;
}
