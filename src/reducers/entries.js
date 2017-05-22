import * as types from '../constants/ActionTypes';

const initialState = {};

export default function entries(state = initialState, action) {
  switch (action.type) {
    case types.ENTRY_REQUEST: {
      return { ...state, [action.meta.endpoint]: { loading: true } };
    }

    case types.ADD_CRAFT_ENTRY: {
      return { ...state, [action.meta.endpoint]: action.payload };
    }

    case types.ENTRY_FAIL: {
      return { ...state, [action.meta.endpoint]: { error: true } };
    }

    default: {
      return state;
    }
  }
}
