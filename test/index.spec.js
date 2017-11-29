/* eslint-env mocha */

import { expect } from 'chai';
import * as horseman from '../src/index';

import prefetch from '../src/providers/prefetch';
import { ConnectedResourceProvider } from '../src/providers/ResourceProvider';
import horsemanReducer from '../src/reducers/horsemanReducer';

describe('horseman.js index', () => {
  describe('should export', () => {
    it('reducers', () => {
      expect(horseman.horsemanReducer).to.be.a('function')
      .and.deep.equal(horsemanReducer);
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
