import styles from './Footer.module.scss';
import rsLogo from '@assets/icons/rs_school.svg';
import githubLogo from '@assets/icons/github.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer_wrapper}>
          <div className={styles.github_wrapper}>
            <a href="https://github.com/AndreiZaretski">
              <img
                src={githubLogo}
                alt="gitHub link"
                className={styles.git_logo}
              />
            </a>
            <a href="https://github.com/ksu1ven">
              <img
                src={githubLogo}
                alt="gitHub link"
                className={styles.git_logo}
              />
            </a>
            <a href="https://github.com/Maxxx1mHR">
              <img
                src={githubLogo}
                alt="gitHub link"
                className={styles.git_logo}
              />
            </a>
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

export default Footer;
