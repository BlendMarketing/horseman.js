const initialState = {};

export default function collections(state = initialState, action) {
  switch (action.type) {
    case '@@horseman/FETCH_COLLECTION_REQUEST': {
      return { ...state, [action.meta.endpoint]: { loading: true } };
    }

    case '@@horseman/ADD_CRAFT_COLLECTION': {
      return { ...state, [action.meta.endpoint]: action.payload.data };
    }

    case '@@horseman/FETCH_COLLECTION_FAIL': {
      return { ...state, [action.meta.endpoint]: { error: true } };
    }

    default: {
      return state;
    }
  }
}
