/**
 * Root Sagas
 */
import { all } from 'redux-saga/effects';

// sagas
import vehicles from './Vehicles';
import customers from './Customers';

export default function* rootSaga(getState) {
    yield all([
        vehicles(),
        customers()
    ]);
}