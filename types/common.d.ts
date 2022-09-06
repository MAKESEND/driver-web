export enum ENVs {
  production = 'production',
  staging = 'staging',
  development = 'development',
  local = 'local',
}

export type Dictionary = {
  [key: string]: any;
};

export interface Link {
  id: string;
  title: string;
  href?: string;
  disabled?: boolean;
  links?: Link[];
}
