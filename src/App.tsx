import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { Main } from '@pages/Main/Main';
import { NotFound } from '@pages/NotFound/NotFound';
import { Welcome } from '@pages/Welcome/Welcome';
import { store } from '@store/store';
import { RoutesPath } from '@type/enums/routes.enum';
import { ProtectedRoutes } from '@utils/protectedRoutes/ProtectedRoute';
import { Provider } from 'react-redux';
import { SignUp } from '@pages/Authorization/SignUp/SignUp';
import { SignIn } from '@pages/Authorization/SignIn/SignIn';
import { AuthContextProvider } from '@context/AuthContext';

function App() {
  return (
    <>
      <Provider store={store}>
        <AuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path={RoutesPath.Welcome}
                element={<Welcome />}
                errorElement={<NotFound />}
              />
              <Route
                path={RoutesPath.Main}
                element={
                  <ProtectedRoutes>
                    <Main />
                  </ProtectedRoutes>
                }
                errorElement={<NotFound />}
              />
              <Route
                path={RoutesPath.Login}
                element={<SignIn />}
                errorElement={<NotFound />}
              />
              <Route
                path={RoutesPath.SignUp}
                element={<SignUp />}
                errorElement={<NotFound />}
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </Provider>
    </>
  );
}

export { App };
