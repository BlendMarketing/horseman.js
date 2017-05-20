import 'isomorphic-fetch';


/**
 * Fetch a singular endpoint from an api and dispatches actions depending on
 * the result.
 *
 * @param successAction {string} The action to dispatch if an entry comes back
 * successfully.
 *
 * @return {function} Callback accepting an endpoint and dispatching the actions
 */
export const fetchEntryFactory = successAction => endpoint => (dispatch, getState) => {
  if (typeof getState().horsemanEntries[endpoint] !== 'undefined') {
    return null;
  }

  dispatch({ type: '@@horseman/FETCH_ENTRY_REQUEST', meta: { endpoint } });

  return fetch(endpoint)
  .then(
    (response) => {
      if (response.ok) {
        return response.json()
          .then(payload => dispatch({ type: successAction, meta: { endpoint }, payload }));
      }
      return dispatch({ type: '@@horseman/FETCH_ENTRY_FAIL', meta: { endpoint } });
    },
  );
};

/**
 * Fetch multiple horsemanEntries from a singular api endpoint and dispatch
 * actions on success and fail.
 *
 * @param successAction {string} The endpoint where the resources are located.
 *
 * @return {function} Callback accepting an endpoint and dispatching the actions
 */
export const fetchCollectionFactory = successAction => endpoint => (dispatch, getState) => {
  if (typeof getState().horsemanCollections[endpoint] !== 'undefined') {
    return null;
  }

  dispatch({ type: '@@horseman/FETCH_COLLECTION_REQUEST', meta: { endpoint } });

  return fetch(endpoint)
  .then(
    response => response.json()
    .then(payload => dispatch({ type: successAction, meta: { endpoint }, payload })),
  )
  .catch(() => dispatch({ type: '@@horseman/FETCH_COLLECTION_FAIL', meta: { endpoint } }));
};
