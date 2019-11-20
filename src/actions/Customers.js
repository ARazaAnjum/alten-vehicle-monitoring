/**
 * Dashboard App Actions
 */
import {
    GET_CUSTOMERS_INFO,
    GET_CUSTOMERS_INFO_SUCCESS,
    GET_CUSTOMERS_INFO_FAILURE,
} from './types';
/**
 * Redux Action Get Customers Info
 */
export const getCustomersInfo = (filter) => ({
    type: GET_CUSTOMERS_INFO,
    filter,
});

/**
 * Redux Action Get Customers Info Success
 */
export const getCustomersInfoSuccess = (response) => ({
    type: GET_CUSTOMERS_INFO_SUCCESS,
    payload: response
})

/**
 * Redux Action Get Customers Info Failure
 */
export const getCustomersInfoFailure = (error) => ({
    type: GET_CUSTOMERS_INFO_FAILURE,
    payload: error
})