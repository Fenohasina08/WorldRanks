 export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: { [key: string]: { common: string } };
  };
  cca3: string;
  flags: { svg: string };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  tld?: string[]; // Top Level Domain (.fr, .mg)
  currencies?: { [key: string]: { name: string; symbol: string } };
  languages?: { [key: string]: string };
  borders?: string[]; // Codes des pays frontaliers
}