const initialState = {};

export default function collections(state = initialState, action) {
  switch (action.type) {
    case '@@horseman/FETCH_COLLECTION_REQUEST': {
      return { ...state, [action.meta.endpoint]: { error: false, loading: true, data: [] } };
    }

    case '@@horseman/ADD_ARRAY_COLLECTION': {
      return {
        ...state,
        [action.meta.endpoint]: {
          data: action.payload.data,
          error: false,
          loading: false,
        },
      };
    }

    case '@@horseman/FETCH_COLLECTION_FAIL': {
      return { ...state, [action.meta.endpoint]: { error: true, loading: false, data: [] } };
    }

    default: {
      return state;
    }
  }
}
