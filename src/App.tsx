import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Login from '@pages/Login/Login';
import Main from '@pages/Main/Main';
import NotFound from '@pages/NotFound/NotFound';
import Welcome from '@pages/Welcome/Welcome';
import { store } from '@store/store';
import { RoutesPath } from '@type/enums/routes.enum';
import ProtectedRoutes from '@utils/protectedRoutes/ProtectedRoute';
import { Provider } from 'react-redux';

function App() {
  //throw new Error('ha ha ha');
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path={RoutesPath.Welcome}
              element={<Welcome />}
              errorElement={<NotFound />}
            />
            <Route
              path={RoutesPath.Login}
              element={<Login />}
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

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
