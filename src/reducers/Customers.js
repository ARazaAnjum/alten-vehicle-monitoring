import {
  GET_CUSTOMERS_INFO,
  GET_CUSTOMERS_INFO_SUCCESS,
  GET_CUSTOMERS_INFO_FAILURE
} from './../actions/types';

/**
 * initial data
 */
const INIT_STATE = {
  customers: [],
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_INFO:
      return { ...state, loading: true };
    case GET_CUSTOMERS_INFO_SUCCESS:
      return { ...state, loading: false, customers: action.payload };
    case GET_CUSTOMERS_INFO_FAILURE:
      return { ...state, isError: true, loading: false, err: action.payload };
    default: return { ...state };
  }
}