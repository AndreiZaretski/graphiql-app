import styles from '@layout/Header/Header.module.scss';
import { NavigationLinkProps } from '@type/interfaces/props.interface';
import { Link } from 'react-router-dom';

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
