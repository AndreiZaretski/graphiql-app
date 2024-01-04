import { UserContext } from '@context/AuthContext';
import { LanguageContextType, LanguageContext } from '@context/LanguageContext';
import { store } from '@store/store';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { UserContextType } from '@type/interfaces/auth.interface';
import { Provider } from 'react-redux';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Logout } from './Logout';
import { mockValueEn } from '@utils/test/mockLanguageContext';
import { RoutesPath } from '@type/enums/routes.enum';
import { AuthUserValue, mockLogoutAuth } from '@utils/test/mockAuthContext';

const routes = [
  {
    path: RoutesPath.Main,
    element: <Logout />,
  },
  {
    path: '',
    element: <div>Text</div>,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: [RoutesPath.Main],
  initialIndex: 0,
});

const renderLogout = (
  valueLang: LanguageContextType,
  value: UserContextType | null
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

describe('LogOut', () => {
  it('should logout', async () => {
    renderLogout(mockValueEn, AuthUserValue);
    const button = screen.getByText('Logout');

    expect(button).toBeInTheDocument();
    expect(router.state.location.pathname).toBe(RoutesPath.Main);

    await waitFor(() => fireEvent.click(button));

    expect(mockLogoutAuth).toHaveBeenCalledTimes(1);
    expect(router.state.location.pathname).toBe('/');
  });
});
