import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { CountryStates } from './interface';
import {  SagaStatus } from 'common-resources';

const initialState: CountryStates = {
    countryList: [],
    region:{
        Africa:[],
        Americas:[],
        Asia:[],
        Europe:[],
        Oceania:[],
    },
    cca3Map:{},
    countryMap:{},
    status:'PENDING',
    errorMessage: null,
}
const countryListSlice: Slice<CountryStates> = createSlice({
    name: 'countryList',
    initialState,
    reducers: {
        getCountry(state: CountryStates, action: PayloadAction<undefined>) {
            state.status = SagaStatus.PENDING
        },
        resetCountry(state: CountryStates, action: PayloadAction<undefined>) {
            state.status = SagaStatus.PENDING
        },
        getCountryStatus(state:CountryStates, action: PayloadAction<CountryStates>) {
            // @ts-ignore
            if (action.error) {
                state.status = SagaStatus.ERROR
                // @ts-ignore
                state.errorMessage = action.error
            }
            state.countryList = action.payload.countryList;//{...state.countryList, ...action.payload.countryList};
            state.region =  action.payload.region;
            state.cca3Map =  action.payload.cca3Map;
            state.countryMap = action.payload.countryMap;

            state.status = SagaStatus.DONE
        },
        statusUnset (state:CountryStates)  {
            state.status = SagaStatus.UNSET
        }

    },
});
export { countryListSlice };
export const {getCountry, resetCountry, getCountryStatus, statusUnset} = countryListSlice.actions;