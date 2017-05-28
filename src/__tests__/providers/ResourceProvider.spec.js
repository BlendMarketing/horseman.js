/* eslint-disable react/prop-types */
/* eslint-env mocha */

import React from 'react';
import { Redirect } from 'react-router-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { ResourceProvider, mapStateToProps, mapDispatchToProps } from '../../providers/ResourceProvider';
import Loading from '../../components/Loading';

describe('ResourceProvider', () => {
  it('Should render the loading component if the resource is loading', () => {
    const fetchFunc = sinon.spy();
    const wrapper = shallow(
      <ResourceProvider
        getResource={fetchFunc}
        resourceUrl="/foo"
        resource={{ loading: true }}
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
      <ResourceProvider
        getResource={fetchFunc}
        resourceUrl="/foo"
        resource={{ loading: true }}
        render={() => (<div><h1>loaded</h1></div>)}
        loadingComponent={AlternateLoading}
      />,
    );
    expect(wrapper.find(AlternateLoading)).to.have.length(1);
  });

  it('Should redirect to the 404 page if an endpoint does not return an resource', () => {
    const fetchFunc = sinon.spy();
    const wrapper = shallow(
      <ResourceProvider
        getResource={fetchFunc}
        resourceUrl="/foo"
        resource={{ error: true }}
        render={() => (<div><h1>loaded</h1></div>)}
      />,
    );
    expect(wrapper.find(Redirect)).to.have.length(1);
    expect(wrapper.find(Redirect).props().to).to.equal('/404');
  });

  it('Should render the requested component if an resource returns successfully', () => {
    const resource = {
      foo: 'bar',
      hello: 'world',
    };
    const fetchFunc = sinon.spy();
    const ResourceComponent = ({ e }) => (
      <div>{ e.foo } { e.hello }</div>
    );
    const wrapper = shallow(
      <ResourceProvider
        getResource={fetchFunc}
        resourceUrl="/foo"
        resource={resource}
        render={e => <ResourceComponent e={e} />}
      />,
    );
    expect(wrapper.find(ResourceComponent)).to.have.length(1);
    expect(wrapper.html()).to.equal(`<div>${resource.foo} ${resource.hello}</div>`);
  });

  describe('Should mapStateToProps appropriately', () => {
    it('with empty state', () => {
      const state = {
        horsemanResources: {},
      };
      const ownProps = {
        endpoint: 'http://example.com/:slug',
        endpointVars: {
          slug: 'example',
        },
      };

      const expected = {
        resourceUrl: 'http://example.com/example',
        resource: { loading: true },
      };

      const exportedProps = mapStateToProps(state, ownProps);

      expect(exportedProps).to.deep.equal(expected);
    });
    it('with hydrated state', () => {
      const state = {
        horsemanResources: {
          'http://example.com/resource': {
            title: 'foo',
          },
        },
      };

      const ownProps = {
        endpoint: 'http://example.com/:slug',
        endpointVars: {
          slug: 'resource',
        },
      };

      const expected = {
        resourceUrl: 'http://example.com/resource',
        resource: { title: 'foo' },
      };

      const exportedProps = mapStateToProps(state, ownProps);

      expect(exportedProps).to.deep.equal(expected);
    });
  });

  it('Should mapDispatchToProps appropriately', () => {
    const dispatch = sinon.spy();
    const { getResource, ...rest } = mapDispatchToProps(dispatch);
    const resourceUrl = 'http://example.com';
    const otherPropsExpected = {};

    getResource(resourceUrl);

    expect(dispatch.calledOnce).to.equal(true);
    expect(rest).to.deep.equal(otherPropsExpected);
  });
});
