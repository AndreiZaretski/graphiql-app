import { waitFor, screen, fireEvent } from '@testing-library/react';
import { createMemoryRouter } from 'react-router-dom';
import { Logout } from './Logout';
import { mockValueEn } from '@utils/test/mockLanguageContext';
import { RoutesPath } from '@type/enums/routes.enum';
import { AuthUserValue, mockLogoutAuth } from '@utils/test/mockAuthContext';
import { renderForm } from '@utils/test/renderTestAuthForm';

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

describe('LogOut', () => {
  it('should logout', async () => {
    renderForm(mockValueEn, AuthUserValue, router);
    const button = screen.getByText('Logout');

    expect(button).toBeInTheDocument();
    expect(router.state.location.pathname).toBe(RoutesPath.Main);

    await waitFor(() => fireEvent.click(button));

    expect(mockLogoutAuth).toHaveBeenCalledTimes(1);
    expect(router.state.location.pathname).toBe('/');
  });
});
