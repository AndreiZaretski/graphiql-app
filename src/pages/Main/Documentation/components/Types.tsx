import { useEffect, useState, useRef, useLayoutEffect, useMemo } from 'react';
import { IntrospectionType } from 'graphql';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedType } from '@store/features/documentationSlice';
import { ReturnType } from './ReturnType';
import { memoizedSelectSelectedType } from '@store/selectors/selectors';
import { DocType } from '@type/interfaces/props.interface';
import styles from '../Documentation.module.scss';

interface Props {
  types: ReadonlyArray<IntrospectionType>;
}

function Types(props: Props) {
  const { types } = props;
  const selectedType = useSelector(memoizedSelectSelectedType);
  const dispatch = useDispatch();
  const [openType, setOpenType] = useState<boolean[]>(
    useMemo(
      () =>
        types.map((el) => {
          return el.name === selectedType;
        }),
      [selectedType, types]
    )
  );
  const openTypeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setOpenType(
      types.map((el) => {
        return el.name === selectedType;
      })
    );
  }, [selectedType, types]);

  useLayoutEffect(() => {
    openTypeRef.current?.scrollIntoView();
  });

  if (!types) return;

  return (
    types && (
      <div className={styles.docs__types}>
        {types.map((type, index) => (
          <div key={type.name} ref={openType[index] ? openTypeRef : null}>
            <span>
              <button
                className={
                  type.description || (type.kind === 'OBJECT' && type.fields)
                    ? `link ${styles.docs__type} ${styles.docs__link}`
                    : `link ${styles.docs__type}`
                }
                onClick={() => {
                  if (
                    type.description ||
                    (type.kind === 'OBJECT' && type.fields) ||
                    (type.kind === 'INPUT_OBJECT' && type.inputFields) ||
                    (type.kind === 'ENUM' && type.enumValues)
                  ) {
                    dispatch(setSelectedType(type.name));
                  }
                }}
              >
                {type.name}
              </button>
              {(type.description ||
                (type.kind === 'OBJECT' && type.fields) ||
                (type.kind === 'INPUT_OBJECT' && type.inputFields) ||
                (type.kind === 'ENUM' && type.enumValues)) &&
              !openType[index] ? (
                <span className="docs-symbol"> ▼</span>
              ) : null}
            </span>

            {openType[index] && (
              <div className={styles.docs__nested}>
                {type.description && <div>{type.description}</div>}
                {type.kind === 'OBJECT' && type.fields && (
                  <div>
                    {type.fields.map((field) => (
                      <div key={field.name}>
                        <div className={styles.docs__nested_field}>
                          <h4>{field.name}: </h4>
                          <ReturnType type={field.type as DocType} />
                        </div>
                        <p>{field.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                {type.kind === 'INPUT_OBJECT' && type.inputFields && (
                  <div>
                    {type.inputFields.map((field) => (
                      <div key={field.name}>
                        <div className={styles.docs__nested_field}>
                          <h4>{field.name}: </h4>{' '}
                          <ReturnType type={field.type as DocType} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {type.kind === 'ENUM' && type.enumValues && (
                  <div>
                    {type.enumValues.map((field) => (
                      <div key={field.name}>
                        <div className={styles.docs__nested_field}>
                          <h4>{field.name}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  );
}

export { Types };
