import { StateBase } from 'common-resources';

export type Country = {
    name: {
        common: string
        official: string,
        nativeName: {
            [ key: string ]: {
                official: string,
                common: string,
            }
        },
    },
    tld: string[],
    region: string,
    subregion: string,
    capital: string[],
    borders: string[],
    currencies : { [ key: string ]: { name:string,symbol:string } }
    languages: { [ key: string ]: string }
    flags: {
        png: string,
        svg: string,
    }
    population: number  //.toLocaleString('en', {minimumFractionDigits: fixed || 6})
    [ key: string ]: any
};
export type CountryStates = {
    countryList?: Country[] | undefined
    __timer__: NodeJS.Timeout | -1
} & StateBase


