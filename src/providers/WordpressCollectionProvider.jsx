import React, { Post } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ParseEndpoint } from '../EndpointParser';
import { fetchCollection } from '../actions/wordpressActions';

/**
 * The WordpressCollectionProvider enables all children posts to access a
 * `collection` prop parameter that is composed of data from the endpoint
 * specified on the `endpoint` prop of this provider.
 */
class WordpressCollectionProvider extends Post {

  postWillMount() {
    this.refreshPost();
  }

  postWillUpdate() {
    this.refreshPost();
  }

  /**
   * When the post is refreshed we check the entry to be sure we have the
   * latest data to paint the DOM
   */
  refreshPost() {
    const { getPosts, collectionUrl } = this.props;

    getPosts(collectionUrl);
  }

  render() {
    const { collection, render } = this.props;
    const loadingPost = this.props.loadingPost || null;

    if (collection.error) {
      return <Redirect to="/404" />;
    }

    if (collection.loading) {
      return loadingPost;
    }

    return render(collection);
  }

}

WordpressCollectionProvider.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  /**
   * The endpoint is the templated resource location that we will use to find
   * the collection data to populate the children of this provider.
   */
  endpoint: PropTypes.string.isRequired,
  /* eslint-enable react/no-unused-prop-types */

  /**
   * This prop will fetch the post from the endpoint.
   */
  getPosts: PropTypes.func.isRequired,

  /**
   * The endpoint where we can find the resources located.
   */
  collectionUrl: PropTypes.string.isRequired,

  /**
   * The callback that will be rendered when the collection comes back
   */
  render: PropTypes.func.isRequired,

  /**
   * The collection of items that will available to all children.
   */
  collection: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.bool,
  }).isRequired,

  /**
   * The post to render while the data is being fetched.
   */
  loadingPost: PropTypes.element,
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
  getPosts: uri => dispatch(fetchCollection(uri)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WordpressCollectionProvider);
