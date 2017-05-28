import 'isomorphic-fetch';
import * as types from './constants/ActionTypes';

/**
 * Fetch a singular endpoint from an api and dispatches actions depending on
 * the result.
 *
 * @param successAction {string} The action to dispatch if a resource comes back
 * successfully.
 *
 * @return {function} Callback accepting an endpoint and dispatching the actions
 */
export default successAction => endpoint => (dispatch, getState) => {
  if (typeof getState().horsemanResources[endpoint] !== 'undefined') {
    return null;
  }

  dispatch({ type: types.RESOURCE_REQUEST, meta: { endpoint } });

  return fetch(endpoint)
  .then(
    (response) => {
      if (response.ok) {
        return response.json()
          .then(payload => dispatch({ type: successAction, meta: { endpoint }, payload }))
          .catch(() => dispatch({ type: types.BAD_JSON, meta: { endpoint } }));
      }
      return dispatch({ type: types.RESOURCE_FAIL, meta: { endpoint } });
    },
  )
  .catch(() => dispatch({ type: types.BAD_REQUEST, meta: { endpoint } }));
};
