/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import vehicles from './Vehicles';
import customers from './Customers';

const reducers = combineReducers({
    vehicles,
    customers
});

export default reducers;
