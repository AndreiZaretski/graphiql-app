import Main from '@pages/Main/Main';
import { RoutesPath } from '@type/enums/routes.enum';
import NotFound from './NotFound';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { LanguageContext } from '@context/LanguageContext';
import { mockValueEn } from '@utils/test/mockLanguageContext';
import { Provider } from 'react-redux';
import { store } from '@store/store';

describe('NotFound', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    const routes = [
      {
        element: <Main />,
        path: RoutesPath.Main,
      },
      {
        element: <NotFound />,
        path: '*',
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/foo'],
    });

    render(
      <LanguageContext.Provider value={mockValueEn}>
        <RouterProvider router={router} />
      </LanguageContext.Provider>
    );
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('Ensure that the 404 page is not displayed when navigating to an correct route', async () => {
    const routes = [
      {
        element: <Main />,
        path: RoutesPath.Main,
      },
      {
        element: <NotFound />,
        path: '*',
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [RoutesPath.Main],
    });

    render(
      <LanguageContext.Provider value={mockValueEn}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </LanguageContext.Provider>
    );
    expect(screen.queryByText('Page not found')).not.toBeInTheDocument();
  });
});
