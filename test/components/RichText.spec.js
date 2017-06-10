/* eslint-env mocha */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import RichText from '../../src/components/RichText';

describe('RichText', () => {
  const html = '<div><h1>Hey There</h1></div>';
  const wrapper = shallow(
    <RichText html={html} />,
  );

  it('has the proper html content', () => {
    expect(wrapper.html()).to.equal(`<div>${html}</div>`);
  });
});
