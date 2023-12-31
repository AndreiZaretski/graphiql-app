import { createContext, useState } from 'react';
import { LanguageKey } from '@type/enums/language.enum';
import { LanguageContent } from '@type/interfaces/languageContent.interface';
import en from '@utils/languages/en.json';
import ru from '@utils/languages/ru.json';
import { Props } from '@type/interfaces/props.interface';
import { LocalStorageServise } from '@services/localStorageService';

interface LanguageContextType {
  data: LanguageContent;
  language: LanguageKey | string;
  setLanguage: (language: LanguageKey) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  data: en,
  language: LanguageKey.En,
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState(
    LocalStorageServise.get('lang') || LanguageKey.En
  );

  let data: LanguageContent;
  switch (language) {
    case LanguageKey.En:
      data = en;
      LocalStorageServise.set('lang', LanguageKey.En);
      break;
    case LanguageKey.Ru:
      data = ru;
      LocalStorageServise.set('lang', LanguageKey.Ru);
      break;
    default:
      data = en;
      LocalStorageServise.set('lang', LanguageKey.En);
  }

  return (
    <LanguageContext.Provider value={{ data, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
