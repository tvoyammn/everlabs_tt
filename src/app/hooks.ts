import { useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) as string) || initialValue
    } catch {
      return initialValue;
    }
  });

  const save = (value: unknown) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  return [value, save];
}
