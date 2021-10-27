import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { CountryStates } from './interface';
import { SagaStatus } from 'common-resources';

const initialState: CountryStates = {
    countryList: [],
    status: 'PENDING',
    errorMessage: null,
    __timer__: -1,
}
const countryListSlice: Slice<CountryStates> = createSlice({
    name: 'countryList',
    initialState,
    reducers: {
        getCountry(state, action: PayloadAction<undefined>) {
            state.status = SagaStatus.PENDING
        },
        resetCountry(state, action: PayloadAction<undefined>) {
            state.status = SagaStatus.PENDING
        },
        getCountryStatus(state, action: PayloadAction<CountryStates>) {
            // @ts-ignore
            if (action.error) {
                state.status = SagaStatus.ERROR
                // @ts-ignore
                state.errorMessage = action.error
            }
            state.countryList = action.payload.countryList;//{...state.countryList, ...action.payload.countryList};
            if (action.payload.__timer__) {
                state.__timer__ = action.payload.__timer__
            }
            state.status = SagaStatus.DONE
        },
        statusUnset: state => {
            state.status = SagaStatus.UNSET
        }

    },
});
export { countryListSlice };
export const {getCountry, resetCountry, getCountryStatus, statusUnset} = countryListSlice.actions;