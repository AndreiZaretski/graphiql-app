export interface Props {
  children: React.ReactNode[] | React.ReactNode;
}

export interface RequestProps {
  getResponse: (value: RequestParams) => Promise<void>;
}

export interface ResponseProps {
  data: Partial<Record<string, string>> | object;
}

export interface MirrorProps {
  height: string;
  value: string;
  onChange?: (value: string) => void;
  editable?: boolean;
}

export interface APIResponse {
  data: Record<string, string>;
}

export type RequestParams = {
  query: string;
  variables: object | string;
  headers: Headers;
  baseUrl: string;
};

export interface DocTypeProps {
  type: DocType;
}

export type DocType = {
  kind:
    | 'LIST'
    | 'NON_NULL'
    | 'SCALAR'
    | 'ENUM'
    | 'INPUT_OBJECT'
    | 'INTERFACE'
    | 'UNION'
    | 'OBJECT';
  name: string;
  ofType: {
    name: string;
    kind: string;
    ofType: {
      name: string;
      kind: string;
      ofType: {
        name: string;
      };
    };
  };
};
