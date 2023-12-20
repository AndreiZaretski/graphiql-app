import { UserContext } from '@context/AuthContext';
import { LanguageContext } from '@context/LanguageContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(UserContext) || {};
  const {
    data: {
      auth: { logOut },
    },
  } = useContext(LanguageContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout?.();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handleLogout}>{logOut}</button>;
};

export default Logout;
