import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '@context/AuthContext';
import { UserContextType } from '@type/interfaces/auth.interface';
import { AuthUserValue, UnauthUserValue } from '@utils/test/mockAuthContext';
import ProtectedRoutes from './ProtectedRoute';

const Home = () => <h1>Home</h1>;
const Login = () => <h1>Login</h1>;

const renderProtectedRoutes = (
  value: UserContextType | null,
  initialEntries: string[]
) => {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <UserContext.Provider value={value}>
        <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>
        <Login />
      </UserContext.Provider>
    </MemoryRouter>
  );
};

describe('ProtectedRoutes', () => {
  it('should render children component if user is authenticated', () => {
    renderProtectedRoutes(AuthUserValue, ['/']);
    const homeElement = screen.getByText(/home/i);
    expect(homeElement).toBeInTheDocument();
  });

  it('should redirect to login page if user is not authenticated', () => {
    renderProtectedRoutes(UnauthUserValue, ['/']);
    const loginElement = screen.getByText(/login/i);
    expect(loginElement).toBeInTheDocument();
  });
});
