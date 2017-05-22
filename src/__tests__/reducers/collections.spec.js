/* eslint-env mocha */

import { expect } from 'chai';
import collectionReducer from '../../reducers/collections';
import * as types from '../../constants/ActionTypes';

describe('Collection Reducer', () => {
  const initialState = {};
  it('should return the initial state', () => {
    expect(collectionReducer(undefined, {})).to.deep.equal(initialState);
    expect(collectionReducer({
      foo: {
        data: [{ item: 1 }, { item: 2 }],
        error: false,
        loading: false,
      },
    }, {})).to.deep.equal({
      foo: {
        data: [{ item: 1 }, { item: 2 }],
        error: false,
        loading: false,
      },
    });
  });

  it('should handle a new request to fetch a collection', () => {
    expect(collectionReducer(undefined, {
      type: types.COLLECTION_REQUEST,
      meta: {
        endpoint: 'foo',
      },
    })).to.deep.equal({
      foo: {
        error: false,
        loading: true,
        data: [],
      },
    });
  });

  it('should handle a new request to fetch a collection when data exists', () => {
    expect(collectionReducer({
      foo: {
        data: [{ item: 1 }, { item: 2 }],
        error: false,
        loading: false,
      },
    }, {
      type: types.COLLECTION_REQUEST,
      meta: {
        endpoint: 'bar',
      },
    })).to.deep.equal({
      foo: {
        data: [{ item: 1 }, { item: 2 }],
        error: false,
        loading: false,
      },
      bar: {
        error: false,
        loading: true,
        data: [],
      },
    });
  });
  it('should handle a adding new array Collection', () => {
    expect(collectionReducer(undefined, {
      type: types.ADD_ARRAY_COLLECTION,
      meta: {
        endpoint: 'foo',
      },
      payload: {
        data: [{ item: 1 }, { item: 2 }],
      },
    })).to.deep.equal({
      foo: {
        data: [{ item: 1 }, { item: 2 }],
        error: false,
        loading: false,
      },
    });
  });

  it('should handle adding a new array Collection when data already exists in the store', () => {
    expect(collectionReducer({
      foo: {
        data: [{ item: 1 }, { item: 2 }],
        error: false,
        loading: false,
      },
    }, {
      type: types.ADD_ARRAY_COLLECTION,
      meta: {
        endpoint: 'bar',
      },
      payload: {
        data: [{ thing: 1 }, { thing: 2 }],
      },
    })).to.deep.equal({
      foo: {
        data: [{ item: 1 }, { item: 2 }],
        error: false,
        loading: false,
      },
      bar: {
        data: [{ thing: 1 }, { thing: 2 }],
        error: false,
        loading: false,
      },
    });
  });

  it('should handle adding a collection that failed to fetch', () => {
    expect(collectionReducer({
      foo: {
        data: [{ item: 1 }, { item: 2 }],
        error: false,
        loading: false,
      },
    }, {
      type: types.COLLECTION_FAIL,
      meta: {
        endpoint: 'bar',
      },
    })).to.deep.equal({
      foo: {
        data: [{ item: 1 }, { item: 2 }],
        error: false,
        loading: false,
      },
      bar: {
        data: [],
        error: true,
        loading: false,
      },
    });
  });
});
