import { createContext, useState } from 'react';
import { LanguageKey } from '@type/enums/language.enum';
import { LanguageContent } from '@type/interfaces/languageContent.interface';
import en from '@utils/languages/en.json';
import ru from '@utils/languages/ru.json';
import { Props } from '@type/interfaces/props.interface';

interface LanguageContextType {
  data: LanguageContent;
  language: LanguageKey;
  setLanguage: (language: LanguageKey) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  data: en,
  language: LanguageKey.En,
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState(LanguageKey.En);

  let data: LanguageContent = en;
  switch (language) {
    case LanguageKey.En:
      data = en;
      break;
    case LanguageKey.Ru:
      data = ru;
      break;
    default:
      data = en;
  }

  return (
    <LanguageContext.Provider value={{ data, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
