import { LanguageKey } from '@type/enums/language.enum';
import en from '@utils/languages/en.json';
import ru from '@utils/languages/ru.json';

export const mockValueEn = {
  data: en,
  language: LanguageKey.En,
  setLanguage: vi.fn(),
};

export const mockValueRu = {
  data: ru,
  language: LanguageKey.Ru,
  setLanguage: vi.fn(),
};
