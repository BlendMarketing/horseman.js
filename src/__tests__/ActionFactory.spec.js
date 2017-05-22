/* eslint-env mocha */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import MockFetch from 'mock-fetch-api';

import { fetchEntryFactory, fetchCollectionFactory } from '../ActionFactory';

import * as types from '../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchEntryFactory', () => {
  describe('Entry Factory', () => {
    it('should return a valid entry action with success name', (done) => {
      const store = mockStore({ horsemanEntries: {} });
      const actions = [
        {
          type: types.ENTRY_REQUEST,
          meta: {
            endpoint: '/endpoint',
          },
        },
        {
          type: '@@horseman/ADD_ENTRY',
          meta: {
            endpoint: '/endpoint',
          },
          payload: {
            hello: 'world',
          },
        },
      ];

      MockFetch.when('GET', '/endpoint').respondWith(200, JSON.stringify({ hello: 'world' }));

      store.dispatch(fetchEntryFactory('@@horseman/ADD_ENTRY')('/endpoint')).then(() => {
        try {
          expect(actions).to.deep.equal(store.getActions());
          done(); // success: call done with no parameter to indicate that it() is done()
        } catch (e) {
          done(e); // failure: call done with an error Object to indicate that it() failed
        }
      });
    });

    it('should send a fail response when the entry is not found', (done) => {
      const store = mockStore({ horsemanEntries: {} });
      const actions = [
        {
          type: types.ENTRY_REQUEST,
          meta: {
            endpoint: '/bad',
          },
        },
        {
          type: types.ENTRY_FAIL,
          meta: {
            endpoint: '/bad',
          },
        },
      ];

      MockFetch.when('GET', '/bad').respondWith(404);

      store.dispatch(fetchEntryFactory('@@horseman/ADD_ENTRY')('/bad')).then(() => {
        try {
          expect(actions).to.deep.equal(store.getActions());
          done(); // success: call done with no parameter to indicate that it() is done()
        } catch (e) {
          done(e); // failure: call done with an error Object to indicate that it() failed
        }
      });
    });

    it('should dispatch BAD_JSON action when json is invalid', (done) => {
      const store = mockStore({ horsemanEntries: {} });
      const actions = [
        {
          type: types.ENTRY_REQUEST,
          meta: {
            endpoint: '/badjson',
          },
        },
        {
          type: types.BAD_JSON,
          meta: {
            endpoint: '/badjson',
          },
        },
      ];

      MockFetch.when('GET', '/badjson').respondWith(200, 'not json');

      store.dispatch(fetchEntryFactory('@@horseman/ADD_ENTRY')('/badjson')).then(() => {
        try {
          expect(actions).to.deep.equal(store.getActions());
          done(); // success: call done with no parameter to indicate that it() is done()
        } catch (e) {
          done(e); // failure: call done with an error Object to indicate that it() failed
        }
      });
    });

    it('should dispatch BAD_REQUEST action when endpoint is bad.', (done) => {
      const store = mockStore({ horsemanEntries: {} });
      const actions = [
        {
          type: types.ENTRY_REQUEST,
          meta: {
            endpoint: '/badrequest',
          },
        },
        {
          type: types.BAD_REQUEST,
          meta: {
            endpoint: '/badrequest',
          },
        },
      ];

      MockFetch.failNextCall();

      store.dispatch(fetchEntryFactory('@@horseman/ADD_ENTRY')('/badrequest')).then(() => {
        try {
          expect(actions).to.deep.equal(store.getActions());
          done(); // success: call done with no parameter to indicate that it() is done()
        } catch (e) {
          done(e); // failure: call done with an error Object to indicate that it() failed
        }
      });
    });
  });

  describe('Collection Factory', () => {
    it('should return a valid collection action with success name', (done) => {
      const store = mockStore({ horsemanCollections: {} });
      const actions = [
        {
          type: types.COLLECTION_REQUEST,
          meta: {
            endpoint: '/collectionendpoint',
          },
        },
        {
          type: '@@horseman/ADD_ARRAY_COLLECTION',
          meta: {
            endpoint: '/collectionendpoint',
          },
          payload: {
            data: [
              { hello: 'world' },
            ],
          },
        },
      ];

      MockFetch.when('GET', '/collectionendpoint').respondWith(200, JSON.stringify({ data: [{ hello: 'world' }] }));

      store.dispatch(fetchCollectionFactory('@@horseman/ADD_ARRAY_COLLECTION')('/collectionendpoint')).then(() => {
        try {
          expect(actions).to.deep.equal(store.getActions());
          done(); // success: call done with no parameter to indicate that it() is done()
        } catch (e) {
          done(e); // failure: call done with an error Object to indicate that it() failed
        }
      });
    });

    it('should send a fail response when the collection is not found', (done) => {
      const store = mockStore({ horsemanCollections: {} });
      const actions = [
        {
          type: types.COLLECTION_REQUEST,
          meta: {
            endpoint: '/bad',
          },
        },
        {
          type: types.COLLECTION_FAIL,
          meta: {
            endpoint: '/bad',
          },
        },
      ];

      store.dispatch(fetchCollectionFactory('@@horseman/ADD_ARRAY_COLLECTION')('/bad')).then(() => {
        try {
          expect(actions).to.deep.equal(store.getActions());
          done(); // success: call done with no parameter to indicate that it() is done()
        } catch (e) {
          done(e); // failure: call done with an error Object to indicate that it() failed
        }
      });
    });

    it('should dispatch BAD_JSON action when json is invalid', (done) => {
      const store = mockStore({ horsemanCollections: {} });
      const actions = [
        {
          type: types.COLLECTION_REQUEST,
          meta: {
            endpoint: '/badjson',
          },
        },
        {
          type: types.BAD_JSON,
          meta: {
            endpoint: '/badjson',
          },
        },
      ];

      store.dispatch(fetchCollectionFactory('@@horseman/ADD_ARRAY_COLLECTION')('/badjson')).then(() => {
        try {
          expect(actions).to.deep.equal(store.getActions());
          done(); // success: call done with no parameter to indicate that it() is done()
        } catch (e) {
          done(e); // failure: call done with an error Object to indicate that it() failed
        }
      });
    });

    it('should dispatch BAD_REQUEST action when endpoint is bad.', (done) => {
      const store = mockStore({ horsemanCollections: {} });
      const actions = [
        {
          type: types.COLLECTION_REQUEST,
          meta: {
            endpoint: '/badrequest',
          },
        },
        {
          type: types.BAD_REQUEST,
          meta: {
            endpoint: '/badrequest',
          },
        },
      ];

      MockFetch.failNextCall();

      store.dispatch(fetchCollectionFactory('@@horseman/ADD_ARRAY_COLLECTION')('/badrequest')).then(() => {
        try {
          expect(actions).to.deep.equal(store.getActions());
          done(); // success: call done with no parameter to indicate that it() is done()
        } catch (e) {
          done(e); // failure: call done with an error Object to indicate that it() failed
        }
      });
    });
  });
});
