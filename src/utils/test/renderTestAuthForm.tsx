import { UserContext } from '@context/AuthContext';
import { LanguageContextType, LanguageContext } from '@context/LanguageContext';
import { Router } from '@remix-run/router';
import { store } from '@store/store';
import { render } from '@testing-library/react';
import { UserContextType } from '@type/interfaces/auth.interface';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

export const renderForm = (
  valueLang: LanguageContextType,
  value: UserContextType | null,
  router: Router
) => {
  render(
    <LanguageContext.Provider value={valueLang}>
      <UserContext.Provider value={value}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </UserContext.Provider>
    </LanguageContext.Provider>
  );
};
