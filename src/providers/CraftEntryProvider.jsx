import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ParseEndpoint } from '../EndpointParser';
import { fetchEntry } from '../actions/craftActions';

/**
 * Responsibe for managing a component that will be rendered using data stored
 * in the craftcms backend. The data returned will be stored in the "entry"
 * prop of the child component.
 */
class CraftEntryProvider extends Component {

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
    const { getEntry, entryUrl } = this.props;
    getEntry(entryUrl);
  }

  render() {
    const { entry, children } = this.props;

    if (entry.error) {
      return <Redirect to="/404" />;
    }

    if (entry.loading) {
      return <h2>Loading</h2>;
    }

    return <div>{Children.map(children, child => React.cloneElement(child, { entry }))}</div>;
  }
}

CraftEntryProvider.propTypes = {
  /**
   * The method call that will be responsible for fetching the entry data and
   * adding the information to the store.
   */
  getEntry: PropTypes.func.isRequired,

  /**
   * The url endpoint for the entry that will be associated with the component.
   */
  entryUrl: PropTypes.string.isRequired,

  /**
   * The actual entry object. To be used for rendering the page.
   */
  entry: PropTypes.object.isRequired,


  /**
   * React components to be rendered after data is fetched.
   */
  children: PropTypes.any.isRequired,
};

/**
 * A Craft entry needs to have access to the information about the entry it is
 * fetching. The route should tell this component what that data is.
 */
const mapStateToProps = (state, ownProps) => {
  const entryUrl = ParseEndpoint(ownProps.endpoint, ownProps.match.params);

  return {
    entryUrl,
    entry: state.horsemanEntries[entryUrl] || { loading: true },
  };
};

/**
 * The component needs to be able to fetch the entry we want.
 */
const mapDispatchToProps = dispatch => ({
  getEntry: uri => dispatch(fetchEntry(uri)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CraftEntryProvider);
