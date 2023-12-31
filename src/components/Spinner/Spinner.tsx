import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.overlay}>
      <span className={styles.spiner}></span>
    </div>
  );
};

export default Spinner;
