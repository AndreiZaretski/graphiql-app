import styles from './Welcome.module.scss';
import Layout from '@layout/Layout';
import AndreiPhoto from '../../images/And.png';
import OksanaPhoto from '../../images/Oks.png';
import MaxPhoto from '../../images/Max.png';
import { useContext } from 'react';
import { LanguageContext } from '@context/LanguageContext';

const Welcome = () => {
  const {
    data: {
      welcome: {
        rsSchool,
        aboutProject,
        projectDescription,
        developer,
        positionTeamLead,
        position,
        info: { andrei, oksana, max },
      },
    },
  } = useContext(LanguageContext);

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

        <div className={`${styles.about_item} shadow`}>
          <div className={styles.image_wrapper}>
            <img src={AndreiPhoto} alt="Andrei" className={styles.image} />
            <div>
              <div className={styles.name}>{andrei.name}</div>
              <div className={styles.position}>{positionTeamLead}</div>
            </div>
          </div>
          <div className={styles.description}>{andrei.description}</div>
        </div>
        <div className={`${styles.about_item} shadow`}>
          <div className={styles.image_wrapper}>
            <img src={OksanaPhoto} alt="Oksana" className={styles.image} />
            <div>
              <div className={styles.name}>{oksana.name}</div>
              <div className={styles.position}>{position}</div>
            </div>
          </div>
          <div className={styles.description}>{oksana.description}</div>
        </div>
        <div className={`${styles.about_item} shadow`}>
          <div className={styles.image_wrapper}>
            <img src={MaxPhoto} alt="Max" className={styles.image} />
            <div>
              <div className={styles.name}>{max.name}</div>
              <div className={styles.position}>{position}</div>
            </div>
          </div>
          <div className={styles.description}>{max.description}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
