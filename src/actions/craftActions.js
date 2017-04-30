import { RSAA } from 'redux-api-middleware';

/**
 * Fetch a singular endpoint from the craft element api and add it to the
 * store entries collection.
 *
 * @param endpoint {string} The endpoint where the entry is located.
 */
export const fetchEntry = endpoint => ({
  [RSAA]: {
    endpoint,
    method: 'GET',
    bailout: state => typeof state.horsemanEntries[endpoint] !== 'undefined',
    types: [
      { type: '@@horseman/FETCH_ENTRY_REQUEST', meta: { endpoint } },
      { type: '@@horseman/ADD_CRAFT_ENTRY', meta: { endpoint } },
      { type: '@@horseman/FETCH_ENTRY_FAIL', meta: { endpoint } },
    ],
  },
});

/**
 * Fetch multiple horsemanEntries from a singular element api endpoint.
 *
 * @param endpoint {string} The endpoint where the resources are located.
 */
export const fetchCollection = endpoint => ({
  [RSAA]: {
    endpoint,
    method: 'GET',
    bailout: state => typeof state.horsemanCollections[endpoint] !== 'undefined',
    types: [
      { type: '@@horseman/FETCH_COLLECTION_REQUEST', meta: { endpoint } },
      { type: '@@horseman/ADD_CRAFT_COLLECTION', meta: { endpoint } },
      { type: '@@horseman/FETCH_COLLECTION_FAIL', meta: { endpoint } },
    ],
  },
});
