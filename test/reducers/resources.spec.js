/* eslint-env mocha */

import { expect } from 'chai';
import resourcesReducer from '../../src/reducers/resources';
import * as types from '../../src/constants/ActionTypes';

describe('Resources Reducer', () => {
  const initialState = {};

  it('should return the initial state', () => {
    expect(resourcesReducer(undefined, {})).to.deep.equal(initialState);
    expect(resourcesReducer({
      foo: {
        data: 'bar',
      },
    }, {})).to.deep.equal({
      foo: {
        data: 'bar',
      },
    });
  });

  it('should handle a new request to fetch a resource', () => {
    expect(resourcesReducer(undefined, {
      type: types.RESOURCE_REQUEST,
      meta: {
        endpoint: 'foo',
      },
    })).to.deep.equal({
      foo: {
        loading: true,
      },
    });
  });

  it('should handle a new request to fetch an resource when data exists', () => {
    expect(resourcesReducer({
      foo: {
        data: 'bar',
      },
    }, {
      type: types.RESOURCE_REQUEST,
      meta: {
        endpoint: 'bar',
      },
    })).to.deep.equal({
      foo: {
        data: 'bar',
      },
      bar: {
        loading: true,
      },
    });
  });

  it('should handle adding an resource that failed to fetch', () => {
    expect(resourcesReducer({
      foo: {
        data: 'bar',
      },
    }, {
      type: types.RESOURCE_FAIL,
      meta: {
        endpoint: 'bar',
      },
    })).to.deep.equal({
      foo: {
        data: 'bar',
      },
      bar: {
        error: true,
      },
    });
  });

  it('should handle adding a resource', () => {
    expect(resourcesReducer({
      foo: {
        data: 'bar',
      },
    }, {
      type: types.ADD_RESOURCE,
      meta: {
        endpoint: 'bar',
      },
      payload: {
        data: 'baz',
      },
    })).to.deep.equal({
      foo: {
        data: 'bar',
      },
      bar: {
        data: 'baz',
      },
    });
  });
});
