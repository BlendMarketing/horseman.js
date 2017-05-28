import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Loading from '../components/Loading';

/**
 * The CollectionProvider enables all children components to access a
 * `collection` prop parameter that is composed of data from the endpoint
 * specified on the `endpoint` prop of this provider.
 *
 * @author Jared Meyering <jared.meyering@gmail.com>
 */
class CollectionProvider extends React.Component {

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
    const { getCollection, collectionUrl } = this.props;

    getCollection(collectionUrl);
  }

  render() {
    const { collection, render } = this.props;
    const LoadingComponent = this.props.loadingComponent || Loading;

    if (collection.error) {
      return <Redirect to="/404" />;
    }

    if (collection.loading) {
      return <LoadingComponent />;
    }

    return render(collection);
  }

}

CollectionProvider.propTypes = {
  /**
   * This prop will fetch the component from the endpoint.
   */
  getCollection: PropTypes.func.isRequired,

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
   * The component to render while the data is being fetched.
   */
  loadingComponent: PropTypes.func,
};

export default CollectionProvider;
