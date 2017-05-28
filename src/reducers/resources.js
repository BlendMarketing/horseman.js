import * as types from '../constants/ActionTypes';

const initialState = {};

export default function entries(state = initialState, action) {
  switch (action.type) {
    case types.RESOURCE_REQUEST: {
      return { ...state, [action.meta.endpoint]: { loading: true } };
    }

    case types.ADD_RESOURCE: {
      return { ...state, [action.meta.endpoint]: action.payload };
    }

    case types.RESOURCE_FAIL: {
      return { ...state, [action.meta.endpoint]: { error: true } };
    }

    default: {
      return state;
    }
  }
}
