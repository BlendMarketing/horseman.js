import * as types from '../constants/ActionTypes';

const initialState = {};

export default function resources(state = initialState, action) {
  switch (action.type) {
    case types.SET_PAGE_TOTAL: {
      return {
        ...state,
        [action.key]: { ...action.data },
      };
    }
    case types.SET_CURRENT_PAGE: {
      return {
        ...state,
        [action.key]: { ...action.data },
      };
    }
    default: {
      return state;
    }
  }
}
