const initialState = {};

export default function entries(state = initialState, action) {
  switch (action.type) {
    case '@@horseman/FETCH_ENTRY_REQUEST': {
      return { ...state, [action.meta.endpoint]: { loading: true } };
    }

    case '@@horseman/FETCH_ENTRIES_REQUEST': {
      return { ...state };
    }

    case '@@horseman/ADD_CRAFT_ENTRY': {
      return { ...state, [action.meta.endpoint]: action.payload };
    }

    case '@@horseman/ADD_CRAFT_ENTRIES': {
      const newEntries = {};
      const entryData = action.payload.data;
      entryData.forEach((entry) => {
        newEntries[entry.url] = entry;
      });

      return { ...state, ...newEntries };
    }

    case '@@horseman/FETCH_ENTRY_FAIL': {
      return { ...state, [action.meta.endpoint]: { error: true } };
    }

    default: {
      return state;
    }
  }
}
