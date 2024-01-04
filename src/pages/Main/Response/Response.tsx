import { prettifyData } from '@utils/prettify/prettify';
import { MirrorEditor } from '../Request/components/MirrorEditor/MirrorEditor';
import { ResponseProps } from '@type/interfaces/props.interface';
import styles from './Response.module.scss';

const Response = (props: ResponseProps) => {
  const { data } = props;

  return (
    <section className={styles.response} data-testid="response">
      <MirrorEditor
        height="550px"
        value={data ? prettifyData(JSON.stringify(data)) : ''}
        editable={false}
      />
    </section>
  );
};

export { Response };
