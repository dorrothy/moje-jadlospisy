import { createContext, useContext } from 'react';
import type { LocalData } from './custom-data';

export interface LocalDataContextValue {
  data: LocalData;
  ready: boolean;
  update: (fn: (d: LocalData) => LocalData) => boolean;
}

export const LocalDataContext = createContext<LocalDataContextValue | null>(null);

export function useLocalData(): LocalDataContextValue {
  const value = useContext(LocalDataContext);
  if (!value) throw new Error('Brak dostawcy danych lokalnych');
  return value;
}
