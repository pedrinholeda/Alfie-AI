/** Histórico de sessões de prática, salvo no aparelho. */
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

import { maxHistoryItems } from '../config/practice';
import { addSession, migrateLegacyHistory } from '../lib/history';
import { keys, legacyKeys, readList, remove, writeJson } from '../storage';
import type { PracticeSession } from '../types/domain';

interface HistoryState {
  sessions: PracticeSession[];
  loaded: boolean;
  add: (session: PracticeSession) => Promise<void>;
  removeSession: (id: string) => Promise<void>;
  clear: () => Promise<void>;
  /** Recarrega do aparelho (depois de "apagar tudo" nos Ajustes). */
  reload: () => Promise<void>;
}

const HistoryContext = createContext<HistoryState | null>(null);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [loaded, setLoaded] = useState(false);

  const reload = useCallback(async () => {
    let list = await readList<PracticeSession>(keys.history);
    const legacy = await AsyncStorage.getItem(legacyKeys.history).catch(() => null);
    if (legacy) {
      try {
        list = [...list, ...migrateLegacyHistory(JSON.parse(legacy))].slice(0, maxHistoryItems);
      } catch {
        // Histórico antigo ilegível: descartado.
      }
      await writeJson(keys.history, list);
      await remove(legacyKeys.history);
    }
    setSessions(list);
    setLoaded(true);
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  // Ref com a lista atual: o updater do setState não roda na hora, então não serve para
  // saber o que gravar.
  const sessionsRef = useRef(sessions);
  sessionsRef.current = sessions;

  const persist = useCallback(async (update: (list: PracticeSession[]) => PracticeSession[]) => {
    const next = update(sessionsRef.current);
    sessionsRef.current = next;
    setSessions(next);
    await writeJson(keys.history, next);
  }, []);

  const add = useCallback(
    (session: PracticeSession) => persist((list) => addSession(list, session, maxHistoryItems)),
    [persist],
  );

  const removeSession = useCallback(
    (id: string) => persist((list) => list.filter((s) => s.id !== id)),
    [persist],
  );

  const clear = useCallback(() => persist(() => []), [persist]);

  const value = useMemo(
    () => ({ sessions, loaded, add, removeSession, clear, reload }),
    [sessions, loaded, add, removeSession, clear, reload],
  );

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}

export function useHistory(): HistoryState {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory precisa estar dentro de <HistoryProvider>');
  return context;
}
