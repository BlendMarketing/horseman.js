import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as types from "../constants/ActionTypes";
import ActionFactory from "../ActionFactory";

const prefetch = (Component, routes) => {
  class PrefetchLink extends React.Component {
    componentWillMount() {
      this.preloadLink();
    }
    preloadLink() {
      const { preload, to } = this.props;
      preload(resourceUrl);
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  /**
   * The component needs to be able to fetch the resource we want.
   */
  const mapDispatchToProps = dispatch => ({
    preload: uri => dispatch(ActionFactory(types.ADD_RESOURCE)(uri)),
  });
  const mapStateToProps = (state, ownProps) => {
    const endpoint = LoadUri(routes, ownProps.to);
    return {
      resourceUrl,
      resource: state.horsemanResources[endpoint] || {
        meta: { loading: true, error: false },
        data: {},
      },
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(PrefetchLink);
};
