import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { RoutesPath } from './utils/enums/routes.enum';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoutes from './utils/protectedRoutes/ProtectedRoute';
import Main from './pages/Main/Main';
import Welcome from './pages/Welcome/Welcome';
import Login from './pages/Login/Login';

function App() {
  return (
    <>
      {/* <Provider store={store}> */}
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
      {/* </Provider> */}
    </>
  );
}

export default App;
