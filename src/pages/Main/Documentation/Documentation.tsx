import { useState } from 'react';
import { APIDocResponse } from '@type/interfaces/props.interface';
import { GraphQLNamedType, GraphQLObjectType, GraphQLField } from 'graphql';

const Documentation = (props: Record<'documentation', APIDocResponse>) => {
  const { fields, types } = props.documentation;
  const [selectedType, setSelectedType] = useState<
    GraphQLNamedType | undefined
  >(undefined);
  const [objectTypeFields, setObjectTypeFields] = useState<
    GraphQLField<unknown, unknown>[]
  >([]);
  console.log(fields);
  console.log(types);

  const getTypeByName = (type: string) => {
    const typeWithoutSymbols = type
      .split('')
      .filter((char) => char !== '[' && char !== ']' && char !== '!')
      .join('');
    const found = types.find((type) => type.name === typeWithoutSymbols);
    console.log(found);
    setSelectedType(found);
    if (found instanceof GraphQLObjectType) {
      const objFields = found['_fields'];
      const tempArr = [];
      for (const key in objFields) {
        tempArr.push(objFields[key]);
      }
      setObjectTypeFields(tempArr);
      console.log(selectedType);
    } else {
      setObjectTypeFields([]);
    }
  };

  return selectedType ? (
    <section>
      <button onClick={() => setSelectedType(undefined)}>Back</button>
      <h2>{selectedType.name}</h2>
      {objectTypeFields.length ? (
        <div>
          {objectTypeFields.map((field) => (
            <div key={field.name}>
              <h2>{field.name}</h2>
              <p>{field.description}</p>
              <button
                type="button"
                onClick={() => getTypeByName(field.type.toString())}
              >
                {field.type.toString()}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>{selectedType.description}</p>
      )}
    </section>
  ) : (
    <section>
      {fields.map((field) => (
        <div key={field.name}>
          <p>{field.description}</p>
          <div>
            {field.name}
            {'('}
            <div>
              {field.args.map((arg) => (
                <div key={arg.name}>
                  {arg.name}:{' '}
                  <button
                    type="button"
                    onClick={() => getTypeByName(arg.type.toString())}
                  >
                    {arg.type.toString()}
                  </button>
                </div>
              ))}
            </div>
            {'): '}
            <button
              type="button"
              onClick={() => getTypeByName(field.type.toString())}
            >
              {field.type.toString()}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Documentation;
