/**
 * Dashboard Sagas
 */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    GET_CUSTOMERS_INFO,
} from '../actions/types';

import {
    getCustomersInfoFailure,
    getCustomersInfoSuccess
} from '../actions';

/**
 * Send Customers Info Request To Server
 */
const getCustomersInfoRequest = async (filter) =>
    await fetch(`http://localhost:3004/customers`)
        .then(response => response.json())
        .catch(error => error);

/**
 * Get Customers Info From Server
 */
function* getCustomersInfoFromServer(action) {
    try {
        const response = yield call(getCustomersInfoRequest);
        yield put(getCustomersInfoSuccess(response));
    } catch (error) {
        yield put(getCustomersInfoFailure(error));
    }
}
export function* getCustomersInfo() {
    yield takeEvery(GET_CUSTOMERS_INFO, getCustomersInfoFromServer);
}

/**
 * Dashboard Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(getCustomersInfo)
    ]);
}