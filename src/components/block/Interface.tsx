import { Country } from 'stores';

export  type CountryCardProps ={
    onDetail:(item:{[key:string]:any})=>void,
    item:Country
}
export  type CountryCardDetail ={
    // onDetail:(item:{[key:string]:any})=>void,
    item:Country
}