import 'whatwg-fetch';
import 'es6-promise/auto';

/**
 * Fetch a singular endpoint from the wordpress rest api and add it to the
 * store entries collection.
 *
 * @param endpoint {string} The endpoint where the entry is located.
 */
export const fetchEntry = endpoint => (dispatch, getState) => {
  if (typeof getState().horsemanEntries[endpoint] !== 'undefined') {
    return null;
  }

  dispatch({ type: '@@horseman/FETCH_ENTRY_REQUEST', meta: { endpoint } });
  return fetch(endpoint).then(response => response.json().then((payload) => {
    dispatch({ type: '@@horseman/ADD_WORDPRESS_ENTRY', meta: { endpoint }, payload });
  })).catch(() => {
    dispatch({ type: '@@horseman/FETCH_ENTRY_FAIL', meta: { endpoint } });
  });
};

/**
 * Fetch multiple horsemanEntries from a singular element api endpoint.
 *
 * @param endpoint {string} The endpoint where the resources are located.
 */
export const fetchCollection = endpoint => (dispatch, getState) => {
  if (typeof getState().horsemanCollections[endpoint] !== 'undefined') {
    return null;
  }

  dispatch({ type: '@@horseman/FETCH_COLLECTION_REQUEST', meta: { endpoint } });
  return fetch(endpoint).then(response => response.json().then((payload) => {
    dispatch({ type: '@@horseman/ADD_WORDPRESS_COLLECTION', meta: { endpoint }, payload });
  })).catch(() => {
    dispatch({ type: '@@horseman/FETCH_COLLECTION_FAIL', meta: { endpoint } });
  });
};
