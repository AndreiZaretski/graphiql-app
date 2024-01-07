import { LanguageContextType } from '@context/LanguageContext';
import { LanguageKey } from '@type/enums/language.enum';
import en from '@utils/languages/en.json';
import ru from '@utils/languages/ru.json';

export const mockValueEn: LanguageContextType = {
  data: en,
  language: LanguageKey.En,
  setLanguage: vi.fn(),
};

export const mockValueRu: LanguageContextType = {
  data: ru,
  language: LanguageKey.Ru,
  setLanguage: vi.fn(),
};
