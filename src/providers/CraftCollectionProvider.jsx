import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ParseEndpoint } from '../EndpointParser';
import { fetchCollection } from '../actions/craftActions';

/**
 * The CraftCollectionProvider enables all children components to access a
 * `collection` prop parameter that is composed of data from the endpoint
 * specified on the `endpoint` prop of this provider.
 */
class CraftCollectionProvider extends Component {

  componentWillMount() {
    this.refreshComponent();
  }

  componentWillUpdate() {
    this.refreshComponent();
  }

  /**
   * When the component is refreshed we check the entry to be sure we have the
   * latest data to paint the DOM
   */
  refreshComponent() {
    const { getComponents, collectionUrl } = this.props;

    getComponents(collectionUrl);
  }

  render() {
    const { collection, children } = this.props;
    const loadingComponent = this.props.loadingComponent || null;

    if (collection.error) {
      return <Redirect to="/404" />;
    }

    if (collection.loading) {
      return loadingComponent;
    }

    return <div>{Children.map(children, child => React.cloneElement(child, { collection }))}</div>;
  }

}

CraftCollectionProvider.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  /**
   * The endpoint is the templated resource location that we will use to find
   * the collection data to populate the children of this provider.
   */
  endpoint: PropTypes.string.isRequired,
  /* eslint-enable react/no-unused-prop-types */

  /**
   * This prop will fetch the component from the endpoint.
   */
  getComponents: PropTypes.func.isRequired,

  /**
   * The endpoint where we can find the resources located.
   */
  collectionUrl: PropTypes.string.isRequired,

  /**
   * What should be rendered once the resource comes back.
   */
  children: PropTypes.any.isRequired,

  /**
   * The collection of items that will available to all children.
   */
  collection: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.bool,
  }).isRequired,

  /**
   * The component to render while the data is being fetched.
   */
  loadingComponent: PropTypes.element,
};

const mapStateToProps = (state, ownProps) => {
  const collectionUrl = ParseEndpoint(ownProps.endpoint, ownProps.match.params);
  const collections = state.horsemanCollections || {};

  return {
    collectionUrl,
    collection: collections[collectionUrl] || { loading: true, data: [] },
  };
};

const mapDispatchToProps = dispatch => ({
  getComponents: uri => dispatch(fetchCollection(uri)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CraftCollectionProvider);
