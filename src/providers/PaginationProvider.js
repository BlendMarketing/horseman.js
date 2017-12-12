import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import * as types from '../constants/ActionTypes';

import { ConnectedResourceProvider as ResourceProvider } from './ResourceProvider';

export class PaginationProvider extends React.Component {

  componentWillMount() {
    this.setup();
  }

  // sets the default page on load
  setup() {
    const { setCurrentPage, currentPage } = this.props;
    setCurrentPage(currentPage);
  }

  render() {
    const {
      setPageTotal,
      resourceUrl,
      render,
      resource,
      totalPages,
      totalPagesResolver,
    } = this.props;

    // Set Page total once response becomes available
    if (resource.loading === false ) {
      const newPageTotal = totalPagesResolver(resource.response);
      if (newPageTotal !== totalPages) {
        setPageTotal(newPageTotal);
      }
    }

    return (
      <ResourceProvider
        endpoint={resourceUrl}
        render={(resource, meta)=> render(resource, meta)}
      />
    );
  }

}


PaginationProvider.propTypes = {
  /**
   * The key for storing data in redux. Will be used for saving and fetching
   * data.
   */
  handle: PropTypes.string.isRequired,

  /**
   * The function for determining the url, based on the current URL
   */
  resolve: PropTypes.func.isRequired,

  /**
   * Dispatch function for setting total pages
   */
  setPageTotal: PropTypes.func.isRequired,

  /**
   * Dispatch function for setting current page
   */
  setCurrentPage: PropTypes.func.isRequired,

  /**
   * Current Page Number
   */
  currentPage: PropTypes.string,

  /**
   * The default page number to load
   */
  defaultPage: PropTypes.string,

  /**
   * The method for determining total pages from response
   */
  totalPagesResolver: PropTypes.func.isRequired,

  /**
   * Total Number of pages
   */
  totalPages: PropTypes.string,

  /**
   * The current resource URL
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

};

export const mapStateToProps = (state, ownProps) => {
  console.log("ownProps",ownProps);
  console.log("state",state);
  const currentPage = state.horsemanPaginations[ownProps.handle] && state.horsemanPaginations[ownProps.handle].currentPage ?  state.horsemanPaginations[ownProps.handle].currentPage : ownProps.defaultPage;
  const resourceUrl = ownProps.resolve(currentPage);

  return {
    currentPage,
    totalPages: state.horsemanPaginations[ownProps.handle] && state.horsemanPaginations[ownProps.handle].totalPages ? state.horsemanPaginations[ownProps.handle].totalPages : null,
    resourceUrl,
    ...state.horsemanPaginations[ownProps.handle],
    resource: state.horsemanResources[resourceUrl] ||
      { meta: { loading: true, error: false }, data: {} },
  };
};

/**
 * The component needs to be able to fetch the resource we want.
 */
export const mapDispatchToProps = (dispatch, ownProps) => ({
  setPageTotal: pageTotal => dispatch({
    data: { pageTotal },
    handle: ownProps.handle,
    type: types.SET_PAGE_TOTAL,
  }),
  setCurrentPage: currentPage => dispatch({
    data: { currentPage },
    handle: ownProps.handle,
    type: types.SET_CURRENT_PAGE,
  }),
});

export const ConnectedPaginationProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaginationProvider);
