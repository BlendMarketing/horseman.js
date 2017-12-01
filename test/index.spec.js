/* eslint-env mocha */

import { expect } from 'chai';
import * as horseman from '../src/index';

import prefetch from '../src/providers/prefetch';
import { ConnectedResourceProvider } from '../src/providers/ResourceProvider';
import horsemanReducer from '../src/reducers/horsemanReducer';
import horsemanRouteReducer from '../src/reducers/horsemanRouteReducer';

describe('horseman.js index', () => {
  describe('should export', () => {
    it('reducers', () => {
      expect(horseman.horsemanReducers.horsemanResources).to.be.a('function')
      .and.deep.equal(horsemanReducer);
      expect(horseman.horsemanReducers.horsemanRoutes).to.be.a('function')
      .and.deep.equal(horsemanRouteReducer);
    });
    it('the ResourceProvider', () => {
      expect(horseman.ResourceProvider).to.deep.equal(ConnectedResourceProvider);
    });
    it('the prefetch provider', () => {
      expect(horseman.prefetch).to.deep.equal(prefetch);
    });
    it('the Correct Number of items', () => {
      expect(Object.keys(horseman)).to.have.lengthOf(3);
    });
  });
});
