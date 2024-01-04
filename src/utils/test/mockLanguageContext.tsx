import { LanguageContext } from '@context/LanguageContext';
import { render } from '@testing-library/react';
import { LanguageKey } from '@type/enums/language.enum';
import { Props } from '@type/interfaces/props.interface';
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

//ToDo Delete this after writen test if you don't need it

export const MockLanguageContextEn = ({ children }: Props) => {
  return render(
    <LanguageContext.Provider value={mockValueEn}>
      {children}
    </LanguageContext.Provider>
  );
};

export const MockLanguageContextRu = ({ children }: Props) => {
  return render(
    <LanguageContext.Provider value={mockValueRu}>
      {children}
    </LanguageContext.Provider>
  );
};
