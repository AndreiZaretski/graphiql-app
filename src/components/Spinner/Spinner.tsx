import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.overlay} data-testid="spiner">
      <span className={styles.spiner}></span>
    </div>
  );
};

export default Spinner;
