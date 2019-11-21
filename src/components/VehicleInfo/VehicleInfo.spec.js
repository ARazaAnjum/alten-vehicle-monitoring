import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import VehicleInfo from './VehicleInfo'
import configureStore from 'redux-mock-store';
import { getVehiclesInfo, getCustomersInfo } from '../../actions';
import {
    PieChart
} from 'recharts'

const mockStore = configureStore([]);

describe('Vehicle Info Component', () => {
    let store;
    let component;


    beforeEach(() => {
        store = mockStore({
            vehicles: {
                data: [{ "id": "YS2R4X20005399401", "regNo": "ABC123", "customerId": 1, "status": "online", "customer": { "id": 1, "name": "Kalles Grustransporter AB", "address": "Cementvägen 8, 111 11 Södertälje" } }, { "id": "VLUR4X20009093588", "regNo": "DEF456", "customerId": 1, "status": "online", "customer": { "id": 1, "name": "Kalles Grustransporter AB", "address": "Cementvägen 8, 111 11 Södertälje" } }, { "id": "VLUR4X20009048066", "regNo": "GHI789", "customerId": 1, "status": "offline", "customer": { "id": 1, "name": "Kalles Grustransporter AB", "address": "Cementvägen 8, 111 11 Södertälje" } }, { "id": "YS2R4X20005388011", "regNo": "JKL012", "customerId": 2, "status": "online", "customer": { "id": 2, "name": "Johans Bulk AB", "address": "Balkvägen 12, 222 22 Stockholm" } }, { "id": "YS2R4X20005387949", "regNo": "MNO345", "customerId": 2, "status": "offline", "customer": { "id": 2, "name": "Johans Bulk AB", "address": "Balkvägen 12, 222 22 Stockholm" } }, { "id": "VLUR4X20009048066", "regNo": "PQR678", "customerId": 3, "status": "online", "customer": { "id": 3, "name": "Haralds Värdetransporter AB", "address": "Budgetvägen 1, 333 33 Uppsala" } }, { "id": "YS2R4X20005387055", "regNo": "STU901", "customerId": 3, "status": "offline", "customer": { "id": 3, "name": "Haralds Värdetransporter AB", "address": "Budgetvägen 1, 333 33 Uppsala" } }],
                loading: false
            },
            customers: {
                customers: [{ "id": 1, "name": "Kalles Grustransporter AB", "address": "Cementvägen 8, 111 11 Södertälje" }, { "id": 2, "name": "Johans Bulk AB", "address": "Balkvägen 12, 222 22 Stockholm" }, { "id": 3, "name": "Haralds Värdetransporter AB", "address": "Budgetvägen 1, 333 33 Uppsala" }]
            }
        });
        store.dispatch = jest.fn();
        component = renderer.create(
            <Provider store={store}>
                <VehicleInfo />
            </Provider>
        );
    });

    it('should render with given state', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('should action dispatched 2 times', () => {
        expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should get vehicle action called', () => {
        expect(store.dispatch).toHaveBeenCalledWith(
            getVehiclesInfo()
        );
    });

    it('should get customers action called', () => {
        expect(store.dispatch).toHaveBeenCalledWith(
            getCustomersInfo()
        );
    });
});