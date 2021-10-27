import { useDispatch, useSelector } from 'react-redux'
import { getCountry, resetCountry, statusUnset } from './reducer';
import { CountryStates } from './interface';
import React from 'react';

export function useCountry(): CountryStates & {
    getCountry: () => void,
    statusUnset: () => void,
    resetCountry: () => void,
} {
    const countryList: CountryStates = useSelector((state: any) => state.countryList)
    const dispatch = useDispatch();
    return {
        ...countryList,
        resetCountry: React.useCallback(() => dispatch(resetCountry(undefined)), [dispatch]),
        statusUnset: React.useCallback(() => dispatch(statusUnset(undefined)), [dispatch]),
        getCountry: React.useCallback(() => dispatch(getCountry(undefined)), [dispatch]),
    }

}
