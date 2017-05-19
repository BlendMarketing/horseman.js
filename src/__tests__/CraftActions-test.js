/* eslint-env mocha */
/* global dump */

import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fetchEntry } from '../actions/craftActions';


describe('Craft Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  it('should fetch an entry with a url', () => {
    const MockFetch = require('mock-fetch-api');

    MockFetch.when('GET', '/api/slug.json')
      .respondWith(200, JSON.stringify({ hello: 'world' }));

    // Initialize mockstore with empty state
    const initialState = { horsemanEntries: {} };
    const store = mockStore(initialState);

    // Dispatch the action
    store.dispatch(fetchEntry('/api/slug.json')).then(() => {
    });

    // @TODO get this test working appropriately
    expect(store.getActions().length).to.equal(2);
  });
});
