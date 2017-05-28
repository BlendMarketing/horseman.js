/* eslint-env mocha */

import { expect } from 'chai';
import horseman from '../index';

import { ConnectedResourceProvider } from '../providers/ResourceProvider';
import reducers from '../reducers/index';

describe('horseman.js index', () => {
  describe('should export', () => {
    it('reducers', () => {
      expect(horseman.Reducers).to.deep.equal(reducers);
    });
    it('the ResourceProvider', () => {
      expect(horseman.ResourceProvider).to.deep.equal(ConnectedResourceProvider);
    });
    it('the Correct Number of items', () => {
      expect(Object.keys(horseman)).to.have.lengthOf(2);
    });
  });
});
