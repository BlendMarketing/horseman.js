import * as types from '../constants/ActionTypes';

const initialState = {};

export default function resources(state = initialState, action) {
  switch (action.type) {
    case types.RESOURCE_REQUEST: {
      return {
        ...state,
        [action.meta.endpoint]: {
          meta: {
            loading: true,
            error: false,
          },
          data: {},
        },
      };
    }

    case types.ADD_RESOURCE: {
      return {
        ...state,
        [action.meta.endpoint]: {
          meta: {
            loading: false,
            error: false,
          },
          data: action.payload,
        },
      };
    }

    case types.RESOURCE_FAIL: {
      return {
        ...state,
        [action.meta.endpoint]: {
          meta: {
            loading: false,
            error: true,
          },
          data: {},
        },
      };
    }

    default: {
      return state;
    }
  }
}
