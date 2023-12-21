import {
  IntrospectionObjectType,
  IntrospectionSchema,
  IntrospectionType,
} from 'graphql';
import Queries from './components/Queries';
import Types from './components/Types';
import './Documentation.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import {
  setOpenQueries,
  setOpenTypes,
} from '@store/features/documentationSlice';

interface Props {
  schema: IntrospectionSchema;
}

function Documentation(props: Props) {
  const { schema } = props;
  const openTypes = useSelector(
    (state: RootState) => state.documentationSlice.openTypes
  );
  const openQueries = useSelector(
    (state: RootState) => state.documentationSlice.openQueries
  );
  const dispatch = useDispatch();
  const queryType = schema?.types.find(({ name }) => name === 'Query');
  const mainTypes = schema?.types.filter(
    ({ name }) => name !== 'Query' && !name.startsWith('__')
  );

  return (
    schema && (
      <div className="docs">
        <span>
          <button
            className="docs-link docs-base"
            onClick={() => {
              dispatch(setOpenTypes(true));
              dispatch(setOpenQueries(false));
            }}
          >
            Types
          </button>
          {!openTypes && <span className="docs-symbol"> ▼</span>}
        </span>

        {openTypes && (
          <div className="docs-nested">
            <Types types={mainTypes as ReadonlyArray<IntrospectionType>} />
          </div>
        )}
        <span>
          <button
            className="docs-link docs-base"
            onClick={() => {
              dispatch(setOpenTypes(false));
              dispatch(setOpenQueries(true));
            }}
          >
            Query
          </button>
          {!openQueries && <span className="docs-symbol"> ▼</span>}
        </span>

        {openQueries && (
          <div className="docs-nested">
            <Queries queries={queryType as IntrospectionObjectType} />
          </div>
        )}
      </div>
    )
  );
}

export default Documentation;
