/* eslint-env mocha */

import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { apiMiddleware } from 'redux-api-middleware';
import { fetchEntry } from '../actions/craftActions';

describe('Craft Actions', () => {
  const middlewares = [apiMiddleware];
  const mockStore = configureStore(middlewares);

  it('should dispatch the proper actions', () => {
    // Initialize mockstore with empty state
    const initialState = { entries: {} };
    const store = mockStore(initialState);

    // Dispatch the action
    store.dispatch(fetchEntry('/api/slug.json'));

    // @TODO get this test working appropriately
  });
});
