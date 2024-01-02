import {
  IntrospectionObjectType,
  IntrospectionSchema,
  IntrospectionType,
} from 'graphql';
import Queries from './components/Queries';
import Types from './components/Types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import {
  setOpenQueries,
  setOpenTypes,
} from '@store/features/documentationSlice';
import styles from './Documentation.module.scss';

interface Props {
  schema: IntrospectionSchema;
}

function Documentation(props: Props) {
  const { schema } = props;
  console.log(schema);
  const openTypes = useSelector(
    (state: RootState) => state.documentationSlice.openTypes
  );
  const openQueries = useSelector(
    (state: RootState) => state.documentationSlice.openQueries
  );
  const dispatch = useDispatch();
  const queryType = schema?.types.find(
    ({ name }) => name === 'Query' || name === 'Root' || name === 'query_root'
  );
  const mainTypes = schema?.types.filter(
    ({ name }) => name !== 'Query' && !name.startsWith('__')
  );

  return (
    schema && (
      <div className={styles.docs}>
        <span>
          <button
            className={`link ${styles.docs__link} ${styles.docs__base}`}
            onClick={() => {
              dispatch(setOpenTypes(true));
              dispatch(setOpenQueries(false));
            }}
          >
            Types
          </button>
          {!openTypes && <span className={styles.docs__symbol}> ▼</span>}
        </span>

        {openTypes && (
          <div className={styles.docs__nested}>
            <Types types={mainTypes as ReadonlyArray<IntrospectionType>} />
          </div>
        )}
        <span>
          <button
            className={`link ${styles.docs__link} ${styles.docs__base}`}
            onClick={() => {
              dispatch(setOpenTypes(false));
              dispatch(setOpenQueries(true));
            }}
          >
            Query
          </button>
          {!openQueries && <span className={styles.docs__symbol}> ▼</span>}
        </span>

        {openQueries && (
          <div className={styles.docs__nested}>
            <Queries queries={queryType as IntrospectionObjectType} />
          </div>
        )}
      </div>
    )
  );
}

export default Documentation;
