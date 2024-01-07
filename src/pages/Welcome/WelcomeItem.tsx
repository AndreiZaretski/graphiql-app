import React from 'react';
import styles from './Welcome.module.scss';

interface DeveloperProps {
  image: string;
  name: string;
  position: string;
  description: string;
}

const WelcomeDeveloperItem: React.FC<DeveloperProps> = ({
  image,
  name,
  position,
  description,
}) => {
  return (
    <div className={styles.about_item}>
      <div className={styles.image_wrapper}>
        <img src={image} alt="Developer photo" className={styles.image} />
        <div>
          <div className={styles.name}>{name}</div>
          <div className={styles.position}>{position}</div>
        </div>
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export { WelcomeDeveloperItem };
