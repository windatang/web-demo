import { all } from "redux-saga/effects"
import { countryForks } from './reducer/country/saga';



// https://css-tricks.com/finite-state-machines-with-react/
// https://musing-rosalind-2ce8e7.netlify.com/?machine=%7B%22initial%22%3A%22initial%22%2C%22states%22%3A%7B%22initial%22%3A%7B%22on%22%3A%7B%22LOGIN%22%3A%22loggedIn%22%2C%22LOGOUT%22%3A%22loggedOut%22%7D%7D%2C%22loggedOut%22%3A%7B%22on%22%3A%7B%22SUBMIT%22%3A%22loading%22%7D%7D%2C%22loading%22%3A%7B%22on%22%3A%7B%22SUCCESS%22%3A%22loggedIn%22%2C%22FAIL%22%3A%22loggedOut%22%7D%7D%2C%22loggedIn%22%3A%7B%22onEntry%22%3A%5B%22SET_TOKEN%22%5D%2C%22onExit%22%3A%5B%22CLEAR_TOKEN%22%5D%2C%22on%22%3A%7B%22LOGOUT%22%3A%22loggedOut%22%7D%7D%7D%7D

// function* machineHandler(event: any, action: any) {
//
//   // @ts-ignore
//   const currentAppState = yield select((state) => { state.account.status })
//   const nextAppState = machine.transition(currentAppState, event)
//
//   yield put({
//     type: "APP_STATE/" + nextAppState.value,
//     payload: {
//       value: nextAppState.value
//     }
//   });
//
//   console.debug("-> from " + currentAppState + " to " + nextAppState);
//
//   for (let i = 0; i < nextAppState.actions.length; i++) {
//     yield put({
//       type: nextAppState.actions[i],
//       payload: action
//     });
//   }
// }

// function* watchTransition() {
//   yield takeEvery(TRANSITION, function*(action: any) {
//     yield machineHandler(action.event, action.payload);
//   });
// }

function* mySaga() {
    yield all([
        // fork(helloSaga),
        // fork(watchTransition),
        ...countryForks
    ]);
}

export default mySaga;
