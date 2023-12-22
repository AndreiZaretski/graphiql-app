import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { IntrospectionType } from 'graphql';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setSelectedType } from '@store/features/documentationSlice';
import ReturnType from './ReturnType';
import { DocType } from '@type/interfaces/props.interface';

interface Props {
  types: ReadonlyArray<IntrospectionType>;
}

function Types(props: Props) {
  const { types } = props;
  const selectedType = useSelector(
    (state: RootState) => state.documentationSlice.selectedType
  );
  const dispatch = useDispatch();
  const [openType, setOpenType] = useState<boolean[]>(
    types.map((el) => {
      return el.name === selectedType;
    })
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
  }, []);

  return (
    types && (
      <div className="docs-types">
        {types.map((type, index) => (
          <div key={type.name} ref={openType[index] ? openTypeRef : null}>
            <span>
              <button
                className={
                  type.description || (type.kind === 'OBJECT' && type.fields)
                    ? 'docs-type docs-link'
                    : 'docs-type'
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
              <div className="docs-nested">
                {type.description && <div>{type.description}</div>}
                {type.kind === 'OBJECT' && type.fields && (
                  <div>
                    {type.fields.map((field) => (
                      <div key={field.name}>
                        <div className="docs-nested-field">
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
                        <div className="docs-nested-field">
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
                        <div className="docs-nested-field">
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

export default Types;