import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Loading from '../components/Loading';

/**
 * Responsibe for managing a component that will be rendered using data stored
 * in a backend. The data returned will be stored in the "entry"
 * prop of the child component.
 */
class EntryProvider extends Component {

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
    const { entry, render } = this.props;
    const LoadingComponent = this.props.loadingComponent || Loading;

    if (entry.error) {
      return <Redirect to="/404" />;
    }

    if (entry.loading) {
      return <LoadingComponent />;
    }

    return render(entry);
  }
}

EntryProvider.propTypes = {
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
   * Func to be rendered once the entry comes back
   */
  render: PropTypes.func.isRequired,

  /**
   * The component to render while the data is being fetched.
   */
  loadingComponent: PropTypes.func,
};

export default EntryProvider;
