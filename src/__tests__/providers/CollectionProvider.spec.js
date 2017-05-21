/* eslint-disable react/prop-types */
/* eslint-env mocha */

import React from 'react';
import { Redirect } from 'react-router-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import CollectionProvider from '../../providers/CollectionProvider';
import Loading from '../../components/Loading';

describe('CollectionProvider', () => {
  it('Should render the loading component if the entry is loading', () => {
    const fetchFunc = sinon.spy();
    const wrapper = shallow(
      <CollectionProvider
        getCollection={fetchFunc}
        collectionUrl="/foo"
        collection={{ loading: true, data: [] }}
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
      <CollectionProvider
        getCollection={fetchFunc}
        collectionUrl="/foo"
        collection={{ loading: true, data: [] }}
        render={() => (<div><h1>loaded</h1></div>)}
        loadingComponent={AlternateLoading}
      />,
    );
    expect(wrapper.find(AlternateLoading)).to.have.length(1);
  });

  it('Should redirect to the 404 page if an endpoint does not return an collection', () => {
    const fetchFunc = sinon.spy();
    const wrapper = shallow(
      <CollectionProvider
        getCollection={fetchFunc}
        collectionUrl="/foo"
        collection={{ error: true, loading: false, data: [] }}
        render={() => (<div><h1>loaded</h1></div>)}
      />,
    );
    expect(wrapper.find(Redirect)).to.have.length(1);
    expect(wrapper.find(Redirect).props().to).to.equal('/404');
  });

  it('Should render the requested component if an collection returns successfully', () => {
    const collection = {
      loading: false,
      error: false,
      data: [
        {
          foo: 'bar',
          hello: 'world',
        },
      ],
    };
    const fetchFunc = sinon.spy();
    const CollectionComponent = ({ c }) => {
      const items = c.data.map(item => (
        <li key={item}>{item.foo} {item.hello}</li>
      ));

      return (
        <div>
          <ul>
            {items}
          </ul>
        </div>
      );
    };
    const wrapper = shallow(
      <CollectionProvider
        getCollection={fetchFunc}
        collectionUrl="/foo"
        collection={collection}
        render={c => <CollectionComponent c={c} />}
      />,
    );
    expect(wrapper.find(CollectionComponent)).to.have.length(1);
    expect(wrapper.html()).to.equal(`<div><ul><li>${collection.data[0].foo} ${collection.data[0].hello}</li></ul></div>`);
  });
});
