export const mockSchema = {
  description: 'MockSchema',

  queryType: {
    kind: 'OBJECT',
    name: 'Test Query name',
  },
  mutationType: null,
  subscriptionType: null,
  types: [
    {
      kind: 'OBJECT',
      name: 'Test Query name',
      description: '',
      fields: [
        {
          name: 'characters',
          description: 'Get the list of all characters',
          args: [
            {
              name: 'page',
              description: '',
              type: {
                kind: 'SCALAR',
                name: 'Int',
              },
              defaultValue: null,
            },
            {
              name: 'filter',
              description: '',
              type: {
                kind: 'INPUT_OBJECT',
                name: 'FilterCharacter',
              },
              defaultValue: null,
            },
          ],
          type: {
            kind: 'OBJECT',
            name: 'Characters',
          },
          isDeprecated: false,
          deprecationReason: null,
        },

        {
          name: 'NestedType',
          args: [
            {
              name: 'Nested-3',
              type: {
                kind: 'NON_NULL',

                ofType: {
                  kind: 'LIST',

                  ofType: {
                    kind: 'NON_NULL',

                    ofType: {
                      kind: 'SCALAR',
                      name: 'Nested-3-btn',
                    },
                  },
                },
              },
              defaultValue: null,
            },
            {
              name: 'Nested-3-3',
              type: {
                kind: 'NON_NULL',

                ofType: {
                  kind: 'LIST',

                  ofType: {
                    kind: 'OTHER',

                    ofType: {
                      kind: 'SCALAR',
                      name: 'Nested-3-3-btn',
                    },
                  },
                },
              },
              defaultValue: null,
            },
            {
              name: 'Nested-2',
              type: {
                kind: 'NON_NULL',

                ofType: {
                  kind: 'LIST',

                  ofType: {
                    kind: 'SCALAR',
                    name: 'Nested-2-btn',
                  },
                },
              },
              defaultValue: null,
            },
            {
              name: 'Nested-2-2',
              type: {
                kind: 'NON_NULL',

                ofType: {
                  kind: 'NON_NULL',

                  ofType: {
                    kind: 'SCALAR',
                    name: 'Nested-2-2-btn',
                  },
                },
              },
              defaultValue: null,
            },

            {
              name: 'Nested-1',
              type: {
                kind: 'NON_NULL',

                ofType: {
                  kind: 'SCALAR',
                  name: 'Nested-1-btn',
                },
              },
              defaultValue: null,
            },
            {
              name: 'Nested-1-1',
              type: {
                kind: 'OTHER',

                ofType: {
                  kind: 'SCALAR',
                  name: 'Nested-1-1-btn',
                },
              },
              defaultValue: null,
            },
          ],
          type: {
            kind: 'LIST',

            ofType: {
              kind: 'OBJECT',
              name: 'ID',
            },
          },
          isDeprecated: false,
          deprecationReason: null,
        },
      ],

      interfaces: [],
    },
    {
      kind: 'OBJECT',
      name: 'Characters',
      description: '',
      fields: [
        {
          name: 'info',
          description: '',
          args: [],
          type: {
            kind: 'OBJECT',
            name: 'Info',
          },
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'results',
          description: '',
          args: [],
          type: {
            kind: 'LIST',
            ofType: {
              kind: 'OBJECT',
              name: 'Character',
            },
          },
          isDeprecated: false,
          deprecationReason: null,
        },
      ],

      interfaces: [],
    },

    {
      kind: 'INPUT_OBJECT',
      name: 'Input object',
      description: '',
      inputFields: [
        {
          name: 'input field',
          description: '',
          type: {
            kind: 'SCALAR',
            name: 'Input return type',
          },
          defaultValue: null,
        },
      ],
    },

    {
      kind: 'SCALAR',
      name: 'ID',
      description:
        'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',
    },
    {
      kind: 'ENUM',
      name: 'CacheControlScope',
      description: '',

      enumValues: [
        {
          name: 'PUBLIC',
          description: '',
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'PRIVATE',
          description: '',
          isDeprecated: false,
          deprecationReason: null,
        },
      ],
    },
  ],
  directives: [
    {
      name: 'cacheControl',
      description: '',
      locations: [],
      args: [
        {
          name: 'maxAge',
          description: '',
          type: {
            kind: 'SCALAR',
            name: 'Int',
          },
          defaultValue: null,
        },
      ],
    },
  ],
};
