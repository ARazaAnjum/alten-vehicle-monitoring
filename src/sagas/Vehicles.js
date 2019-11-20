/**
 * Dashboard Sagas
 */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    GET_VEHICLES_INFO,
} from '../actions/types';

import {
    getVehiclesInfoSuccess,
    getVehiclesInfoFailure
} from '../actions';

/**
 * Send Vehicle Info Request To Server
 */
const getVehicleInfoRequest = async (filter) =>
    await fetch(`http://localhost:3004/vehicles?_expand=customer`)
        .then(response => response.json())
        .catch(error => error);

/**
 * Get Vehicle Info From Server
 */
function* getVehicleInfoFromServer(action) {
    try {
        const response = yield call(getVehicleInfoRequest, action.filter);
        yield put(getVehiclesInfoSuccess(response));
    } catch (error) {
        yield put(getVehiclesInfoFailure(error));
    }
}
export function* getVehicleInfo() {
    yield takeEvery(GET_VEHICLES_INFO, getVehicleInfoFromServer);
}

/**
 * Dashboard Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(getVehicleInfo)
    ]);
}