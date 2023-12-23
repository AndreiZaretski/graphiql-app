import { prettifyData } from '@utils/prettify/prettify';
import MirrorEditor from '../Request/components/MirrorEditor/MirrorEditor';
import { ResponseProps } from '@type/interfaces/props.interface';

const Response = (props: ResponseProps) => {
  const { data } = props;

  return (
    <section>
      <MirrorEditor
        height="500px"
        value={data ? prettifyData(JSON.stringify(data)) : ''}
        editable={false}
      />
    </section>
  );
};

export default Response;
