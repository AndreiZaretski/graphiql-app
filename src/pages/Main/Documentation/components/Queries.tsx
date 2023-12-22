import { IntrospectionObjectType } from 'graphql';
import ReturnType from './ReturnType';
import { DocType } from '@type/interfaces/props.interface';

interface Props {
  queries: IntrospectionObjectType;
}

function Queries(props: Props) {
  const { queries } = props;

  return (
    queries && (
      <div className="docs-queries">
        {queries.fields.map((query) => (
          <div key={query.name}>
            <div>
              <span className="docs-query">{query.name}</span>
              <span>(</span>

              <span>
                {query.args &&
                  query.args.map((arg) => (
                    <div key={arg.name}>
                      <span className="docs-args">{arg.name}</span>:{' '}
                      <ReturnType type={arg.type as DocType} />
                      {arg.defaultValue && (
                        <span>
                          <span className="docs-defaultValue">
                            {arg.defaultValue}
                          </span>
                        </span>
                      )}
                    </div>
                  ))}
              </span>

              <span>
                ): <ReturnType type={query.type as DocType} />
              </span>
            </div>
            <div>{query.description}</div>
          </div>
        ))}
      </div>
    )
  );
}

export default Queries;
