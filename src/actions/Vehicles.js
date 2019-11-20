/**
 * Dashboard App Actions
 */
import {
    GET_VEHICLES_INFO,
    GET_VEHICLES_INFO_SUCCESS,
    GET_VEHICLES_INFO_FAILURE,
} from './types';
/**
 * Redux Action Get Vehicles Info
 */
export const getVehiclesInfo = (filter) => ({
    type: GET_VEHICLES_INFO,
    filter,
});

/**
 * Redux Action Get Vehicles Info Success
 */
export const getVehiclesInfoSuccess = (response) => ({
    type: GET_VEHICLES_INFO_SUCCESS,
    payload: response
})

/**
 * Redux Action Get Vehicles Info Failure
 */
export const getVehiclesInfoFailure = (error) => ({
    type: GET_VEHICLES_INFO_FAILURE,
    payload: error
})