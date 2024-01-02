import { IntrospectionObjectType } from 'graphql';
import ReturnType from './ReturnType';
import { DocType } from '@type/interfaces/props.interface';
import styles from '../Documentation.module.scss';

interface Props {
  queries: IntrospectionObjectType;
}

function Queries(props: Props) {
  const { queries } = props;

  return (
    queries && (
      <div className={styles.docs__queries}>
        {queries.fields.map((query) => (
          <div key={query.name}>
            <div>
              <span className={styles.docs__query}>{query.name}</span>
              <span>(</span>

              <span>
                {query.args &&
                  query.args.map((arg) => (
                    <div key={arg.name}>
                      <span className={styles.docs__args}>{arg.name}</span>:{' '}
                      <ReturnType type={arg.type as DocType} />
                      {arg.defaultValue && (
                        <span>
                          <span className={styles.docs__defaultValue}>
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
            <div className={styles.docs__description}>{query.description}</div>
          </div>
        ))}
      </div>
    )
  );
}

export default Queries;
