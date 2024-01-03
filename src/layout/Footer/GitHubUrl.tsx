import githubLogo from '@assets/icons/github.svg';
import styles from './Footer.module.scss';

const GitHubUrl = ({ url }: { url: string }) => {
  return (
    <a href={url}>
      <img src={githubLogo} alt="gitHub link" className={styles.git_logo} />
    </a>
  );
};

export { GitHubUrl };
