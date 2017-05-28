import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ParseEndpoint from '../ParseEndpoint';
import * as types from '../constants/ActionTypes';
import ActionFactory from '../ActionFactory';
import Loading from '../components/Loading';

/**
 * Responsibe for managing a component that will be rendered using data stored
 * in a backend. The data returned will be stored in the "resource"
 * prop of the child component.
 */
export class ResourceProvider extends React.Component {

  componentWillMount() {
    this.refreshComponent();
  }

  componentWillUpdate() {
    this.refreshComponent();
  }

  /**
   * When the component is refreshed we check the resource to be sure we have the
   * latest data to paint the DOM
   */
  refreshComponent() {
    const { getResource, resourceUrl } = this.props;
    getResource(resourceUrl);
  }

  render() {
    const { resource, render } = this.props;
    const LoadingComponent = this.props.loadingComponent || Loading;

    if (resource.error) {
      return <Redirect to="/404" />;
    }

    if (resource.loading) {
      return <LoadingComponent />;
    }

    return render(resource);
  }
}

ResourceProvider.propTypes = {
  /**
   * The method call that will be responsible for fetching the resource data and
   * adding the information to the store.
   */
  getResource: PropTypes.func.isRequired,

  /**
   * The url endpoint for the resource that will be associated with the component.
   */
  resourceUrl: PropTypes.string.isRequired,

  /**
   * The actual resource object. To be used for rendering the page.
   */
  resource: PropTypes.object.isRequired,

  /**
   * Func to be rendered once the resource comes back
   */
  render: PropTypes.func.isRequired,

  /**
   * The component to render while the data is being fetched.
   */
  loadingComponent: PropTypes.func,
};

export const mapStateToProps = (state, ownProps) => {
  const resourceUrl = ParseEndpoint(ownProps.endpoint, ownProps.endpointVars);

  return {
    resourceUrl,
    resource: state.horsemanResources[resourceUrl] || { loading: true },
  };
};

/**
 * The component needs to be able to fetch the resource we want.
 */
export const mapDispatchToProps = dispatch => ({
  getResource: uri => dispatch(ActionFactory(types.ADD_RESOURCE)(uri)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceProvider);
