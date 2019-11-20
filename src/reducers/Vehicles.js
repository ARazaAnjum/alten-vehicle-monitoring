import {
  GET_VEHICLES_INFO,
  GET_VEHICLES_INFO_SUCCESS,
  GET_VEHICLES_INFO_FAILURE
} from './../actions/types';

/**
 * initial data
 */
const INIT_STATE = {
  data: [],
  overviewData: [],
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_VEHICLES_INFO:
      return { ...state, loading: true };
    case GET_VEHICLES_INFO_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_VEHICLES_INFO_FAILURE:
      return { ...state, isError: true, loading: false, err: action.payload };
    default: return { ...state };
  }
}