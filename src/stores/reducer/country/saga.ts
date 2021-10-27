import { all, call, fork, put, takeLatest } from "redux-saga/effects"
import { getCountry, getCountryStatus, resetCountry } from './reducer'
import store from '../../index';

const getCountryApi = async <R extends { [ key: string ]: any }>(list: Array<keyof R>) => {
    //https://restcountries.com/v3.1/all
    const countryList= await fetch('https://restcountries.com/v3.1/all').then(results => results.json())
    // })(__timer__);
    return {data: countryList}
}

export function* getPostsSaga({payload}: any) {
    try {
        // @ts-ignore
        // const { countryKey,countryKeys } = payload;
        // console.log('getPostsSaga countryKey',countryKey, countryKeys)
        // if(countryKey || (countryKeys && countryKeys.length)) {
        const {data, __timer__} = yield call(getCountryApi);
        yield put(getCountryStatus({countryList: data, __timer__}));

        // }else{
        //     throw new CustomError(ErrorMap.NO_SDK);
        // }
    } catch (err) {
        yield put(getCountryStatus(err));
    }
}

export function* getResetsSaga({payload}: any) {
    try {
        // @ts-ignore
        let {__timer__} = store.getState().countryList;
        if (__timer__ && __timer__ !== -1) {
            clearInterval(__timer__);
        }
        yield put(getCountryStatus({countryList: [], __timer__: -1}));
    } catch (err) {
        yield put(getCountryStatus(err));
    }
}

function* countrySaga() {
    yield all([takeLatest(getCountry, getPostsSaga)]);
}

function* resetCountrySaga() {
    yield all([takeLatest(resetCountry, getResetsSaga)]);
}

export const countryForks = [
    fork(countrySaga),
    fork(resetCountrySaga),
    // fork(countrysSaga),
]
 