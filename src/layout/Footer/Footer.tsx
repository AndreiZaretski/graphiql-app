import styles from './Footer.module.scss';
import rsLogo from '@assets/icons/rs_school.svg';
import { GitHubUrl } from './GitHubUrl';

const Footer = () => {
  const developersGitHubUrl = [
    'https://github.com/AndreiZaretski',
    'https://github.com/ksu1ven',
    'https://github.com/Maxxx1mHR',
  ];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer_wrapper}>
          <div className={styles.github_wrapper}>
            {developersGitHubUrl.map((link, index) => (
              <GitHubUrl key={index} url={link} />
            ))}
          </div>
          <div>copyright 2023</div>
          <a href="https://rs.school/">
            <img src={rsLogo} alt="rs school" className={styles.rs_logo}></img>
          </a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
