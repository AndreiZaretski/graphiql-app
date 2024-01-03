import styles from './Welcome.module.scss';
import { Layout } from '@layout/Layout';
import AndreiPhoto from '@assets/images/And.png';
import OksanaPhoto from '@assets/images/Oks.png';
import MaxPhoto from '@assets/images/Max.png';
import { useContext } from 'react';
import { LanguageContext } from '@context/LanguageContext';
import { WelcomeDeveloperItem } from './WelcomeItem';

const Welcome = () => {
  const {
    data: {
      welcome: { rsSchool, aboutProject, projectDescription, developer, info },
    },
  } = useContext(LanguageContext);

  const developerImages = [AndreiPhoto, OksanaPhoto, MaxPhoto];

  return (
    <Layout>
      <div className={styles.info_header}>
        <div className={styles.info_rs}>
          <div className={styles.header}>RS School</div>
          <div className={styles.description}>{rsSchool}</div>
        </div>
        <div className={styles.info_project}>
          <div className={styles.header}>{aboutProject}</div>
          <div className={styles.description}> {projectDescription}</div>
        </div>
      </div>
      <div className={styles.about_us}>
        <div className={styles.header}>{developer}</div>
        {developerImages.map((item, index) => (
          <WelcomeDeveloperItem
            key={index}
            image={item}
            name={info[index].name}
            position={info[index].position}
            description={info[index].description}
          />
        ))}
      </div>
    </Layout>
  );
};

export { Welcome };
