import { UserContext } from '@context/AuthContext';
import { LanguageContextType, LanguageContext } from '@context/LanguageContext';
import { store } from '@store/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RoutesPath } from '@type/enums/routes.enum';
import { UserContextType } from '@type/interfaces/auth.interface';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { SignIn } from './SignIn';
import {
  SignInUserValue,
  UnauthUserValue,
  mockSignInAuth,
  mockSignInUnauth,
} from '@utils/test/mockAuthContext';
import { mockValueEn } from '@utils/test/mockLanguageContext';
import { Router } from '@remix-run/router';

const routes = [
  {
    path: RoutesPath.Login,
    element: <SignIn />,
  },
  {
    path: RoutesPath.Main,
    element: <div>Text</div>,
  },
];

let router: Router;

const renderSignIn = (
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

describe('SignIn', () => {
  beforeEach(() => {
    router = createMemoryRouter(routes, {
      initialEntries: [RoutesPath.Login],
      initialIndex: 0,
    });
  });
  it('should be button disabled and redirect on main page after success signin', async () => {
    renderSignIn(mockValueEn, SignInUserValue);

    const button = screen.getByTestId('buttonSignin');
    const inputEmail = screen.getByTestId('inputSignInEmail');
    const inputPassword = screen.getByTestId('inputSignInPassword');

    expect(button).toBeDisabled();
    await waitFor(() => {
      fireEvent.change(inputEmail, { target: { value: 'emael@email.ru' } });
      fireEvent.change(inputPassword, { target: { value: 'Qw1234!@q' } });
    });
    expect(button).not.toBeDisabled();
    expect(router.state.location.pathname).toBe(RoutesPath.Login);

    await waitFor(() => {
      fireEvent.click(button);
    });

    expect(mockSignInAuth).toHaveBeenCalledTimes(1);
    expect(router.state.location.pathname).toBe(RoutesPath.Main);
  });

  it("should be button disabled and don't redirect on main page after failed signin", async () => {
    renderSignIn(mockValueEn, UnauthUserValue);
    const button = screen.getByTestId('buttonSignin');
    const inputEmail = screen.getByTestId('inputSignInEmail');
    const inputPassword = screen.getByTestId('inputSignInPassword');

    expect(button).toBeDisabled();
    await waitFor(() => {
      fireEvent.change(inputEmail, { target: { value: 'emael@email.ru' } });
      fireEvent.change(inputPassword, { target: { value: 'Qw1234!@q' } });
    });
    expect(button).not.toBeDisabled();
    expect(router.state.location.pathname).toBe(RoutesPath.Login);

    await waitFor(() => {
      fireEvent.click(button);
    });

    expect(mockSignInUnauth).toHaveBeenCalledTimes(1);
    expect(router.state.location.pathname).toBe(RoutesPath.Login);
    const errorText = screen.getByTestId('errorFirebaseSignin');
    expect(errorText).toHaveTextContent(/Invalid username or password!/i);
  });
});
