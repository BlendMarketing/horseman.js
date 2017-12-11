/* eslint-env mocha */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';

import ActionFactory from '../src/ActionFactory';

import * as types from '../src/constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('ActionFactory', () => {
  it('should return a valid resource action with success name', (done) => {
    const store = mockStore({ horsemanResources: {} });
    const actions = [
      {
        type: types.RESOURCE_REQUEST,
        meta: {
          endpoint: '/endpoint',
        },
      },
      {
        type: '@@horseman/ADD_RESOURCE',
        meta: {
          endpoint: '/endpoint',
          status: 200,
          headers: {
            foo: 'bar',
            'content-type': 'text/plain;charset=UTF-8',
          },
        },
        payload: {
          hello: 'world',
        },
      },
    ];

    fetchMock.mock('end:/endpoint', { headers: { foo: 'bar' }, body: { hello: 'world' } });

    store.dispatch(ActionFactory('@@horseman/ADD_RESOURCE')('/endpoint')).then(() => {
      try {
        expect(actions).to.deep.equal(store.getActions());
        done(); // success: call done with no parameter to indicate that it() is done()
      } catch (e) {
        done(e); // failure: call done with an error Object to indicate that it() failed
      }
    });
  });

  it('should send a fail response when the resource is not found', (done) => {
    const store = mockStore({ horsemanResources: {} });
    const actions = [
      {
        type: types.RESOURCE_REQUEST,
        meta: {
          endpoint: '/bad',
        },
      },
      {
        type: types.RESOURCE_FAIL,
        meta: {
          endpoint: '/bad',
          status: 404,
          headers: {
            foo: 'bar',
          },
        },
        payload: {},
      },
    ];

    fetchMock.mock('end:/bad', { status: 404, headers: { foo: 'bar' } });

    store.dispatch(ActionFactory('@@horseman/ADD_RESOURCE')('/bad')).then(() => {
      try {
        expect(actions).to.deep.equal(store.getActions());
        done(); // success: call done with no parameter to indicate that it() is done()
      } catch (e) {
        done(e); // failure: call done with an error Object to indicate that it() failed
      }
    });
  });

  it('should dispatch BAD_JSON action when json is invalid', (done) => {
    const store = mockStore({ horsemanResources: {} });
    const actions = [
      {
        type: types.RESOURCE_REQUEST,
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

    // MockFetch.when('GET', '/badjson').respondWith(200, 'not json');
    fetchMock.mock('end:/badjson', 'not json');

    store.dispatch(ActionFactory('@@horseman/ADD_RESOURCE')('/badjson')).then(() => {
      try {
        expect(actions).to.deep.equal(store.getActions());
        done(); // success: call done with no parameter to indicate that it() is done()
      } catch (e) {
        done(e); // failure: call done with an error Object to indicate that it() failed
      }
    });
  });
});
