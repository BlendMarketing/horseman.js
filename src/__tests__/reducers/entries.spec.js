/* eslint-env mocha */

import { expect } from 'chai';
import entriesReducer from '../../reducers/entries';
import * as types from '../../constants/ActionTypes';

describe('Entries Reducer', () => {
  const initialState = {};

  it('should return the initial state', () => {
    expect(entriesReducer(undefined, {})).to.deep.equal(initialState);
    expect(entriesReducer({
      foo: {
        data: 'bar',
      },
    }, {})).to.deep.equal({
      foo: {
        data: 'bar',
      },
    });
  });

  it('should handle a new request to fetch a entry', () => {
    expect(entriesReducer(undefined, {
      type: types.ENTRY_REQUEST,
      meta: {
        endpoint: 'foo',
      },
    })).to.deep.equal({
      foo: {
        loading: true,
      },
    });
  });

  it('should handle a new request to fetch an entry when data exists', () => {
    expect(entriesReducer({
      foo: {
        data: 'bar',
      },
    }, {
      type: types.ENTRY_REQUEST,
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

  it('should handle adding an entry that failed to fetch', () => {
    expect(entriesReducer({
      foo: {
        data: 'bar',
      },
    }, {
      type: types.ENTRY_FAIL,
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

  it('should handle adding a craft entry', () => {
    expect(entriesReducer({
      foo: {
        data: 'bar',
      },
    }, {
      type: types.ADD_CRAFT_ENTRY,
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
