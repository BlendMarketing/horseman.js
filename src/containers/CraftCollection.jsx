import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ParseEndpoint } from '../EndpointParser';
import { fetchCollection } from '../actions/craftActions';

class CraftCollection extends Component {

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

    if (collection.error) {
      return <Redirect to="/404" />;
    }

    if (collection.loading) {
      return <h2>Loading</h2>;
    }

    return <div>{Children.map(children, child => React.cloneElement(child, { collection }))}</div>;
  }

}

CraftCollection.propTypes = {
  getComponents: PropTypes.func.isRequired,
  collectionUrl: PropTypes.string.isRequired,
  collection: PropTypes.array,
  children: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const collectionUrl = ParseEndpoint(ownProps.endpoint, ownProps.match.params);
  const collections = state.horsemanCollections || {};

  return {
    collectionUrl,
    collection: collections[collectionUrl] || { loading: true },
  };
};

const mapDispatchToProps = dispatch => ({
  getComponents: uri => dispatch(fetchCollection(uri)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CraftCollection);
