import styles from '@layout/Header/Header.module.scss';
import { Link } from 'react-router-dom';

interface NavigationLinkProps {
  to: string;
  text: string;
  onClick?: () => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  to,
  text,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <li className={styles.navigation__item}>
      <Link to={to} className="link" onClick={handleClick}>
        {text}
      </Link>
    </li>
  );
};

export { NavigationLink };
