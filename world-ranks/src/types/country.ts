export interface Country {
    name: {
        common : string;
    };
    cca3: string;
    flags: {
        svg: string;
        alt?: string;
    };
    population: number;
    area: number;
    region: string;
    subregion?: string;
    unMember: boolean;
    independent: boolean;
} 