import { fireEvent, screen, waitFor } from '@testing-library/react';
import { RoutesPath } from '@type/enums/routes.enum';
import { createMemoryRouter } from 'react-router-dom';
import { SignIn } from './SignIn';
import {
  UserValueFailedMock,
  UnauthUserValue,
  mockSignInSuccess,
  mockSignInFailed,
} from '@utils/test/mockAuthContext';
import { mockValueEn } from '@utils/test/mockLanguageContext';
import { Router } from '@remix-run/router';
import { renderForm } from '@utils/test/renderTestAuthForm';

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

describe('SignIn', () => {
  beforeEach(() => {
    router = createMemoryRouter(routes, {
      initialEntries: [RoutesPath.Login],
      initialIndex: 0,
    });
  });
  it('should be button disabled and redirect on main page after success signin', async () => {
    renderForm(mockValueEn, UserValueFailedMock, router);

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

    expect(mockSignInSuccess).toHaveBeenCalledTimes(1);
    expect(router.state.location.pathname).toBe(RoutesPath.Main);
  });

  it("should be button disabled and don't redirect on main page after failed signin", async () => {
    renderForm(mockValueEn, UnauthUserValue, router);

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

    expect(mockSignInFailed).toHaveBeenCalledTimes(1);
    expect(router.state.location.pathname).toBe(RoutesPath.Login);
    const errorText = screen.getByTestId('errorFirebaseSignin');
    expect(errorText).toHaveTextContent(/Invalid username or password!/i);
  });
});
