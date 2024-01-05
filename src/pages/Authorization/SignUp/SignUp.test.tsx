import { fireEvent, screen, waitFor } from '@testing-library/react';
import { RoutesPath } from '@type/enums/routes.enum';
import { createMemoryRouter } from 'react-router-dom';
import { SignUp } from './SignUp';
import {
  UserValueFailedMock,
  UnauthUserValue,
  mockCreateUserSuccess,
  mockCreateUserFailed,
} from '@utils/test/mockAuthContext';
import { mockValueEn } from '@utils/test/mockLanguageContext';
import { Router } from '@remix-run/router';
import { renderForm } from '@utils/test/renderTestAuthForm';

const routes = [
  {
    path: RoutesPath.SignUp,
    element: <SignUp />,
  },
  {
    path: RoutesPath.Main,
    element: <div>Text</div>,
  },
];

let router: Router;

describe('SignUp', () => {
  beforeEach(() => {
    router = createMemoryRouter(routes, {
      initialEntries: [RoutesPath.SignUp],
      initialIndex: 0,
    });
  });

  it('should be error message if is not valid form', async () => {
    renderForm(mockValueEn, UserValueFailedMock, router);

    const inputEmail = screen.getByTestId('inputSignUpEmail');
    const inputPassword = screen.getByTestId('inputSignUpPassword');
    const inputPasswordRepeat = screen.getByTestId('inputSignUpPasswordRepeat');
    const errorEmail = screen.getByTestId('errorEmail');
    const passwordError = screen.getByTestId('passwordError');
    const passwordErrorRepeat = screen.getByTestId('passwordErrorRepeat');

    await waitFor(() => {
      fireEvent.change(inputEmail, { target: { value: 'email' } });
      fireEvent.change(inputPassword, { target: { value: 'Qw123' } });
      fireEvent.change(inputPasswordRepeat, {
        target: { value: 'Qw1234!@q12' },
      });
    });

    expect(errorEmail).toHaveTextContent(/Email is invalid/i);
    expect(passwordError).toHaveTextContent(/Minimum 8 characters!/i);
    expect(passwordErrorRepeat).toHaveTextContent(/Passwords not match!/i);

    await waitFor(() => {
      fireEvent.change(inputPassword, { target: { value: 'Qwhhhhhhhh' } });
    });

    expect(passwordError).toHaveTextContent(/Must contain number!/i);

    await waitFor(() => {
      fireEvent.change(inputPassword, { target: { value: 'Qwhhhhhhhh1' } });
    });

    expect(passwordError).toHaveTextContent(
      'Must contain one character ~!@#$%^&*()_+"№;:?*'
    );

    await waitFor(() => {
      fireEvent.change(inputPassword, { target: { value: 'whhhhhhhh1' } });
    });

    expect(passwordError).toHaveTextContent(
      /Must contain one uppercase letter!/i
    );
  });

  it('should be button disabled and redirect on main page after success signin', async () => {
    renderForm(mockValueEn, UserValueFailedMock, router);

    const button = screen.getByTestId('buttonSignUp');
    const inputEmail = screen.getByTestId('inputSignUpEmail');
    const inputPassword = screen.getByTestId('inputSignUpPassword');
    const inputPasswordRepeat = screen.getByTestId('inputSignUpPasswordRepeat');

    expect(button).toBeDisabled();
    await waitFor(() => {
      fireEvent.change(inputEmail, { target: { value: 'emael@email.ru' } });
      fireEvent.change(inputPassword, { target: { value: 'Qw1234!@q' } });
      fireEvent.change(inputPasswordRepeat, {
        target: { value: 'Qw1234!@q' },
      });
    });

    expect(button).not.toBeDisabled();
    expect(router.state.location.pathname).toBe(RoutesPath.SignUp);

    await waitFor(() => {
      fireEvent.click(button);
    });

    expect(mockCreateUserSuccess).toHaveBeenCalledTimes(1);
    expect(router.state.location.pathname).toBe(RoutesPath.Main);
  });

  it("should be button disabled and don't redirect on main page after failed signin", async () => {
    renderForm(mockValueEn, UnauthUserValue, router);

    const button = screen.getByTestId('buttonSignUp');
    const inputEmail = screen.getByTestId('inputSignUpEmail');
    const inputPassword = screen.getByTestId('inputSignUpPassword');
    const inputPasswordRepeat = screen.getByTestId('inputSignUpPasswordRepeat');

    expect(button).toBeDisabled();
    await waitFor(() => {
      fireEvent.change(inputEmail, { target: { value: 'emael@email.ru' } });
      fireEvent.change(inputPassword, { target: { value: 'Qw1234!@q' } });
      fireEvent.change(inputPasswordRepeat, {
        target: { value: 'Qw1234!@q' },
      });
    });

    expect(button).not.toBeDisabled();
    expect(router.state.location.pathname).toBe(RoutesPath.SignUp);

    await waitFor(() => {
      fireEvent.click(button);
    });

    expect(mockCreateUserFailed).toHaveBeenCalledTimes(1);
    expect(router.state.location.pathname).toBe(RoutesPath.SignUp);
    const errorText = screen.getByTestId('errorFirebaseSignUp');
    expect(errorText).toHaveTextContent(
      /The username is occupied by another user!/i
    );
  });
});
