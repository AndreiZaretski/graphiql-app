import { useMemo } from 'react';
import {
  IntrospectionObjectType,
  IntrospectionSchema,
  IntrospectionType,
} from 'graphql';
import { Queries } from './components/Queries';
import { Types } from './components/Types';
import { useDispatch, useSelector } from 'react-redux';
import {
  setOpenQueries,
  setOpenTypes,
} from '@store/features/documentationSlice';
import {
  memoizedSelectOpenQueries,
  memoizedSelectOpenTypes,
} from '@store/selectors/selectors';
import styles from './Documentation.module.scss';

interface Props {
  schema: IntrospectionSchema;
}

function Documentation(props: Props) {
  const { schema } = props;
  const openTypes = useSelector(memoizedSelectOpenTypes);
  const openQueries = useSelector(memoizedSelectOpenQueries);
  const dispatch = useDispatch();
  const queryTypeName = schema.queryType.name;
  const queryType = useMemo(
    () => schema?.types.find(({ name }) => name === queryTypeName),
    [schema, queryTypeName]
  );
  const mainTypes = useMemo(
    () =>
      schema?.types.filter(
        ({ name }) => name !== queryTypeName && !name.startsWith('__')
      ),
    [schema, queryTypeName]
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
