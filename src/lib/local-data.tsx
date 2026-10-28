import { useEffect, useState, type ReactNode } from 'react';
import { dataSchema, emptyData, type LocalData } from './custom-data';
import { LocalDataContext } from './local-data-context';
import { toast } from 'sonner';

const KEY = 'm4t:custom-data-v1';

export function LocalDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<LocalData>(emptyData);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setData(dataSchema.parse(JSON.parse(raw)));
    } catch {
      toast.error('Nie można odczytać danych lokalnych. Nie zostały nadpisane.');
    }
    setReady(true);
    const sync = (e: StorageEvent) => {
      if (e.key === KEY && e.newValue)
        try {
          setData(dataSchema.parse(JSON.parse(e.newValue)));
        } catch {
          toast.error('Nieprawidłowe dane z innej karty.');
        }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const update = (fn: (d: LocalData) => LocalData) => {
    if (!ready) return false;
    try {
      const next = dataSchema.parse(fn(data));
      localStorage.setItem(KEY, JSON.stringify(next));
      setData(next);
      return true;
    } catch {
      toast.error('Nie udało się zapisać. Sprawdź dane lub wolne miejsce; pobierz kopię JSON.');
      return false;
    }
  };

  return <LocalDataContext.Provider value={{ data, ready, update }}>{children}</LocalDataContext.Provider>;
}
