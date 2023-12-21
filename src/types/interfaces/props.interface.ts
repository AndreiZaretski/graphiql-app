export interface Props {
  children: React.ReactNode[] | React.ReactNode;
}

export interface RequestProps {
  getResponse: (value: string) => Promise<void>;
}

export interface APIResponse {
  data: Record<string, string>;
}

export interface DocTypeProps {
  type: DocType;
}

export type DocType = {
  kind: 'LIST' | 'NON_NULL';
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
