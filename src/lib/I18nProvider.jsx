'use client';

import { I18nextProvider } from 'react-i18next';
// CORREÇÃO ESSENCIAL: Garante que importamos a instância i18n
import i18n from './i18n'; 

export default function I18nProvider({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}