export interface Props {
  children: React.ReactNode[] | React.ReactNode;
}

export interface RequestProps {
  getResponse: (value: string) => Promise<void>;
}

export interface APIResponse {
  data: Record<string, string>;
}
