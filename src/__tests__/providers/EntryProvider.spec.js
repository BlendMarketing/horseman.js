/* eslint-disable react/prop-types */
/* eslint-env mocha */

import React from 'react';
import { Redirect } from 'react-router-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import EntryProvider from '../../providers/EntryProvider';
import Loading from '../../components/Loading';

describe('EntryProvider', () => {
  it('Should render the loading component if the entry is loading', () => {
    const fetchFunc = sinon.spy();
    const wrapper = shallow(
      <EntryProvider
        getEntry={fetchFunc}
        entryUrl="/foo"
        entry={{ loading: true }}
        render={() => (<div><h1>loaded</h1></div>)}
      />,
    );
    expect(wrapper.find(Loading)).to.have.length(1);
  });

  it('Should render a custom loading component if one is passed in', () => {
    const fetchFunc = sinon.spy();
    const AlternateLoading = () => (
      <h1>alternate loading</h1>
    );
    const wrapper = shallow(
      <EntryProvider
        getEntry={fetchFunc}
        entryUrl="/foo"
        entry={{ loading: true }}
        render={() => (<div><h1>loaded</h1></div>)}
        loadingComponent={AlternateLoading}
      />,
    );
    expect(wrapper.find(AlternateLoading)).to.have.length(1);
  });

  it('Should redirect to the 404 page if an endpoint does not return an entry', () => {
    const fetchFunc = sinon.spy();
    const wrapper = shallow(
      <EntryProvider
        getEntry={fetchFunc}
        entryUrl="/foo"
        entry={{ error: true }}
        render={() => (<div><h1>loaded</h1></div>)}
      />,
    );
    expect(wrapper.find(Redirect)).to.have.length(1);
    expect(wrapper.find(Redirect).props().to).to.equal('/404');
  });

  it('Should render the requested component if an entry returns successfully', () => {
    const entry = {
      foo: 'bar',
      hello: 'world',
    };
    const fetchFunc = sinon.spy();
    const EntryComponent = ({ e }) => (
      <div>{ e.foo } { e.hello }</div>
    );
    const wrapper = shallow(
      <EntryProvider
        getEntry={fetchFunc}
        entryUrl="/foo"
        entry={entry}
        render={e => <EntryComponent e={e} />}
      />,
    );
    expect(wrapper.find(EntryComponent)).to.have.length(1);
    expect(wrapper.html()).to.equal(`<div>${entry.foo} ${entry.hello}</div>`);
  });
});
