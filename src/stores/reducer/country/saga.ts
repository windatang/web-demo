import { all, call, fork, put, takeLatest } from "redux-saga/effects"
import { getCountry, getCountryStatus, resetCountry } from './reducer'
import store, { Country } from '../../index';
import { Region, RegionList } from '../../../common-resources';

const getCountryApi = async <R extends { [ key: string ]: any }>(list: Array<keyof R>) => {
    //https://restcountries.com/v3.1/all
    const countryList= await fetch('https://restcountries.com/v3.1/all').then(results => results.json());
    // let cca3Map  = {};
    let region:{[key:string]:Country[]} = RegionList.reduce((pre,item)=> {
        return {...pre,[item]:[]}
    },{});
    const listMap = countryList.reducer((pre:any,item:any)=>{
        pre.cca3Map =  {...pre.cca3Map,[item.cca3]:item} ;
        pre.countryMap=  {...pre.countryMap,[item.name.common]:item} ;
        switch (item.region){
            case Region.Africa:
                region[Region.Africa] = [...region[Region.Africa],item]
                break
            case Region.Oceania:
                region[Region.Oceania] = [...region[Region.Oceania],item]
                break
            case Region.Americas:
                region[Region.Americas] = [...region[Region.Americas],item]
                break
            case Region.Europe:
                region[Region.Europe] = [...region[Region.Europe],item]
                break
            case Region.Asia:
                region[Region.Asia] = [...region[Region.Asia],item]
                break
        }
        // pre.region
        // pre.cca3Map =  {...pre.cca3Map,[item.cca3]:item}

        return pre
    },{cca3Map:{},region,countryMap:{}})

    // })(__timer__);
    return {data: countryList,...listMap}
}

export function* getPostsSaga({payload}: any) {
    try {
        // @ts-ignore
        // const { countryKey,countryKeys } = payload;
        // console.log('getPostsSaga countryKey',countryKey, countryKeys)
        // if(countryKey || (countryKeys && countryKeys.length)) {
        const {data, ...rest } = yield call(getCountryApi);
        yield put(getCountryStatus({countryList: data, ...rest}));

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
 