export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  population: number;
  region: string;
  area?: number;
  unMember: boolean;
  independent: boolean;
}
