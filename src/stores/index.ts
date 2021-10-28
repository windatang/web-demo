import { countryListSlice } from './reducer/country';


import {
    // CombinedState,
    combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { useDispatch } from 'react-redux'

// import { persistReducer } from 'redux-persist'
// import storageSession from 'redux-persist/lib/storage/session'
// import storage from 'redux-persist/lib/storage'
// import persistStore from 'redux-persist/es/persistStore'
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import mySaga from './rootSaga';
import createSagaMiddleware from 'redux-saga'
import { setLanguage, settingsSlice } from './reducer/settings';
// import { reduxBatch } from '@manaflair/redux-batch'



const sagaMiddleware = createSagaMiddleware()

const DEFAULT_TIMEOUT = 15000 * 60 * 15


//
// const persistAccConfig = {
//     key: 'account',
//     storage: storageSession,
//     timeout: DEFAULT_TIMEOUT,
// };
//
// const persistSettingConfig = {
//     key: 'settings',
//     storage: storage,
//     stateReconciler: hardSet,
// };

// const persistLocalStoreConfig = {
//     key: 'localStore',
//     storage: storage,
//     stateReconciler: hardSet,
// };
// const persistedAccountReducer = persistReducer(persistAccConfig, accountSlice.reducer)
//
// const persistedSettingReducer = persistReducer<SettingsState>(persistSettingConfig, settingsSlice.reducer)
//
// const persistedLocalStoreReducer = persistReducer<CombinedState<{
//     favoriteMarket: FavoriteMarketStates,
//     chainHashInfos: ChainHashInfos,
//     confirmation: Confirmation,
//     walletInfo: WalletInfo,
// }>>(persistLocalStoreConfig, localStoreReducer)

const reducer = combineReducers({
    countryList:countryListSlice.reducer,
    settings:settingsSlice.reducer
})

//const persistedReducer = persistReducer(persistConfig ,reducer)


const store = configureStore({
    reducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    middleware: [...getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
    }), sagaMiddleware],
    //middleware: [...getDefaultMiddleware({ thunk: true }), ],
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [],
})
// store.dispatch(updateVersion())

store.dispatch(setLanguage(store.getState().settings.language))
// fetch(`https://static.loopring.io/assets/images/coin/loopring.json`)
//     .then(results => results.json()).then(imgConfig=>{
//
//     store.dispatch(setCoinJson(imgConfig.frames))
//
// })
// async function imageConfig() {
//     const imgConfig = (await .json();
//
//

// imageConfig()

// @ts-ignore
sagaMiddleware.run(mySaga, store.dispatch);

// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batch, and devtools enhancers were composed together

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof reducer>
// export const persistor = persistStore(store)

// persistor.persist()
export * from './reducer/settings'
export * from './reducer/country'

export default store

